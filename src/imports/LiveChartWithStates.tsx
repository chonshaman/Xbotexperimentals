import { useState, useEffect } from 'react';
import svgPaths from "./svg-8we49uz6px";
import { Loader2 } from 'lucide-react';

export type LiveChartState = 'idle' | 'opened' | 'live';

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
}

function PriceRight() {
  const [price, setPrice] = useState(96500);
  const [percentage, setPercentage] = useState(16);
  const [isUp, setIsUp] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.48) * 200;
      setPrice(prev => {
        const newPrice = Math.max(95000, Math.min(98000, prev + change));
        const newPercentage = ((newPrice - 96000) / 96000 * 100);
        setPercentage(Number(newPercentage.toFixed(2)));
        setIsUp(newPercentage >= 0);
        return newPrice;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 text-[12px] opacity-90 font-sans" data-name="price right">
      <p className="relative shrink-0 text-white">{`Price: `}</p>
      <p className={`relative shrink-0 transition-colors duration-300 ${isUp ? 'text-[#2ddb64]' : 'text-[#ff3232]'}`}>
        ${formatPrice(price)} ({isUp ? '+' : ''}{percentage.toFixed(2)}%)
      </p>
    </div>
  );
}

function Title() {
  return (
    <div className="relative shrink-0 w-full" data-name="title">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-sans font-semibold items-start justify-between leading-[normal] not-italic relative text-[14px] w-full whitespace-pre">
        <p className="relative shrink-0 text-white uppercase tracking-tight">BTC/USDT LIVE CHART</p>
        <PriceRight />
      </div>
    </div>
  );
}

// State-specific components
function StatusOpened({ direction }: { direction?: 'up' | 'down' }) {
  return (
    <div className="bg-[rgba(0,0,0,0.32)] content-stretch flex items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0 animate-[slideInFromRight_0.3s_ease-out]" data-name="bg">
      <div className="flex flex-col font-sans justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.72)] whitespace-nowrap">
        <p className="leading-[20px] whitespace-pre">Position Opened -</p>
      </div>
      <div className="h-[20px] relative shrink-0 w-[24px]" data-name="up down">
        <div 
          className="absolute flex flex-col font-sans font-semibold inset-0 justify-center leading-[0] not-italic text-[12px] text-center"
          style={{ color: direction === 'down' ? '#ff3232' : '#48bee5' }}
        >
          <p className="leading-[20px] whitespace-pre-wrap">{direction === 'down' ? 'DOWN' : 'UP'}</p>
        </div>
      </div>
    </div>
  );
}

function UpDown({ direction }: { direction?: 'up' | 'down' }) {
  return (
    <div className="h-[20px] relative shrink-0 w-[24px]" data-name="up down">
      <div 
        className="absolute flex flex-col font-sans font-semibold inset-0 justify-center leading-[0] not-italic text-[12px] text-center"
        style={{ color: direction === 'down' ? '#ff3232' : '#48bee5' }}
      >
        <p className="leading-[20px] whitespace-pre-wrap">{direction === 'down' ? 'DOWN' : 'UP'}</p>
      </div>
    </div>
  );
}

function Bg({ direction }: { direction?: 'up' | 'down' }) {
  return (
    <div className="backdrop-blur-[4px] bg-[rgba(0,0,0,0.16)] content-stretch flex items-center justify-center px-[4px] py-0 relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="bg">
      <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.72)]">
        <p className="leading-[20px] whitespace-pre">{`Live Round  -`}</p>
      </div>
      <UpDown direction={direction} />
    </div>
  );
}

