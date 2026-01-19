import { useState, memo } from 'react';
import './HeaderCSS.css';
import AnimatedBalance from './AnimatedBalance';

interface HeaderProps {
  timeMode: '30s' | '60s' | 'price';
  onTimeModeChange: (mode: '30s' | '60s' | 'price') => void;
  balance: number;
  showBalanceConfetti?: boolean;
}

// ✅ Dynamic string constants
const HEADER_TEXT = {
  BALANCE_LABEL: 'BALANCE',
  PRICE_MODE: 'Price Mode',
  TIME_MODE: 'Time Mode',
  TIME_30S: '30s',
  TIME_60S: '60s',
  PRICE_SYMBOL: '$',
  MARTINGALE_LABEL: 'Martingale',
} as const;

function Header({ timeMode, onTimeModeChange, balance, showBalanceConfetti = false }: HeaderProps) {
  const [martingaleEnabled, setMartingaleEnabled] = useState(true);

  return (
    <div className="header-container">
      {/* Balance Section */}
      <div className="balance-section">
        <div className="balance-border-wrapper">
          <div className="balance-content" style={{ position: 'relative', overflow: 'hidden' }}>
            <span className="balance-label">{HEADER_TEXT.BALANCE_LABEL}</span>
            <AnimatedBalance balance={balance} className="balance-value" />
            
            {/* CSS Confetti inside balance area */}
            {showBalanceConfetti && (
              <>
                {Array.from({ length: 20 }).map((_, i) => {
                  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
                  const color = colors[i % colors.length];
                  const size = 4 + Math.random() * 4; // 4-8px
                  const angle = (i / 20) * 360; // Spread evenly
                  const distance = 40 + Math.random() * 30; // 40-70px travel distance
                  const duration = 1 + Math.random() * 0.5; // 1-1.5s
                  const delay = Math.random() * 0.1; // 0-0.1s delay
                  const rotation = Math.random() * 360;
                  
                  return (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: color,
                        borderRadius: Math.random() > 0.5 ? '50%' : '1px',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        animation: `balanceConfetti${i} ${duration}s ease-out ${delay}s forwards`,
                        opacity: 0,
                        pointerEvents: 'none',
                        zIndex: 100,
                      }}
                    />
                  );
                })}
                
                {/* Confetti keyframes */}
                <style>{`
                  ${Array.from({ length: 20 }).map((_, i) => {
                    const angle = (i / 20) * 360;
                    const distance = 40 + Math.random() * 30;
                    const rotation = Math.random() * 360;
                    const endX = Math.cos(angle * Math.PI / 180) * distance;
                    const endY = Math.sin(angle * Math.PI / 180) * distance;
                    
                    return `
                      @keyframes balanceConfetti${i} {
                        0% {
                          opacity: 1;
                          transform: translate(-50%, -50%) translate(0, 0) rotate(0deg);
                        }
                        70% {
                          opacity: 1;
                        }
                        100% {
                          opacity: 0;
                          transform: translate(-50%, -50%) translate(${endX}px, ${endY}px) rotate(${rotation}deg);
                        }
                      }
                    `;
                  }).join('\n')}
                `}</style>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="header-controls">
        {/* Mode Section */}
        <div className="mode-section">
          <div className="mode-label">
            <p className={timeMode === 'price' ? 'visible' : 'hidden'}>{HEADER_TEXT.PRICE_MODE}</p>
            <p className={timeMode !== 'price' ? 'visible' : 'hidden'}>{HEADER_TEXT.TIME_MODE}</p>
          </div>
          
          <div className="time-toggle">
            {/* Sliding background indicator */}
            <div 
              className="time-toggle-slider"
              style={{
                transform: timeMode === '30s' ? 'translate3d(0px, 0, 0)' : 
                          timeMode === '60s' ? 'translate3d(28px, 0, 0)' : 
                          'translate3d(55px, 0, 0)',
                width: timeMode === 'price' ? '28px' : '28px',
                willChange: 'transform'
              }}
            />
            <button 
              className={`time-button ${timeMode === '30s' ? 'active' : ''}`}
              onClick={() => onTimeModeChange('30s')}
            >
              {HEADER_TEXT.TIME_30S}
            </button>
            <button 
              className={`time-button ${timeMode === '60s' ? 'active' : ''}`}
              onClick={() => onTimeModeChange('60s')}
            >
              {HEADER_TEXT.TIME_60S}
            </button>
            <button 
              className={`time-button price ${timeMode === 'price' ? 'active' : ''}`}
              onClick={() => onTimeModeChange('price')}
            >
              {HEADER_TEXT.PRICE_SYMBOL}
            </button>
          </div>
        </div>

        {/* Martingale Section */}
        <div className="martingale-section">
          <p className="martingale-label">{HEADER_TEXT.MARTINGALE_LABEL}</p>
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

export default memo(Header);