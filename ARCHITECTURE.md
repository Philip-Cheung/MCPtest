# Architecture Documentation

## Overview

This codebase has been systematically refactored to improve maintainability, testability, and code organization. The architecture follows React best practices with a focus on component composition, custom hooks for state logic, and comprehensive test coverage.

## Directory Structure

```
src/
├── __tests__/               # Test files organized by type
│   ├── smoke/              # Smoke tests for critical paths
│   └── integration/        # Integration tests for user flows
├── components/             # React components
│   ├── BuildingsTable/    # Modular table component
│   │   ├── index.jsx
│   │   ├── BuildingsTableControls.jsx
│   │   ├── BuildingsTableHeader.jsx
│   │   ├── BuildingRow.jsx
│   │   ├── BuildingMetricsTable.jsx
│   │   └── BuildingsTablePagination.jsx
│   ├── DateRangeSelector/ # Modular date selector
│   │   ├── index.jsx
│   │   ├── DateRangePresets.jsx
│   │   └── CustomDateRangePicker.jsx
│   ├── navigation/        # Navigation components
│   │   ├── app-sidebar.jsx
│   │   ├── nav-main.jsx
│   │   ├── NavMainStandard.jsx
│   │   ├── NavMainCollapsed.jsx
│   │   └── NavMainExpanded.jsx
│   ├── layout/            # Layout components
│   ├── shared/            # Shared/reusable components
│   │   └── IndicatorDot.jsx
│   └── ui/                # shadcn/ui components
├── config/                # Configuration files
│   ├── constants.js       # Application constants
│   └── routes.js          # Route definitions
├── data/                  # Data/fixtures
├── hooks/                 # Custom React hooks
│   ├── usePagination.js
│   ├── useFilters.js
│   ├── useExpandable.js
│   ├── useDateRange.js
│   ├── useNavigation.js
│   └── useTheme.js
├── pages/                 # Page components
├── utils/                 # Utility functions
│   ├── tableHelpers.js
│   ├── dateRangeUtils.js
│   └── cn.js
└── App.js                 # Main application component
```

## Architectural Principles

### 1. Component Composition

Complex components have been broken down into smaller, focused subcomponents:

- **BuildingsTable**: 316 lines → 7 focused components (~30-80 lines each)
- **DateRangeSelector**: 125 lines → 3 focused components
- **Navigation**: 140 lines → 4 variant components

**Benefits:**
- Easier to test individual components
- Better code reusability
- Clearer responsibilities
- Improved readability

### 2. Custom Hooks for State Logic

Business logic has been extracted from components into reusable hooks:

- `usePagination`: Manages pagination state and logic
- `useFilters`: Handles filter state management
- `useExpandable`: Controls expandable row state
- `useDateRange`: Manages date range selection
- `useNavigation`: Navigation state and active route detection

**Benefits:**
- Logic can be tested independently
- State management is reusable across components
- Components focus on presentation
- Easier to reason about data flow

### 3. Separation of Concerns

**Configuration** (`src/config/`):
- Constants and magic numbers extracted
- Route definitions centralized
- Easy to modify application-wide settings

**Utilities** (`src/utils/`):
- Pure functions for business logic
- 100% test coverage
- Independent of React/components

**Components**:
- Focused on presentation and user interaction
- Delegate complex logic to hooks and utilities

### 4. Testing Strategy

**Test Pyramid:**
1. **Unit Tests** (Base): Utilities, hooks, individual components
2. **Integration Tests** (Middle): Component interactions
3. **Smoke Tests** (Top): Critical user paths

**Coverage Goals:**
- Utilities: 100%
- Hooks: 90%+
- Components: 70%+
- Overall: 70%+

## Component Patterns

### 1. Orchestrator Pattern

Complex components follow the orchestrator pattern:

```javascript
// Main component orchestrates subcomponents
export function BuildingsTable() {
  // Use hooks for state
  const { filters, updateFilter } = useFilters();
  const { paginatedData, ...pagination } = usePagination(data);
  
  return (
    <div>
      <BuildingsTableControls {...controlProps} />
      <BuildingsTableContent {...contentProps} />
      <BuildingsTablePagination {...pagination} />
    </div>
  );
}
```

