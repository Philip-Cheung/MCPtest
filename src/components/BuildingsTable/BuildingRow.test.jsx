/**
 * Tests for BuildingRow component
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BuildingRow } from './BuildingRow';

const mockBuilding = {
  id: '1',
  name: 'Calgary Office',
  spaces: 10,
  wellCompliance: 'passing',
  airQuality: 75.5,
  thermalComfort: 80.2,
  metrics: {
    airQuality: [
      { name: 'CO₂', target: '≤ 900 ppm', timeInTarget: 80 },
      { name: 'PM₂.₅', target: '≤ 15 μg/m³', timeInTarget: 90 },
    ],
    thermalComfort: [
      { name: 'Temperature', target: '20 - 26 °C', timeInTarget: 85 },
    ],
  },
};

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('BuildingRow', () => {
  test('renders building name', () => {
    renderWithRouter(
      <table><tbody>
        <BuildingRow building={mockBuilding} isExpanded={false} onToggle={jest.fn()} />
      </tbody></table>
    );
    expect(screen.getByText('Calgary Office')).toBeInTheDocument();
  });

  test('renders building spaces count', () => {
    renderWithRouter(
      <table><tbody>
        <BuildingRow building={mockBuilding} isExpanded={false} onToggle={jest.fn()} />
      </tbody></table>
    );
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test('renders passing compliance badge', () => {
    renderWithRouter(
      <table><tbody>
        <BuildingRow building={mockBuilding} isExpanded={false} onToggle={jest.fn()} />
      </tbody></table>
    );
    expect(screen.getByText('Passing')).toBeInTheDocument();
  });

  test('renders needs attention compliance badge', () => {
    const buildingNeedsAttention = {
      ...mockBuilding,
      wellCompliance: 'needs-attention',
    };
    renderWithRouter(
      <table><tbody>
        <BuildingRow building={buildingNeedsAttention} isExpanded={false} onToggle={jest.fn()} />
      </tbody></table>
    );
    expect(screen.getByText('Needs Attention')).toBeInTheDocument();
  });

  test('renders air quality indicator', () => {
    renderWithRouter(
      <table><tbody>
        <BuildingRow building={mockBuilding} isExpanded={false} onToggle={jest.fn()} />
      </tbody></table>
    );
    expect(screen.getByText('75.5%')).toBeInTheDocument();
  });

  test('renders thermal comfort indicator', () => {
    renderWithRouter(
      <table><tbody>
        <BuildingRow building={mockBuilding} isExpanded={false} onToggle={jest.fn()} />
      </tbody></table>
    );
    expect(screen.getByText('80.2%')).toBeInTheDocument();
  });

  test('shows chevron right when collapsed', () => {
    const { container } = renderWithRouter(
      <table><tbody>
        <BuildingRow building={mockBuilding} isExpanded={false} onToggle={jest.fn()} />
      </tbody></table>
    );
    // ChevronRight should be present
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('calls onToggle when row is clicked', () => {
    const onToggle = jest.fn();
    renderWithRouter(
      <table><tbody>
        <BuildingRow building={mockBuilding} isExpanded={false} onToggle={onToggle} />
      </tbody></table>
    );
    
    const row = screen.getByText('Calgary Office').closest('tr');
    fireEvent.click(row);
    
    expect(onToggle).toHaveBeenCalledWith('1');
  });

  test('does not call onToggle when building link is clicked', () => {
    const onToggle = jest.fn();
    renderWithRouter(
      <table><tbody>
        <BuildingRow building={mockBuilding} isExpanded={false} onToggle={onToggle} />
      </tbody></table>
    );
    
    const link = screen.getByText('Calgary Office');
    fireEvent.click(link);
    
    expect(onToggle).not.toHaveBeenCalled();
  });

  test('renders metrics table when expanded', () => {
    renderWithRouter(
      <table><tbody>
        <BuildingRow building={mockBuilding} isExpanded={true} onToggle={jest.fn()} />
      </tbody></table>
    );
    
    expect(screen.getByText('CO₂')).toBeInTheDocument();
    expect(screen.getByText('PM₂.₅')).toBeInTheDocument();
    expect(screen.getByText('Temperature')).toBeInTheDocument();
  });

  test('does not render metrics table when collapsed', () => {
    renderWithRouter(
      <table><tbody>
        <BuildingRow building={mockBuilding} isExpanded={false} onToggle={jest.fn()} />
      </tbody></table>
    );
    
    expect(screen.queryByText('CO₂')).not.toBeInTheDocument();
  });

  test('building link has correct href', () => {
    renderWithRouter(
      <table><tbody>
        <BuildingRow building={mockBuilding} isExpanded={false} onToggle={jest.fn()} />
      </tbody></table>
    );
    
    const link = screen.getByText('Calgary Office');
    expect(link).toHaveAttribute('href', '/building/1');
  });
});

