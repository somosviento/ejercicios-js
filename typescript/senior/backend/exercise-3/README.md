# Backend Exercise 3: Advanced TypeScript Patterns for Scalable Node.js Applications

## Overview
In this exercise, you'll implement advanced TypeScript patterns to build a highly scalable and maintainable Node.js application. You'll focus on creating a task scheduling and execution system with sophisticated TypeScript types, proper error handling, and advanced architectural patterns.

## Learning Objectives
- Master advanced TypeScript patterns for Node.js applications
- Implement proper error handling with TypeScript discriminated unions
- Design type-safe asynchronous processing patterns
- Create extensible plugin systems with TypeScript
- Apply proper dependency injection and inversion of control

## Requirements

### 1. Task Scheduling System
Build a task scheduling system with the following features:
- Type-safe task definitions with configurable parameters
- Task scheduling with various timing options (cron, interval, one-time)
- Task dependencies and execution order
- Distributed task locking and coordination
- Task history and status tracking

### 2. Plugin Architecture
Implement a plugin system with the following features:
- Type-safe plugin registration and discovery
- Plugin lifecycle management
- Plugin dependency resolution
- Plugin configuration with proper TypeScript types
- Plugin versioning and compatibility checking

### 3. Advanced Error Handling
Implement a comprehensive error handling system:
- Error hierarchy with TypeScript discriminated unions
- Structured error logging with proper typing
- Error recovery strategies
- Circuit breaker pattern with TypeScript
- Error monitoring and alerting

### 4. Performance Optimization
Implement the following performance patterns:
- Worker thread pool with proper TypeScript typing
- Connection pooling for database access
- Caching strategies with type-safe cache interfaces
- Rate limiting and throttling
- Resource cleanup and garbage collection optimization

## Project Structure
```
/src
  /core
    /task
      task.interface.ts
      task-manager.ts
      task-scheduler.ts
      task-executor.ts
      task-store.ts
    /plugin
      plugin-manager.ts
      plugin.interface.ts
      plugin-loader.ts
      plugin-registry.ts
    /error
      error-types.ts
      error-handler.ts
      error-logger.ts
      circuit-breaker.ts
    /performance
      worker-pool.ts
      connection-pool.ts
      cache-manager.ts
      rate-limiter.ts
  /tasks
    file-processing-task.ts
    data-synchronization-task.ts
    report-generation-task.ts
    cleanup-task.ts
  /plugins
    email-notification-plugin.ts
    slack-notification-plugin.ts
    s3-storage-plugin.ts
    metrics-plugin.ts
  /utils
    logger.ts
    config.ts
    validation.ts
  /types
    common.types.ts
    task.types.ts
    plugin.types.ts
  app.ts
  server.ts
```

## Implementation Tasks

### Task 1: Type-Safe Task Interface
Create a type-safe task interface with proper TypeScript generics:

```typescript
// core/task/task.interface.ts
export interface TaskConfig<TParams = unknown> {
  id: string;
  name: string;
  description?: string;
  schedule: TaskSchedule;
  params: TParams;
  timeout?: number;
  retries?: number;
  dependencies?: string[];
}

export type TaskSchedule =
  | { type: 'cron'; expression: string }
  | { type: 'interval'; milliseconds: number }
  | { type: 'once'; date: Date }
  | { type: 'manual' };

export interface TaskContext<TParams = unknown> {
  taskId: string;
  params: TParams;
  startTime: Date;
  attempt: number;
  logger: Logger;
}

export interface TaskResult<TOutput = unknown> {
  success: boolean;
  output?: TOutput;
  error?: Error;
  duration: number;
}

export interface Task<TParams = unknown, TOutput = unknown> {
  execute(context: TaskContext<TParams>): Promise<TaskResult<TOutput>>;
  validate?(params: TParams): boolean | Promise<boolean>;
  cleanup?(context: TaskContext<TParams>, result: TaskResult<TOutput>): Promise<void>;
  onError?(context: TaskContext<TParams>, error: Error): Promise<void>;
}
```

### Task 2: Task Manager Implementation
Implement a task manager with proper TypeScript typing:

