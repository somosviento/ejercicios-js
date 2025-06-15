# Frontend Exercise 2: Advanced Component Patterns with TypeScript

## Overview
In this exercise, you'll implement advanced React component patterns using TypeScript. You'll build a comprehensive UI component library with sophisticated TypeScript types, focusing on component composition, reusability, and type safety.

## Learning Objectives
- Master advanced TypeScript generics with React components
- Implement complex component composition patterns
- Create flexible yet type-safe component APIs
- Design components with proper accessibility support
- Build a scalable component architecture

## Requirements

### 1. Component Library Foundation
Create a set of base components with advanced TypeScript typing:
- Implement proper polymorphic components (`as` prop pattern)
- Use discriminated unions for component variants
- Create compound components with proper TypeScript context typing
- Implement render props with generic type parameters
- Design proper prop types with required/optional patterns

### 2. Advanced Form Components
Build a set of form components with advanced validation and TypeScript integration:
- Create a type-safe form system that infers field types from a schema
- Implement form validation with proper TypeScript error typing
- Build controlled inputs with proper generic types
- Create a field array implementation with proper TypeScript support
- Implement form state tracking with TypeScript discriminated unions

### 3. Data Display Components
Create components for displaying and manipulating data:
- Build a generic Table component with type-safe column definitions
- Implement a DataGrid with sorting, filtering, and pagination
- Create a tree component with recursive TypeScript types
- Build visualization components with proper TypeScript typing

### 4. Advanced Composition Patterns
Implement the following patterns with proper TypeScript support:
- Higher-Order Components with proper type inference
- Custom hooks that preserve type information
- Render props with generic type parameters
- Component injection patterns with TypeScript
- Compound components with shared state

## Project Structure
```
/src
  /components
    /core
      Button.tsx
      Typography.tsx
      Box.tsx
      Flex.tsx
      Grid.tsx
    /form
      Form.tsx
      Input.tsx
      Select.tsx
      Checkbox.tsx
      RadioGroup.tsx
      FieldArray.tsx
      FormContext.tsx
    /data
      Table.tsx
      DataGrid.tsx
      Tree.tsx
      List.tsx
      Card.tsx
    /patterns
      Polymorphic.tsx
      Compound.tsx
      RenderProps.tsx
      HOC.tsx
  /hooks
    useForm.ts
    useTable.ts
    useAsync.ts
  /types
    component.types.ts
    form.types.ts
    utility.types.ts
  /utils
    type-helpers.ts
```

## Implementation Tasks

### Task 1: Polymorphic Components
Create a polymorphic component system that allows components to change their rendered element while maintaining proper TypeScript types:

```tsx
// Should work with proper TypeScript support
<Box as="button" onClick={() => {}}>Click me</Box>
<Box as="a" href="/home">Home</Box>
<Typography as="h1" variant="heading">Title</Typography>
```

### Task 2: Type-Safe Form System
Implement a form system that infers types from a schema:

```tsx
const schema = {
  name: { type: 'string' as const, required: true },
  age: { type: 'number' as const },
  email: { type: 'string' as const, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
};

// Form should have proper TypeScript inference
const { values, errors, handleChange } = useForm({ schema });
// values.name should be string | undefined
// values.age should be number | undefined
```

### Task 3: Compound Components
Create a compound component pattern with proper TypeScript support:

```tsx
<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
  <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
</Tabs>
```

### Task 4: Generic Data Components
Build a generic Table component with type-safe column definitions:

```tsx
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Columns should be type-checked against User
const columns: TableColumn<User>[] = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' }
];

<Table data={users} columns={columns} />
```

## Evaluation Criteria
Your solution will be evaluated based on:
1. TypeScript type safety and proper generic usage
2. Component API design and usability
3. Code organization and reusability
4. Accessibility implementation
5. Performance considerations

## Bonus Challenges
1. Add comprehensive unit tests for components
2. Implement a theme system with TypeScript type checking
3. Create a Storybook documentation with TypeScript examples
4. Add animation support with proper TypeScript types
