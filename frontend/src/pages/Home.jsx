import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { fetchAllCountries } from '../api/countries';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 30;

  const navigate = useNavigate();
  const userToken = localStorage.getItem('token');

  useEffect(() => {
    const loadCountries = async () => {
      setLoading(true);
      try {
        const data = await fetchAllCountries();
        const sorted = data.sort((a, b) =>
          (a.name?.common || '').localeCompare(b.name?.common || '')
        );
        setCountries(sorted);
        setFilteredCountries(sorted);
      } catch (err) {
        console.error('Error fetching countries:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch countries. Please try again later.',
        });
      } finally {
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!userToken) return;
      try {
        const res = await fetch('http://localhost:5000/api/favorites', {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const data = await res.json();
        setFavorites(data.favorites || []);
      } catch (err) {
        console.error('Error loading favorites:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load favorites. Please try again later.',
        });
      }
    };
    loadFavorites();
  }, [userToken]);

  useEffect(() => {
    let filtered = [...countries];
    if (searchTerm) {
      filtered = filtered.filter(country =>
        country.name?.common?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedRegion) {
      filtered = filtered.filter(country => country.region === selectedRegion);
    }
    if (selectedLanguage) {
      filtered = filtered.filter(country =>
        Object.values(country.languages || {}).some(lang =>
          lang.toLowerCase().includes(selectedLanguage.toLowerCase())
        )
      );
    }
    setFilteredCountries(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedRegion, selectedLanguage, countries]);

  const handleSearch = (term) => setSearchTerm(term);

  const handleFilterChange = ({ region, language }) => {
    setSelectedRegion(region);
    setSelectedLanguage(language);
  };

  const handleFavoriteChanged = (code) => {
    setFavorites((prev) => {
      const isFavorite = prev.includes(code);
      Swal.fire({
        icon: 'success',
        title: 'Favorite Updated',
        text: `Country ${isFavorite ? 'removed from' : 'added to'} favorites.`,
      });
      return isFavorite ? prev.filter((fav) => fav !== code) : [...prev, code];
    });
  };

  const goToDetails = (code) => navigate(`/country/${code}`);

  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);
  const indexOfLast = currentPage * countriesPerPage;
  const indexOfFirst = indexOfLast - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirst, indexOfLast);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="home-container">
      <div className="search-filter-wrapper2">
        <div className="sff">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="sff">
          <Filters onFilterChange={handleFilterChange} />
        </div>
      </div>

      {loading ? (
        <div className="loading-text">Loading countries...</div>
      ) : currentCountries.length === 0 ? (
        <p className="no-results-text">No countries found. Try a different search or filter.</p>
      ) : (
        <>
          <div className="countries-grid">
            {currentCountries.map((country, index) => {
              const key = country.cca3 || country.cca2 || country.name?.common || index;
              return (
                <CountryCard
                  key={key}
                  country={country}
                  onClick={() => goToDetails(country.cca3)}
                  isFavorite={favorites.includes(country.cca3)}
                  onToggleFavorite={handleFavoriteChanged}
                />
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="page-button"
              >
                <FaArrowLeft />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => goToPage(i + 1)}
                  className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="page-button"
              >
                <FaArrowRight />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;