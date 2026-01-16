import { useState, useRef, useEffect } from 'react';
import './ButtonBlueCSS.css';

type ButtonBlueState = 'default' | 'entry-locked' | 'disabled';

interface ButtonBlueProps {
  state?: ButtonBlueState;
  onClick?: () => void;
  active?: boolean;
}

function RocketBlurredLayer() {
  return (
    <div className="[grid-area:1_/_1] h-[52px] ml-0 mt-0 relative w-[51px]">
      <svg width="51" height="52" fill="none" xmlns="http://www.w3.org/2000/svg" className="block size-full" preserveAspectRatio="none" viewBox="0 0 51 52">
        <g filter="url(#blue_rocket_filter_blur)" strokeWidth="2">
          <path d="M23.875 41.051v-5.928a1 1 0 01.488-.858l5.969-3.564a.988.988 0 011.498.804c.075 1.881.112 4.132-.078 4.86-.207.791-3.673 3.527-6.304 5.485-.654.486-1.573.015-1.573-.799z" stroke="url(#blue_rocket_grad_b)"/>
          <path d="M10.039 27.06l5.867-.211a.996.996 0 00.797-.448l3.554-5.409a.988.988 0 00-.826-1.534c-1.982.006-4.397.064-5.105.26-.765.211-3.27 3.322-5.12 5.767-.504.665-.002 1.606.833 1.576z" stroke="url(#blue_rocket_grad_c)"/>
          <path d="M26.288 14.074c-4.014 3.233-8.884 11.557-11.04 16.27a.979.979 0 00.213 1.108l4.408 4.31a.976.976 0 001.057.212c4.218-1.747 12.595-6.153 16.682-11.704 3.94-5.35 4.328-11.44 3.98-14.428a.9.9 0 00-.833-.792c-2.749-.213-8.33.05-14.467 5.024z" stroke="url(#blue_rocket_grad_d)"/>
          <ellipse cx="31" cy="19.25" rx="3.563" ry="3.393" stroke="url(#blue_rocket_grad_e)"/>
          <path d="M12.775 33.67c-1.301.834-3.08 3.707-3.148 6.75a.865.865 0 00.857.882c2.682.05 4.615-1.043 6.266-3.69" stroke="url(#blue_rocket_grad_f)"/>
        </g>
        <defs>
          <linearGradient id="blue_rocket_grad_b" x1="27.883" y1="29.852" x2="27.883" y2="43" gradientUnits="userSpaceOnUse">
            <stop stopColor="#47FBF5" stopOpacity=".984"/>
            <stop offset="1" stopColor="#47B6FB"/>
          </linearGradient>
          <linearGradient id="blue_rocket_grad_c" x1="21.4" y1="22.992" x2="7.836" y2="23.533" gradientUnits="userSpaceOnUse">
            <stop stopColor="#47FBF5" stopOpacity=".984"/>
            <stop offset="1" stopColor="#47B6FB"/>
          </linearGradient>
          <linearGradient id="blue_rocket_grad_d" x1="28.328" y1="9.071" x2="28.328" y2="36.214" gradientUnits="userSpaceOnUse">
            <stop stopColor="#47FBF5" stopOpacity=".984"/>
            <stop offset="1" stopColor="#47B6FB"/>
          </linearGradient>
          <linearGradient id="blue_rocket_grad_e" x1="31" y1="15.857" x2="31" y2="22.643" gradientUnits="userSpaceOnUse">
            <stop stopColor="#47FBF5" stopOpacity=".984"/>
            <stop offset="1" stopColor="#47B6FB"/>
          </linearGradient>
          <linearGradient id="blue_rocket_grad_f" x1="13.188" y1="33.67" x2="13.188" y2="41.303" gradientUnits="userSpaceOnUse">
            <stop stopColor="#47FBF5" stopOpacity=".984"/>
            <stop offset="1" stopColor="#47B6FB"/>
          </linearGradient>
          <filter id="blue_rocket_filter_blur" x="0" y="0" width="50.688" height="51.05" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur_330_9884"/>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

function RocketMainLayer() {
  return (
    <div className="[grid-area:1_/_1] h-[52px] ml-0 mt-0 relative w-[51px]">
      <svg width="51" height="52" fill="none" xmlns="http://www.w3.org/2000/svg" className="block size-full" preserveAspectRatio="none" viewBox="0 0 51 52">
        <path d="M23.875 34.555v6.496c0 .814.919 1.285 1.573.799 2.631-1.958 6.097-4.694 6.304-5.485.252-.965.105-4.602 0-6.513" stroke="url(#blue_rocket_main_g)" strokeWidth="2"/>
        <path d="M16.672 26.848l-6.642.22c-.832.027-1.332-.913-.83-1.576 1.851-2.446 4.36-5.563 5.126-5.774.955-.265 5.02-.278 6.934-.251" stroke="url(#blue_rocket_main_h)" strokeWidth="2"/>
        <path d="M26.288 14.074c-4.014 3.233-8.884 11.557-11.04 16.27a.979.979 0 00.213 1.108l4.408 4.31a.976.976 0 001.057.212c4.218-1.747 12.595-6.153 16.682-11.704 3.94-5.35 4.328-11.44 3.98-14.428a.9.9 0 00-.833-.792c-2.749-.213-8.33.05-14.467 5.024z" stroke="url(#blue_rocket_main_i)" strokeWidth="2"/>
        <ellipse cx="31" cy="19.25" rx="3.563" ry="3.393" stroke="url(#blue_rocket_main_j)" strokeWidth="2"/>
        <path d="M12.775 33.67c-1.372.88-3.275 4.027-3.144 7.25.008.193.161.347.354.36 2.945.2 5.013-.86 6.765-3.667" stroke="url(#blue_rocket_main_k)" strokeWidth="2"/>
        <defs>
          <linearGradient id="blue_rocket_main_g" x1="27.883" y1="29.852" x2="27.883" y2="43" gradientUnits="userSpaceOnUse">
            <stop stopColor="#47FBF5" stopOpacity=".984"/>
            <stop offset="1" stopColor="#47B6FB"/>
          </linearGradient>
          <linearGradient id="blue_rocket_main_h" x1="21.4" y1="22.992" x2="7.836" y2="23.533" gradientUnits="userSpaceOnUse">
            <stop stopColor="#47FBF5" stopOpacity=".984"/>
            <stop offset="1" stopColor="#47B6FB"/>
          </linearGradient>
          <linearGradient id="blue_rocket_main_i" x1="28.328" y1="9.071" x2="28.328" y2="36.214" gradientUnits="userSpaceOnUse">
            <stop stopColor="#47FBF5" stopOpacity=".984"/>
            <stop offset="1" stopColor="#47B6FB"/>
          </linearGradient>
          <linearGradient id="blue_rocket_main_j" x1="31" y1="15.857" x2="31" y2="22.643" gradientUnits="userSpaceOnUse">
            <stop stopColor="#47FBF5" stopOpacity=".984"/>
            <stop offset="1" stopColor="#47B6FB"/>
          </linearGradient>
          <linearGradient id="blue_rocket_main_k" x1="13.188" y1="33.67" x2="13.188" y2="41.303" gradientUnits="userSpaceOnUse">
            <stop stopColor="#47FBF5" stopOpacity=".984"/>
            <stop offset="1" stopColor="#47B6FB"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function ButtonBlue({ state = 'default', onClick, active }: ButtonBlueProps) {
  const [isPressed, setIsPressed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pressStartTimeRef = useRef<number>(0);

  const isDisabled = state === 'disabled' || state === 'entry-locked';

  const handlePressStart = () => {
    if (isDisabled) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    pressStartTimeRef.current = Date.now();
    setIsPressed(true);
  };

  const handlePressEnd = () => {
    if (isDisabled) return;
    const elapsed = Date.now() - pressStartTimeRef.current;
    const minDuration = 300; // ms to ensure visual feedback matches transition

    if (elapsed < minDuration) {
      timeoutRef.current = setTimeout(() => {
        setIsPressed(false);
        timeoutRef.current = null;
      }, minDuration - elapsed);
    } else {
      setIsPressed(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className={`button-blue ${isPressed ? 'pressed' : ''} ${state !== 'default' ? `state-${state}` : ''}`}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handlePressEnd}
      onClick={onClick}
    >
      <div className="blue-metallic-border">
        <div className="blue-dark-bg">
          <div className="blue-dark-bg-inner">
            <div className="blue-metallic-inner">
              <div className="blue-inner-container">
                <div className="blue-glow-bg">
                  <div className="blue-glow-border" aria-hidden="true" />
                  <div className="flex flex-row items-center justify-center size-full relative z-10">
                    <div className="flex items-center justify-center px-[4px] py-[6px] relative size-full">
                      <div className={`flex flex-row gap-[4px] items-center justify-center h-full min-h-px min-w-px relative rounded-[6px] ${state === 'disabled' ? 'opacity-20' : ''}`}>
                        <div className="blue-icon">
                          <RocketBlurredLayer />
                          <RocketMainLayer />
                        </div>
                        <div className="relative">
                          <div className="flex flex-col items-start justify-center">
                            <p className="blue-text-title" style={{ 
                              color: '#a0e6f6', 
                              textShadow: '0px 4px 24px #009cef',
                              lineHeight: 'normal',
                              fontStyle: 'normal'
                            }}>UP</p>
                            {state === 'entry-locked' && (
                              <p className="blue-text-subtitle" style={{ 
                                color: '#a0e6f6', 
                                textShadow: '0px 4px 24px #009cef',
                                lineHeight: 'normal',
                                fontStyle: 'normal'
                              }}>Entry Locked</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="blue-blur-container">
                  <div className="blue-blur-inner">
                    <div className="blue-blur-edge" aria-hidden="true" />
                  </div>
                  <div className="blue-blur-glow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}