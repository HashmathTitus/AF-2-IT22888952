import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './CountryCard.css';

const CountryCard = ({ country, onClick, isFavorite = false, onToggleFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userToken = localStorage.getItem('token');

  useEffect(() => {
    const loadData = async () => {
      try {
        if (userToken) {
          const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/favorites`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });

          if (!res.ok) {
            throw new Error('Failed to fetch favorites');
          }

          const json = await res.json();
          const favoriteCodes = json.favorites || [];

          if (country?.cca3) {
            setFavorite(favoriteCodes.includes(country.cca3));
          }
        }
      } catch (err) {
        setError(err.message);
        console.error('Error loading favorites:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userToken, country?.cca3]);

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
        ? await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/favorites/remove`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({ countryCode }),
          })
        : await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/favorites/add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({ countryCode }),
          });

      const text = await response.text();
      console.log('Response Text:', text);

      const data = JSON.parse(text);

      if (response.ok) {
        setFavorite(!favorite);
        Swal.fire({
          icon: 'success',
          title: 'Favorite Updated',
          text: data.message || `Country ${favorite ? 'removed from' : 'added to'} favorites.`,
        });
        onToggleFavorite(countryCode);
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

  const handleViewDetails = (countryCode) => {
    if (!userToken) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You need to log in to view country details.',
      });
      return;
    }

    onClick?.(countryCode); // Navigate to the country details page
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="country-card" data-testid={`country-${country.cca3}`}>
      <button
        className="favorite-button"
        onClick={() => handleFavoriteToggle(country.cca3)}
      >
        {favorite ? <FaHeart /> : <FaRegHeart />}
      </button>
      <img
        src={country.flags?.png}
        alt={`${country.name?.common} flag`}
        className="country-flag"
        onClick={() => handleViewDetails(country.cca3)} // Updated to check login before navigating
      />
      <div className="country-details">
        <h2 className="country-namec">{country.name?.common}</h2>
        <p className="country-info">
          <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
        </p>
        <p className="country-info">
          <strong>Region:</strong> {country.region}
        </p>
        <p className="country-info">
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CountryCard;