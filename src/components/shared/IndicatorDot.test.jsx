/**
 * Tests for IndicatorDot component
 */
import { render, screen } from '@testing-library/react';
import { IndicatorDot } from './IndicatorDot';

describe('IndicatorDot', () => {
  test('renders with percentage value', () => {
    render(<IndicatorDot value={75.5} />);
    expect(screen.getByText('75.5%')).toBeInTheDocument();
  });

  test('formats value to 1 decimal place by default', () => {
    render(<IndicatorDot value={75.555} />);
    expect(screen.getByText('75.6%')).toBeInTheDocument();
  });

  test('formats value to custom decimal places', () => {
    render(<IndicatorDot value={75.555} decimalPlaces={2} />);
    expect(screen.getByText('75.56%')).toBeInTheDocument();
  });

  test('formats value to 0 decimal places', () => {
    render(<IndicatorDot value={75.9} decimalPlaces={0} />);
    expect(screen.getByText('76%')).toBeInTheDocument();
  });

  test('renders red indicator for low values', () => {
    const { container } = render(<IndicatorDot value={25} />);
    const dot = container.querySelector('.bg-red-500');
    expect(dot).toBeInTheDocument();
  });

  test('renders yellow indicator for medium values', () => {
    const { container } = render(<IndicatorDot value={60} />);
    const dot = container.querySelector('.bg-yellow-500');
    expect(dot).toBeInTheDocument();
  });

  test('renders green indicator for high values', () => {
    const { container } = render(<IndicatorDot value={85} />);
    const dot = container.querySelector('.bg-green-500');
    expect(dot).toBeInTheDocument();
  });

  test('handles edge case at 50 threshold', () => {
    const { container } = render(<IndicatorDot value={50} />);
    const dot = container.querySelector('.bg-yellow-500');
    expect(dot).toBeInTheDocument();
  });

  test('handles edge case at 75 threshold', () => {
    const { container } = render(<IndicatorDot value={75} />);
    const dot = container.querySelector('.bg-green-500');
    expect(dot).toBeInTheDocument();
  });

  test('handles value of 0', () => {
    render(<IndicatorDot value={0} />);
    expect(screen.getByText('0.0%')).toBeInTheDocument();
  });

  test('handles value of 100', () => {
    render(<IndicatorDot value={100} />);
    expect(screen.getByText('100.0%')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = render(<IndicatorDot value={75} className="custom-class" />);
    const span = container.querySelector('.custom-class');
    expect(span).toBeInTheDocument();
  });

  test('maintains default classes when custom className provided', () => {
    const { container } = render(<IndicatorDot value={75} className="custom-class" />);
    const span = container.querySelector('.flex.items-center.gap-2');
    expect(span).toBeInTheDocument();
  });

  test('renders dot with correct size classes', () => {
    const { container } = render(<IndicatorDot value={75} />);
    const dot = container.querySelector('.h-2.w-2.rounded-full');
    expect(dot).toBeInTheDocument();
  });

  test('percentage text has correct styling', () => {
    const { container } = render(<IndicatorDot value={75} />);
    const text = container.querySelector('.font-medium');
    expect(text).toBeInTheDocument();
    expect(text.textContent).toBe('75.0%');
  });
});

