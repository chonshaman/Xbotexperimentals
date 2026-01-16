import svgPaths from "./svg-8we49uz6px";
import { useState, useEffect, useRef, useCallback } from 'react';

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
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="price right">
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
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-['IBM_Plex_Sans_Condensed:SemiBold',sans-serif] items-start justify-between leading-[normal] not-italic relative text-[16px] w-full whitespace-pre">
        <p className="relative shrink-0 text-white">BTC/USDT LIVE CHART</p>
        <PriceRight />
      </div>
    </div>
  );
}

function Chart1AndPrice() {
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  const [prices, setPrices] = useState<string[]>(['3936.17', '3935.17', '3935.09', '3934.17', '3933.04', '3932.00']);
  const [currentPrice, setCurrentPrice] = useState(96500);
  const [prevPrice, setPrevPrice] = useState(96500);

  useEffect(() => {
    // Initialize with 50 data points
    const initial = Array.from({ length: 50 }, (_, i) => {
      return 100 + Math.sin(i * 0.3) * 30 + Math.random() * 20;
    });
    setDataPoints(initial);

    // Animate chart - update every 800ms for smooth, slower animation
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const newPoints = [...prev];
        // Shift all points left
        newPoints.shift();
        // Add new random point at the end
        const lastPoint = newPoints[newPoints.length - 1];
        const change = (Math.random() - 0.5) * 15;
        const newPoint = Math.max(50, Math.min(150, lastPoint + change));
        newPoints.push(newPoint);
        
        // Calculate prices immediately based on new data with more dramatic variation
        const maxValue = Math.max(...newPoints);
        const minValue = Math.min(...newPoints);
        const range = maxValue - minValue;
        const step = range / 5;
        
        // Create 6 price levels from max to min with more visible changes
        const newPrices = Array.from({ length: 6 }, (_, i) => {
          const value = maxValue - (i * step);
          const basePrice = 96500; // Base BTC price
          const priceVariation = ((value - 100) / 100) * 50; // Increased from 4 to 50 for more variation
          return (basePrice + priceVariation).toFixed(2);
        });
        
        setPrices(newPrices);
        
        // Calculate current price from the latest point
        const basePrice = 96500;
        const priceVariation = ((newPoint - 100) / 100) * 50;
        const newCurrentPrice = basePrice + priceVariation;
        
        setPrevPrice(currentPrice);
        setCurrentPrice(newCurrentPrice);
        
        return newPoints;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [currentPrice]);

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
  
  // Determine price direction
  const isPriceUp = currentPrice >= prevPrice;
  
  // Format price with comma separator and 2 decimals
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <>
      <div className="h-full relative shrink-0 w-[324px]" data-name="chart">
        {/* Combined stroke and fill in one SVG to eliminate gaps */}
        <div className="absolute inset-[8.51%_0_23%_0]" data-name="chart-container">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 324 180">
            <defs>
              {/* Gradient for fill */}
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_animated" x1="162" x2="162" y1="0" y2="180">
                <stop stopColor="#48BEE5" stopOpacity="0.6" />
                <stop offset="0.5625" stopColor="#48BEE5" stopOpacity="0.2" />
                <stop offset="0.95" stopColor="#48BEE5" stopOpacity="0" />
              </linearGradient>
              {/* Glow filter for stroke */}
              <filter id="glow_filter" x="-50%" y="-50%" width="500%" height="500%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.282353 0 0 0 0 0.745098 0 0 0 0 0.898039 0 0 0 1 0" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            {/* Background gradient fill */}
            <path d={areaPath} fill="url(#paint0_linear_animated)" />
            
            {/* Glowing stroke line on top */}
            <path 
              d={linePath} 
              shapeRendering="geometricPrecision" 
              stroke="#48BEE5" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill="none"
              filter="url(#glow_filter)"
            />
          </svg>
          
          {/* Current position dot - matching slider thumb style exactly */}
          <div 
            className="absolute pointer-events-none transition-all duration-[800ms] ease-linear"
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
            className="absolute pointer-events-none transition-all duration-[800ms] ease-linear"
            style={{ 
              right: '24px',
              top: `${dotYPosition}%`,
              transform: 'translate(0, -50%)',
            }}
          >
            <div 
              className="font-['IBM_Plex_Sans:SemiBold',sans-serif] text-[11px] text-white px-[6px] py-[2px] rounded-[4px] shadow-lg transition-colors duration-300"
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
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] h-full items-start justify-between leading-[20px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.7)] whitespace-pre" data-name="price">
      {prices.map((price, index) => (
        <p key={index} className="relative shrink-0">{formatPrice(price)}</p>
      ))}
    </div>
  );
}

function Sl() {
  return (
    <div className="absolute content-stretch flex flex-col h-[21px] items-end justify-center left-px top-[100px] w-[379px]" data-name="sl">
      <div className="h-0 relative shrink-0 w-full" data-name="dot">
        <div className="absolute inset-[-15.5px_-5.01%_-23.5px_-5.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 417 39">
            <g filter="url(#filter0_d_131_383)" id="dot">
              <path d="M19 15.5H398" stroke="var(--stroke-0, #E5484B)" strokeDasharray="2 2" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="39" id="filter0_d_131_383" width="417" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="9.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_131_383" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_131_383" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="content-stretch flex gap-px items-center relative shrink-0" data-name="slbox">
        <div className="bg-[#ff3232] content-stretch flex flex-col items-center justify-center px-[4px] py-0 relative rounded-bl-[3px] shrink-0">
          <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white w-full">
            <p className="leading-[20px] whitespace-pre-wrap">SL</p>
          </div>
        </div>
        <div className="bg-[#ff3232] content-stretch flex items-center justify-center px-[4px] py-0 relative rounded-br-[3px] shrink-0">
          <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white whitespace-nowrap">
            <p className="leading-[20px] whitespace-pre">3,932.04</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content() {
  const [prices, setPrices] = useState<string[]>(['3936.17', '3935.17', '3935.09', '3934.17', '3933.04', '3932.00']);
  
  const handleDataUpdate = useCallback((newPrices: string[]) => {
    setPrices(newPrices);
  }, []);

  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="content">
      <div className="flex flex-row justify-end size-full">
        <div className="content-stretch flex gap-[9px] items-start justify-end pl-0 pr-[6px] py-0 relative size-full">
          <Chart1AndPrice />
          <Sl />
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
        <div className="content-stretch flex font-['IBM_Plex_Sans:Regular',sans-serif] items-end justify-between leading-[0] not-italic pl-0 pr-[40px] py-0 relative text-[10px] text-[rgba(255,255,255,0.7)] w-full">
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

function Chart() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full z-[2]" data-name="chart">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between relative size-full">
        <Content />
        <Time />
      </div>
    </div>
  );
}

function Inside() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] w-full" data-name="inside" style={{ background: "radial-gradient(131.72% 191.3% at 28.74% -94.84%, #323842 0%, #1F2026 52.33%, #1D1F27 72.1%, #080910 100%)" }}>
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col isolate items-center justify-center pl-[8px] pr-[2px] py-[8px] relative size-full">
          <Chart />
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
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_1px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

export default function LiveChart() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#0e4b60] gap-[4px] items-start pb-[8px] pt-[10px] px-[8px] relative rounded-[12px] shadow-[0px_4px_0px_0px_#191e27,0px_8px_12px_-2px_rgba(14,17,22,0.69)] size-full to-[#272d38]" data-name="live chart">
      <Title />
      <Inside />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0.5px_1px_0px_0px_rgba(88,102,123,0.33),inset_0px_0.2px_1px_0.5px_rgba(133,140,150,0.55)]" />
    </div>
  );
}