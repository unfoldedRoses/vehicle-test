import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Step1 from '../Steps/Step1.jsx';

describe('Step1 Component (Minimal Test)', () => {
  it('renders without crashing', () => {
    render(<Step1 userData={{}} handleChange={jest.fn()} onNext={jest.fn()} />);
    expect(screen.getByRole('heading', { name: /first/i })).toBeInTheDocument(); // Check if the heading exists
  });
});