function FloatingOverlay({ state, direction, showElements }: { state: LiveChartState; direction?: 'up' | 'down'; showElements: boolean }) {
  if (state === 'idle') return null;
  
  return (
    <div className="absolute left-[8px] top-[16px] w-[376px] z-[4]" data-name="floating">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative w-full">
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

function LiveIndicator({ currentPriceY, entryPriceY, direction, entryPriceValue }: { currentPriceY: number; entryPriceY: number; direction?: 'up' | 'down'; entryPriceValue?: number }) {
  // entryPriceY is the Y coordinate where we should draw the entry price line
  const greenHeight = entryPriceY;
  const redHeight = 180 - entryPriceY;
  
  // Format price with comma separator and 2 decimals
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  
  return (
    <div className="absolute h-[180px] left-0 top-0 w-full pointer-events-none" data-name="liveindicator">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 324 180">
        <g id="liveindicator">
          {/* Green zone - above entry price */}
          <g id="greenzone">
            <rect fill="url(#paint0_linear_live_indicator)" height={greenHeight} width="324" />
          </g>
          {/* Dashed line at entry price */}
          <line id="dash" stroke="white" strokeDasharray="2 2" strokeOpacity="0.72" x2="324" y1={entryPriceY} y2={entryPriceY} />
          {/* Red zone - below entry price */}
          <g id="redzone">
            <rect fill="url(#paint1_linear_live_indicator)" height={redHeight} transform={`translate(0 ${entryPriceY})`} width="324" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_live_indicator" x1="162" x2="162" y1="0" y2={greenHeight}>
            <stop stopColor="#8BB91E" stopOpacity="0" />
            <stop offset="0.207696" stopColor="#5DBC3D" stopOpacity="0.04" />
            <stop offset="0.4375" stopColor="#39BF56" stopOpacity="0.2" />
            <stop offset="1" stopColor="#36B91E" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_live_indicator" x1="162" x2="162" y1="0" y2={redHeight}>
            <stop stopColor="#E5484B" stopOpacity="0.6" />
            <stop offset="0.5625" stopColor="#E5484B" stopOpacity="0.2" />
            <stop offset="0.95" stopColor="#E5484B" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Entry Price Badge - positioned at entry price line */}
      <div 
        className="absolute pointer-events-none left-[16px]"
        style={{ 
          top: `${entryPriceY}px`,
          transform: 'translate(0, -50%)',
        }}
      >
        <div className="content-stretch flex gap-px items-center relative shrink-0" data-name="entry price">
          <div className="backdrop-blur-[4px] bg-[rgba(0,0,0,0.16)] content-stretch flex flex-col items-center justify-center px-[4px] py-0 relative rounded-bl-[4px] rounded-tl-[4px] shrink-0">
            <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
              <p className="leading-[20px] whitespace-nowrap">Entry Price</p>
            </div>
          </div>
          <div 
            className="content-stretch flex items-center justify-center px-[4px] py-0 relative rounded-br-[4px] rounded-tr-[4px] shrink-0"
            style={{
              backgroundColor: direction === 'up' ? '#1f61b7' : '#b7341f'
            }}
          >
            <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">
              <p className="leading-[20px] whitespace-pre">{entryPriceValue ? formatPrice(entryPriceValue) : '0.00'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chart1AndPrice({ state, onPriceUpdate, direction, entryPrice }: { state: LiveChartState; onPriceUpdate?: (price: number) => void; direction?: 'up' | 'down'; entryPrice?: number }) {
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  const [prices, setPrices] = useState<string[]>(['3936.17', '3935.17', '3935.09', '3934.17', '3933.04', '3932.00']);
  const [currentPrice, setCurrentPrice] = useState(96500);
  const [prevPrice, setPrevPrice] = useState(96500);
  const [entryDataPoint, setEntryDataPoint] = useState<number>(100); // Store entry price as data point

  useEffect(() => {
    // Initialize with 50 data points
    const initial = Array.from({ length: 50 }, (_, i) => {
      return 100 + Math.sin(i * 0.3) * 30 + Math.random() * 20;
    });
    setDataPoints(initial);

    // Capture the entry price data point when transitioning to live state
    if (state === 'live' && entryPrice && initial.length > 0) {
      // The entry price corresponds to the last data point when entering live state
      const lastPoint = initial[initial.length - 1];
      setEntryDataPoint(lastPoint);
    }

    // Animate chart - update every 400ms for more real-time feel
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const newPoints = [...prev];
        newPoints.shift();
        const lastPoint = newPoints[newPoints.length - 1];
        // Increased volatility for more dramatic price action
        const change = (Math.random() - 0.5) * 25; 
        const newPoint = Math.max(40, Math.min(160, lastPoint + change));
        newPoints.push(newPoint);
        
        const maxValue = Math.max(...newPoints);
        const minValue = Math.min(...newPoints);
        const range = maxValue - minValue;
        const step = range / 5;
        
        const newPrices = Array.from({ length: 6 }, (_, i) => {
          const value = maxValue - (i * step);
          const basePrice = 96500;
          const priceVariation = ((value - 100) / 100) * 80;
          return (basePrice + priceVariation).toFixed(2);
        });
        
        setPrices(newPrices);
        
        const basePrice = 96500;
        const priceVariation = ((newPoint - 100) / 100) * 80;
        const newCurrentPrice = basePrice + priceVariation;
        
        setPrevPrice(currentPrice);
        setCurrentPrice(newCurrentPrice);
        
        return newPoints;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [currentPrice, state, entryPrice]);

  // Separate useEffect to call onPriceUpdate after currentPrice changes
  useEffect(() => {
    if (onPriceUpdate) {
      onPriceUpdate(currentPrice);
    }
  }, [currentPrice, onPriceUpdate]);

  // Generate SVG path from data points for stroke
  const generatePath = (points: number[]) => {
    if (points.length === 0) return '';
    const width = 324;
    const height = 180;
    const xStep = width / (points.length - 1);
    
    let path = `M 0 ${height - points[0]}`;
    for (let i = 1; i < points.length; i++) {
      const x = i * xStep;
      const y = height - points[i];
      path += ` L ${x} ${y}`;
    }
    return path;
  };

  // Generate area path (for gradient fill) - starts from the line and goes down
  const generateAreaPath = (points: number[]) => {
    if (points.length === 0) return '';
    const width = 324;
    const height = 180;
    const xStep = width / (points.length - 1);
    
    // Start from the first point on the line
    let path = `M 0 ${height - points[0]}`;
    
    // Draw along the line
    for (let i = 1; i < points.length; i++) {
      const x = i * xStep;
      const y = height - points[i];
      path += ` L ${x} ${y}`;
    }
    
    // Close the path by going down and back to start
    path += ` L ${width} ${height}`;
    path += ` L 0 ${height}`;
    path += ' Z';
    return path;
  };

  const linePath = generatePath(dataPoints);
  const areaPath = generateAreaPath(dataPoints);
  
  // Get the latest point position for the dot - calculate as percentage
  const latestPoint = dataPoints[dataPoints.length - 1] || 100;
  const dotYPosition = ((180 - latestPoint) / 180) * 100; // Convert to percentage
  const currentPriceYCoord = 180 - latestPoint; // Y coordinate in SVG pixels where the line ends
  
  // Determine price direction
  const isPriceUp = currentPrice >= prevPrice;
  
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
    return state === 'live' ? '6' : '4';
  };

  const getGlowColorMatrix = () => {
    return state === 'live'
      ? "0 0 0 0 0.6863 0 0 0 0 0.8431 0 0 0 0 0.4824 0 0 0 1 0" // #AFD77B
      : "0 0 0 0 0.282353 0 0 0 0 0.745098 0 0 0 0 0.898039 0 0 0 1 0"; // #48BEE5
  };

  return (
    <>
      <div className="h-full relative shrink-0 w-full" data-name="chart">
        {/* Combined stroke and fill in one SVG to eliminate gaps */}
        <div 
          className={`transition-all duration-500 ease-out ${state === 'live' ? 'absolute inset-0' : 'absolute inset-[8.51%_0_22%_0]'}`}
          data-name="chart-container"
        >
          {/* Live indicator overlay - only in live state */}
          {state === 'live' && <LiveIndicator currentPriceY={currentPriceYCoord} entryPriceY={entryDataPoint} direction={direction} entryPriceValue={entryPrice} />}
          
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
            <path d={areaPath} fill={`url(#${getFillGradientId()})`} />
            
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
            />
          </svg>
          
          {/* Current position dot - positioned using percentage like LiveChart.tsx */}
          <div 
            className="absolute pointer-events-none"
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
            className="absolute pointer-events-none"
            style={{ 
              right: '24px',
              top: `${dotYPosition}%`,
              transform: 'translate(0, -50%)',
            }}
          >
            <div 
              className="font-sans font-semibold text-[11px] text-white px-[6px] py-[2px] rounded-[4px] shadow-lg transition-colors duration-300"
              style={{
                backgroundColor: isPriceUp ? '#2ddb64' : '#ff3232',
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
    <div className="content-stretch flex flex-col font-sans h-full items-start justify-between leading-[20px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.7)] whitespace-pre" data-name="price">
      {prices.map((price, index) => (
        <p key={index} className="relative shrink-0">{formatPrice(price)}</p>
      ))}
    </div>
  );
}

function Content({ state, onPriceUpdate, direction, entryPrice }: { state: LiveChartState; onPriceUpdate?: (price: number) => void; direction?: 'up' | 'down'; entryPrice?: number }) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full h-full" data-name="content">
      <div className="flex flex-row justify-end size-full">
        <div className="content-stretch flex gap-[9px] items-start justify-end pl-0 pr-[6px] py-0 relative size-full">
          <Chart1AndPrice state={state} onPriceUpdate={onPriceUpdate} direction={direction} entryPrice={entryPrice} />
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
        <div className="content-stretch flex font-sans items-end justify-between leading-[0] not-italic pl-0 pr-[40px] py-0 relative text-[10px] text-[rgba(255,255,255,0.7)] w-full">
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

function Chart({ state, onPriceUpdate, direction, entryPrice }: { state: LiveChartState; onPriceUpdate?: (price: number) => void; direction?: 'up' | 'down'; entryPrice?: number }) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full z-[2]" data-name="chart">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between relative size-full">
        <Content state={state} onPriceUpdate={onPriceUpdate} direction={direction} entryPrice={entryPrice} />
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
  const [internalPrice, setInternalPrice] = useState(externalCurrentPrice || 96500);

  useEffect(() => {
    if (externalCurrentPrice) {
      setInternalPrice(externalCurrentPrice);
    }
  }, [externalCurrentPrice]);

  const getSettleText = () => {
    if (state === 'opened') return 'Starting round…';
    if (state === 'live' && countdown !== undefined) {
      return `Settles in ${countdown}s`;
    }
    return '';
  };

  const calculatePnL = () => {
    if (!entryPrice || !internalPrice || !direction || countdown === undefined) return 0;
    
    const sigma = 0.0001; 
    const stake = betAmount;
    const payoutMultiplier = 1.95; 
    const netProfit = stake * (payoutMultiplier - 1);
    const t = Math.max(1, countdown);
    
    const priceDiff = internalPrice - entryPrice;
    const z = priceDiff / (entryPrice * sigma * Math.sqrt(t));
    
    const k = direction === 'up' ? z : -z;
    const pWin = 1 / (1 + Math.exp(-1.702 * k));
    
    const ev = (pWin * netProfit) - ((1 - pWin) * stake);
    return ev;
  };

  const pnl = calculatePnL();
  const isPositive = pnl >= 0;

  return (
    <div 
      className={`relative rounded-[10px] shrink-0 w-full z-[0] transition-all duration-500 ease-out translate-y-0 opacity-100`}
      data-name="footer" 
      style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 376 28\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.6000000238418579\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(16.035 4.6542e-15 8.0454e-12 0.039007 170.49 0.73684)\\'><stop stop-color=\\'rgba(160,230,246,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(160,230,246,1)\\' offset=\\'0.22115\\'/><stop stop-color=\\'rgba(160,230,246,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 376 28\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.6000000238418579\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(14.837 1.3021e-15 1.648e-12 0.02123 178.78 26.526)\\'><stop stop-color=\\'rgba(160,230,246,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(160,230,246,1)\\' offset=\\'0.22115\\'/><stop stop-color=\\'rgba(160,230,246,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), linear-gradient(1.0372e-07deg, rgb(12, 8, 17) 37.778%, rgb(41, 45, 52) 100%)" }}
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
      `}</style>
      <div aria-hidden="true" className="absolute border border-[rgba(130,207,255,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex isolate items-center px-[10px] py-[4px] relative w-full" style={{ justifyContent: state === 'idle' ? 'center' : 'space-between' }}>
        {/* Settle Status - Left (Transform smoothly from right to left) */}
        {state !== 'idle' && (
          <div className="content-stretch flex items-center gap-2 py-0 relative shrink-0 z-[3] animate-[footerSlideLeft_0.5s_ease-out]" data-name="settle status">
            {state === 'opened' && (
              <Loader2 className="w-4 h-4 text-[rgba(255,255,255,0.72)] animate-spin" />
            )}
            <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.72)] text-center whitespace-nowrap">
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
          <div className="content-stretch flex flex-col h-[21px] items-center justify-center relative shrink-0 z-[2]" data-name="pnl">
            <div className="content-stretch flex gap-px items-center relative shrink-0">
              <div className="bg-[rgba(255,255,255,0.2)] content-stretch flex flex-col h-[20px] items-center justify-center px-[4px] py-0 relative rounded-bl-[4px] shrink-0">
                <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.2)] border-b-2 border-dashed border-t-2 inset-[-2px_0] pointer-events-none rounded-bl-[4px]" />
                <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
                  <p className="leading-[20px] whitespace-pre-wrap">PnL</p>
                </div>
              </div>
              <div 
                className={`content-stretch flex items-center justify-center px-[4px] py-0 relative rounded-br-[4px] shrink-0 w-[54px] transition-colors duration-300 ${isPositive ? 'bg-[#188b3c]' : 'bg-[#ff3232]'}`}
              >
                <div aria-hidden="true" className="absolute border border-white/20 border-dashed inset-[-1px] pointer-events-none rounded-br-[5px]" />
                <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap">
                  <p className="leading-[20px] whitespace-pre">{isPositive ? '+' : ''}{pnl.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bet Amount - Right (Transform smoothly from left to right) */}
        {state !== 'idle' && (
          <div className="relative shrink-0 z-[1] animate-[footerSlideRight_0.5s_ease-out]">
            <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic text-[12px] text-[rgba(255,255,255,0.72)] text-center whitespace-nowrap">
              <p className="leading-[20px] whitespace-pre">Bet Amount: {betAmount}</p>
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
  betAmount
}: { 
  state: LiveChartState; 
  countdown?: number; 
  mode?: '30s' | '60s' | 'price'; 
  direction?: 'up' | 'down'; 
  showElements: boolean; 
  entryPrice?: number; 
  onPriceUpdate?: (price: number) => void;
  betAmount?: number;
}) {
  const [currentPrice, setCurrentPrice] = useState<number>(96500);

  const handleInternalPriceUpdate = (price: number) => {
    setCurrentPrice(price);
    if (onPriceUpdate) {
      onPriceUpdate(price);
    }
  };

  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] w-full z-[6]" data-name="inside" style={{ background: "radial-gradient(131.72% 191.3% at 28.74% -94.84%, #323842 0%, #1F2026 52.33%, #1D1F27 72.1%, #080910 100%)" }}>
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col isolate items-center justify-center pl-[8px] pr-[2px] py-[8px] relative size-full gap-[4px]">
          <FloatingOverlay state={state} direction={direction} showElements={showElements} entryPrice={entryPrice} />
          <Chart state={state} onPriceUpdate={handleInternalPriceUpdate} direction={direction} entryPrice={entryPrice} />
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
  betAmount
}: LiveChartWithStatesProps) {
  const [showElements, setShowElements] = useState(false);
  const [currentPrice, setCurrentPrice] = useState<number>(96500);

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
            opacity: 0.4;
          }
          50% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.4;
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Animated sweep effect on outer container - only visible during live state */}
      {state === 'live' && (
        <div 
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(72, 190, 229, 0.15) 20%, rgba(160, 230, 246, 0.25) 40%, rgba(175, 215, 123, 0.3) 50%, rgba(160, 230, 246, 0.25) 60%, rgba(72, 190, 229, 0.15) 80%, transparent 100%)',
            width: '70%',
            animation: 'sweepGradientOuter 5s ease-in-out infinite',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Win Toast Overlay */}
      {showWinToast && (
        <div className="absolute inset-0 flex items-center justify-center z-[20] pointer-events-none rounded-[12px]">
          <div 
            className={`animate-[bounceIn_0.5s_ease-out] px-12 py-6 rounded-2xl shadow-lg border border-white/20 ${finalPnL >= 0 ? 'bg-gradient-to-b from-[#2ddb64] to-[#1fb74f]' : 'bg-gradient-to-b from-[#ff4d4d] to-[#cc0000]'}`}
          >
            <div className="text-white text-center">
              <div className="text-5xl font-bold mb-2 drop-shadow-lg font-sans">
                {finalPnL >= 0 ? 'WIN!' : 'LOSS'}
              </div>
              <div className="text-2xl font-semibold font-sans">
                {finalPnL >= 0 ? `+${finalPnL.toFixed(2)}` : finalPnL.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Title />
      <Inside state={state} countdown={countdown} mode={mode} direction={direction} showElements={showElements} entryPrice={entryPrice} onPriceUpdate={handlePriceUpdate} betAmount={betAmount} />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0.5px_1px_0px_0px_rgba(88,102,123,0.33),inset_0px_0.2px_1px_0.5px_rgba(133,140,150,0.55)]" />
    </div>
  );
}