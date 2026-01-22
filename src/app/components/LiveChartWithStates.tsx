import { useState, useEffect } from 'react';
import svgPaths from "@/imports/svg-8we49uz6px";
import { Loader2, ChevronDown } from 'lucide-react';

export type LiveChartState = 'idle' | 'opened' | 'live';
export type TradingPair = 'BTC/USDT' | 'ETH/USDT' | 'SOL/USDT';

// ✅ Dynamic string constants
const CHART_TEXT = {
  PRICE_LABEL: 'Price: ',
  LIVE_CHART: 'LIVE CHART',
  POSITION_OPENED: 'Position Opened -',
  LIVE_ROUND: 'Live Round - ',
  ENTRY_PRICE_LABEL: 'Entry Price',
  DIRECTION_UP: 'UP',
  DIRECTION_DOWN: 'DOWN',
  WIN_TEXT: 'WIN!',
  LOSS_TEXT: 'LOSS',
} as const;

const TRADING_PAIRS: TradingPair[] = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'];

// ✅ Helper function to format numbers with commas and conditional decimals (hide .00)
const formatNumber = (value: number) => {
  const hasDecimals = value % 1 !== 0;
  
  return value.toLocaleString('en-US', {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2
  });
};

// Crypto Icons
function BTCIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="8" fill="#F7931A"/>
      <path d="M11.1 7.95c.15-1-.6-1.55-1.65-1.9l.35-1.4-0.85-0.2-0.35 1.35c-0.2-0.05-0.45-0.1-0.65-0.15l0.35-1.4-0.85-0.2-0.35 1.4c-0.2-0.05-0.35-0.1-0.5-0.15L6.6 3.95 5.7 3.75l0.2 0.8s0.6 0.15 0.6 0.15c0.35 0.1 0.4 0.35 0.4 0.55l-0.4 1.6c0.05 0 0.1 0.05 0.15 0.05-0.05 0-0.1-0.05-0.15-0.05l-0.55 2.2c-0.05 0.1-0.15 0.25-0.4 0.2 0 0-0.6-0.15-0.6-0.15L4.7 10.9l0.85 0.2c0.15 0.05 0.3 0.1 0.45 0.1l-0.35 1.45 0.85 0.2 0.35-1.4c0.2 0.05 0.45 0.1 0.65 0.15l-0.35 1.4 0.85 0.2 0.35-1.45c1.45 0.3 2.55 0.15 3-1.1 0.35-1 0-1.6-0.75-1.95 0.55-0.1 0.95-0.45 1.05-1.15zm-1.9 2.65c-0.25 1.05-2 0.5-2.55 0.35l0.45-1.85c0.55 0.15 2.35 0.4 2.1 1.5zm0.25-2.65c-0.25 0.95-1.75 0.45-2.25 0.35l0.4-1.65c0.5 0.1 2.05 0.35 1.85 1.3z" fill="white"/>
    </svg>
  );
}

function ETHIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="8" fill="#627EEA"/>
      <path d="M8 3L7.95 3.15v6.7l0.05 0.05 3.5-2.05L8 3z" fill="white" fillOpacity="0.6"/>
      <path d="M8 3L4.5 7.85 8 9.9V3z" fill="white"/>
      <path d="M8 10.55l-0.05 0.05v2.7l0.05 0.15 3.5-4.95L8 10.55z" fill="white" fillOpacity="0.6"/>
      <path d="M8 13.45V10.55L4.5 8.5 8 13.45z" fill="white"/>
      <path d="M8 9.9l3.5-2.05L8 6.4v3.5z" fill="white" fillOpacity="0.2"/>
      <path d="M4.5 7.85L8 9.9V6.4L4.5 7.85z" fill="white" fillOpacity="0.6"/>
    </svg>
  );
}

function SOLIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="8" fill="url(#solGradient)"/>
      <defs>
        <linearGradient id="solGradient" x1="0" y1="0" x2="16" y2="16">
          <stop offset="0%" stopColor="#00FFA3"/>
          <stop offset="100%" stopColor="#DC1FFF"/>
        </linearGradient>
      </defs>
      <path d="M4.5 10.5L5 10l6.5 0 0.5 0.5-0.5 0.5-6.5 0L4.5 10.5z" fill="white"/>
      <path d="M4.5 5.5L5 5l6.5 0 0.5 0.5-0.5 0.5-6.5 0L4.5 5.5z" fill="white"/>
      <path d="M4.5 8L5 7.5l6.5 0 0.5 0.5-0.5 0.5-6.5 0L4.5 8z" fill="white"/>
    </svg>
  );
}

function getCryptoIcon(pair: TradingPair) {
  if (pair.startsWith('BTC')) return <BTCIcon />;
  if (pair.startsWith('ETH')) return <ETHIcon />;
  if (pair.startsWith('SOL')) return <SOLIcon />;
  return null;
}

interface LiveChartWithStatesProps {
  state?: LiveChartState;
  showWinToast?: boolean;
  finalPnL?: number;
  countdown?: number;
  mode?: '30s' | '60s' | 'price';
  direction?: 'up' | 'down';
  entryPrice?: number;
  onPriceUpdate?: (price: number) => void;
  betAmount?: number;
  selectedPair?: TradingPair;
  onPairChange?: (pair: TradingPair) => void;
}

function PriceRight({ currentPrice, entryPrice, priceDirection }: { currentPrice?: number; entryPrice?: number; priceDirection?: 'up' | 'down' | 'neutral' }) {
  const price = currentPrice || 96500;
  const basePrice = entryPrice || 96500;
  const percentage = ((price - basePrice) / basePrice * 100);
  const isUp = percentage >= 0;

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Use priceDirection for text color if available, otherwise fall back to percentage
  const textColor = priceDirection 
    ? (priceDirection === 'up' ? 'text-[#2ddb64]' : priceDirection === 'down' ? 'text-[#ff3232]' : 'text-[#808080]')
    : (isUp ? 'text-[#2ddb64]' : 'text-[#ff3232]');

  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 text-[12px] opacity-90" data-name="price right" style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif" }}>
      <p className="relative shrink-0 text-white">{`Price: `}</p>
      <p className={`relative shrink-0 ${textColor}`}>
        ${formatPrice(price)} ({isUp ? '+' : ''}{percentage.toFixed(2)}%)
      </p>
    </div>
  );
}

