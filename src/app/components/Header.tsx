import { useState } from 'react';
import './HeaderCSS.css';
import AnimatedBalance from './AnimatedBalance';

interface HeaderProps {
  timeMode: '30s' | '60s' | 'price';
  onTimeModeChange: (mode: '30s' | '60s' | 'price') => void;
  balance: number;
}

export default function Header({ timeMode, onTimeModeChange, balance }: HeaderProps) {
  const [martingaleEnabled, setMartingaleEnabled] = useState(true);

  return (
    <div className="header-container">
      {/* Balance Section */}
      <div className="balance-section">
        <div className="balance-border-wrapper">
          <div className="balance-content">
            <span className="balance-label">BALANCE</span>
            <AnimatedBalance balance={balance} className="balance-value" />
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="header-controls">
        {/* Mode Section */}
        <div className="mode-section">
          <div className="mode-label">
            <p className={timeMode === 'price' ? 'visible' : 'hidden'}>Price Mode</p>
            <p className={timeMode !== 'price' ? 'visible' : 'hidden'}>Time Mode</p>
          </div>
          
          <div className="time-toggle">
            {/* Sliding background indicator */}
            <div 
              className="time-toggle-slider"
              style={{
                transform: timeMode === '30s' ? 'translateX(0px)' : 
                          timeMode === '60s' ? 'translateX(28px)' : 
                          'translateX(55px)',
                width: timeMode === 'price' ? '28px' : '28px'
              }}
            />
            <button 
              className={`time-button ${timeMode === '30s' ? 'active' : ''}`}
              onClick={() => onTimeModeChange('30s')}
            >
              30s
            </button>
            <button 
              className={`time-button ${timeMode === '60s' ? 'active' : ''}`}
              onClick={() => onTimeModeChange('60s')}
            >
              60s
            </button>
            <button 
              className={`time-button price ${timeMode === 'price' ? 'active' : ''}`}
              onClick={() => onTimeModeChange('price')}
            >
              $
            </button>
          </div>
        </div>

        {/* Martingale Section */}
        <div className="martingale-section">
          <p className="martingale-label">Martingale</p>
          <div className="martingale-toggle-container">
            <button 
              className={`martingale-button ${martingaleEnabled ? 'active' : ''}`}
              onClick={() => setMartingaleEnabled(!martingaleEnabled)}
            >
              <svg className="settings-icon" viewBox="0 0 16 16" fill="none">
                <path 
                  d="M1.33333 8.58667V7.41333C1.33333 6.72 1.9 6.14667 2.6 6.14667C3.80667 6.14667 4.3 5.29333 3.69333 4.24667C3.34667 3.64667 3.55333 2.86667 4.16 2.52L5.31333 1.86C5.84 1.54667 6.52 1.73333 6.83333 2.26L6.90667 2.38667C7.50667 3.43333 8.49333 3.43333 9.1 2.38667L9.17333 2.26C9.48667 1.73333 10.1667 1.54667 10.6933 1.86L11.8467 2.52C12.4533 2.86667 12.66 3.64667 12.3133 4.24667C11.7067 5.29333 12.2 6.14667 13.4067 6.14667C14.1 6.14667 14.6733 6.71333 14.6733 7.41333V8.58667C14.6733 9.28 14.1067 9.85333 13.4067 9.85333C12.2 9.85333 11.7067 10.7067 12.3133 11.7533C12.66 12.36 12.4533 13.1333 11.8467 13.48L10.6933 14.14C10.1667 14.4533 9.48667 14.2667 9.17333 13.74L9.1 13.6133C8.5 12.5667 7.51333 12.5667 6.90667 13.6133L6.83333 13.74C6.52 14.2667 5.84 14.4533 5.31333 14.14L4.16 13.48C3.55333 13.1333 3.34667 12.3533 3.69333 11.7533C4.3 10.7067 3.80667 9.85333 2.6 9.85333C1.9 9.85333 1.33333 9.28 1.33333 8.58667Z" 
                  fill="white" 
                  stroke="#00535C" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" 
                  fill="#00535C" 
                  stroke="#00535C" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}