# Backend Exercise 2: Event-Driven Microservices with TypeScript and NestJS

## Overview
In this exercise, you'll build an event-driven microservices architecture using TypeScript, NestJS, and message brokers. You'll implement a scalable order processing system with multiple microservices that communicate through events, focusing on type safety, resilience, and proper domain modeling.

## Learning Objectives
- Design and implement event-driven microservices with TypeScript
- Create type-safe event schemas and contracts between services
- Implement proper error handling and resilience patterns
- Build scalable message processing with proper TypeScript typing
- Apply CQRS and Event Sourcing patterns with TypeScript

## Requirements

### 1. Microservices Architecture
Implement the following microservices:
- Order Service: Handles order creation and management
- Inventory Service: Manages product inventory
- Payment Service: Processes payments
- Notification Service: Sends notifications to users
- Delivery Service: Manages order delivery

### 2. Event-Driven Communication
Implement the following event-driven patterns:
- Event publishing with proper TypeScript types
- Event subscription and handling
- Event versioning and schema evolution
- Dead letter queues for failed events
- Event replay capabilities

### 3. Advanced TypeScript Patterns
Apply the following TypeScript patterns:
- Generic event handlers with TypeScript
- Type-safe event schemas using interfaces or classes
- Proper error handling with TypeScript discriminated unions
- Type-safe message serialization/deserialization
- Advanced dependency injection with proper typing

### 4. Resilience and Monitoring
Implement the following resilience patterns:
- Circuit breaker pattern with TypeScript
- Retry mechanisms with exponential backoff
- Health checks and readiness probes
- Distributed tracing with proper TypeScript instrumentation
- Metrics collection and monitoring

## Project Structure
```
/src
  /services
    /order-service
      /src
        /application
          order.service.ts
          order.controller.ts
          order.module.ts
        /domain
          order.entity.ts
          order.events.ts
          order.repository.ts
        /infrastructure
          database.module.ts
          event-bus.module.ts
        main.ts
    /inventory-service
      /src
        /application
          inventory.service.ts
          inventory.controller.ts
          inventory.module.ts
        /domain
          inventory.entity.ts
          inventory.events.ts
          inventory.repository.ts
        /infrastructure
          database.module.ts
          event-bus.module.ts
        main.ts
    /payment-service
      /src
        /application
          payment.service.ts
          payment.controller.ts
          payment.module.ts
        /domain
          payment.entity.ts
          payment.events.ts
          payment.repository.ts
        /infrastructure
          database.module.ts
          event-bus.module.ts
        main.ts
    /notification-service
      /src
        /application
          notification.service.ts
          notification.controller.ts
          notification.module.ts
        /domain
          notification.entity.ts
          notification.events.ts
        /infrastructure
          event-bus.module.ts
        main.ts
    /delivery-service
      /src
        /application
          delivery.service.ts
          delivery.controller.ts
          delivery.module.ts
        /domain
          delivery.entity.ts
          delivery.events.ts
          delivery.repository.ts
        /infrastructure
          database.module.ts
          event-bus.module.ts
        main.ts
  /shared
    /events
      order-events.ts
      inventory-events.ts
      payment-events.ts
      delivery-events.ts
    /types
      common.types.ts
    /utils
      event-bus.ts
      logger.ts
      error-handling.ts
  docker-compose.yml
  package.json
  tsconfig.json
```

## Implementation Tasks

### Task 1: Define Type-Safe Event Schemas
Create type-safe event schemas for communication between services:

```typescript
// shared/events/order-events.ts
import { Event } from '../utils/event-bus';

export interface OrderCreatedEventData {
  orderId: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  createdAt: Date;
}

export class OrderCreatedEvent implements Event<OrderCreatedEventData> {
  readonly type = 'order.created';
  readonly version = 1;
  
  constructor(public readonly data: OrderCreatedEventData) {}
}

export interface OrderCancelledEventData {
  orderId: string;
  reason: string;
  cancelledAt: Date;
}

export class OrderCancelledEvent implements Event<OrderCancelledEventData> {
  readonly type = 'order.cancelled';
  readonly version = 1;
  
  constructor(public readonly data: OrderCancelledEventData) {}
}

// Add more order events...
```

### Task 2: Implement Event Bus with TypeScript
Create a type-safe event bus for publishing and subscribing to events:

