import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CountryDetails from '../../pages/CountryDetails';
import { vi } from 'vitest';
import { fetchCountryByCode } from '../../api/countries';

// Mocking the API function to return a sample country detail
vi.mock('../../api/countries', () => ({
  fetchCountryByCode: vi.fn(),
}));

describe('CountryDetails Component', () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  test('alerts when trying to favorite without login', async () => {
    const mockCountryData = {
      cca3: 'FRA',
      name: { common: 'France' },
      flags: { svg: 'https://flagcdn.com/fr.svg' },
    };

    vi.mocked(fetchCountryByCode).mockResolvedValue([mockCountryData]);

    // Mocking the alert function
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <MemoryRouter initialEntries={['/country/FRA']}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/France/i));

    // Ensure the favorite button is rendered and accessible by aria-label
    const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });

    // Simulate clicking the favorite button without being logged in
    fireEvent.click(favoriteButton);

    // Assert the alert was triggered
    await waitFor(() => expect(alertSpy).toHaveBeenCalledWith('You need to log in to add favorites'));

    // Clean up spy after test
    alertSpy.mockRestore();
  });
});
