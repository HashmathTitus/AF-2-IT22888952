[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)

IT22888952 - Natheer H A H

This is a country discovery application built using React, which allows users to search, filter, and view country details. The application displays a list of countries, allows users to search for countries, apply filters by region and language, and mark countries as favorites.
##
Features
Search Bar: Search countries by name.
#
Filters: Filter countries by region and language.
#
Pagination: Navigate through pages of countries with pagination.
#
Favorites: Mark countries as favorites and view them later.
#
Country Details: Click on a country to view more details.
#
Sorting: Countries are displayed in ascending alphabetical order.
##
Technologies Used
React: Frontend JavaScript library for building the user interface.
#
React Router: For navigating between different pages in the app.
#
React Icons: For adding icons (e.g., pagination arrows, heart icons for favorites).
#
CSS: For styling the components and app.
#
Axios: For making HTTP requests to fetch country data and handle favorites.
##
And implemented Backend with Node.js andd Express.js for the Register and Login functionality and store the specific user's favorite countries 
##
/src
  /api
    - countries.js           // Functions to interact with countries API.
  /assets
    - globe.jpg              // Image asset for the globe.
  /components
    - CountryCard.jsx        // Displays country card with details.
    - Filters.jsx            // Displays filter options for region and language.
    - SearchBar.jsx          // Search bar component for searching countries.
    - NavBar.jsx             // Nav bar component for accessing the pages easily.
  /pages
    - Register.jsx           // Create account.
    - Login.jsx              // Login to the application to manage favourites.
    - Home.jsx               // Main page with country list, filters, search, and pagination.
    - Favorites.jsx          // To display favorite countries for that user.
    - CountryDetails.jsx     // To display more details about country.
  /App.jsx                   // Main component that holds routes and app logic.
  /App.css                   // General app styling.

