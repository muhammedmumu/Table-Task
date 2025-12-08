import { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeContextProvider');
    }
    return context;
};

export const ThemeContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    // Create theme based on darkMode state
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode ? 'dark' : 'light',
                    primary: {
                        main: '#6366f1',
                        light: '#818cf8',
                        dark: '#4f46e5',
                    },
                    secondary: {
                        main: '#a855f7',
                        light: '#c084fc',
                        dark: '#9333ea',
                    },
                    background: {
                        default: darkMode ? '#0f1117' : '#f5f5f5',
                        paper: darkMode ? '#1a1d29' : '#ffffff',
                    },
                    text: {
                        primary: darkMode ? '#ffffff' : '#000000',
                        secondary: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                    },
                },
                typography: {
                    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                    h5: {
                        fontWeight: 700,
                    },
                    h6: {
                        fontWeight: 600,
                    },
                },
                shape: {
                    borderRadius: 12,
                },
                components: {
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                textTransform: 'none',
                                borderRadius: 8,
                            },
                        },
                    },
                    MuiPaper: {
                        styleOverrides: {
                            root: {
                                backgroundImage: 'none',
                            },
                        },
                    },
                },
            }),
        [darkMode]
    );

    const value = {
        darkMode,
        toggleDarkMode,
        theme,
    };

    return (
        <ThemeContext.Provider value={value}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
``