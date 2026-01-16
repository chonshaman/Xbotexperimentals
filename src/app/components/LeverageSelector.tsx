import { useState, useRef, useEffect } from 'react';

interface LeverageSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export default function LeverageSelector({ value, onChange }: LeverageSelectorProps) {
  const leverageRef = useRef<HTMLDivElement>(null);
  const isLeverageDragging = useRef(false);
  const dragStartY = useRef(0);
  const currentDragY = useRef(0);
  const startLeverageIndex = useRef(0);

  const leverageOptions = [1, 3, 5, 10, 20, 50, 100];
  const currentLeverageIndex = leverageOptions.indexOf(value);

  const handleLeverageClick = (option: number) => {
    if (!isLeverageDragging.current) {
      onChange(option);
    }
  };

  const handleLeverageWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const currentIndex = leverageOptions.indexOf(value);
    
    if (e.deltaY > 0) {
      // Scroll down - increase leverage
      if (currentIndex < leverageOptions.length - 1) {
        onChange(leverageOptions[currentIndex + 1]);
      }
    } else {
      // Scroll up - decrease leverage
      if (currentIndex > 0) {
        onChange(leverageOptions[currentIndex - 1]);
      }
    }
  };

  const calculateLeverageFromDrag = (deltaY: number) => {
    const THRESHOLD = 25; // pixels to move for one step
    const steps = Math.round(deltaY / THRESHOLD);
    const targetIndex = Math.max(0, Math.min(leverageOptions.length - 1, startLeverageIndex.current - steps));
    return targetIndex;
  };

  const handleLeverageMouseDown = (e: React.MouseEvent) => {
    isLeverageDragging.current = true;
    dragStartY.current = e.clientY;
    currentDragY.current = 0;
    startLeverageIndex.current = leverageOptions.indexOf(value);
  };

  const handleLeverageMouseMove = (e: MouseEvent) => {
    if (!isLeverageDragging.current) return;
    
    const deltaY = e.clientY - dragStartY.current;
    currentDragY.current = deltaY;
    
    const targetIndex = calculateLeverageFromDrag(deltaY);
    if (targetIndex !== leverageOptions.indexOf(value)) {
      onChange(leverageOptions[targetIndex]);
    }
  };

  const handleLeverageMouseUp = () => {
    isLeverageDragging.current = false;
    currentDragY.current = 0;
  };

  const handleLeverageTouchStart = (e: React.TouchEvent) => {
    isLeverageDragging.current = true;
    dragStartY.current = e.touches[0].clientY;
    currentDragY.current = 0;
    startLeverageIndex.current = leverageOptions.indexOf(value);
  };

  const handleLeverageTouchMove = (e: TouchEvent) => {
    if (!isLeverageDragging.current || !e.touches[0]) return;
    
    const deltaY = e.touches[0].clientY - dragStartY.current;
    currentDragY.current = deltaY;
    
    const targetIndex = calculateLeverageFromDrag(deltaY);
    if (targetIndex !== leverageOptions.indexOf(value)) {
      onChange(leverageOptions[targetIndex]);
    }
  };

  const handleLeverageTouchEnd = () => {
    isLeverageDragging.current = false;
    currentDragY.current = 0;
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleLeverageMouseMove);
    document.addEventListener('mouseup', handleLeverageMouseUp);
    document.addEventListener('touchmove', handleLeverageTouchMove);
    document.addEventListener('touchend', handleLeverageTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleLeverageMouseMove);
      document.removeEventListener('mouseup', handleLeverageMouseUp);
      document.removeEventListener('touchmove', handleLeverageTouchMove);
      document.removeEventListener('touchend', handleLeverageTouchEnd);
    };
  }, [value]);

  return (
    <div className="control-box">
      <div className="control-box-inner leverage-control">
        <div className="control-label">Leverage</div>
        <div 
          className="leverage-numbers" 
          ref={leverageRef}
          onMouseDown={handleLeverageMouseDown}
          onTouchStart={handleLeverageTouchStart}
          onWheel={handleLeverageWheel}
        >
          <div className="leverage-options-wrapper">
            {leverageOptions.map((option) => {
              const index = leverageOptions.indexOf(option);
              const diff = index - currentLeverageIndex;
              const isActive = option === value;
              
              // Only render center and immediately adjacent options (diff: -1, 0, +1)
              if (Math.abs(diff) > 1) {
                return null;
              }
              
              // Calculate position and styling
              let top = '50%';
              let transform = 'translateY(-50%)';
              let opacity = 0.5;
              let fontSize = '10px';
              let bottom = 'auto';
              let zIndex = 1;
              let padding = '0';
              
              if (diff === 0) {
                // Center - active
                opacity = 1;
                fontSize = '12px';
                zIndex = 10;
                padding = '2px 8px';
              } else if (diff === -1) {
                // One above center
                top = '8px';
                transform = 'translateY(-6px)';
                opacity = 0.5;
                fontSize = '10px';
                zIndex = 5;
              } else if (diff === 1) {
                // One below center
                top = 'auto';
                bottom = '8px';
                transform = 'translateY(6px)';
                opacity = 0.5;
                fontSize = '10px';
                zIndex = 5;
              }
              
              return (
                <div
                  key={option}
                  className={`leverage-option ${isActive ? 'active' : ''}`}
                  style={{
                    top,
                    bottom,
                    transform,
                    opacity,
                    fontSize,
                    zIndex,
                    padding,
                  }}
                  onClick={() => handleLeverageClick(option)}
                >
                  X{option}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
