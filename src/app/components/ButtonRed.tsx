import { useState, useRef, useEffect, memo } from 'react';
import './ButtonRedCSS.css';

type ButtonRedState = 'default' | 'entry-locked' | 'disabled';

interface ButtonRedProps {
  state?: ButtonRedState;
  onClick?: () => void;
}

function BombBlurredLayer() {
  return (
    <div className="[grid-area:1_/_1] h-[48px] ml-0 mt-0 relative w-[48px]">
      <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg" className="block size-full" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="rediconblur" filter="url(#a)">
          <path d="M50.25 23.558l-4.736 1.652" stroke="url(#b)" strokeWidth="2"/>
          <path d="M38.41 12.653l-1.015 4.957" stroke="url(#c)" strokeWidth="2"/>
          <path d="M23.865 12.323l1.691 4.956" stroke="url(#d)" strokeWidth="2"/>
          <path d="M13.04 23.558l4.736 1.652" stroke="url(#e)" strokeWidth="2"/>
          <path d="M12.364 37.766l5.074-1.982" stroke="url(#f)" strokeWidth="2"/>
          <path d="M25.182 36.796l2.299-3.208a.1.1 0 00-.038-.148l-4.367-2.134a.1.1 0 01.023-.187l4.329-.907a.1.1 0 00.07-.138l-2.193-4.899a.1.1 0 01.14-.128l4.365 2.437a.1.1 0 00.144-.058l1.249-3.963a.1.1 0 01.181-.02l1.24 2.118" stroke="url(#g)" strokeWidth="1.6"/>
          <path d="M26.57 45.697v-6.123a.1.1 0 00-.14-.091l-9.036 4.098a.1.1 0 01-.127-.143l5.19-8.556a.1.1 0 00-.037-.14l-8.148-4.457a.1.1 0 01.022-.184l8.102-2.216a.1.1 0 00.063-.14L16.898 16.24a.1.1 0 01.138-.131l10.46 5.747a.1.1 0 00.137-.042l3.915-7.65a.1.1 0 01.181.006l3.593 8.295a.1.1 0 00.14.048l9.788-5.418a.1.1 0 01.14.128l-3.597 7.987M30.968 43.714c.257 1.756 1.753 1.866 2.579 1.684a.104.104 0 01.127.1v3.125a.1.1 0 00.037.078l1.965 1.6a.1.1 0 00.064.022h8.053a.1.1 0 00.054-.016l1.954-1.273a.1.1 0 00.045-.093l-.322-3.465a.1.1 0 01.1-.11h1.243c2.653-.259 2.271-3.292 2.043-5.175-.007-.06.04-.111.099-.119.382-.048.972-.35 1.24-1.314.296-1.066 0-3.305-.676-4.957-1.263-3.083-6.089-7.6-12.854-5.948-6.766 1.652-7.442 8.922-7.442 9.913 0 .992 1.353.661 1.353 1.653 0 .99 0 1.982.338 4.295z" stroke="url(#h)" strokeWidth="2"/>
          <ellipse cx="35.704" cy="38.758" rx="2.706" ry="2.643" fill="#FAC56D"/>
          <ellipse cx="44.499" cy="38.758" rx="2.706" ry="2.643" fill="#FAC56D"/>
          <path d="M37.734 43.384v1.322l2.03.66 1.69-.66v-1.322l-1.69-2.313-2.03 2.313z" fill="#FAC56D"/>
        </g>
        <defs>
          <linearGradient id="b" x1="47.565" y1="23.561" x2="47.565" y2="25" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBD747" stopOpacity=".984"/>
            <stop offset="1" stopColor="#FB8347"/>
          </linearGradient>
          <linearGradient id="c" x1="37.835" y1="12.665" x2="37.835" y2="16.979" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBD747" stopOpacity=".984"/>
            <stop offset="1" stopColor="#FB8347"/>
          </linearGradient>
          <linearGradient id="d" x1="24.598" y1="12.334" x2="24.598" y2="16.649" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBD747" stopOpacity=".984"/>
            <stop offset="1" stopColor="#FB8347"/>
          </linearGradient>
          <linearGradient id="e" x1="15.092" y1="23.561" x2="15.092" y2="25" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBD747" stopOpacity=".984"/>
            <stop offset="1" stopColor="#FB8347"/>
          </linearGradient>
          <linearGradient id="f" x1="14.562" y1="35.788" x2="14.562" y2="37.514" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBD747" stopOpacity=".984"/>
            <stop offset="1" stopColor="#FB8347"/>
          </linearGradient>
          <linearGradient id="g" x1="27.064" y1="23.279" x2="27.064" y2="35.072" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBD747" stopOpacity=".984"/>
            <stop offset="1" stopColor="#FB8347"/>
          </linearGradient>
          <linearGradient id="h" x1="29.784" y1="14.058" x2="29.784" y2="45.697" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBD747" stopOpacity=".984"/>
            <stop offset="1" stopColor="#FB8347"/>
          </linearGradient>
          <filter id="a" x="0" y="0" width="63.364" height="63.323" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="6" result="effect1_foregroundBlur_330_9376"/>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

function BombMainLayer() {
  return (
    <div className="[grid-area:1_/_1] h-[48px] ml-0 mt-0 relative w-[48px]">
      <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg" className="block size-full" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="redicondefault">
          <path d="M50.25 23.558l-4.736 1.652" stroke="url(#i)" strokeWidth="2"/>
          <path d="M38.41 12.653l-1.015 4.957" stroke="url(#j)" strokeWidth="2"/>
          <path d="M23.865 12.323l1.691 4.956" stroke="url(#k)" strokeWidth="2"/>
          <path d="M13.04 23.558l4.736 1.652" stroke="url(#l)" strokeWidth="2"/>
          <path d="M12.364 37.766l5.074-1.982" stroke="url(#m)" strokeWidth="2"/>
          <path d="M25.182 36.796l2.299-3.208a.1.1 0 00-.038-.148l-4.367-2.134a.1.1 0 01.023-.187l4.329-.907a.1.1 0 00.07-.138l-2.193-4.899a.1.1 0 01.14-.128l4.365 2.437a.1.1 0 00.144-.058l1.249-3.963a.1.1 0 01.181-.02l1.24 2.118" stroke="url(#n)" strokeWidth="1.6"/>
          <path d="M26.57 45.697v-6.123a.1.1 0 00-.14-.091l-9.036 4.098a.1.1 0 01-.127-.143l5.19-8.556a.1.1 0 00-.037-.14l-8.148-4.457a.1.1 0 01.022-.184l8.102-2.216a.1.1 0 00.063-.14L16.898 16.24a.1.1 0 01.138-.131l10.46 5.747a.1.1 0 00.137-.042l3.915-7.65a.1.1 0 01.181.006l3.593 8.295a.1.1 0 00.14.048l9.788-5.418a.1.1 0 01.14.128l-3.597 7.987M30.968 43.714c.257 1.756 1.753 1.866 2.579 1.684a.104.104 0 01.127.1v3.125a.1.1 0 00.037.078l1.965 1.6a.1.1 0 00.064.022h8.053a.1.1 0 00.054-.016l1.954-1.273a.1.1 0 00.045-.093l-.322-3.465a.1.1 0 01.1-.11h1.243c2.653-.259 2.271-3.292 2.043-5.175-.007-.06.04-.111.099-.119.382-.048.972-.35 1.24-1.314.296-1.066 0-3.305-.676-4.957-1.263-3.083-6.089-7.6-12.854-5.948-6.766 1.652-7.442 8.922-7.442 9.913 0 .992 1.353.661 1.353 1.653 0 .99 0 1.982.338 4.295z" stroke="url(#o)" strokeWidth="2"/>
          <ellipse cx="35.704" cy="38.758" rx="2.706" ry="2.643" fill="#FAC56D"/>
          <ellipse cx="44.499" cy="38.758" rx="2.706" ry="2.643" fill="#FAC56D"/>
          <path d="M37.734 43.384v1.322l2.03.66 1.69-.66v-1.322l-1.69-2.313-2.03 2.313z" fill="#FAC56D"/>
        </g>
        <defs>
          <linearGradient id="i" x1="47.565" y1="23.561" x2="47.565" y2="25" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBD747" stopOpacity=".984"/>
            <stop offset="1" stopColor="#FB8347"/>
          </linearGradient>
          <linearGradient id="j" x1="37.835" y1="12.665" x2="37.835" y2="16.979" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBD747" stopOpacity=".984"/>
            <stop offset="1" stopColor="#FB8347"/>
          </linearGradient>
          <linearGradient id="k" x1="24.598" y1="12.334" x2="24.598" y2="16.649" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBD747" stopOpacity=".984"/>
            <stop offset="1" stopColor="#FB8347"/>
          </linearGradient>
          <linearGradient id="l" x1="15.092" y1="23.561" x2="15.092" y2="25" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBD747" stopOpacity=".984"/>
            <stop offset="1" stopColor="#FB8347"/>
          </linearGradient>
          <linearGradient id="m" x1="14.562" y1="35.788" x2="14.562" y2="37.514" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBD747" stopOpacity=".984"/>
            <stop offset="1" stopColor="#FB8347"/>
          </linearGradient>
          <linearGradient id="n" x1="27.064" y1="23.279" x2="27.064" y2="35.072" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBD747" stopOpacity=".984"/>
            <stop offset="1" stopColor="#FB8347"/>
          </linearGradient>
          <linearGradient id="o" x1="29.784" y1="14.058" x2="29.784" y2="45.697" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBD747" stopOpacity=".984"/>
            <stop offset="1" stopColor="#FB8347"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function ButtonRed({ state = 'default', onClick }: ButtonRedProps) {
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
      className={`button-red ${isPressed ? 'pressed' : ''} ${state !== 'default' ? `state-${state}` : ''}`}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handlePressEnd}
      onClick={onClick}
      style={{ transform: 'translateZ(0)', willChange: isPressed || state === 'entry-locked' ? 'transform' : 'auto' }}
    >
      <div className="red-metallic-border">
        <div className="red-dark-bg">
          <div className="red-dark-bg-inner">
            <div className="red-metallic-inner">
              <div className="red-inner-container">
                <div className="red-glow-bg">
                  <div className="red-glow-border" aria-hidden="true" />
                  <div className="flex flex-row items-center justify-center size-full relative z-10">
                    <div className="flex items-center justify-center px-[4px] py-[6px] relative size-full">
                      <div className={`flex flex-row gap-0 items-center justify-center h-full min-h-px min-w-px relative rounded-[6px] ${state === 'disabled' ? 'opacity-20' : ''}`}>
                        <div className="red-icon">
                          <BombBlurredLayer />
                          <BombMainLayer />
                        </div>
                        <div className="relative">
                          <div className="flex flex-col items-start justify-center">
                            <p className="red-text-title" style={{ 
                              color: '#ffb473', 
                              textShadow: '0px 4px 24px #ef0000',
                              lineHeight: 'normal',
                              fontStyle: 'normal'
                            }}>DOWN</p>
                            {state === 'entry-locked' && (
                              <p className="red-text-subtitle" style={{ 
                                color: '#ffb473', 
                                textShadow: '0px 4px 24px #ef0000',
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
                <div className="red-blur-container">
                  <div className="red-blur-inner">
                    <div className="red-blur-edge" aria-hidden="true" />
                  </div>
                  <div className="red-blur-glow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}