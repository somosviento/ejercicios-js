# Fullstack Exercise 3: Serverless Data Processing Pipeline with TypeScript

## Overview
Build a serverless data processing pipeline using TypeScript for both backend (AWS Lambda, API Gateway) and a simple frontend dashboard (React/Vue) to monitor the pipeline. The system will ingest data, process it through multiple stages, and store the results, with a focus on type safety, scalability, and cost-efficiency.

## Learning Objectives
- Implement serverless functions (e.g., AWS Lambda) with TypeScript.
- Design and deploy a multi-stage data processing pipeline.
- Utilize cloud storage (e.g., S3) and databases (e.g., DynamoDB) effectively.
- Create type-safe interactions between serverless components.
- Build a monitoring dashboard for the pipeline.

## Requirements

### 1. Backend (Serverless Architecture)
- **Data Ingestion:** An API endpoint (API Gateway + Lambda) to receive data.
- **Processing Stages:** Multiple Lambda functions, each performing a specific transformation or validation step on the data. Use SQS or SNS for decoupling stages.
- **Data Storage:** Store raw and processed data in S3 and/or DynamoDB.
- **Error Handling & Logging:** Robust error handling and CloudWatch logging for each Lambda.
- **Type Safety:** TypeScript throughout all Lambda functions and shared data structures.

### 2. Frontend (Monitoring Dashboard)
- A simple React or Vue application.
- Display pipeline status (e.g., number of items processed, errors, stage progress).
- Allow triggering of data ingestion (e.g., via a form or file upload).
- Fetch and display processed data samples.

### 3. Shared Code
- TypeScript interfaces/types for data payloads between Lambda functions and for API contracts.
- Utility functions for common tasks (e.g., S3/DynamoDB interactions, validation).

## Simplified Project Structure
```
/
├── services/                   # Backend Lambda functions
│   ├── ingest-data/
│   │   ├── index.ts
│   │   └── tsconfig.json
│   ├── process-stage-1/
│   │   ├── index.ts
│   │   └── tsconfig.json
│   ├── process-stage-2/
│   │   ├── index.ts
│   │   └── tsconfig.json
│   └── store-results/
│       ├── index.ts
│       └── tsconfig.json
├── client/                     # Frontend Monitoring Dashboard
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   └── services/           # API client for backend
│   ├── package.json
│   └── tsconfig.json
└── shared/                     # Shared types and utilities
    ├── types/
    │   └── data-pipeline.types.ts
    └── utils/
        └── aws-helpers.ts
├── serverless.yml              # Serverless Framework configuration (or similar)
└── package.json                # Root package.json for scripts, shared deps
```

## Key Features to Implement

1.  **Data Ingestion Endpoint:** Securely receive data (e.g., JSON payloads).
2.  **Multi-Stage Processing:** At least two distinct processing stages (e.g., validation, transformation, enrichment).
3.  **Data Persistence:** Store data in S3 (for raw/large files) and DynamoDB (for structured/indexed data).
4.  **Monitoring Dashboard:** Basic UI to show pipeline metrics and trigger ingestion.
5.  **Type-Safe Communication:** Ensure all data flowing through the pipeline and API is strongly typed.

## Evaluation Criteria
- Correct implementation of serverless patterns.
- Robustness and type safety of TypeScript code.
- Scalability and cost-efficiency considerations.
- Clarity of code and project structure.
- Functionality of the monitoring dashboard.

## Bonus Challenges
- Implement automated testing for Lambda functions.
- Add authentication/authorization to the ingestion endpoint and dashboard.
- Use Infrastructure as Code (e.g., AWS CDK with TypeScript) for deployment.
- Implement dead-letter queues (DLQs) for failed messages.