function PairSelector({ 
  selectedPair, 
  onSelectPair,
  disabled = false
}: { 
  selectedPair: TradingPair; 
  onSelectPair: (pair: TradingPair) => void;
  disabled?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Close dropdown when disabled
  useEffect(() => {
    if (disabled && isOpen) {
      setIsOpen(false);
    }
  }, [disabled, isOpen]);

  return (
    <div className="relative">
      {/* Selector Button */}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex items-center gap-[6px] transition-opacity ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80 cursor-pointer'} group`}
        disabled={disabled}
      >
        <div className="flex items-center gap-[4px]">
          {getCryptoIcon(selectedPair)}
          <span className="text-white text-[14px] tracking-tight" style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 600 }}>
            {selectedPair}
          </span>
        </div>
        <ChevronDown 
          className={`w-3 h-3 text-white/70 transition-transform duration-200 ${isOpen && !disabled ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Popup */}
      {isOpen && !disabled && (
        <>
          {/* Backdrop to close dropdown */}
          <div 
            className="fixed inset-0 z-[100]" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div 
            className="absolute top-[calc(100%+4px)] left-[-12px] z-[101] backdrop-blur-[16px] bg-[rgba(0,0,0,0.24)] border border-[rgba(255,255,255,0.1)] rounded-[6px] shadow-lg min-w-[140px] p-[4px] flex flex-col gap-[4px] animate-[dropdownFadeIn_0.2s_ease-out]"
            style={{
              animation: 'dropdownFadeIn 0.2s ease-out'
            }}
          >
            <style>{`
              @keyframes dropdownFadeIn {
                from {
                  opacity: 0;
                  transform: translateY(-8px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
            {TRADING_PAIRS.map((pair) => (
              <button
                key={pair}
                onClick={() => {
                  onSelectPair(pair);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-[4px] px-[12px] py-[8px] text-left transition-colors hover:bg-[rgba(255,255,255,0.1)] rounded-[4px] ${
                  pair === selectedPair ? 'bg-[rgba(72,190,229,0.15)]' : ''
                }`}
              >
                {getCryptoIcon(pair)}
                <span 
                  className="text-white text-[13px]" 
                  style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 500 }}
                >
                  {pair}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Title({ 
  currentPrice, 
  entryPrice,
  priceDirection,
  selectedPair,
  onSelectPair,
  state
}: { 
  currentPrice?: number; 
  entryPrice?: number;
  priceDirection?: 'up' | 'down' | 'neutral';
  selectedPair: TradingPair;
  onSelectPair: (pair: TradingPair) => void;
  state?: LiveChartState;
}) {
  return (
    <div className="relative shrink-0 w-full" data-name="title">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between leading-[normal] not-italic relative text-[14px] w-full whitespace-pre" style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 600 }}>
        <div className="flex items-center gap-[8px]">
          <p className="relative shrink-0 text-white uppercase tracking-tight">{CHART_TEXT.LIVE_CHART}</p>
          <PairSelector selectedPair={selectedPair} onSelectPair={onSelectPair} disabled={state !== 'idle'} />
        </div>
        <PriceRight currentPrice={currentPrice} entryPrice={entryPrice} priceDirection={priceDirection} />
      </div>
    </div>
  );
}

// State-specific components
function StatusOpened({ direction }: { direction?: 'up' | 'down' }) {
  return (
    <div className="backdrop-blur-[8px] bg-[rgba(0,0,0,0.32)] content-stretch flex items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0 animate-[slideInFromRight_0.3s_ease-out]" data-name="bg">
      <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.72)] whitespace-nowrap" style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif" }}>
        <p className="leading-[20px] whitespace-pre">{CHART_TEXT.POSITION_OPENED}</p>
      </div>
      <div className="h-[20px] relative shrink-0 w-[24px]" data-name="up down">
        <div 
          className="absolute flex flex-col inset-0 justify-center leading-[0] not-italic text-[12px] text-center"
          style={{ 
            color: direction === 'down' ? '#ff3232' : '#48bee5',
            fontFamily: "'IBM Plex Sans Condensed', sans-serif",
            fontWeight: 600
          }}
        >
          <p className="leading-[20px] whitespace-pre-wrap">{direction === 'down' ? CHART_TEXT.DIRECTION_DOWN : CHART_TEXT.DIRECTION_UP}</p>
        </div>
      </div>
    </div>
  );
}

function UpDown({ direction }: { direction?: 'up' | 'down' }) {
  return (
    <div className="h-[20px] relative shrink-0 w-[24px]" data-name="up down">
      <div 
        className="absolute flex flex-col inset-0 justify-center leading-[0] not-italic text-[12px] text-center"
        style={{ 
          color: direction === 'down' ? '#ff3232' : '#48bee5',
          fontFamily: "'IBM Plex Sans Condensed', sans-serif",
          fontWeight: 600
        }}
      >
        <p className="leading-[20px] whitespace-pre-wrap">{direction === 'down' ? CHART_TEXT.DIRECTION_DOWN : CHART_TEXT.DIRECTION_UP}</p>
      </div>
    </div>
  );
}

function Bg({ direction }: { direction?: 'up' | 'down' }) {
  return (
    <div className="backdrop-blur-[8px] bg-[rgba(0,0,0,0.16)] content-stretch flex items-center justify-center px-[4px] py-0 relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="bg">
      <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.72)]" style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 500 }}>
        <p className="leading-[20px] whitespace-pre">{CHART_TEXT.LIVE_ROUND}</p>
      </div>
      <UpDown direction={direction} />
    </div>
  );
}

function FloatingOverlay({ state, direction, showElements }: { state: LiveChartState; direction?: 'up' | 'down'; showElements: boolean }) {
  if (state === 'idle') return null;
  
  return (
    <div className="absolute left-[8px] bottom-[68px] z-[4]" data-name="floating">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid flex flex-col gap-[4px] items-start relative">
        {showElements && (
          <>
            {state === 'opened' && <StatusOpened direction={direction} />}
            {state === 'live' && <Bg direction={direction} />}
          </>
        )}
      </div>
    </div>
  );
}

function LiveIndicator({ 
  currentPriceY, 
  entryPriceY, 
  direction, 
  entryPriceValue, 
  currentPriceValue,
  yMin,
  yMax 
}: { 
  currentPriceY: number; 
  entryPriceY: number; 
  direction?: 'up' | 'down'; 
  entryPriceValue?: number; 
  currentPriceValue?: number;
  yMin: number;
  yMax: number;
}) {
  if (!entryPriceValue || !yMin || !yMax || yMin === yMax) return null;
  
  // Clamp entry price to visible range
  const entryClamped = Math.max(yMin, Math.min(yMax, entryPriceValue));
  
  // Calculate entry Y position based on clamped entry price
  const normalizedPosition = (yMax - entryClamped) / (yMax - yMin);
  const entryY = normalizedPosition * 180;
  const clampedEntryY = Math.max(0, Math.min(180, entryY));
  
  // Define Profit/Loss Zones in price space
  let profitRange: [number, number];
  let lossRange: [number, number];
  
  if (direction === 'up') {
    // UP: Profit = above entry, Loss = below entry
    profitRange = [entryClamped, yMax];
    lossRange = [yMin, entryClamped];
  } else {
    // DOWN: Profit = below entry, Loss = above entry
    profitRange = [yMin, entryClamped];
    lossRange = [entryClamped, yMax];
  }
  
  // Convert price ranges to Y coordinates (SVG: 0 = top, 180 = bottom)
  const profitYStart = ((yMax - profitRange[1]) / (yMax - yMin)) * 180;
  const profitYEnd = ((yMax - profitRange[0]) / (yMax - yMin)) * 180;
  const profitHeight = Math.max(0, profitYEnd - profitYStart);
  
  const lossYStart = ((yMax - lossRange[1]) / (yMax - yMin)) * 180;
  const lossYEnd = ((yMax - lossRange[0]) / (yMax - yMin)) * 180;
  const lossHeight = Math.max(0, lossYEnd - lossYStart);
  
  return (
    <div className="absolute inset-0 pointer-events-none" data-name="liveindicator">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 324 180">
        <g id="liveindicator">
          {/* Profit zone (green) */}
          <g id="profitzone">
            <rect 
              fill="url(#paint_profit_gradient)" 
              y={profitYStart}
              height={profitHeight} 
              width="324" 
              style={{
                transition: 'all 400ms ease-out'
              }}
            />
          </g>
          
          {/* Loss zone (red) */}
          <g id="losszone">
            <rect 
              fill="url(#paint_loss_gradient)" 
              y={lossYStart}
              height={lossHeight} 
              width="324" 
              style={{
                transition: 'all 400ms ease-out'
              }}
            />
          </g>
          
          {/* Entry dashed line */}
          <line 
            id="entry-dash" 
            stroke="white" 
            strokeDasharray="2 2" 
            strokeOpacity="0.72" 
            x1="0"
            x2="324" 
            y1={clampedEntryY} 
            y2={clampedEntryY}
            style={{
              transition: 'all 400ms ease-out'
            }}
          />
        </g>
        
        <defs>
          {/* Green gradient for profit zones */}
          <linearGradient 
            gradientUnits="userSpaceOnUse" 
            id="paint_profit_gradient" 
            x1="162" 
            x2="162" 
            y1={profitYStart} 
            y2={profitYEnd}
          >
            {direction === 'up' ? (
              // UP direction: gradient from top (opacity=0) to bottom/entry (higher opacity)
              <>
                <stop offset="0" stopColor="#8BB91E" stopOpacity="0" />
                <stop offset="0.207696" stopColor="#5DBC3D" stopOpacity="0.04" />
                <stop offset="0.5625" stopColor="#39BF56" stopOpacity="0.2" />
                <stop offset="1" stopColor="#36B91E" stopOpacity="0.6" />
              </>
            ) : (
              // DOWN direction: gradient from top/entry (higher opacity) to bottom (opacity=0)
              <>
                <stop offset="0" stopColor="#36B91E" stopOpacity="0.6" />
                <stop offset="0.4375" stopColor="#39BF56" stopOpacity="0.2" />
                <stop offset="0.792304" stopColor="#5DBC3D" stopOpacity="0.04" />
                <stop offset="1" stopColor="#8BB91E" stopOpacity="0" />
              </>
            )}
          </linearGradient>
          
          {/* Red gradient for loss zones */}
          <linearGradient 
            gradientUnits="userSpaceOnUse" 
            id="paint_loss_gradient" 
            x1="162" 
            x2="162" 
            y1={lossYStart} 
            y2={lossYEnd}
          >
            {direction === 'up' ? (
              // UP direction: gradient from top/entry (higher opacity) to bottom (opacity=0)
              <>
                <stop offset="0" stopColor="#E5484B" stopOpacity="0.6" />
                <stop offset="0.5625" stopColor="#E5484B" stopOpacity="0.2" />
                <stop offset="1" stopColor="#E5484B" stopOpacity="0" />
              </>
            ) : (
              // DOWN direction: gradient from top (opacity=0) to bottom/entry (higher opacity)
              <>
                <stop offset="0" stopColor="#E5484B" stopOpacity="0" />
                <stop offset="0.4375" stopColor="#E5484B" stopOpacity="0.2" />
                <stop offset="1" stopColor="#E5484B" stopOpacity="0.6" />
              </>
            )}
          </linearGradient>
        </defs>
      </svg>
      
      {/* Entry Price Label - only show if entry is within visible range */}
      {entryPriceValue >= yMin && entryPriceValue <= yMax && (
        <div 
          className="absolute pointer-events-none left-[48px]"
          style={{ 
            top: `${(clampedEntryY / 180) * 100}%`,
            transform: 'translate(0, -50%)',
            transition: 'all 400ms ease-out'
          }}
        >
          {/* Row 1: Entry Price Label */}
          <div className="backdrop-blur-[4px] bg-[rgba(0,0,0,0.16)] flex items-center justify-center px-[8px] py-[3px] rounded-tl-[4px] rounded-tr-[4px] shrink-0 h-[22px]">
            <p className="text-[12px] text-white leading-none whitespace-nowrap" style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 500 }}>{CHART_TEXT.ENTRY_PRICE_LABEL}</p>
          </div>
          
          {/* Row 2: Entry Price Value */}
          <div 
            className="flex items-center justify-center px-[8px] py-[3px] rounded-bl-[4px] rounded-br-[4px] shrink-0 h-[22px] transition-colors duration-300"
            style={{
              backgroundColor: direction === 'up' ? '#1f61b7' : '#b7341f'
            }}
          >
            <p className="text-[12px] text-white leading-none whitespace-nowrap" style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif", fontWeight: 500 }}>{formatNumber(entryPriceValue)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ✅ Get base price for each trading pair
const getBasePriceForPair = (pair: TradingPair): number => {
  switch (pair) {
    case 'BTC/USDT':
      return 96500;
    case 'ETH/USDT':
      return 3500;
    case 'SOL/USDT':
      return 200;
    default:
      return 96500;
  }
};

function Chart1AndPrice({ state, onPriceUpdate, onPriceDirectionUpdate, direction, entryPrice, selectedPair }: { state: LiveChartState; onPriceUpdate?: (price: number) => void; onPriceDirectionUpdate?: (direction: 'up' | 'down' | 'neutral') => void; direction?: 'up' | 'down'; entryPrice?: number; selectedPair: TradingPair }) {
  // ✅ Initialize with base price for selected pair
  const getInitialBasePrice = () => getBasePriceForPair(selectedPair);
  const initialBasePrice = getInitialBasePrice();
  
  const [prices, setPrices] = useState<string[]>(() => {
    const base = initialBasePrice;
    const step = 10 / 6;
    return Array.from({ length: 7 }, (_, i) => {
      const value = (base + 5) - (i * step);
      return value.toFixed(2);
    });
  });
  const [currentPrice, setCurrentPrice] = useState(initialBasePrice);
  const [prevPrice, setPrevPrice] = useState(initialBasePrice);
  const [priceDirection, setPriceDirection] = useState<'up' | 'down' | 'neutral'>('neutral');
  const [minPrice, setMinPrice] = useState(initialBasePrice - 5);
  const [maxPrice, setMaxPrice] = useState(initialBasePrice + 5);
  const [priceHistory, setPriceHistory] = useState<number[]>([]);

  // ✅ Notify parent of direction changes via useEffect to avoid render-phase updates
  useEffect(() => {
    if (onPriceDirectionUpdate) {
      onPriceDirectionUpdate(priceDirection);
    }
  }, [priceDirection, onPriceDirectionUpdate]);

  // Mock price simulation only
  useEffect(() => {
    let updateInterval: NodeJS.Timeout;
    let isComponentMounted = true;

    // Initialize with mock price based on selected pair
    const basePrice = getBasePriceForPair(selectedPair);
    
    setCurrentPrice(basePrice);
    setPrevPrice(basePrice);
    
    // Initialize with 50 historical points around base price
    const initial = Array.from({ length: 50 }, (_, i) => {
      // Create visible wave pattern with ±$5 variation (within $10 range)
      const wave = Math.sin(i * 0.3) * 2.5; // Sine wave 2.5
      const noise = (Math.random() - 0.5) * 2; // Random noise ±1
      return basePrice + wave + noise;
    });
    setPriceHistory(initial);
    
    // Set initial min/max with fixed $10 range centered on current price
    const finalMax = basePrice + 5;
    const finalMin = basePrice - 5;
    
    setMaxPrice(finalMax);
    setMinPrice(finalMin);
    
    // Calculate Y-axis labels with 7 steps (6 intervals)
    const step = (finalMax - finalMin) / 6;
    const newPrices = Array.from({ length: 7 }, (_, i) => {
      const value = finalMax - (i * step);
      return value.toFixed(2);
    });
    setPrices(newPrices);

    // Simulate realistic price movements with 1 second interval
    updateInterval = setInterval(() => {
      if (!isComponentMounted) return;
      
      setPriceHistory(prev => {
        const newHistory = [...prev];
        const lastPrice = newHistory[newHistory.length - 1];
        
        // Simulate realistic price movement
        const change = (Math.random() - 0.5) * 2; // ±$1 per update
        const newPrice = lastPrice + change;
        
        newHistory.shift();
        newHistory.push(newPrice);
        
        // Calculate Y-axis range inline
        const fixedRange = 10;
        const halfRange = fixedRange / 2;
        let centerPrice = newPrice;
        
        if (entryPrice) {
          const priceDiff = Math.abs(newPrice - entryPrice);
          if (priceDiff > halfRange * 0.7) {
            centerPrice = (newPrice + entryPrice) / 2;
            const neededRange = priceDiff * 1.4;
            if (neededRange > fixedRange) {
              const expandedHalf = Math.min(neededRange / 2, 40);
              const finalMaxPrice = centerPrice + expandedHalf;
              const finalMinPrice = centerPrice - expandedHalf;
              
              setMaxPrice(finalMaxPrice);
              setMinPrice(finalMinPrice);
              
              const step = (finalMaxPrice - finalMinPrice) / 6;
              const newPrices = Array.from({ length: 7 }, (_, i) => {
                const value = finalMaxPrice - (i * step);
                return value.toFixed(2);
              });
              setPrices(newPrices);
              // Determine direction based on actual price change
              const newDirection = newPrice > lastPrice ? 'up' : newPrice < lastPrice ? 'down' : 'neutral';
              setPriceDirection(newDirection);
              setPrevPrice(lastPrice);
              setCurrentPrice(newPrice);
              return newHistory;
            }
          }
        }
        
        const finalMaxPrice = centerPrice + halfRange;
        const finalMinPrice = centerPrice - halfRange;
        
        setMaxPrice(finalMaxPrice);
        setMinPrice(finalMinPrice);
        
        const step = (finalMaxPrice - finalMinPrice) / 6;
        const newPrices = Array.from({ length: 7 }, (_, i) => {
          const value = finalMaxPrice - (i * step);
          return value.toFixed(2);
        });
        setPrices(newPrices);
        
        // Determine direction based on actual price change
        const newDirection = newPrice > lastPrice ? 'up' : newPrice < lastPrice ? 'down' : 'neutral';
        setPriceDirection(newDirection);
        setPrevPrice(lastPrice);
        setCurrentPrice(newPrice);
        
        return newHistory;
      });
    }, 1000);

    // Cleanup
    return () => {
      isComponentMounted = false;
      if (updateInterval) {
        clearInterval(updateInterval);
      }
    };
  }, [entryPrice, state, selectedPair]); // ✅ Reset when pair changes
  
  // Separate useEffect to call onPriceUpdate after currentPrice changes
  useEffect(() => {
    if (onPriceUpdate) {
      onPriceUpdate(currentPrice);
    }
  }, [currentPrice, onPriceUpdate]);

  // Generate SVG path from data points for stroke
  const generatePath = (points: number[]) => {
    if (priceHistory.length === 0) return '';
    const width = 324;
    const height = 180;
    const xStep = width / (priceHistory.length - 1);
    
    // Use real price history directly
    const priceRange = maxPrice - minPrice;
    if (priceRange === 0) {
      // Fallback if no range
      let path = `M 0 ${height / 2}`;
      for (let i = 1; i < priceHistory.length; i++) {
        path += ` L ${i * xStep} ${height / 2}`;
      }
      return path;
    }
    
    const priceToY = (price: number) => {
      const normalizedPosition = (maxPrice - price) / priceRange;
      return normalizedPosition * height;
    };
    
    let path = `M 0 ${priceToY(priceHistory[0])}`;
    for (let i = 1; i < priceHistory.length; i++) {
      const x = i * xStep;
      const y = priceToY(priceHistory[i]);
      path += ` L ${x} ${y}`;
    }
    return path;
  };

  // Generate area path (for gradient fill) - starts from the line and goes down
  const generateAreaPath = (points: number[]) => {
    if (priceHistory.length === 0) return '';
    const width = 324;
    const height = 180;
    const xStep = width / (priceHistory.length - 1);
    
    // Use real price history directly
    const priceRange = maxPrice - minPrice;
    if (priceRange === 0) {
      // Fallback if no range
      return `M 0 ${height / 2} L ${width} ${height / 2} L ${width} ${height} L 0 ${height} Z`;
    }
    
    const priceToY = (price: number) => {
      const normalizedPosition = (maxPrice - price) / priceRange;
      return normalizedPosition * height;
    };
    
    // Start from the first point on the line
    let path = `M 0 ${priceToY(priceHistory[0])}`;
    
    // Draw along the line
    for (let i = 1; i < priceHistory.length; i++) {
      const x = i * xStep;
      const y = priceToY(priceHistory[i]);
      path += ` L ${x} ${y}`;
    }
    
    // Close the path by going down and back to start
    path += ` L ${width} ${height}`;
    path += ` L 0 ${height}`;
    path += ' Z';
    return path;
  };

  const linePath = generatePath(priceHistory);
  const areaPath = generateAreaPath(priceHistory);
  
  // Calculate current price Y position based on actual price values (same system as entry price)
  const calculateCurrentPriceYPercent = (): number => {
    if (minPrice === maxPrice) return 50; // Default middle if no valid data
    
    // Normalize current price within the current min-max range
    // If current price is at maxPrice, Y should be 0% (top)
    // If current price is at minPrice, Y should be 100% (bottom)
    const normalizedPosition = (maxPrice - currentPrice) / (maxPrice - minPrice);
    return normalizedPosition * 100; // Convert to percentage
  };
  
  const dotYPosition = calculateCurrentPriceYPercent();
  
  // Calculate Y coordinate in SVG pixels (0-180 range) for overlay calculations
  const currentPriceYCoord = (dotYPosition / 100) * 180;
  
  // Calculate dynamic entry price Y position based on current price scale
  // Map entry price to Y coordinate within current visible price range
  const calculateEntryPriceY = (): number => {
    if (!entryPrice || minPrice === maxPrice) return 90; // Default middle if no valid data
    
    // Normalize entry price within the current min-max range
    // If entry price is at maxPrice, Y should be 0 (top)
    // If entry price is at minPrice, Y should be 180 (bottom)
    const normalizedPosition = (maxPrice - entryPrice) / (maxPrice - minPrice);
    const entryY = normalizedPosition * 180;
    
    // Clamp to valid range with some padding
    return Math.max(10, Math.min(170, entryY));
  };
  
  const entryPriceY = calculateEntryPriceY();
  
  // Use priceDirection state for accurate color tracking
  const isPriceUp = priceDirection === 'up';
  
  // Format price with comma separator and 2 decimals
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Choose colors based on state
  const getStrokeColor = () => {
    return state === 'live' ? '#AFD77B' : '#48BEE5';
  };

  const getFillGradientId = () => {
    return state === 'live' ? 'paint0_linear_live' : 'paint0_linear_animated';
  };

  const getGlowStdDeviation = () => {
    return state === 'live' ? '12' : '8';
  };

  const getGlowColorMatrix = () => {
    return state === 'live'
      ? "0 0 0 0 0.6863 0 0 0 0 0.8431 0 0 0 0 0.4824 0 0 0 0.8 0" // #AFD77B with 80% opacity
      : "0 0 0 0 0.282353 0 0 0 0 0.745098 0 0 0 0 0.898039 0 0 0 0.8 0"; // #48BEE5 with 80% opacity
  };

  return (
    <>
      <div className="h-full relative shrink-0 w-full" data-name="chart">
        {/* Combined stroke and fill in one SVG to eliminate gaps */}
        <div 
          className="absolute inset-0 transition-all duration-500 ease-out"
          data-name="chart-container"
        >
          {/* Live indicator overlay - only in live state */}
          {state === 'live' && <LiveIndicator currentPriceY={currentPriceYCoord} entryPriceY={entryPriceY} direction={direction} entryPriceValue={entryPrice} currentPriceValue={currentPrice} yMin={minPrice} yMax={maxPrice} />}
          
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 324 180">
            <defs>
              {/* Gradient for fill - idle/opened */}
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_animated" x1="162" x2="162" y1="0" y2="180">
                <stop stopColor="#48BEE5" stopOpacity="0.6" />
                <stop offset="0.5625" stopColor="#48BEE5" stopOpacity="0.2" />
                <stop offset="0.95" stopColor="#48BEE5" stopOpacity="0" />
              </linearGradient>
              {/* Gradient for fill - live */}
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_live" x1="162" x2="162" y1="0" y2="180">
                <stop stopColor="#AFD77B" stopOpacity="0.6" />
                <stop offset="0.5625" stopColor="#AFD77B" stopOpacity="0.2" />
                <stop offset="0.95" stopColor="#AFD77B" stopOpacity="0" />
              </linearGradient>
              {/* Glow filter for stroke */}
              <filter id={`glow_filter_${state}`} x="-50%" y="-50%" width="500%" height="500%">
                <feGaussianBlur in="SourceGraphic" stdDeviation={getGlowStdDeviation()} result="blur" />
                <feColorMatrix in="blur" type="matrix" values={getGlowColorMatrix()} result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            {/* Background gradient fill */}
            <path d={areaPath} fill={`url(#${getFillGradientId()})`} className="transition-all duration-400 ease-out" />
            
            {/* Glowing stroke line on top */}
            <path 
              d={linePath} 
              shapeRendering="geometricPrecision" 
              stroke={getStrokeColor()} 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill="none"
              filter={`url(#glow_filter_${state})`}
              className="transition-all duration-400 ease-out"
            />
          </svg>
          
          {/* Current position dot - positioned using percentage like LiveChart.tsx */}
          <div 
            className="absolute pointer-events-none transition-all duration-[400ms] ease-out"
            style={{ 
              right: '0px',
              top: `${dotYPosition}%`,
              transform: 'translate(0, -50%)',
              width: '18px',
              height: '18px',
            }}
          >
            <div 
              style={{
                position: 'relative',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'conic-gradient(from 25deg at 50% 50%, #EBEBEB 8.526539951562881deg, #A6A6A6 31.273336708545685deg, #EBEBEB 60.399945974349976deg, #B8B8B8 74.53422725200653deg, #EDEDED 84.85412299633026deg, #ABABAB 93.26865792274475deg, #F0F0F0 130.0709366798401deg, #D1D1D1 156.95856928825378deg, #B0B0B0 175.30829071998596deg, #EBEBEB 184.46789503097534deg, #DEDEDE 190.88155031204224deg, #EBEBEB 208.86048316955566deg, #C7C7C7 227.78544187545776deg, #C4C4C4 256.4226794242859deg, #ADADAD 264.3653440475464deg, #BDBDBD 269.2746877670288deg, #E5E5E5 276.247980594635deg, #ABABAB 348.82035970687866deg, #C2C2C2 355.37188053131104deg, #CCC 360deg)',
                border: '2.5px solid #E7E7E7',
                boxShadow: '1px 4px 6px rgba(0, 0, 0, 0.36), 0 1px 0 rgba(0, 0, 0, 0.12)',
              }}
            >
              {/* Specular highlight effect */}
              <div
                style={{
                  content: '',
                  position: 'absolute',
                  inset: '2px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.3) 30%, transparent 60%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
          
          {/* Price Badge - moves with dot */}
          <div 
            className="absolute pointer-events-none transition-all duration-[400ms] ease-out"
            style={{ 
              right: '24px',
              top: `${dotYPosition}%`,
              transform: 'translate(0, -50%)',
            }}
          >
            <div 
              className="text-[11px] text-white px-[6px] py-[2px] rounded-[4px] shadow-lg"
              style={{
                backgroundColor: priceDirection === 'up' ? '#2ddb64' : priceDirection === 'down' ? '#ff3232' : '#808080',
                fontFamily: "'IBM Plex Sans Condensed', sans-serif",
                fontWeight: 600
              }}
            >
              {formatPrice(currentPrice)}
            </div>
          </div>
        </div>
      </div>
      <Price prices={prices} />
    </>
  );
}

function Price({ prices }: { prices: string[] }) {
  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return numPrice.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="content-stretch flex flex-col h-full items-start justify-between leading-[20px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.7)] whitespace-pre" data-name="price" style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif" }}>
      {prices.map((price, index) => (
        <p key={index} className="relative shrink-0">{formatPrice(price)}</p>
      ))}
    </div>
  );
}

function Content({ state, onPriceUpdate, onPriceDirectionUpdate, direction, entryPrice, selectedPair }: { state: LiveChartState; onPriceUpdate?: (price: number) => void; onPriceDirectionUpdate?: (direction: 'up' | 'down' | 'neutral') => void; direction?: 'up' | 'down'; entryPrice?: number; selectedPair: TradingPair }) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full h-full pb-[16px]" data-name="content">
      <div className="flex flex-row justify-end size-full">
        <div className="content-stretch flex gap-[9px] items-start justify-end pl-0 pr-[6px] py-0 relative size-full">
          <Chart1AndPrice state={state} onPriceUpdate={onPriceUpdate} onPriceDirectionUpdate={onPriceDirectionUpdate} direction={direction} entryPrice={entryPrice} selectedPair={selectedPair} />
        </div>
      </div>
    </div>
  );
}

function Time() {
  const [times, setTimes] = useState<string[]>([]);

  useEffect(() => {
    // Initialize and update times every 800ms (matching chart update)
    const updateTimes = () => {
      const now = new Date();
      const timeStrings = Array.from({ length: 5 }, (_, i) => {
        const timestamp = new Date(now.getTime() - (4 - i) * 3200); // 4-second intervals going back
        const hours = timestamp.getHours().toString().padStart(2, '0');
        const minutes = timestamp.getMinutes().toString().padStart(2, '0');
        const seconds = timestamp.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
      });
      setTimes(timeStrings);
    };

    updateTimes(); // Initial call
    const interval = setInterval(updateTimes, 800); // Update every 800ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative shrink-0 w-full" data-name="time">
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex font-sans items-end justify-between leading-[0] not-italic pl-0 pr-[6px] py-0 relative text-[10px] text-[rgba(255,255,255,0.7)] w-full">
          {times.map((time, index) => (
            <div key={index} className={`flex flex-col justify-center relative shrink-0 ${index >= 3 ? 'w-[54px]' : 'whitespace-nowrap'}`}>
              <p className={`leading-[20px] ${index >= 3 ? 'whitespace-pre-wrap' : 'whitespace-pre'}`}>{time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Chart({ state, onPriceUpdate, onPriceDirectionUpdate, direction, entryPrice, selectedPair }: { state: LiveChartState; onPriceUpdate?: (price: number) => void; onPriceDirectionUpdate?: (direction: 'up' | 'down' | 'neutral') => void; direction?: 'up' | 'down'; entryPrice?: number; selectedPair: TradingPair }) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full z-[2]" data-name="chart">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between relative size-full">
        <Content state={state} onPriceUpdate={onPriceUpdate} onPriceDirectionUpdate={onPriceDirectionUpdate} direction={direction} entryPrice={entryPrice} selectedPair={selectedPair} />
        <Time />
      </div>
    </div>
  );
}

function Footer({ 
  state, 
  countdown, 
  mode, 
  entryPrice, 
  currentPrice: externalCurrentPrice, 
  direction,
  betAmount = 400
}: { 
  state: LiveChartState; 
  countdown?: number; 
  mode?: '30s' | '60s' | 'price'; 
  entryPrice?: number; 
  currentPrice?: number; 
  direction?: 'up' | 'down';
  betAmount?: number;
}) {
  // Use external price directly, no internal state needed
  const currentPrice = externalCurrentPrice || 96500;

  const getSettleText = () => {
    if (state === 'opened') return 'Starting round…';
    if (state === 'live' && countdown !== undefined) {
      return `Settles in ${countdown}s`;
    }
    return '';
  };

  const calculatePnL = () => {
    if (!entryPrice || !currentPrice || !direction || countdown === undefined) return 0;
    
    // ✅ Use same logic as final settlement for consistency
    const payoutMultiplier = 1.95;
    const stake = betAmount;
    const netProfit = stake * (payoutMultiplier - 1);
    
    // Determine if current price would result in win
    const isUp = direction === 'up';
    const wouldWin = isUp ? (currentPrice > entryPrice) : (currentPrice < entryPrice);
    
    // Calculate actual PnL based on current position
    if (wouldWin) {
      // Currently winning: show potential profit
      return netProfit;
    } else {
      // Currently losing: show potential loss
      return -stake;
    }
  };

  const pnl = calculatePnL();
  const isPositive = pnl >= 0;

  const backgroundImageStyle = "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 376 28\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"0.6000000238418579\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(16.035 4.6542e-15 8.0454e-12 0.039007 170.49 0.73684)\"><stop stop-color=\"rgba(160,230,246,1)\" offset=\"0\"/><stop stop-color=\"rgba(160,230,246,1)\" offset=\"0.22115\"/><stop stop-color=\"rgba(160,230,246,0)\" offset=\"1\"/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 376 28\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"0.6000000238418579\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(14.837 1.3021e-15 1.648e-12 0.02123 178.78 26.526)\"><stop stop-color=\"rgba(160,230,246,1)\" offset=\"0\"/><stop stop-color=\"rgba(160,230,246,1)\" offset=\"0.22115\"/><stop stop-color=\"rgba(160,230,246,0)\" offset=\"1\"/></radialGradient></defs></svg>'), linear-gradient(1.0372e-07deg, rgb(12, 8, 17) 37.778%, rgb(41, 45, 52) 100%)";

  return (
    <div 
      className={`relative rounded-[10px] shrink-0 w-full z-[0] transition-all duration-500 ease-out translate-y-0 opacity-100`}
      data-name="footer" 
      style={{ backgroundImage: backgroundImageStyle }}
    >
      <style>{`
        @keyframes footerSlideLeft {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes footerSlideRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes countdownFlash {
          0%, 100% {
            color: rgba(255, 255, 255, 0.72);
            text-shadow: none;
          }
          50% {
            color: #ff6b6b;
            text-shadow: 0 0 8px rgba(255, 107, 107, 0.6);
          }
        }
      `}</style>
      <div aria-hidden="true" className="absolute border border-[rgba(130,207,255,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex isolate items-center px-[10px] py-[4px] relative w-full" style={{ justifyContent: state === 'idle' ? 'center' : 'space-between' }}>
        {/* Settle Status - Left (Transform smoothly from right to left) */}
        {state !== 'idle' && (
          <div className="content-stretch flex items-center gap-2 py-0 relative shrink-0 z-[3] animate-[footerSlideLeft_0.5s_ease-out]" data-name="settle status">
            {state === 'opened' && (
              <Loader2 className="w-4 h-4 text-[rgba(255,255,255,0.72)] animate-spin" />
            )}
            <div 
              className={`flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center whitespace-nowrap`}
              style={{
                color: (state === 'live' && countdown !== undefined && countdown > 6) ? '#ffffff' : undefined,
                animation: (state === 'live' && countdown !== undefined && countdown <= 6) ? 'countdownFlash 0.8s ease-in-out infinite' : 'none'
              }}
            >
              <p className="leading-[20px] whitespace-pre">
                {getSettleText()}
              </p>
            </div>
          </div>
        )}

        {/* Center Text - only in idle state */}
        {state === 'idle' && (
          <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.72)] text-center z-[2] whitespace-nowrap">
            <p className="leading-[20px] whitespace-pre">Pick UP or DOWN to start</p>
          </div>
        )}

        {/* PnL - Middle (visible only in live state) */}
        {state === 'live' && (
          <div className="content-stretch flex flex-col h-[20px] items-center justify-center relative shrink-0 z-[2]" data-name="pnl">
            <div className="content-stretch flex gap-px items-center relative shrink-0">
              <div className="bg-[rgba(255,255,255,0.2)] content-stretch flex flex-col h-[20px] items-center justify-center px-[4px] py-0 relative rounded-bl-[4px] shrink-0">
                <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.2)] border-b-2 border-dashed border-t-2 inset-[-2px_0] pointer-events-none rounded-bl-[4px]" />
                <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
                  <p className="leading-[20px] whitespace-pre-wrap">PnL</p>
                </div>
              </div>
              <div 
                className={`content-stretch flex items-center justify-center px-[4px] py-0 relative rounded-br-[4px] shrink-0 min-w-[72px] h-[20px] transition-colors duration-300 ${isPositive ? 'bg-[#188b3c]' : 'bg-[#ff3232]'}`}
              >
                <div aria-hidden="true" className="absolute border-2 border-white/20 border-dashed inset-[-2px] pointer-events-none rounded-br-[5px]" />
                <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap">
                  <p className="leading-[20px] whitespace-pre">{isPositive ? '+' : ''}{formatNumber(pnl)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bet Amount - Right (Transform smoothly from left to right) */}
        {state !== 'idle' && (
          <div className="relative shrink-0 z-[1] animate-[footerSlideRight_0.5s_ease-out]">
            <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic text-[12px] text-[rgba(255,255,255,0.72)] text-center whitespace-nowrap">
              <p className="leading-[20px] whitespace-pre">Bet Amount: {formatNumber(betAmount)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Inside({ 
  state, 
  countdown, 
  mode, 
  direction, 
  showElements, 
  entryPrice, 
  onPriceUpdate,
  onPriceDirectionUpdate,
  betAmount,
  selectedPair
}: { 
  state: LiveChartState; 
  countdown?: number; 
  mode?: '30s' | '60s' | 'price'; 
  direction?: 'up' | 'down'; 
  showElements: boolean; 
  entryPrice?: number; 
  onPriceUpdate?: (price: number) => void;
  onPriceDirectionUpdate?: (direction: 'up' | 'down' | 'neutral') => void;
  betAmount?: number;
  selectedPair: TradingPair;
}) {
  const [currentPrice, setCurrentPrice] = useState<number>(() => getBasePriceForPair(selectedPair));

  // ✅ Reset currentPrice when pair changes
  useEffect(() => {
    setCurrentPrice(getBasePriceForPair(selectedPair));
  }, [selectedPair]);

  const handleInternalPriceUpdate = (price: number) => {
    setCurrentPrice(price);
    if (onPriceUpdate) {
      onPriceUpdate(price);
    }
  };

  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] w-full z-[6] overflow-hidden" data-name="inside" style={{ background: "radial-gradient(131.72% 191.3% at 28.74% -94.84%, #323842 0%, #1F2026 52.33%, #1D1F27 72.1%, #080910 100%)" }}>
      <div className="flex flex-col items-center justify-between rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-between pl-[8px] pr-[2px] py-[8px] relative size-full gap-[4px]">
          <FloatingOverlay state={state} direction={direction} showElements={showElements} entryPrice={entryPrice} />
          {/* ✅ Add key to force complete remount when pair changes */}
          <Chart key={selectedPair} state={state} onPriceUpdate={handleInternalPriceUpdate} onPriceDirectionUpdate={onPriceDirectionUpdate} direction={direction} entryPrice={entryPrice} selectedPair={selectedPair} />
          <div className="absolute bottom-[-100px] flex h-[148px] items-center justify-center left-[calc(50%-1px)] mix-blend-screen translate-x-[-50%] w-[384px] z-[1]">
            <div className="flex-none rotate-[180deg]">
              <div className="h-[148px] relative w-[384px]" data-name="glowing">
                <div className="absolute inset-[-67.57%_-26.04%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 584 348">
                    <g filter="url(#filter0_f_131_381)" id="glowing" opacity="0.6" style={{ mixBlendMode: "screen" }}>
                      <path d={svgPaths.pb9ebd00} fill="url(#paint0_linear_131_381)" />
                    </g>
                    <defs>
                      <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="348" id="filter0_f_131_381" width="584" x="-1.11793e-07" y="-2.85423e-06">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                        <feGaussianBlur result="effect1_foregroundBlur_131_381" stdDeviation="50" />
                      </filter>
                      <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_131_381" x1="462.596" x2="115.393" y1="176.918" y2="176.918">
                        <stop stopColor="#4EB4FF" stopOpacity="0" />
                        <stop offset="0.359375" stopColor="#2D9AFF" stopOpacity="0.92" />
                        <stop offset="0.51753" stopColor="#1380FF" stopOpacity="0.75589" />
                        <stop offset="0.760516" stopColor="#0A4FFF" stopOpacity="0.869792" />
                        <stop offset="1" stopColor="#0057FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Footer 
            state={state} 
            countdown={countdown} 
            mode={mode} 
            entryPrice={entryPrice} 
            currentPrice={currentPrice} 
            direction={direction} 
            betAmount={betAmount}
          />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_1px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

export default function LiveChartWithStates({ 
  state = 'idle', 
  showWinToast = false, 
  finalPnL = 0,
  countdown, 
  mode = '30s', 
  direction, 
  entryPrice, 
  onPriceUpdate,
  betAmount,
  selectedPair: externalSelectedPair,
  onPairChange
}: LiveChartWithStatesProps) {
  const [showElements, setShowElements] = useState(false);
  const [internalSelectedPair, setInternalSelectedPair] = useState<TradingPair>('BTC/USDT');

  // Use external selected pair if provided, otherwise use internal state
  const selectedPair = externalSelectedPair || internalSelectedPair;
  
  const [currentPrice, setCurrentPrice] = useState<number>(() => getBasePriceForPair(selectedPair));
  const [priceDirection, setPriceDirection] = useState<'up' | 'down' | 'neutral'>('neutral');

  const handlePairChange = (pair: TradingPair) => {
    setInternalSelectedPair(pair);
    if (onPairChange) {
      onPairChange(pair);
    }
  };

  // ✅ Reset currentPrice when pair changes
  useEffect(() => {
    setCurrentPrice(getBasePriceForPair(selectedPair));
  }, [selectedPair]);

  useEffect(() => {
    if (state === 'opened') {
      // Add a delay before showing the elements for smooth animation
      const timer = setTimeout(() => {
        setShowElements(true);
      }, 200); // 200ms delay after clicking button
      return () => clearTimeout(timer);
    } else if (state === 'idle') {
      setShowElements(false);
    }
  }, [state]);
  
  const handlePriceUpdate = (price: number) => {
    setCurrentPrice(price);
    if (onPriceUpdate) {
      onPriceUpdate(price);
    }
  };

  return (
    <div 
      className="relative size-full" 
      style={{ 
        filter: (state === 'opened' || state === 'live') 
          ? 'drop-shadow(0 0 8px rgba(17, 247, 255, 0.1))' 
          : 'drop-shadow(0 0 0px rgba(17, 247, 255, 0))',
        transition: 'filter 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Animated Running Shadow Container - wraps outside to prevent clipping */}
      <div 
        className="absolute pointer-events-none z-[-1]"
        style={{
          animation: (state === 'opened' || state === 'live') ? 'runningShadow 3s ease-in-out infinite' : 'none',
          opacity: (state === 'opened' || state === 'live') ? 1 : 0,
          transition: 'opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />

      {/* Neon Border Trim - only visible during live state */}
      <div 
        className="absolute inset-[-1px] pointer-events-none rounded-[15px] z-3]"
        style={{
          backgroundImage: 'linear-gradient(90deg, rgba(123, 168, 215, 0.9), rgba(123, 168, 215, 0.5), rgba(123, 168, 215, 0.6), rgba(123, 168, 215, 1), rgba(123, 168, 215, 0.9))',
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 50%',
          animation: state === 'live' ? 'neonBorderSpin 3s linear infinite, neonPulse 2s ease-in-out infinite' : 'none',
          WebkitMaskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          padding: '3px',
          filter: 'blur(4px)',
          boxShadow: '2px 4px 48px 0 rgba(17, 247, 255, 0.36), 2px 4px 8px 0 rgba(17, 247, 255, 0.36)',
          opacity: state === 'live' ? 1 : 0,
          transition: 'opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
      
      <div className="bg-gradient-to-b content-stretch flex flex-col from-[#0e4b60] gap-[4px] items-start pb-[8px] pt-[10px] px-[8px] relative rounded-[12px] shadow-[0px_4px_0px_0px_#191e27,0px_8px_12px_-2px_rgba(14,17,22,0.69)] size-full to-[#272d38] overflow-hidden" data-name="live chart">
      {/* Keyframe animation */}
      <style>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes sweepGradientOuter {
          0% {
            transform: translateX(-100%) skewX(-15deg);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
          80% {
            opacity: 0.4;
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
            opacity: 0;
          }
        }
        @keyframes neonBorderSpin {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes neonPulse {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes runningShadow {
          0% {
            box-shadow: 
              2px 4px 48px 0 rgba(17, 247, 255, 0.36),
              0 0 20px 4px gba(17, 247, 255, 0.7);
          }
          25% {
            box-shadow: 
              8px 0 30px 8px rgba(17, 247, 255, 0.36),
              0 0 20px 4px rgba(17, 247, 255, 0.7);
          }
          50% {
            box-shadow: 
              2px 4px 48px 0 rgba(17, 247, 255, 0.36),
              0 0 20px 4px rgba(17, 247, 255, 0.7);
          }
          75% {
            box-shadow: 
              -8px 0 30px 8px rgba(17, 247, 255, 0.36),
              0 0 20px 4px rgba(17, 247, 255, 0.7);
          }
          100% {
            box-shadow: 
              0 -8px 30px 8px rgba(17, 247, 255, 0.36),
              0 0 20px 4px rgba(17, 247, 255, 0.7);
          }
        }
      `}</style>

      {/* Animated sweep effect on outer container - only visible during live state */}
      {state === 'live' && (
        <div 
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(72, 190, 229, 0.15) 20%, rgba(160, 230, 255, 0.25) 40%, rgba(175, 215, 123, 0.3) 50%, rgba(160, 230, 246, 0.25) 60%, rgba(72, 190, 229, 0.15) 80%, transparent 100%)',
            width: '70%',
            animation: 'sweepGradientOuter 5s ease-in-out infinite',
            mixBlendMode: 'screen',
          }}
        />
      )}
      
      {/* Win Toast Overlay */}
      {showWinToast && (
        <div className="absolute inset-0 flex items-center justify-center z-[20] pointer-events-none rounded-[12px]">
          {finalPnL >= 0 ? (
            // WIN: Keep original large design with CSS confetti
            <>
              {/* CSS Confetti Explosion - 30 particles */}
              {Array.from({ length: 30 }).map((_, i) => {
                const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B195'];
                const color = colors[i % colors.length];
                const size = 6 + Math.random() * 6; // 6-12px
                const angle = (i / 30) * 360; // Spread evenly in circle
                const distance = 120 + Math.random() * 80; // 120-200px travel distance
                const duration = 1.2 + Math.random() * 0.8; // 1.2-2s
                const delay = Math.random() * 0.2; // 0-0.2s delay
                const rotation = Math.random() * 720; // 0-720deg rotation
                
                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      backgroundColor: color,
                      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      animation: `confettiExplosion${i} ${duration}s ease-out ${delay}s forwards`,
                      opacity: 0,
                    }}
                  />
                );
              })}
              
              {/* Confetti keyframes */}
              <style>{`
                ${Array.from({ length: 30 }).map((_, i) => {
                  const angle = (i / 30) * 360;
                  const distance = 120 + Math.random() * 80;
                  const rotation = Math.random() * 720;
                  const endX = Math.cos(angle * Math.PI / 180) * distance;
                  const endY = Math.sin(angle * Math.PI / 180) * distance;
                  
                  return `
                    @keyframes confettiExplosion${i} {
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
              
              <div 
                className="animate-[bounceIn_0.5s_ease-out] px-12 py-6 rounded-2xl shadow-lg border border-white/20 bg-gradient-to-b from-[#2ddb64] to-[#1fb74f] relative z-[1]"
              >
                <div className="text-white text-center">
                  <div className="text-5xl font-bold mb-2 drop-shadow-lg" style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif" }}>
                    {CHART_TEXT.WIN_TEXT}
                  </div>
                  <div className="text-2xl font-semibold" style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif" }}>
                    +{formatNumber(finalPnL)}
                  </div>
                </div>
              </div>
            </>
          ) : (
            // LOSS: Compact single-row design (48px height, hug content width)
            <div 
              className="animate-[bounceIn_0.5s_ease-out] h-[48px] px-6 rounded-2xl shadow-lg border border-white/20 bg-gradient-to-b from-[#ff4d4d] to-[#cc0000] flex items-center gap-4"
            >
              <div className="text-white text-lg font-bold drop-shadow-lg whitespace-nowrap" style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif" }}>
                {CHART_TEXT.LOSS_TEXT}
              </div>
              <div className="text-white text-lg font-semibold whitespace-nowrap" style={{ fontFamily: "'IBM Plex Sans Condensed', sans-serif" }}>
                -{formatNumber(Math.abs(finalPnL))}
              </div>
            </div>
          )}
        </div>
      )}
      
      <Title 
        currentPrice={currentPrice} 
        entryPrice={entryPrice}
        priceDirection={priceDirection}
        selectedPair={selectedPair}
        onSelectPair={handlePairChange}
        state={state}
      />
      {/* ✅ Add key to force complete remount when pair changes */}
      <Inside key={selectedPair} state={state} countdown={countdown} mode={mode} direction={direction} showElements={showElements} entryPrice={entryPrice} onPriceUpdate={handlePriceUpdate} onPriceDirectionUpdate={setPriceDirection} betAmount={betAmount} selectedPair={selectedPair} />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0.5px_1px_0px_0px_rgba(88,102,123,0.33),inset_0px_0.2px_1px_0.5px_rgba(133,140,150,0.55)]" />
    </div>
    </div>
  );
}