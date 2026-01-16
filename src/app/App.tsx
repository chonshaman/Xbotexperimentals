import { useState, useEffect, useRef } from 'react';
import ButtonBlue from './components/ButtonBlue';
import ButtonRed from './components/ButtonRed';
import TradingPanel from './components/TradingPanel';
import LiveChartWithStates from '@/imports/LiveChartWithStates';
import type { LiveChartState } from '@/imports/LiveChartWithStates';
import History from './components/History';
import Header from './components/Header';
import ComponentsShowcase from './components/ComponentsShowcase';
import WinToast from './components/WinToast';

export default function App() {
  const [showComponents, setShowComponents] = useState(false);
  const [chartState, setChartState] = useState<LiveChartState>('idle');
  const [showTradingPanel, setShowTradingPanel] = useState(true);
  const [showWinToast, setShowWinToast] = useState(false);
  const [activeButton, setActiveButton] = useState<'up' | 'down' | null>(null);
  const [timeMode, setTimeMode] = useState<'30s' | '60s' | 'price'>('price');
  const [countdown, setCountdown] = useState<number | undefined>(undefined);
  
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  const handleUpClick = () => {
    if (chartState !== 'idle') return;
    
    setActiveButton('up');
    setChartState('opened');
    
    // After 700ms, transition to live state
    setTimeout(() => {
      setChartState('live');
      setShowTradingPanel(false);
      
      // Set up countdown based on mode
      if (timeMode === '30s') {
        setCountdown(30);
        startCountdown(30);
      } else if (timeMode === '60s') {
        setCountdown(60);
        startCountdown(60);
      } else {
        // Price mode - mock 60s duration
        setCountdown(60);
        startCountdown(60);
      }
    }, 700);
  };

  const handleDownClick = () => {
    if (chartState !== 'idle') return;
    
    setActiveButton('down');
    setChartState('opened');
    
    // After 700ms, transition to live state
    setTimeout(() => {
      setChartState('live');
      setShowTradingPanel(false);
      
      // Set up countdown based on mode
      if (timeMode === '30s') {
        setCountdown(30);
        startCountdown(30);
      } else if (timeMode === '60s') {
        setCountdown(60);
        startCountdown(60);
      } else {
        // Price mode - mock 60s duration
        setCountdown(60);
        startCountdown(60);
      }
    }, 700);
  };

  const startCountdown = (initialSeconds: number) => {
    let remaining = initialSeconds;
    
    countdownRef.current = setInterval(() => {
      remaining--;
      setCountdown(remaining);
      
      if (remaining <= 0) {
        if (countdownRef.current) clearInterval(countdownRef.current);
        // Show win toast
        setShowWinToast(true);
        
        // After 2s, hide toast and reset to idle
        setTimeout(() => {
          setShowWinToast(false);
          setChartState('idle');
          setShowTradingPanel(true);
          setActiveButton(null);
          setCountdown(undefined);
        }, 2000);
      }
    }, 1000);
  };

  if (showComponents) {
    return (
      <div className="size-full relative">
        {/* Back Button */}
        <button
          onClick={() => setShowComponents(false)}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors shadow-lg"
        >
          ← Back to Game
        </button>
        <ComponentsShowcase />
      </div>
    );
  }

  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Components Button - Outside Game Zone */}
      <button
        onClick={() => setShowComponents(true)}
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-lg font-semibold"
      >
        Components
      </button>

      {/* Main Content - Responsive Container */}
      <div className="w-full min-w-[320px] max-w-[440px] h-screen bg-gradient-to-b from-gray-950 to-black flex flex-col">
        
        {/* Header - Full Width, No Padding */}
        <div className="w-full flex-shrink-0">
          <Header timeMode={timeMode} onTimeModeChange={setTimeMode} />
        </div>

        {/* Content Area with Padding and Gaps */}
        <div className="flex-1 flex flex-col gap-[14px] px-[14px] pb-[14px] pt-[14px] min-h-0 max-[375px]:gap-[10px] max-[375px]:px-[10px] max-[375px]:pb-[10px] max-[375px]:pt-[8px] max-[340px]:gap-[8px] max-[340px]:px-[8px] max-[340px]:pb-[8px] max-[340px]:pt-[4px] max-[320px]:gap-[6px] max-[320px]:px-[6px] max-[320px]:pb-[6px] max-[320px]:pt-0">
          
          {/* Live Chart - Flexible height */}
          <div className="w-full flex-1 min-h-0">
            <LiveChartWithStates 
              state={chartState} 
              showWinToast={showWinToast}
              countdown={countdown}
              mode={timeMode}
              direction={activeButton || undefined}
            />
          </div>

          {/* Trading Panel */}
          <div 
            className="w-full flex-shrink-0 transition-all duration-500 ease-in-out overflow-hidden"
            style={{
              maxHeight: showTradingPanel ? '500px' : '0px',
              opacity: showTradingPanel ? 1 : 0
            }}
          >
            <TradingPanel />
          </div>

          {/* Button Container - Two Buttons Side by Side */}
          <div className="flex gap-4 items-center justify-center flex-shrink-0 max-[375px]:gap-3 max-[340px]:gap-2.5 max-[320px]:gap-2">
            <div className="flex-1 max-w-[calc(50%-8px)] max-[375px]:max-w-[calc(50%-6px)] max-[340px]:max-w-[calc(50%-5px)] max-[320px]:max-w-[calc(50%-4px)]">
              <ButtonRed 
                onClick={handleDownClick} 
                state={
                  activeButton === 'down' ? 'entry-locked' : 
                  activeButton === 'up' ? 'disabled' : 
                  'default'
                } 
              />
            </div>
            <div className="flex-1 max-w-[calc(50%-8px)] max-[375px]:max-w-[calc(50%-6px)] max-[340px]:max-w-[calc(50%-5px)] max-[320px]:max-w-[calc(50%-4px)]">
              <ButtonBlue 
                onClick={handleUpClick} 
                state={
                  activeButton === 'up' ? 'entry-locked' : 
                  activeButton === 'down' ? 'disabled' : 
                  'default'
                } 
              />
            </div>
          </div>

          {/* History Panel */}
          <div className="w-full flex-shrink-0">
            <History />
          </div>
        </div>
      </div>
    </div>
  );
}