```typescript
// core/task/task-manager.ts
import { Task, TaskConfig, TaskResult, TaskContext } from './task.interface';
import { TaskScheduler } from './task-scheduler';
import { TaskStore } from './task-store';
import { Logger } from '../utils/logger';
import { ApplicationError, TaskExecutionError } from '../error/error-types';

export class TaskManager {
  private tasks: Map<string, Task<any, any>> = new Map();
  private taskConfigs: Map<string, TaskConfig<any>> = new Map();
  
  constructor(
    private readonly scheduler: TaskScheduler,
    private readonly taskStore: TaskStore,
    private readonly logger: Logger
  ) {}
  
  registerTask<TParams, TOutput>(
    config: TaskConfig<TParams>,
    task: Task<TParams, TOutput>
  ): void {
    if (this.tasks.has(config.id)) {
      throw new ApplicationError(
        'TASK_ALREADY_REGISTERED',
        `Task with id ${config.id} is already registered`
      );
    }
    
    // Validate task configuration
    this.validateTaskConfig(config);
    
    // Store task and configuration
    this.tasks.set(config.id, task);
    this.taskConfigs.set(config.id, config);
    
    // Schedule the task
    this.scheduler.scheduleTask(config);
    
    this.logger.info(`Task ${config.name} (${config.id}) registered successfully`);
  }
  
  async executeTask<TParams, TOutput>(
    taskId: string,
    params?: Partial<TParams>
  ): Promise<TaskResult<TOutput>> {
    const task = this.tasks.get(taskId) as Task<TParams, TOutput>;
    const config = this.taskConfigs.get(taskId) as TaskConfig<TParams>;
    
    if (!task || !config) {
      throw new ApplicationError(
        'TASK_NOT_FOUND',
        `Task with id ${taskId} not found`
      );
    }
    
    // Merge default params with provided params
    const mergedParams = {
      ...config.params,
      ...params
    };
    
    // Create task context
    const context: TaskContext<TParams> = {
      taskId,
      params: mergedParams,
      startTime: new Date(),
      attempt: 1,
      logger: this.logger.child({ taskId })
    };
    
    try {
      // Check task dependencies
      await this.checkDependencies(config);
      
      // Validate parameters if validation method exists
      if (task.validate && !(await task.validate(mergedParams))) {
        throw new ApplicationError(
          'TASK_VALIDATION_FAILED',
          `Validation failed for task ${taskId}`
        );
      }
      
      // Execute the task
      const startTime = Date.now();
      const result = await Promise.race([
        task.execute(context),
        this.createTimeoutPromise(config.timeout)
      ]);
      
      const duration = Date.now() - startTime;
      
      // Store task execution result
      await this.taskStore.saveTaskExecution({
        taskId,
        status: result.success ? 'SUCCESS' : 'FAILED',
        startTime: context.startTime,
        endTime: new Date(),
        duration,
        params: mergedParams,
        output: result.output,
        error: result.error ? result.error.message : undefined
      });
      
      // Run cleanup if needed
      if (task.cleanup) {
        await task.cleanup(context, result);
      }
      
      return result;
    } catch (error) {
      const taskError = new TaskExecutionError(
        `Failed to execute task ${taskId}`,
        error
      );
      
      // Call onError handler if exists
      if (task.onError) {
        await task.onError(context, taskError);
      }
      
      // Store task execution failure
      await this.taskStore.saveTaskExecution({
        taskId,
        status: 'FAILED',
        startTime: context.startTime,
        endTime: new Date(),
        duration: Date.now() - context.startTime.getTime(),
        params: mergedParams,
        error: taskError.message
      });
      
      throw taskError;
    }
  }
  
  private async checkDependencies(config: TaskConfig<any>): Promise<void> {
    if (!config.dependencies || config.dependencies.length === 0) {
      return;
    }
    
    for (const dependencyId of config.dependencies) {
      const lastExecution = await this.taskStore.getLastTaskExecution(dependencyId);
      
      if (!lastExecution || lastExecution.status !== 'SUCCESS') {
        throw new ApplicationError(
          'DEPENDENCY_NOT_SATISFIED',
          `Dependency ${dependencyId} for task ${config.id} is not satisfied`
        );
      }
    }
  }
  
  private createTimeoutPromise(timeout?: number): Promise<never> {
    if (!timeout) {
      return new Promise(() => {}); // Never resolves
    }
    
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new ApplicationError(
          'TASK_TIMEOUT',
          `Task execution timed out after ${timeout}ms`
        ));
      }, timeout);
    });
  }
  
  private validateTaskConfig(config: TaskConfig<any>): void {
    // Validate task configuration
    // ...
  }
  
  // Other methods...
}
```

