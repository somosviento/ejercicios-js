# Backend Exercise 1: Advanced API Design with Express, TypeScript and Domain-Driven Design

## Overview
In this exercise, you'll build a sophisticated RESTful API using Express, TypeScript, and Domain-Driven Design principles. You'll implement a complete e-commerce product management system with advanced TypeScript patterns, proper error handling, validation, and authentication.

## Learning Objectives
- Apply Domain-Driven Design principles with TypeScript
- Implement advanced TypeScript patterns for API development
- Create a robust error handling system
- Design type-safe validation middleware
- Implement proper authentication and authorization
- Build a scalable and maintainable API architecture

## Requirements

### 1. Domain-Driven Design Architecture
Implement a product management API with the following DDD layers:
- Domain Layer: Entities, Value Objects, Domain Events, Domain Services
- Application Layer: Use Cases/Application Services, DTOs
- Infrastructure Layer: Repositories, External Services
- Interface Layer: Controllers, Middleware, Routes

### 2. API Features
Implement the following features:
- Product CRUD operations
- Product categorization and tagging
- Product search and filtering
- Product inventory management
- Product pricing and discounts
- Product reviews and ratings

### 3. Advanced TypeScript Patterns
Apply the following TypeScript patterns:
- Generic Repository pattern with TypeScript
- Dependency injection with proper typing
- Type-safe event system
- Advanced error handling with discriminated unions
- Proper DTO transformations with TypeScript
- Type-safe validation

### 4. Security and Performance
Implement the following:
- JWT authentication with proper TypeScript types
- Role-based access control
- Rate limiting with TypeScript
- Request validation with Zod or similar
- API versioning
- Proper error handling and logging

## Project Structure
```
/src
  /domain
    /product
      product.entity.ts
      product.value-objects.ts
      product.events.ts
      product.repository.interface.ts
      product.service.ts
    /category
      category.entity.ts
      category.repository.interface.ts
    /review
      review.entity.ts
      review.repository.interface.ts
  /application
    /product
      product.use-cases.ts
      product.dto.ts
    /category
      category.use-cases.ts
      category.dto.ts
    /review
      review.use-cases.ts
      review.dto.ts
  /infrastructure
    /repositories
      product.repository.ts
      category.repository.ts
      review.repository.ts
    /database
      database.ts
      migrations.ts
    /services
      image-storage.service.ts
      search.service.ts
  /interface
    /api
      /v1
        /product
          product.controller.ts
          product.routes.ts
          product.validation.ts
        /category
          category.controller.ts
          category.routes.ts
        /review
          review.controller.ts
          review.routes.ts
    /middleware
      auth.middleware.ts
      validation.middleware.ts
      error-handler.middleware.ts
      rate-limiter.middleware.ts
  /utils
    error.utils.ts
    validation.utils.ts
    logger.ts
  /types
    common.types.ts
    error.types.ts
  app.ts
  server.ts
```

## Implementation Tasks

### Task 1: Domain Layer
Implement the product entity with proper TypeScript typing:

```typescript
// product.entity.ts
import { Entity, UniqueEntityID } from '../core/entity';
import { ProductName, ProductDescription, ProductPrice } from './product.value-objects';
import { ProductCreatedEvent } from './product.events';

export class Product extends Entity<ProductProps> {
  private constructor(props: ProductProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get name(): ProductName {
    return this.props.name;
  }

  get description(): ProductDescription {
    return this.props.description;
  }

  get price(): ProductPrice {
    return this.props.price;
  }

  get isAvailable(): boolean {
    return this.props.stockQuantity > 0;
  }

  public updateStock(quantity: number): Result<void> {
    if (quantity < 0 && Math.abs(quantity) > this.props.stockQuantity) {
      return Result.fail<void>('Insufficient stock');
    }

    this.props.stockQuantity += quantity;
    return Result.ok<void>();
  }

  public static create(props: ProductProps, id?: UniqueEntityID): Result<Product> {
    // Validation logic here
    const product = new Product(props, id);
    
    // Add domain event
    product.addDomainEvent(new ProductCreatedEvent(product));
    
    return Result.ok<Product>(product);
  }
}
```

