const API_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async () => {
    try {
        const response = await fetch(`${API_URL}/all`);
        if (!response.ok) {
            throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching countries:', error);
        return [];
    }
};

export const fetchCountryByName = async (name) => {
    try {
        const response = await fetch(`${API_URL}/name/${name}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch country with name: ${name}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error fetching country by name (${name})`, error);
        return [];
    }
};

export const fetchCountryByCode = async (code) => {
    try {
        const response = await fetch(`${API_URL}/alpha/${code}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch country with name: ${code}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error fetching country by name (${code})`, error);
        return [];
    }
};

export const fetchByRegion = async () => {
    try {
        const response = await fetch(`${API_URL}/all`);
        if (!response.ok) {
            throw new Error('Failed to fetch regions');
        }
        const region = [...new Set(data.map(country => country.region))];
        return region;
    } catch (error) {
        console.log('Error fetching regions:', error);
        return [];
    }
};

export const fetchCountriesByLanguage = async () => {
    try {
        const response = await fetch(`${API_URL}/all`);
        if (!response.ok) {
            throw new Error('Failed to fetch languages');
        }
        const languages = [...new Set(data.map(country => Object.values(country.languages || {})))];
        return languages;
    } catch (error) {
        console.log('Error fetching languages:', error);
        return [];
    }
};