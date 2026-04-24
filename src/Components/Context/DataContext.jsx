import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import MOCK_DATA from '../Mock/MOCK_DATA.json';

// Create the context
export const DataContext = createContext();

// Create the provider component
export const DataProvider = ({ children }) => {
    const [data, setData] = useState(MOCK_DATA.Details ?? []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [notice, setNotice] = useState('');

    // Fetch data from the server
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/Details', {
                    timeout: 3000,
                });
                setData(response.data);
                setError(null); // Clear any previous errors
                setNotice('');
            } catch (err) {
                console.warn('Server not available, using mock data:', err.message);
                setError(null);
                setNotice('Server not connected. Displaying mock data.');
                setData(MOCK_DATA.Details ?? []);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Provide the context value
    const value = {
        data,
        loading,
        error,
        roleFilter,
        setRoleFilter,
        statusFilter,
        setStatusFilter,
        searchTerm,
        setSearchTerm,
        notice,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
