import { ThemeContextProvider } from './Context/ThemeContaxt';
import DataProvider from './Context/DataContaxt';
import DashboardLayout from './Layout/Layout';

function App() {
  return (
    <ThemeContextProvider>
      <DataProvider>
        <DashboardLayout />
      </DataProvider>
    </ThemeContextProvider>
  );
}

export default App;