### 2. Variant Pattern

Components with multiple rendering modes use variants:

```javascript
// Main component routes to appropriate variant
export function NavMain({ collapsible, sectionIcon }) {
  const { state } = useSidebar();
  
  if (!collapsible) return <NavMainStandard />;
  if (state === 'collapsed') return <NavMainCollapsed />;
  return <NavMainExpanded />;
}
```

### 3. Shared Components

Reusable UI elements are extracted to `shared/`:

- `IndicatorDot`: Colored percentage indicators
- Future: Add more shared components as patterns emerge

## State Management

### Local State
React `useState` for UI-only state (modals, dropdowns, etc.)

### Custom Hooks
Encapsulated state logic for reusable patterns:
- Pagination
- Filtering
- Expandable sections
- Date ranges

### Context
- Theme context for dark/light mode
- Sidebar context for collapsed/expanded state

## Testing Architecture

### Unit Tests
- **Location**: Co-located with source files (`*.test.js`)
- **Purpose**: Test individual functions/components in isolation
- **Example**: `tableHelpers.test.js`, `usePagination.test.js`

### Integration Tests
- **Location**: `src/__tests__/integration/`
- **Purpose**: Test component interactions and user flows
- **Example**: `BuildingsFlow.test.jsx`

### Smoke Tests
- **Location**: `src/__tests__/smoke/`
- **Purpose**: Verify critical paths don't break
- **Example**: `BuildingsTable.smoke.test.jsx`

## Build & Deployment

### Development
```bash
npm start        # Start development server
npm test         # Run tests in watch mode
npm run build    # Create production build
```

### CI/CD Considerations
- All tests must pass before deployment
- Lint errors block builds
- Coverage reports generated automatically

## Performance Considerations

### Memoization
- `useMemo` for expensive calculations (filtering, sorting)
- `useCallback` for event handlers passed to child components

### Code Splitting
- Route-based code splitting via React.lazy() (future enhancement)
- Component lazy loading for large tables (future enhancement)

### Optimization Opportunities
1. Virtualization for large tables (react-window)
2. Debounced search input
3. Optimistic UI updates
4. Service worker for offline support

## Future Enhancements

### Type Safety
Consider migrating to TypeScript for:
- Better IDE support
- Compile-time error detection
- Self-documenting code
- Easier refactoring

### State Management
If complexity grows, consider:
- Redux/Redux Toolkit for global state
- React Query for server state
- Zustand for lighter alternative

### Component Library
- Extract UI components to separate package
- Create Storybook for component documentation
- Publish to npm for reuse across projects

## Migration Guide

### Before Refactor
- Monolithic components (300+ lines)
- Inline state management
- No test coverage
- Hard-coded values
- Difficult to modify

### After Refactor
- Modular components (<100 lines)
- Reusable custom hooks
- 70%+ test coverage
- Centralized configuration
- Easy to extend and maintain

### Breaking Changes
**None.** All refactoring maintains backward compatibility. External API of components remains unchanged.

## Contributing Guidelines

### Adding New Features
1. Create feature branch
2. Write tests first (TDD)
3. Implement feature
4. Ensure tests pass
5. Update documentation
6. Submit PR

### Modifying Existing Code
1. Maintain backward compatibility
2. Update existing tests
3. Add new tests for new behavior
4. Run full test suite
5. Update documentation

### Code Standards
- Components: PascalCase, < 100 lines
- Hooks: camelCase, start with "use"
- Utilities: camelCase, pure functions
- Tests: Co-located, comprehensive coverage
- Comments: JSDoc for public APIs

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review and update tests
- Refactor components exceeding 100 lines
- Monitor test coverage
- Update documentation

### Health Metrics
- Test coverage > 70%
- All components < 100 lines
- No circular dependencies
- Linter warnings = 0
- Build time < 30 seconds

## Resources

- [React Documentation](https://react.dev)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/)

---

**Last Updated:** November 2025
**Architecture Version:** 2.0
**Maintained By:** Development Team

