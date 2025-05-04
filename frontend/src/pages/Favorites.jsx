import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CountryCard from '../components/CountryCard';
import { fetchAllCountries } from '../api/countries';
import './Favorites.css';

const Favorites = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [favoriteCodes, setFavoriteCodes] = useState([]);
  const navigate = useNavigate();
  const userToken = localStorage.getItem('token');

  useEffect(() => {
    const loadData = async () => {
      try {
        const countries = await fetchAllCountries();
        setAllCountries(countries);

        if (userToken) {
          const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/favorites`, {
            headers: { Authorization: `Bearer ${userToken}` },
          });

          if (!res.ok) throw new Error('Failed to fetch favorites');

          const { favorites = [] } = await res.json();
          setFavoriteCodes(favorites);
        }
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };

    loadData();
  }, [userToken]);

  const handleToggleFavorite = (code) => {
    const isFavorite = favoriteCodes.includes(code);
    const updatedFavorites = isFavorite
      ? favoriteCodes.filter((c) => c !== code)
      : [...favoriteCodes, code];

    setFavoriteCodes(updatedFavorites);
  };

  const favoriteCountries = allCountries.filter((country) =>
    favoriteCodes.includes(country.cca3)
  );

  return (
    <div className="favorites-container">
      <h2 className="favorites-heading">❤️ Your Favorite Countries</h2>

      {favoriteCountries.length === 0 ? (
        <div className="favorites-empty">
          You haven’t added any favorites yet.
          <br />
          Explore and tap the heart icon to add your favorite countries!
        </div>
      ) : (
        <div className="favorites-grid">
          {favoriteCountries.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              isFavorite={favoriteCodes.includes(country.cca3)}
              onClick={() => navigate(`/country/${country.cca3}`)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;