### Task 2: Application Layer
Implement a product use case with proper error handling:

```typescript
// product.use-cases.ts
export class CreateProductUseCase implements UseCase<CreateProductDTO, Result<ProductDTO>> {
  private productRepository: IProductRepository;
  private categoryRepository: ICategoryRepository;

  constructor(
    productRepository: IProductRepository,
    categoryRepository: ICategoryRepository
  ) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
  }

  async execute(request: CreateProductDTO): Promise<Result<ProductDTO>> {
    try {
      const nameOrError = ProductName.create(request.name);
      const descriptionOrError = ProductDescription.create(request.description);
      const priceOrError = ProductPrice.create(request.price);

      const dtoResult = Result.combine([
        nameOrError,
        descriptionOrError,
        priceOrError
      ]);

      if (dtoResult.isFailure) {
        return Result.fail<ProductDTO>(dtoResult.error);
      }

      // Check if category exists
      const categoryExists = await this.categoryRepository.exists(request.categoryId);
      if (!categoryExists) {
        return Result.fail<ProductDTO>('Category not found');
      }

      const productOrError = Product.create({
        name: nameOrError.getValue(),
        description: descriptionOrError.getValue(),
        price: priceOrError.getValue(),
        categoryId: request.categoryId,
        stockQuantity: request.stockQuantity,
        images: request.images
      });

      if (productOrError.isFailure) {
        return Result.fail<ProductDTO>(productOrError.error);
      }

      const product = productOrError.getValue();
      await this.productRepository.save(product);

      return Result.ok<ProductDTO>(ProductMap.toDTO(product));
    } catch (error) {
      return Result.fail<ProductDTO>(error.message);
    }
  }
}
```

### Task 3: Interface Layer
Implement a controller with proper TypeScript typing:

```typescript
// product.controller.ts
export class ProductController {
  private createProductUseCase: CreateProductUseCase;
  private getProductUseCase: GetProductUseCase;
  // Other use cases...

  constructor(
    createProductUseCase: CreateProductUseCase,
    getProductUseCase: GetProductUseCase,
    // Other use cases...
  ) {
    this.createProductUseCase = createProductUseCase;
    this.getProductUseCase = getProductUseCase;
    // Other use cases...
  }

  async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto: CreateProductDTO = req.body;
      const result = await this.createProductUseCase.execute(dto);

      if (result.isFailure) {
        return next(new AppError(400, result.error));
      }

      res.status(201).json({
        status: 'success',
        data: result.getValue()
      });
    } catch (error) {
      next(error);
    }
  }

  async getProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.getProductUseCase.execute({ id });

      if (result.isFailure) {
        return next(new AppError(404, result.error));
      }

      res.status(200).json({
        status: 'success',
        data: result.getValue()
      });
    } catch (error) {
      next(error);
    }
  }

  // Other controller methods...
}
```

### Task 4: Validation Middleware
Implement a type-safe validation middleware:

```typescript
// validation.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { AppError } from '../utils/error.utils';

export const validate = (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message
        }));
        
        next(new AppError(400, 'Validation error', formattedErrors));
      } else {
        next(error);
      }
    }
  };
```

## Evaluation Criteria
Your solution will be evaluated based on:
1. Proper application of Domain-Driven Design principles
2. TypeScript type safety and advanced patterns
3. API design and RESTful principles
4. Error handling and validation
5. Code organization and maintainability
6. Security implementation

## Bonus Challenges
1. Add comprehensive unit and integration tests
2. Implement GraphQL alongside REST
3. Add real-time features with WebSockets
4. Implement CQRS pattern with TypeScript
5. Add event sourcing for product changes
