import { useState, useEffect, useRef } from 'react';
import ButtonBlue from './components/ButtonBlue';
import ButtonRed from './components/ButtonRed';
import TradingPanel from './components/TradingPanel';
import LiveChartWithStates from '@/app/components/LiveChartWithStates';
import type { LiveChartState, TradingPair } from '@/app/components/LiveChartWithStates';
import History from './components/History';
import type { HistoryRef, HistoryItem } from './components/History';
import Header from './components/Header';
import ComponentsShowcase from './components/ComponentsShowcase';

export default function App() {
  const [showComponents, setShowComponents] = useState(false);
  const [chartState, setChartState] = useState<LiveChartState>('idle');
  const [showTradingPanel, setShowTradingPanel] = useState(true);
  const [showWinToast, setShowWinToast] = useState(false);
  const [showInsufficientBalanceToast, setShowInsufficientBalanceToast] = useState(false);
  const [showBalanceConfetti, setShowBalanceConfetti] = useState(false);
  const [finalPnL, setFinalPnL] = useState<number>(0);
  const [activeButton, setActiveButton] = useState<'up' | 'down' | null>(null);
  const [timeMode, setTimeMode] = useState<'30s' | '60s' | 'price'>('30s');
  const [countdown, setCountdown] = useState<number | undefined>(undefined);
  const [entryPrice, setEntryPrice] = useState<number | undefined>(undefined);
  const [currentPrice, setCurrentPrice] = useState<number>(96500);
  const [betAmount, setBetAmount] = useState(400);
  const [balance, setBalance] = useState(10000); // Initial balance
  const [lockedBetAmount, setLockedBetAmount] = useState(400); // ✅ Store the actual bet amount used for the trade
  const [selectedPair, setSelectedPair] = useState<TradingPair>('BTC/USDT');
  
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const historyRef = useRef<HistoryRef>(null);
  const currentPriceRef = useRef(currentPrice);

  // Keep currentPriceRef in sync with currentPrice
  useEffect(() => {
    currentPriceRef.current = currentPrice;
  }, [currentPrice]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  const handleUpClick = () => {
    if (chartState !== 'idle') return;
    
    // ✅ Check if betAmount is valid (greater than 0)
    if (betAmount <= 0) {
      setShowInsufficientBalanceToast(true);
      setTimeout(() => setShowInsufficientBalanceToast(false), 2000);
      return;
    }
    
    // ✅ Deduct balance when position opens
    if (balance < betAmount) {
      setShowInsufficientBalanceToast(true);
      setTimeout(() => setShowInsufficientBalanceToast(false), 2000);
      return;
    }
    
    // ✅ Lock the bet amount for this trade
    setLockedBetAmount(betAmount);
    setBalance(prev => prev - betAmount);
    
    // Capture values for the closure
    const tradeBetAmount = betAmount;
    const tradeEntryPrice = currentPrice;

    setActiveButton('up');
    setChartState('opened');
    setEntryPrice(currentPrice);
    
    // After 700ms, transition to live state
    setTimeout(() => {
      setChartState('live');
      setShowTradingPanel(false);
      
      // ✅ Start flashing next history cell
      // User bet UP, so if they WIN, market goes UP → 'WIN'
      historyRef.current?.setNextFlashing(true, 'WIN');
      
      // Set up countdown based on mode
      if (timeMode === '30s') {
        setCountdown(30);
        startCountdown(30, tradeEntryPrice, 'up', tradeBetAmount);
      } else if (timeMode === '60s') {
        setCountdown(60);
        startCountdown(60, tradeEntryPrice, 'up', tradeBetAmount);
      } else {
        // Price mode - mock 60s duration
        setCountdown(60);
        startCountdown(60, tradeEntryPrice, 'up', tradeBetAmount);
      }
    }, 700);
  };

  const handleDownClick = () => {
    if (chartState !== 'idle') return;
    
    // ✅ Check if betAmount is valid (greater than 0)
    if (betAmount <= 0) {
      setShowInsufficientBalanceToast(true);
      setTimeout(() => setShowInsufficientBalanceToast(false), 2000);
      return;
    }
    
    // ✅ Deduct balance when position opens
    if (balance < betAmount) {
      setShowInsufficientBalanceToast(true);
      setTimeout(() => setShowInsufficientBalanceToast(false), 2000);
      return;
    }
    
    // ✅ Lock the bet amount for this trade
    setLockedBetAmount(betAmount);
    setBalance(prev => prev - betAmount);
    
    // Capture values for the closure
    const tradeBetAmount = betAmount;
    const tradeEntryPrice = currentPrice;
    
    setActiveButton('down');
    setChartState('opened');
    setEntryPrice(currentPrice);
    
    // After 700ms, transition to live state
    setTimeout(() => {
      setChartState('live');
      setShowTradingPanel(false);
      
      // ✅ Start flashing next history cell
      // User bet DOWN, so if they WIN, market goes DOWN → 'LOSE'
      historyRef.current?.setNextFlashing(true, 'LOSE');
      
      // Set up countdown based on mode
      if (timeMode === '30s') {
        setCountdown(30);
        startCountdown(30, tradeEntryPrice, 'down', tradeBetAmount);
      } else if (timeMode === '60s') {
        setCountdown(60);
        startCountdown(60, tradeEntryPrice, 'down', tradeBetAmount);
      } else {
        // Price mode - mock 60s duration
        setCountdown(60);
        startCountdown(60, tradeEntryPrice, 'down', tradeBetAmount);
      }
    }, 700);
  };

  const startCountdown = (initialSeconds: number, tradeEntryPrice: number, tradeDirection: 'up' | 'down', tradeBetAmount: number) => {
    let remaining = initialSeconds;
    
    countdownRef.current = setInterval(() => {
      remaining--;
      setCountdown(remaining);
      
      if (remaining <= 0) {
        if (countdownRef.current) clearInterval(countdownRef.current);
        
        // Calculate final result based on current price and entry price
        // This simulates the actual settlement logic
        const currentMark = currentPriceRef.current;
        const entry = tradeEntryPrice;
        const isUp = tradeDirection === 'up';
        const win = isUp ? (currentMark > entry) : (currentMark < entry);
        
        const payoutMultiplier = 1.95;
        // ✅ Use lockedBetAmount for settlement calculations
        const netProfit = tradeBetAmount * (payoutMultiplier - 1);
        
        const finalPnLValue = win ? netProfit : -tradeBetAmount;
        setFinalPnL(finalPnLValue);
        setShowWinToast(true);
        
        // ✅ Update balance based on win/lose
        if (win) {
          // Win: Add bet amount back + profit (balance was already deducted)
          setBalance(prev => prev + tradeBetAmount + netProfit);
        }
        // Lose: Balance already deducted, no additional change needed
        
        // ✅ Add to history when trade SETTLES (OPEN → SETTLED)
        // CRITICAL: result should reflect MARKET DIRECTION, not user's win/loss
        // If user bet UP and WON → market went UP → result: 'WIN'
        // If user bet UP and LOST → market went DOWN → result: 'LOSE'
        // If user bet DOWN and WON → market went DOWN → result: 'LOSE'
        // If user bet DOWN and LOST → market went UP → result: 'WIN'
        const marketWentUp = currentMark > entry;
        const historyItem: HistoryItem = {
          id: `trade-${Date.now()}`,
          symbol: selectedPair,  // ✅ Use current selected pair
          direction: isUp ? 'UP' : 'DOWN',  // what user tapped
          result: marketWentUp ? 'WIN' : 'LOSE',  // ✅ MARKET direction (WIN=UP, LOSE=DOWN)
          entryPrice: entry,
          exitPrice: currentMark,
          betAmount: tradeBetAmount,  // ✅ Use locked amount
          pnl: finalPnLValue,
          settledAt: Date.now()
        };
        historyRef.current?.addSettledTrade(historyItem);
        
        // ✅ Stop flashing the next cell
        historyRef.current?.setNextFlashing(false);
        
        // After 2s, hide toast and reset to idle
        setTimeout(() => {
          setShowWinToast(false);
          
          // ✅ Flash the settled result 5 times after toast disappears
          historyRef.current?.flashLastResult();
          
          // ✅ Show confetti AFTER win toast disappears (only for wins)
          if (win) {
            setShowBalanceConfetti(true);
            setTimeout(() => setShowBalanceConfetti(false), 3000);
          }
          
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
          <Header timeMode={timeMode} onTimeModeChange={setTimeMode} balance={balance} showBalanceConfetti={showBalanceConfetti} />
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
            className="w-full transition-all duration-300 ease-in-out relative"
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
              betAmount={lockedBetAmount}
              selectedPair={selectedPair}
              onPairChange={setSelectedPair}
            />
            
            {/* Insufficient Balance Toast - Overlays on top of chart */}
            {showInsufficientBalanceToast && (
              <div className="absolute inset-0 flex items-center justify-center z-[30] pointer-events-none rounded-[12px]">
                <div 
                  className="animate-[bounceIn_0.5s_ease-out] h-[48px] px-6 rounded-2xl shadow-lg border border-white/20 bg-gradient-to-b from-[#ff9500] to-[#ff6b00] flex items-center gap-4"
                >
                  <div className="text-white text-lg font-bold drop-shadow-lg whitespace-nowrap" style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif" }}>
                    INSUFFICIENT BALANCE
                  </div>
                </div>
                
                {/* Add bounceIn animation */}
                <style>{`
                  @keyframes bounceIn {
                    0% {
                      opacity: 0;
                      transform: scale(0.3);
                    }
                    50% {
                      opacity: 1;
                      transform: scale(1.05);
                    }
                    70% {
                      transform: scale(0.9);
                    }
                    100% {
                      transform: scale(1);
                    }
                  }
                `}</style>
              </div>
            )}
          </div>

          {/* Trading Panel */}
          <div 
            className="w-full flex-shrink-0 transition-all duration-500 ease-in-out overflow-hidden"
            style={{
              maxHeight: showTradingPanel ? '500px' : '0px',
              opacity: showTradingPanel ? 1 : 0
            }}
          >
            <TradingPanel value={betAmount} onChange={setBetAmount} balance={balance} />
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