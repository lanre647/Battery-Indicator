import React, { useState, useEffect, useCallback } from 'react';
import './BatteryIndicator.css';
import { BatteryStatus, NavigatorWithBattery, BatteryManager } from '@/types/battery';

const BatteryIndicator: React.FC = () => {
  const [batteryStatus, setBatteryStatus] = useState<BatteryStatus | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const updateBatteryStatus = useCallback((battery: BatteryManager) => {
    setBatteryStatus({
      level: battery.level,
      charging: battery.charging,
      chargingTime: battery.chargingTime,
      dischargingTime: battery.dischargingTime,
    });
  }, []);

  useEffect(() => {
    
    const nav = navigator as NavigatorWithBattery;
    if (!nav.getBattery && !nav.battery) {
      setIsSupported(false);
      setIsLoading(false);
      setError('Battery Status API is not supported in your browser');
      return;
    }

    let batteryInstance: BatteryManager | null = null;

    const initBattery = async () => {
      try {
        setIsLoading(true);
        
        const nav = navigator as NavigatorWithBattery;
        
        if (nav.getBattery) {
          batteryInstance = await nav.getBattery();
        } else if (nav.battery) {
          batteryInstance = nav.battery;
        } else {
          throw new Error('Battery API not available');
        }

        
        updateBatteryStatus(batteryInstance);

      
        const updateHandler = () => updateBatteryStatus(batteryInstance!);
        batteryInstance.addEventListener('levelchange', updateHandler);
        batteryInstance.addEventListener('chargingchange', updateHandler);
        batteryInstance.addEventListener('chargingtimechange', updateHandler);
        batteryInstance.addEventListener('dischargingtimechange', updateHandler);

        setIsLoading(false);
      } catch (err) {
        console.error('Error accessing battery API:', err);
        setError('Could not access battery information. Please check browser permissions.');
        setIsLoading(false);
      }
    };

    initBattery();

 
    return () => {
      if (batteryInstance) {
        batteryInstance.removeEventListener('levelchange', () => {});
        batteryInstance.removeEventListener('chargingchange', () => {});
        batteryInstance.removeEventListener('chargingtimechange', () => {});
        batteryInstance.removeEventListener('dischargingtimechange', () => {});
      }
    };
  }, [updateBatteryStatus]);

  
  const percentage = batteryStatus ? Math.round(batteryStatus.level * 100) : 0;
  const isCharging = batteryStatus?.charging || false;
  const chargingTime = batteryStatus?.chargingTime || Infinity;
  const dischargingTime = batteryStatus?.dischargingTime || Infinity;


  const getBatteryColor = (level: number): string => {
    if (level > 0.5) return '#4CAF50'; 
    if (level > 0.2) return '#FF9800'; 
    return '#F44336'; 
  };


  const formatTime = (seconds: number): string => {
    if (seconds === Infinity) return 'Calculating...';
    if (seconds === 0) return 'Fully charged';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  };

  
  const getBatteryHealth = (level: number): string => {
    if (level > 0.8) return 'Excellent';
    if (level > 0.5) return 'Good';
    if (level > 0.2) return 'Low';
    return 'Critical';
  };

  if (!isSupported) {
    return (
      <div className="battery-container error">
        <div className="battery-icon">
          <div className="battery-outline">
            <div className="battery-terminal"></div>
          </div>
        </div>
        <div className="battery-info">
          <h3>Battery Status Unavailable</h3>
          <p className="battery-error">{error}</p>
          <p className="battery-hint">
            This feature requires a modern browser like Chrome, Edge, or Opera on desktop or mobile.
          </p>
          <div className="supported-browsers">
            <p><strong>Supported Browsers:</strong></p>
            <ul>
              <li>Chrome 38+</li>
              <li>Edge 79+</li>
              <li>Opera 25+</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="battery-container loading">
        <div className="battery-icon">
          <div className="battery-outline">
            <div className="battery-terminal"></div>
            <div className="battery-loading"></div>
          </div>
        </div>
        <div className="battery-info">
          <h3>Loading Battery Info...</h3>
          <div className="battery-percentage">--%</div>
          <p className="loading-text">Accessing battery information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="battery-container error">
        <div className="battery-icon">
          <div className="battery-outline">
            <div className="battery-terminal"></div>
            <div className="battery-level" style={{ width: '50%', backgroundColor: '#9E9E9E' }}></div>
          </div>
        </div>
        <div className="battery-info">
          <h3>Battery Status</h3>
          <p className="battery-error">{error}</p>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="battery-container">
      <div className="battery-icon">
        <div className="battery-outline">
          <div className="battery-terminal"></div>
          <div 
            className="battery-level" 
            style={{ 
              width: `${percentage}%`,
              backgroundColor: getBatteryColor(batteryStatus!.level)
            }}
          ></div>
          {isCharging && (
            <div className="charging-indicator">
              <span className="charging-icon">⚡</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="battery-info">
        <h3>Device Battery Status</h3>
        <div className="battery-percentage">{percentage}%</div>
        <div className="battery-health-status">
          Status: <span className="health-text">{getBatteryHealth(batteryStatus!.level)}</span>
        </div>
        
        <div className="battery-details">
          <div className="battery-status">
            <span className="status-label">Charging Status:</span>
            <span className={`status-value ${isCharging ? 'charging' : 'discharging'}`}>
              {isCharging ? 'Charging ⚡' : 'Not Charging'}
            </span>
          </div>
          
          {isCharging && chargingTime !== Infinity && (
            <div className="battery-time">
              <span className="time-label">Time to full charge:</span>
              <span className="time-value">{formatTime(chargingTime)}</span>
            </div>
          )}
          
          {!isCharging && dischargingTime !== Infinity && (
            <div className="battery-time">
              <span className="time-label">Time remaining:</span>
              <span className="time-value">{formatTime(dischargingTime)}</span>
            </div>
          )}
        </div>
        
        <div className="battery-health">
          <div className="health-bar">
            <div 
              className="health-level" 
              style={{ 
                width: `${percentage}%`,
                backgroundColor: getBatteryColor(batteryStatus!.level)
              }}
            ></div>
          </div>
          <div className="health-labels">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
        
        <div className="last-updated">
          Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default BatteryIndicator;