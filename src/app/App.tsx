import { useState, useEffect, useRef } from 'react';
import ButtonBlue from './components/ButtonBlue';
import ButtonRed from './components/ButtonRed';
import TradingPanel from './components/TradingPanel';
import LiveChartWithStates from '@/imports/LiveChartWithStates';
import type { LiveChartState } from '@/imports/LiveChartWithStates';
import History from './components/History';
import type { HistoryRef, HistoryItem } from './components/History';
import Header from './components/Header';
import ComponentsShowcase from './components/ComponentsShowcase';
import WinToast from './components/WinToast';

export default function App() {
  const [showComponents, setShowComponents] = useState(false);
  const [chartState, setChartState] = useState<LiveChartState>('idle');
  const [showTradingPanel, setShowTradingPanel] = useState(true);
  const [showWinToast, setShowWinToast] = useState(false);
  const [finalPnL, setFinalPnL] = useState<number>(0);
  const [activeButton, setActiveButton] = useState<'up' | 'down' | null>(null);
  const [timeMode, setTimeMode] = useState<'30s' | '60s' | 'price'>('30s');
  const [countdown, setCountdown] = useState<number | undefined>(undefined);
  const [entryPrice, setEntryPrice] = useState<number | undefined>(undefined);
  const [currentPrice, setCurrentPrice] = useState<number>(96500);
  const [betAmount, setBetAmount] = useState(400);
  const [balance, setBalance] = useState(10000); // Initial balance
  
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const historyRef = useRef<HistoryRef>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  const handleUpClick = () => {
    if (chartState !== 'idle') return;
    
    // ✅ Deduct balance when position opens
    setBalance(prev => prev - betAmount);
    
    setActiveButton('up');
    setChartState('opened');
    setEntryPrice(currentPrice);
    
    // After 700ms, transition to live state
    setTimeout(() => {
      setChartState('live');
      setShowTradingPanel(false);
      
      // ✅ Start flashing next history cell
      historyRef.current?.setNextFlashing(true);
      
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
    
    // ✅ Deduct balance when position opens
    setBalance(prev => prev - betAmount);
    
    setActiveButton('down');
    setChartState('opened');
    setEntryPrice(currentPrice);
    
    // After 700ms, transition to live state
    setTimeout(() => {
      setChartState('live');
      setShowTradingPanel(false);
      
      // ✅ Start flashing next history cell
      historyRef.current?.setNextFlashing(true);
      
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
        
        // Calculate final result based on current price and entry price
        // This simulates the actual settlement logic
        const currentMark = currentPrice;
        const entry = entryPrice;
        const isUp = activeButton === 'up';
        const win = isUp ? (currentMark > (entry || 0)) : (currentMark < (entry || 0));
        
        const payoutMultiplier = 1.95;
        const netProfit = betAmount * (payoutMultiplier - 1);
        
        const finalPnLValue = win ? netProfit : -betAmount;
        setFinalPnL(finalPnLValue);
        setShowWinToast(true);
        
        // ✅ Update balance based on win/lose
        if (win) {
          // Win: Add bet amount back + profit (balance was already deducted)
          setBalance(prev => prev + betAmount + netProfit);
        }
        // Lose: Balance already deducted, no additional change needed
        
        // ✅ Add to history when trade SETTLES (OPEN → SETTLED)
        const historyItem: HistoryItem = {
          id: `trade-${Date.now()}`,
          symbol: 'BTC/USDT',
          direction: isUp ? 'UP' : 'DOWN',  // what user tapped
          result: win ? 'WIN' : 'LOSE',      // settlement outcome
          entryPrice: entry || 0,
          exitPrice: currentMark,
          betAmount: betAmount,
          pnl: finalPnLValue,
          settledAt: Date.now()
        };
        historyRef.current?.addSettledTrade(historyItem);
        
        // ✅ Stop flashing the next cell
        historyRef.current?.setNextFlashing(false);
        
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
    <div className="size-full flex items-center justify-center bg-black overflow-x-hidden">
      {/* Components Button - Hidden on mobile (320-440px), visible on larger screens */}
      <button
        onClick={() => setShowComponents(true)}
        className="hidden md:block fixed top-4 right-4 z-50 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-lg font-semibold"
      >
        Components
      </button>

      {/* Main Content - Responsive Container */}
      <div className="w-full min-w-[320px] max-w-[440px] h-full bg-gradient-to-b from-gray-950 to-black flex flex-col overflow-x-hidden">
        
        {/* Header - Full Width, No Padding */}
        <div className="w-full flex-shrink-0">
          <Header timeMode={timeMode} onTimeModeChange={setTimeMode} balance={balance} />
        </div>

        {/* Content Area with Padding and Gaps */}
        <div 
          className="flex-1 flex flex-col px-[14px] pb-[14px] pt-[14px] min-h-0 transition-all duration-300 ease-in-out overflow-x-hidden"
          style={{ 
            gap: chartState === 'idle' ? '14px' : '6px' 
          }}
        >
          
          {/* Live Chart - Min height 256px, expands when live */}
          <div 
            className="w-full transition-all duration-300 ease-in-out"
            style={{
              minHeight: '256px',
              flex: chartState === 'live' ? '1 1 auto' : '0 0 256px'
            }}
          >
            <LiveChartWithStates 
              state={chartState} 
              showWinToast={showWinToast}
              finalPnL={finalPnL}
              countdown={countdown}
              mode={timeMode}
              direction={activeButton || undefined}
              entryPrice={entryPrice}
              onPriceUpdate={setCurrentPrice}
              betAmount={betAmount}
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
            <TradingPanel value={betAmount} onChange={setBetAmount} />
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
            <History ref={historyRef} />
          </div>
        </div>
      </div>
    </div>
  );
}