### Task 3: Plugin System
Implement a type-safe plugin system:

```typescript
// core/plugin/plugin.interface.ts
export interface PluginMetadata {
  id: string;
  name: string;
  version: string;
  description?: string;
  author?: string;
  dependencies?: Array<{
    pluginId: string;
    version: string;
  }>;
}

export interface PluginContext {
  logger: Logger;
  config: Record<string, any>;
}

export interface Plugin<TConfig = unknown> {
  metadata: PluginMetadata;
  
  initialize(context: PluginContext, config: TConfig): Promise<void>;
  start?(): Promise<void>;
  stop?(): Promise<void>;
  getStatus?(): 'stopped' | 'starting' | 'running' | 'stopping' | 'error';
}

// core/plugin/plugin-manager.ts
export class PluginManager {
  private plugins: Map<string, Plugin<any>> = new Map();
  private pluginInstances: Map<string, any> = new Map();
  private pluginStatus: Map<string, 'stopped' | 'starting' | 'running' | 'stopping' | 'error'> = new Map();
  
  constructor(
    private readonly logger: Logger,
    private readonly config: ConfigService
  ) {}
  
  registerPlugin<TConfig>(plugin: Plugin<TConfig>, config: TConfig): void {
    const { id, name, version } = plugin.metadata;
    
    if (this.plugins.has(id)) {
      throw new ApplicationError(
        'PLUGIN_ALREADY_REGISTERED',
        `Plugin ${name} (${id}) is already registered`
      );
    }
    
    // Check plugin dependencies
    this.checkPluginDependencies(plugin.metadata);
    
    // Store plugin
    this.plugins.set(id, plugin);
    this.pluginStatus.set(id, 'stopped');
    
    this.logger.info(`Plugin ${name} v${version} (${id}) registered successfully`);
    
    // Initialize plugin
    this.initializePlugin(id, config);
  }
  
  async initializePlugin<TConfig>(pluginId: string, config: TConfig): Promise<void> {
    const plugin = this.plugins.get(pluginId) as Plugin<TConfig>;
    
    if (!plugin) {
      throw new ApplicationError(
        'PLUGIN_NOT_FOUND',
        `Plugin with id ${pluginId} not found`
      );
    }
    
    try {
      this.pluginStatus.set(pluginId, 'starting');
      
      // Create plugin context
      const context: PluginContext = {
        logger: this.logger.child({ pluginId }),
        config: this.config.getPluginConfig(pluginId)
      };
      
      // Initialize plugin
      await plugin.initialize(context, config);
      
      // Start plugin if it has a start method
      if (plugin.start) {
        await plugin.start();
      }
      
      this.pluginStatus.set(pluginId, 'running');
      this.logger.info(`Plugin ${plugin.metadata.name} initialized successfully`);
    } catch (error) {
      this.pluginStatus.set(pluginId, 'error');
      this.logger.error(`Failed to initialize plugin ${pluginId}`, error);
      throw new ApplicationError(
        'PLUGIN_INITIALIZATION_FAILED',
        `Failed to initialize plugin ${pluginId}: ${error.message}`
      );
    }
  }
  
  async stopPlugin(pluginId: string): Promise<void> {
    const plugin = this.plugins.get(pluginId);
    
    if (!plugin) {
      throw new ApplicationError(
        'PLUGIN_NOT_FOUND',
        `Plugin with id ${pluginId} not found`
      );
    }
    
    if (this.pluginStatus.get(pluginId) !== 'running') {
      return;
    }
    
    try {
      this.pluginStatus.set(pluginId, 'stopping');
      
      // Stop plugin if it has a stop method
      if (plugin.stop) {
        await plugin.stop();
      }
      
      this.pluginStatus.set(pluginId, 'stopped');
      this.logger.info(`Plugin ${plugin.metadata.name} stopped successfully`);
    } catch (error) {
      this.pluginStatus.set(pluginId, 'error');
      this.logger.error(`Failed to stop plugin ${pluginId}`, error);
      throw new ApplicationError(
        'PLUGIN_STOP_FAILED',
        `Failed to stop plugin ${pluginId}: ${error.message}`
      );
    }
  }
  
  // Other methods...
}
```

