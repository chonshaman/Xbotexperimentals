import { useState, useRef, useEffect } from 'react';

interface MarginSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function MarginSlider({ value, onChange }: MarginSliderProps) {
  const marginOptions = [10, 20, 50, 100, 500];
  const [selectedIndex, setSelectedIndex] = useState(3); // Default to 100
  const [animationKey, setAnimationKey] = useState(0); // Key to trigger re-animation
  const [animationDirection, setAnimationDirection] = useState<'up' | 'down'>('up');
  const prevIndexRef = useRef(3);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Update value when selectedIndex changes
  useEffect(() => {
    if (onChange && typeof onChange === 'function') {
      onChange(marginOptions[selectedIndex]);
    }
    
    // Determine animation direction based on index change
    if (selectedIndex > prevIndexRef.current) {
      setAnimationDirection('up'); // Value increased, slide up
    } else if (selectedIndex < prevIndexRef.current) {
      setAnimationDirection('down'); // Value decreased, slide down
    }
    
    prevIndexRef.current = selectedIndex;
    setAnimationKey(prev => prev + 1); // Trigger animation on value change
  }, [selectedIndex]); // Removed onChange from dependencies

  const updateSliderFromPosition = (clientX: number) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    // Map percentage to index (0-100% -> 0-4 index)
    const newIndex = Math.round((percentage / 100) * (marginOptions.length - 1));
    setSelectedIndex(newIndex);
  };

  const handleTapOnNumber = (index: number) => {
    setSelectedIndex(index);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    updateSliderFromPosition(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current) {
      updateSliderFromPosition(e.clientX);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    updateSliderFromPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging.current && e.touches[0]) {
      updateSliderFromPosition(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Calculate progress width percentage (0-4 index -> 0-100%)
  const progressWidth = (selectedIndex / (marginOptions.length - 1)) * 100;
  
  // Calculate rotation angle for the thumb (rotates as slider moves)
  const thumbRotation = selectedIndex * 72; // 72 degrees per step for smooth rotation

  return (
    <div className="trading-panel-slider-section">
      <div className="trading-panel-slider-label" style={{ justifyContent: 'center', overflow: 'hidden', height: '24px' }}>
        <span className="label-text" style={{ opacity: 0.72 }}>Bet Amount</span>
        <span 
          key={animationKey} 
          className="label-value"
          style={{
            animation: `slideUpDown${animationDirection} 0.3s ease-in-out`,
          }}
        >
          {marginOptions[selectedIndex]} USDT
        </span>
      </div>
      
      {/* Slider Container */}
      <div className="relative w-full">
        {/* Background Slider Track */}
        <div 
          className="relative h-[24px] w-full cursor-pointer max-[375px]:h-[22px] max-[340px]:h-[20px] max-[320px]:h-[18px]"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Background track with inset shadow */}
          <div 
            className="absolute left-0 right-0 top-0 h-[24px] rounded-[36px] px-[3px] py-[4px] max-[375px]:h-[22px] max-[375px]:px-[2.5px] max-[375px]:py-[3.5px] max-[340px]:h-[20px] max-[340px]:px-[2px] max-[340px]:py-[3px] max-[320px]:h-[18px]"
            style={{
              background: 'linear-gradient(180deg, #2E3138 0%, #1A1D23 100%)',
              border: '3px solid #52566a',
              boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25), inset 0px 1px 8px 0px black',
            }}
          >
            {/* Inner lines container - 3 white lines at 10% opacity */}
            <div className="flex items-start justify-between h-full px-0 py-[2px] w-full max-[340px]:py-[1.5px]">
              <div className="bg-[#0e0707] h-full opacity-0 w-[2px] max-[340px]:w-[1.5px]" />
              <div className="bg-[rgba(255,255,255,0.1)] h-full w-[2px] max-[340px]:w-[1.5px]" />
              <div className="bg-[rgba(255,255,255,0.1)] h-full w-[2px] max-[340px]:w-[1.5px]" />
              <div className="bg-[rgba(255,255,255,0.1)] h-full w-[2px] max-[340px]:w-[1.5px]" />
              <div className="bg-[#0e0707] h-full opacity-0 w-[2px] max-[340px]:w-[1.5px]" />
            </div>
          </div>

          {/* Progress Bar Blur Layer - Duplicate with 16px blur */}
          <div 
            className="absolute left-[4px] top-1/2 -translate-y-1/2 h-[16px] rounded-[28px] transition-all duration-200 ease-out max-[375px]:h-[14px] max-[375px]:left-[3.5px] max-[340px]:h-[12px] max-[340px]:left-[3px] max-[320px]:h-[11px]"
            style={{
              width: `calc(${progressWidth}% - ${progressWidth * 0.04}px + 16px)`,
              maxWidth: 'calc(100% - 4px)',
              minWidth: '24px',
              background: 'linear-gradient(rgb(60 215 255) 0%, rgb(36, 91, 184) 100%)',
              filter: 'blur(16px)',
              zIndex: 1,
            }}
          />

          {/* Progress Bar - No white lines */}
          <div 
            className="absolute left-[4px] top-1/2 -translate-y-1/2 h-[16px] rounded-[28px] transition-all duration-200 ease-out max-[375px]:h-[14px] max-[375px]:left-[3.5px] max-[340px]:h-[12px] max-[340px]:left-[3px] max-[320px]:h-[11px]"
            style={{
              width: `calc(${progressWidth}% - ${progressWidth * 0.04}px + 16px)`,
              maxWidth: 'calc(100% - 4px)',
              minWidth: '24px',
              background: 'linear-gradient(180deg, #2F7AEC 0%, #245BB8 100%)',
              boxShadow: '0px 1px 6px 0px rgba(47,122,236,0.4), inset 0px 1px 1px 0px rgba(0,0,0,0.25)',
              zIndex: 2,
            }}
          >
            {/* Thumb/Knob */}
            <div 
              className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-[36px] h-[36px] z-[2] pointer-events-none transition-transform duration-500 ease-out max-[375px]:w-[32px] max-[375px]:h-[32px] max-[375px]:right-[-3.5px] max-[340px]:w-[28px] max-[340px]:h-[28px] max-[340px]:right-[-3px] max-[320px]:w-[26px] max-[320px]:h-[26px]"
              style={{
                background: 'conic-gradient(from 25deg at 50% 50%, #EBEBEB 8.526539951562881deg, #A6A6A6 31.273336708545685deg, #EBEBEB 60.399945974349976deg, #B8B8B8 74.53422725200653deg, #EDEDED 84.85412299633026deg, #ABABAB 93.26865792274475deg, #F0F0F0 130.0709366798401deg, #D1D1D1 156.95856928825378deg, #B0B0B0 175.30829071998596deg, #EBEBEB 184.46789503097534deg, #DEDEDE 190.88155031204224deg, #EBEBEB 208.86048316955566deg, #C7C7C7 227.78544187545776deg, #C4C4C4 256.4226794242859deg, #ADADAD 264.3653440475464deg, #BDBDBD 269.2746877670288deg, #E5E5E5 276.247980594635deg, #ABABAB 348.82035970687866deg, #C2C2C2 355.37188053131104deg, #CCC 360deg)',
                border: '2.5px solid #E7E7E7',
                borderRadius: '50%',
                boxShadow: '1px 4px 6px rgba(0, 0, 0, 0.36), 0 1px 0 rgba(0, 0, 0, 0.12)',
                transform: `rotate(${thumbRotation}deg)`,
              }}
            >
              {/* Specular highlight */}
              <div
                className="absolute inset-[2px] rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.3) 30%, transparent 60%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
        </div>

        {/* Number Labels - Centered with white lines */}
        <div className="relative w-full mt-[4px] max-[340px]:mt-[3px]">
          <div className="flex items-center justify-between w-full px-[3px] max-[340px]:px-[2px]">
            {marginOptions.map((option, index) => {
              // Custom transform for specific numbers to align with white lines
              let customTransform = 'translateX(0)';
              if (option === 50) customTransform = 'translateX(4px)';
              if (option === 100) customTransform = 'translateX(8px)';
              
              return (
                <div 
                  key={option}
                  className="flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => handleTapOnNumber(index)}
                  style={{ transform: customTransform }}
                >
                  <p className="relative shrink-0 font-['IBM_Plex_Sans_Condensed:SemiBold',sans-serif] text-[16px] leading-normal text-black max-[375px]:text-[14px] max-[340px]:text-[13px] max-[320px]:text-[12px]">
                    {option}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}