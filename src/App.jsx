// filepath: d:\Progrming\Git-clones\Table-Task\src\App.jsx
import React from 'react';
import BasicTable from './Components/Table/pages';
import { DataProvider } from './Components/Context/DataContext';
import { ThemeContextProvider } from './Components/Context/ThemeContext';
import ThemeToggle from './Components/ThemeToggle/ThemeToggle';
import Layout from './Components/Layout/layout';

export default function App() {
  return (
    <ThemeContextProvider>
      <DataProvider>
        <ThemeToggle />
        <Layout>
          <BasicTable />
        </Layout>
      </DataProvider>
    </ThemeContextProvider>
  );
}