// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// // Custom hook to access the AuthContext
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // stores the username

//   // On component mount, load user from localStorage
//   useEffect(() => {
//     const storedUsername = localStorage.getItem('username');
//     const storedToken = localStorage.getItem('token');
//     if (storedUsername && storedToken) {
//       setUser({ username: storedUsername, token: storedToken });
//     }
//   }, []);

//   // Login function
//   const login = async (username, password) => {
//     try {
//       const response = await axios.post('`${import.meta.env.https://af-2-it-22888952.vercel.app}`/auth/login', {
//         username,
//         password,
//       });

//       const { token, username: returnedUsername } = response.data;

//       // Store only the token and username
//       localStorage.setItem('token', token);
//       localStorage.setItem('username', returnedUsername);

//       setUser({ username: returnedUsername, token });

//     } catch (error) {
//       console.error('Login error:', error);
//       alert('Login failed. Please check your username and password.');
//     }
//   };

//   // Register function
//   const register = async (username, password) => {
//     try {
//       const response = await axios.post('`${import.meta.env.https://af-2-it-22888952.vercel.app}`/auth/register', {
//         username,
//         password,
//       });

//       const { token, username: returnedUsername } = response.data;

//       // Store only the token and username
//       localStorage.setItem('token', token);
//       localStorage.setItem('username', returnedUsername);

//       setUser({ username: returnedUsername, token });

//     } catch (error) {
//       console.error('Registration error:', error);
//       alert('Registration failed. Please try again.');
//     }
//   };

//   // Logout function
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('username');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, register }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
