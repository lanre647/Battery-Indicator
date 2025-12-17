import React, { useState, useEffect } from 'react';
import { BatteryIndicator } from './components';
import './App.css';
import './styles/global.css';

const App: React.FC = () => {
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toLocaleTimeString());
  
  // This made it refresh it self after 6 secs 
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date().toLocaleTimeString());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1> Battery Indicator</h1>
        <p className="app-subtitle">Real-time device battery monitoring</p>
      </header>
      
      <main className="app-main">
        <BatteryIndicator />
        
        <footer className="app-footer">
          <p>Last updated: {lastUpdate}</p>

          <p className="footer-note">
           Works best on Chrome/Edge •

          </p>

          <p>Made by Taofeek Kehinde All Right Reserved! </p>
        </footer>
      </main>
      

    </div>
  );
};

export default App;