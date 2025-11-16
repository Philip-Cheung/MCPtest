/**
 * Tests for BuildingMetricsTable component
 */
import { render, screen } from '@testing-library/react';
import { BuildingMetricsTable } from './BuildingMetricsTable';

const mockBuilding = {
  id: '1',
  name: 'Calgary Office',
  metrics: {
    airQuality: [
      { name: 'CO₂', target: '≤ 900 ppm', timeInTarget: 80.5 },
      { name: 'PM₂.₅', target: '≤ 15 μg/m³', timeInTarget: 90.2 },
      { name: 'TVOC', target: '≤ 109 ppb', timeInTarget: 65.8 },
    ],
    thermalComfort: [
      { name: 'Temperature', target: '20 - 26 °C', timeInTarget: 85.3 },
      { name: 'Humidity', target: '30 - 60 %', timeInTarget: 72.1 },
    ],
  },
};

describe('BuildingMetricsTable', () => {
  test('renders table headers', () => {
    render(
      <table><tbody>
        <BuildingMetricsTable building={mockBuilding} />
      </tbody></table>
    );
    
    expect(screen.getByText('Metric')).toBeInTheDocument();
    expect(screen.getByText('Target')).toBeInTheDocument();
    expect(screen.getByText('% Time In Targets')).toBeInTheDocument();
  });

  test('renders all air quality metrics', () => {
    render(
      <table><tbody>
        <BuildingMetricsTable building={mockBuilding} />
      </tbody></table>
    );
    
    expect(screen.getByText('CO₂')).toBeInTheDocument();
    expect(screen.getByText('PM₂.₅')).toBeInTheDocument();
    expect(screen.getByText('TVOC')).toBeInTheDocument();
  });

  test('renders all thermal comfort metrics', () => {
    render(
      <table><tbody>
        <BuildingMetricsTable building={mockBuilding} />
      </tbody></table>
    );
    
    expect(screen.getByText('Temperature')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
  });

  test('renders targets for metrics', () => {
    render(
      <table><tbody>
        <BuildingMetricsTable building={mockBuilding} />
      </tbody></table>
    );
    
    expect(screen.getByText('≤ 900 ppm')).toBeInTheDocument();
    expect(screen.getByText('≤ 15 μg/m³')).toBeInTheDocument();
    expect(screen.getByText('20 - 26 °C')).toBeInTheDocument();
  });

  test('renders time in target percentages', () => {
    render(
      <table><tbody>
        <BuildingMetricsTable building={mockBuilding} />
      </tbody></table>
    );
    
    expect(screen.getByText('80.5%')).toBeInTheDocument();
    expect(screen.getByText('90.2%')).toBeInTheDocument();
    expect(screen.getByText('65.8%')).toBeInTheDocument();
  });

  test('labels air quality metrics correctly', () => {
    render(
      <table><tbody>
        <BuildingMetricsTable building={mockBuilding} />
      </tbody></table>
    );
    
    const airQualityLabels = screen.getAllByText('Air Quality');
    expect(airQualityLabels.length).toBe(3); // 3 air quality metrics
  });

  test('labels thermal comfort metrics correctly', () => {
    render(
      <table><tbody>
        <BuildingMetricsTable building={mockBuilding} />
      </tbody></table>
    );
    
    const thermalComfortLabels = screen.getAllByText('Thermal Comfort');
    expect(thermalComfortLabels.length).toBe(2); // 2 thermal comfort metrics
  });

  test('renders correct number of rows', () => {
    const { container } = render(
      <table><tbody>
        <BuildingMetricsTable building={mockBuilding} />
      </tbody></table>
    );
    
    // Should have 3 air quality + 2 thermal comfort = 5 data rows, plus 1 header row
    const rows = container.querySelectorAll('tr');
    expect(rows.length).toBe(6); // 1 header + 5 data rows
  });

  test('handles building with no metrics gracefully', () => {
    const buildingNoMetrics = {
      ...mockBuilding,
      metrics: {
        airQuality: [],
        thermalComfort: [],
      },
    };
    
    render(
      <table><tbody>
        <BuildingMetricsTable building={buildingNoMetrics} />
      </tbody></table>
    );
    
    // Should still render headers
    expect(screen.getByText('Metric')).toBeInTheDocument();
  });
});

