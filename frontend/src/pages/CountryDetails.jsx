import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountryByCode } from '../api/countries';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './CountryDetails.css';

const CountryDetails = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [favorite, setFavorite] = useState(false);

  const userToken = localStorage.getItem('token');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [data] = await fetchCountryByCode(code);
        setCountry(data);

        if (userToken) {
          const res = await fetch('https://af-2-it-22888952.vercel.app/api/favorites', {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });

          const json = await res.json();
          const favoriteCodes = json.favorites || [];

          setFavorites(favoriteCodes);

          if (data?.cca3) {
            setFavorite(favoriteCodes.includes(data.cca3));
          }
        }
      } catch (err) {
        console.error('Error loading data:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load country details. Please try again later.',
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [code, userToken]);

  const handleFavoriteToggle = async (countryCode) => {
    if (!userToken) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You need to log in to add favorites.',
      });
      return;
    }

    try {
      const response = favorite
        ? await fetch('https://af-2-it-22888952.vercel.app/api/favorites/remove', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({ countryCode }),
          })
        : await fetch('https://af-2-it-22888952.vercel.app/api/favorites/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({ countryCode }),
          });

      const text = await response.text();
      const data = JSON.parse(text);

      if (response.ok) {
        setFavorite(!favorite);
        Swal.fire({
          icon: 'success',
          title: 'Favorite Updated',
          text: data.message || `Country ${favorite ? 'removed from' : 'added to'} favorites.`,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Failed to update favorite.',
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating favorites. Please try again.',
      });
    }
  };

  if (loading) return <p className="loading">Loading country details...</p>;
  if (!country) return <p className="error">Country not found.</p>;

  return (
    <div className="country-details-container">
      <div className="country-details-card">
        <div className="flag-section">
          <img
            src={country.flags?.svg}
            alt={`Flag of ${country.name?.common}`}
            className="flag-image"
          />
          <button
            className="favorite-button"
            onClick={() => handleFavoriteToggle(country.cca3)}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {favorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
        <div className="info-section">
          <h1 className="country-name">{country.name?.common}</h1>
          <div className="country-info">
            <p><strong>Official Name:</strong> {country.name?.official || 'N/A'}</p>
            <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
            <p><strong>Region:</strong> {country.region || 'N/A'}</p>
            <p><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
            <p><strong>Population:</strong> {country.population?.toLocaleString() || 'N/A'}</p>
            <p><strong>Languages:</strong> {
              country.languages
                ? Object.values(country.languages).join(', ')
                : 'N/A'
            }</p>
            <p><strong>Timezones:</strong> {country.timezones?.join(', ') || 'N/A'}</p>
            <p><strong>Currency:</strong> {
              country.currencies
                ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')
                : 'N/A'
            }</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;