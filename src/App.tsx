import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Weather from './components/Weather';
import CountryCity from './components/CountryCity';
import CitySelector from './components/CitySelector';
import './styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Weather App</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<CountryCity />} />
            <Route path="/weather/:country" element={<CitySelector />} />
            <Route path="/weather/:country/:city" element={<Weather />} />
          </Routes>
        </main>
      </div>
    </Router>
    </QueryClientProvider>
  );
}

export default App;
