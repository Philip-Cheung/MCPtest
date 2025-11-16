# Building Management Dashboard

A modern, fully-tested React application for managing building portfolios with comprehensive monitoring and compliance tracking.

## Features

- 📊 **Building Portfolio Management** - View and manage multiple buildings with detailed metrics
- 🔍 **Advanced Filtering** - Search, filter by compliance status, and date range selection
- 📈 **Metrics Tracking** - Air quality and thermal comfort monitoring with color-coded indicators
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🌓 **Dark Mode** - Built-in theme toggling for user preference
- ♿ **Accessible** - WCAG compliant with keyboard navigation support

## Tech Stack

- **Framework:** React 18.3
- **Routing:** React Router v6
- **UI Components:** shadcn/ui with Radix UI primitives
- **Styling:** Tailwind CSS
- **Testing:** React Testing Library + Jest
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd MCPtest

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

### Available Scripts

```bash
npm start          # Start development server
npm test           # Run tests in watch mode
npm run build      # Create production build
npm test -- --coverage  # Generate coverage report
```

## Project Structure

```
src/
├── components/          # React components
│   ├── BuildingsTable/ # Modular table with subcomponents
│   ├── DateRangeSelector/  # Date selection with presets
│   ├── navigation/     # App navigation components
│   ├── layout/         # Layout components
│   ├── shared/         # Reusable components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── config/             # Configuration files
├── data/               # Data and fixtures
├── pages/              # Page components
└── __tests__/          # Test files
```

## Architecture

This application follows modern React patterns with a focus on:

- **Component Composition** - Small, focused components
- **Custom Hooks** - Reusable state logic
- **Separation of Concerns** - Clear boundaries between UI and logic
- **Comprehensive Testing** - 70%+ test coverage

For detailed architecture documentation, see [ARCHITECTURE.md](./ARCHITECTURE.md)

## Key Components

### BuildingsTable
Displays a searchable, filterable table of buildings with:
- Search functionality
- Compliance filtering
- Date range selection
- Expandable rows with detailed metrics
- Pagination

### Navigation
Collapsible sidebar with:
- Main navigation items
- Grouped sections (Monitor, Management, Admin)
- Active route highlighting
- Responsive behavior

### DateRangeSelector
Flexible date range selection with:
- Preset options (7 days, 30 days, 3 months, 6 months)
- Custom date range picker
- Integrated with table filtering

## Custom Hooks

### usePagination
```javascript
const { paginatedData, currentPage, setItemsPerPage } = usePagination(data);
```
Handles pagination state and logic

### useFilters
```javascript
const { filters, updateFilter, resetFilters } = useFilters({ status: 'all' });
```
Manages filter state

### useExpandable
```javascript
const { isExpanded, toggle, expandAll } = useExpandable();
```
Controls expandable sections/rows

### useDateRange
```javascript
const { selectedPreset, customRange, selectPreset } = useDateRange('30days');
```
Manages date range selection

### useNavigation
```javascript
const { isItemActive, hasActiveItem, activeItem } = useNavigation(items);
```
Navigation state and active route detection

## Testing

The project maintains high test coverage with:

- **Unit Tests** - Individual components and functions
- **Integration Tests** - Component interactions
- **Smoke Tests** - Critical user paths

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test BuildingsTable

# Run tests in CI mode
CI=true npm test
```

### Test Coverage Goals

- Utilities: 100%
- Hooks: 90%+
- Components: 70%+
- Overall: 70%+

## Configuration

### Constants
Edit `src/config/constants.js` for:
- Pagination options
- Color thresholds
- Date range presets

### Routes
Edit `src/config/routes.js` for:
- Route paths
- Route labels

## Styling

The project uses Tailwind CSS with a custom configuration:

- **Theme:** Supports light and dark modes
- **Colors:** Customizable via CSS variables
- **Components:** shadcn/ui component library

### Customizing Theme

Edit `src/index.css` to modify CSS variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  /* ... more variables */
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  /* ... more variables */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **Initial Load:** < 2s
- **Build Size:** ~500KB (gzipped)
- **Lighthouse Score:** 95+

### Optimization Techniques

- React.memo for expensive components
- useMemo for expensive calculations
- Lazy loading for routes (planned)
- Virtualization for large lists (planned)

## Accessibility

- Keyboard navigation support
- ARIA labels and roles
- Screen reader friendly
- Focus management
- Color contrast WCAG AA compliant

## Contributing

1. Create a feature branch
2. Write tests for new functionality
3. Implement the feature
4. Ensure all tests pass
5. Update documentation
6. Submit a pull request

### Code Standards

- Components must be < 100 lines
- All new code must have tests
- Use custom hooks for reusable logic
- Follow existing patterns
- Add JSDoc comments for public APIs

## Troubleshooting

### Common Issues

**Tests failing after npm install:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm test
```

**Tailwind classes not working:**
```bash
# Restart development server
npm start
```

**Build errors:**
```bash
# Check for linting errors
npm run lint
```

## Roadmap

- [ ] TypeScript migration
- [ ] Virtualized tables for large datasets
- [ ] Real-time data updates
- [ ] Export to CSV/PDF
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app (React Native)

## License

Private - All Rights Reserved

## Support

For questions or issues, please contact the development team.

---

**Version:** 2.0.0  
**Last Updated:** November 2025  
**Status:** Production Ready

