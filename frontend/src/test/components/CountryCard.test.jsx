import { render, screen } from '@testing-library/react';
import CountryCard from '../../components/CountryCard';

const mockCountry = {
  name: { common: 'France' },
  capital: ['Paris'],
  region: 'Europe',
  population: 67000000,
  flags: { png: 'https://flagcdn.com/fr.png' },
  cca3: 'FRA',
};

test('renders country name and capital', () => {
  render(<CountryCard country={mockCountry} />);
  expect(screen.getByText(/France/)).toBeInTheDocument();
  expect(screen.getByText(/Paris/)).toBeInTheDocument();
});
