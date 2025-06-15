# Frontend Exercise 3: Advanced React Performance Optimization with TypeScript

## Overview
In this exercise, you'll build a high-performance dashboard application with React and TypeScript. You'll focus on advanced performance optimization techniques, proper TypeScript patterns for performance, and tools for measuring and improving React application performance.

## Learning Objectives
- Master advanced React performance optimization techniques with TypeScript
- Implement proper code-splitting and lazy loading with type safety
- Create virtualized lists and tables with TypeScript
- Design efficient state management for large datasets
- Implement proper memoization patterns with TypeScript

## Requirements

### 1. Dashboard Application
Build a dashboard application with the following features:
- Multiple data visualization components (charts, tables, metrics)
- Real-time data updates
- Filterable and sortable data tables
- Interactive charts with TypeScript type definitions
- Responsive layout with proper TypeScript support

### 2. Performance Optimization Techniques
Implement the following performance optimization techniques:
- Code splitting with React.lazy() and proper TypeScript support
- Virtualized lists and tables for large datasets
- Windowing techniques for rendering large lists
- Proper memoization with useCallback, useMemo, and React.memo
- Implement shouldComponentUpdate with TypeScript for class components
- Optimize context usage to prevent unnecessary re-renders

### 3. State Management Optimization
Implement efficient state management with:
- Normalized state structure with TypeScript types
- Selective re-rendering with context selectors
- Immutable data patterns with TypeScript
- Batched updates for multiple state changes
- Optimistic UI updates with proper TypeScript types

### 4. Performance Measurement and Monitoring
Add tools and techniques for measuring performance:
- Custom performance hooks with TypeScript
- Integration with React DevTools Profiler
- Performance metrics tracking
- Implement a custom performance monitoring system

## Project Structure
```
/src
  /components
    /dashboard
      Dashboard.tsx
      DashboardMetrics.tsx
      DashboardCharts.tsx
    /data-display
      VirtualizedTable.tsx
      VirtualizedList.tsx
      LazyChart.tsx
    /layout
      DashboardLayout.tsx
      Sidebar.tsx
      TopBar.tsx
  /hooks
    useVirtualization.ts
    useDeferredValue.ts
    usePerformanceMetrics.ts
    useMemoizedSelector.ts
  /context
    DashboardContext.tsx
    PerformanceContext.tsx
  /utils
    memoization.ts
    normalization.ts
    performance.ts
  /types
    dashboard.types.ts
    performance.types.ts
  /services
    dataService.ts
    metricsService.ts
```

## Implementation Tasks

### Task 1: Virtualized Data Table
Implement a virtualized data table component that efficiently renders large datasets:

```tsx
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: Date;
  status: 'active' | 'inactive';
}

// Should handle 10,000+ rows efficiently
<VirtualizedTable<User>
  data={users}
  columns={columns}
  rowHeight={40}
  visibleRows={20}
  onRowClick={(user) => console.log(user.id)}
/>
```

### Task 2: Code Splitting with TypeScript
Implement code splitting for dashboard components with proper TypeScript support:

```tsx
// Should have proper TypeScript support
const DashboardCharts = React.lazy(() => import('./DashboardCharts'));

function Dashboard() {
  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      <DashboardCharts data={chartData} />
    </React.Suspense>
  );
}
```

### Task 3: Performance Hooks
Create custom hooks for performance optimization:

```tsx
// Should provide proper TypeScript types
const { value, isPending } = useDeferredValue(expensiveValue);

// Should track render counts with proper typing
const renderCount = useRenderCount();

// Should memoize selectors with proper typing
const selectedData = useMemoizedSelector(state => 
  selectFilteredData(state, filters)
);
```

### Task 4: Performance Monitoring
Implement a performance monitoring system:

```tsx
// Should track component render performance
<PerformanceMonitor componentName="DataTable">
  <DataTable data={largeDataset} />
</PerformanceMonitor>

// Hook should provide performance metrics with proper types
const metrics = usePerformanceMetrics();
console.log(`Render time: ${metrics.renderTime}ms`);
```

## Evaluation Criteria
Your solution will be evaluated based on:
1. Measurable performance improvements
2. Proper TypeScript usage for performance patterns
3. Code organization and maintainability
4. Implementation of virtualization and memoization
5. Proper performance measurement tools

## Bonus Challenges
1. Implement worker threads for CPU-intensive operations
2. Add server-side rendering with proper TypeScript support
3. Implement progressive loading techniques
4. Create a custom performance visualization tool
