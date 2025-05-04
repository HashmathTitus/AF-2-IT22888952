import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
    const [input, setInput] = useState('');

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            onSearch(input.trim());
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [input, onSearch]);

    return (
        <div className="searchbar-container">
            <div className="flex searchbar-wrapper align-center">
                <div className="searchbar-icon-container">
                    <FaSearch className="searchbar-icon" />
                </div>
                <input
                    type="text"
                    placeholder="     Search for a country..."
                    className="searchbar-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchBar;