```typescript
// shared/utils/event-bus.ts
export interface Event<T = any> {
  readonly type: string;
  readonly version: number;
  readonly data: T;
}

export type EventHandler<T = any> = (event: Event<T>) => Promise<void>;

export interface EventBus {
  publish<T>(event: Event<T>): Promise<void>;
  subscribe<T>(eventType: string, handler: EventHandler<T>): void;
  unsubscribe(eventType: string, handler: EventHandler): void;
}

export class RabbitMQEventBus implements EventBus {
  private connection: any; // Replace with actual RabbitMQ client type
  private channel: any;
  private handlers: Map<string, EventHandler[]> = new Map();
  
  constructor(private readonly connectionString: string) {}
  
  async initialize(): Promise<void> {
    // Initialize RabbitMQ connection and channel
    // Set up exchanges and queues
  }
  
  async publish<T>(event: Event<T>): Promise<void> {
    // Publish event to RabbitMQ
    const buffer = Buffer.from(JSON.stringify(event));
    this.channel.publish('events', event.type, buffer, {
      contentType: 'application/json',
      headers: {
        'event-type': event.type,
        'event-version': event.version.toString()
      }
    });
  }
  
  subscribe<T>(eventType: string, handler: EventHandler<T>): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
      
      // Set up RabbitMQ consumer for this event type
      this.channel.consume(
        `${eventType}-queue`,
        async (msg: any) => {
          try {
            const event = JSON.parse(msg.content.toString()) as Event<T>;
            const handlers = this.handlers.get(eventType) || [];
            
            await Promise.all(handlers.map(handler => handler(event)));
            
            this.channel.ack(msg);
          } catch (error) {
            // Handle error and potentially nack the message
            this.channel.nack(msg);
          }
        }
      );
    }
    
    this.handlers.get(eventType)!.push(handler);
  }
  
  unsubscribe(eventType: string, handler: EventHandler): void {
    if (!this.handlers.has(eventType)) {
      return;
    }
    
    const handlers = this.handlers.get(eventType)!;
    this.handlers.set(
      eventType,
      handlers.filter(h => h !== handler)
    );
  }
}
```

### Task 3: Implement Order Service with Event Publishing
Create an order service that publishes events when orders are created:

```typescript
// order-service/src/application/order.service.ts
import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../domain/order.repository';
import { Order } from '../domain/order.entity';
import { EventBus, OrderCreatedEvent } from '@shared/events';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly eventBus: EventBus
  ) {}
  
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    // Create order entity
    const order = Order.create({
      userId: createOrderDto.userId,
      items: createOrderDto.items,
      shippingAddress: createOrderDto.shippingAddress
    });
    
    // Save order to database
    await this.orderRepository.save(order);
    
    // Publish order created event
    await this.eventBus.publish(
      new OrderCreatedEvent({
        orderId: order.id,
        userId: order.userId,
        items: order.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: order.totalAmount,
        shippingAddress: order.shippingAddress,
        createdAt: order.createdAt
      })
    );
    
    return order;
  }
  
  // Other order methods...
}
```

### Task 4: Implement Inventory Service with Event Handling
Create an inventory service that handles order events:

```typescript
// inventory-service/src/application/inventory.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InventoryRepository } from '../domain/inventory.repository';
import { EventBus, OrderCreatedEvent, OrderCancelledEvent } from '@shared/events';
import { Logger } from '@shared/utils/logger';

@Injectable()
export class InventoryService implements OnModuleInit {
  private readonly logger = new Logger(InventoryService.name);
  
  constructor(
    private readonly inventoryRepository: InventoryRepository,
    private readonly eventBus: EventBus
  ) {}
  
  onModuleInit() {
    // Subscribe to order events
    this.eventBus.subscribe<OrderCreatedEvent['data']>(
      'order.created',
      this.handleOrderCreated.bind(this)
    );
    
    this.eventBus.subscribe<OrderCancelledEvent['data']>(
      'order.cancelled',
      this.handleOrderCancelled.bind(this)
    );
  }
  
  async handleOrderCreated(event: OrderCreatedEvent): Promise<void> {
    this.logger.log(`Processing order created event: ${event.data.orderId}`);
    
    try {
      // Reserve inventory for each item in the order
      for (const item of event.data.items) {
        await this.inventoryRepository.reserveStock(
          item.productId,
          item.quantity
        );
      }
      
      // Publish inventory reserved event
      // ...
    } catch (error) {
      this.logger.error(
        `Failed to reserve inventory for order ${event.data.orderId}`,
        error
      );
      
      // Handle failure (e.g., publish compensation event)
      // ...
    }
  }
  
  async handleOrderCancelled(event: OrderCancelledEvent): Promise<void> {
    this.logger.log(`Processing order cancelled event: ${event.data.orderId}`);
    
    // Release reserved inventory
    // ...
  }
  
  // Other inventory methods...
}
```

## Evaluation Criteria
Your solution will be evaluated based on:
1. Proper implementation of event-driven architecture
2. TypeScript type safety for events and messages
3. Error handling and resilience patterns
4. Code organization and maintainability
5. Proper domain modeling and service boundaries

## Bonus Challenges
1. Implement saga pattern for distributed transactions
2. Add event versioning and schema evolution
3. Implement event sourcing for order history
4. Add comprehensive monitoring and tracing
5. Implement API gateway for service aggregation