### Task 4: Error Handling with Discriminated Unions
Implement a comprehensive error handling system with TypeScript discriminated unions:

```typescript
// core/error/error-types.ts
export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'CONFLICT'
  | 'INTERNAL_ERROR'
  | 'TASK_EXECUTION_ERROR'
  | 'TASK_TIMEOUT'
  | 'TASK_NOT_FOUND'
  | 'TASK_ALREADY_REGISTERED'
  | 'PLUGIN_NOT_FOUND'
  | 'PLUGIN_ALREADY_REGISTERED'
  | 'PLUGIN_INITIALIZATION_FAILED'
  | 'PLUGIN_STOP_FAILED'
  | 'DEPENDENCY_NOT_SATISFIED';

export class ApplicationError extends Error {
  readonly code: ErrorCode;
  readonly timestamp: Date;
  readonly details?: unknown;
  readonly cause?: Error;
  
  constructor(
    code: ErrorCode,
    message: string,
    details?: unknown,
    cause?: Error
  ) {
    super(message);
    this.name = 'ApplicationError';
    this.code = code;
    this.timestamp = new Date();
    this.details = details;
    this.cause = cause;
    
    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
  
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      timestamp: this.timestamp,
      details: this.details,
      cause: this.cause ? {
        message: this.cause.message,
        name: this.cause.name,
        stack: this.cause.stack
      } : undefined,
      stack: this.stack
    };
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string, details?: unknown) {
    super('VALIDATION_ERROR', message, details);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ApplicationError {
  constructor(resource: string, id: string) {
    super('NOT_FOUND', `${resource} with id ${id} not found`);
    this.name = 'NotFoundError';
  }
}

export class TaskExecutionError extends ApplicationError {
  constructor(message: string, cause?: Error) {
    super('TASK_EXECUTION_ERROR', message, undefined, cause);
    this.name = 'TaskExecutionError';
  }
}

// core/error/error-handler.ts
export class ErrorHandler {
  constructor(private readonly logger: Logger) {}
  
  handleError(error: Error): void {
    if (error instanceof ApplicationError) {
      this.handleApplicationError(error);
    } else {
      this.handleUnknownError(error);
    }
  }
  
  private handleApplicationError(error: ApplicationError): void {
    switch (error.code) {
      case 'VALIDATION_ERROR':
        this.logger.warn(`Validation error: ${error.message}`, {
          details: error.details
        });
        break;
      case 'NOT_FOUND':
        this.logger.info(`Resource not found: ${error.message}`);
        break;
      case 'UNAUTHORIZED':
      case 'FORBIDDEN':
        this.logger.warn(`Access denied: ${error.message}`);
        break;
      case 'TASK_EXECUTION_ERROR':
        this.logger.error(`Task execution failed: ${error.message}`, {
          cause: error.cause,
          stack: error.stack
        });
        break;
      default:
        this.logger.error(`Application error: ${error.message}`, {
          code: error.code,
          details: error.details,
          stack: error.stack
        });
    }
  }
  
  private handleUnknownError(error: Error): void {
    this.logger.error(`Unhandled error: ${error.message}`, {
      name: error.name,
      stack: error.stack
    });
  }
}
```

## Evaluation Criteria
Your solution will be evaluated based on:
1. Proper TypeScript typing and advanced patterns
2. Error handling and resilience
3. Code organization and maintainability
4. Performance optimization techniques
5. Extensibility and plugin architecture

## Bonus Challenges
1. Add comprehensive unit and integration tests
2. Implement a CLI for managing tasks and plugins
3. Add telemetry and performance monitoring
4. Implement a web interface for task management
5. Add distributed task execution with proper coordination
