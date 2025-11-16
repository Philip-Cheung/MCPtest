/**
 * Tests for NavMain orchestrator component
 */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NavMain } from './nav-main';
import { SidebarProvider } from '../ui/sidebar';
import { FolderCog } from 'lucide-react';

const mockItems = [
  { title: 'Item 1', url: '/item1', icon: FolderCog },
  { title: 'Item 2', url: '/item2', icon: FolderCog },
];

const renderWithProviders = (component, sidebarState = 'expanded') => {
  // Mock the sidebar context
  jest.spyOn(require('../ui/sidebar'), 'useSidebar').mockReturnValue({
    state: sidebarState,
  });
  
  return render(
    <MemoryRouter>
      <SidebarProvider>
        {component}
      </SidebarProvider>
    </MemoryRouter>
  );
};

describe('NavMain', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders standard variant for non-collapsible navigation', () => {
    renderWithProviders(
      <NavMain items={mockItems} label="Test Label" collapsible={false} />
    );
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  test('renders collapsed variant when sidebar is collapsed', () => {
    renderWithProviders(
      <NavMain items={mockItems} collapsible={true} sectionIcon={FolderCog} />,
      'collapsed'
    );
    
    // Should render the icon button
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('renders expanded variant when sidebar is expanded with collapsible sections', () => {
    renderWithProviders(
      <NavMain items={mockItems} label="Test Label" collapsible={true} />,
      'expanded'
    );
    
    // Should render collapsible trigger
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  test('passes label to standard variant', () => {
    renderWithProviders(
      <NavMain items={mockItems} label="My Section" collapsible={false} />
    );
    
    expect(screen.getByText('My Section')).toBeInTheDocument();
  });

  test('passes items to variants', () => {
    renderWithProviders(
      <NavMain items={mockItems} label="Test" collapsible={false} />
    );
    
    mockItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  test('routes to standard variant by default when not collapsible', () => {
    renderWithProviders(
      <NavMain items={mockItems} label="Test" />
    );
    
    // Should render items directly (standard variant)
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  test('routes to expanded variant when sidebar is expanded and collapsible', () => {
    renderWithProviders(
      <NavMain items={mockItems} label="Test" collapsible={true} />,
      'expanded'
    );
    
    // Should have collapsible structure
    const label = screen.getByText('Test');
    expect(label).toBeInTheDocument();
  });
});

