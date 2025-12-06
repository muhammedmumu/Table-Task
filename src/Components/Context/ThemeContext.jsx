import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create the ThemeContext
export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    // State to manage the current theme mode (light or dark)
    const [mode, setMode] = useState('light');

    // Function to toggle between light and dark themes
    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    // Memoized theme object to avoid unnecessary re-renders
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light'
                        ? {
                            // Light theme colors
                            background: {
                                default: '#f5f5f5',
                                paper: '#ffffff',
                            },
                            text: {
                                primary: '#000000',
                                secondary: '#555555',
                            },
                        }
                        : {
                            // Dark theme colors
                            background: {
                                default: '#121212',
                                paper: '#1e1e1e',
                            },
                            text: {
                                primary: '#ffffff',
                                secondary: '#aaaaaa',
                            },
                        }),
                },
            }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};