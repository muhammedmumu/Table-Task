import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const DataContext = createContext();

// Create the provider component
export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Fetch data from the server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/Details'); // Replace with your server URL
                setData(response.data);
            } catch (err) {
                setError('Failed to fetch data');
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
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};