import { useState } from 'react';

interface TPSLControlProps {
  tp: number;
  sl: number;
  onTpChange: (value: number) => void;
  onSlChange: (value: number) => void;
}

export default function TPSLControl({ tp, sl, onTpChange, onSlChange }: TPSLControlProps) {
  const handleTpClick = () => {
    onTpChange(tp === 20 ? 40 : tp === 40 ? 60 : 20);
  };

  const handleSlClick = () => {
    onSlChange(sl === -40 ? -60 : sl === -60 ? -20 : -40);
  };

  return (
    <div className="control-box">
      <div className="control-box-inner tpsl-control">
        <div className="tpsl-row" onClick={handleTpClick}>
          <span className="tpsl-label">TP</span>
          <span className="tpsl-value">+{tp}</span>
        </div>
        <div className="tpsl-row" onClick={handleSlClick}>
          <span className="tpsl-label">SL</span>
          <span className="tpsl-value">{sl}</span>
        </div>
        <div className="tpsl-settings">
          <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M8 10.667a2.667 2.667 0 1 0 0-5.334 2.667 2.667 0 0 0 0 5.334Z" stroke="#A0E6F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"/>
            <path opacity="0.34" d="M1.333 8.547v-1.094c0-.733.6-1.333 1.334-1.333 1.306 0 1.846-.92 1.2-2.047a1.337 1.337 0 0 1 .487-1.82l1.053-.607a1.17 1.17 0 0 1 1.6.427l.066.114c.64 1.126 1.687 1.126 2.334 0l.066-.114a1.17 1.17 0 0 1 1.6-.427l1.054.607a1.337 1.337 0 0 1 .486 1.82c-.646 1.127-.106 2.047 1.2 2.047.727 0 1.334.6 1.334 1.333v1.094c0 .733-.6 1.333-1.334 1.333-1.306 0-1.846.92-1.2 2.047.294.507.2 1.16-.486 1.82l-1.054.607a1.17 1.17 0 0 1-1.6-.427l-.066-.114c-.64-1.126-1.687-1.126-2.334 0l-.066.114a1.17 1.17 0 0 1-1.6.427l-1.053-.607a1.337 1.337 0 0 1-.487-1.82c.647-1.127.107-2.047-1.2-2.047a1.327 1.327 0 0 1-1.334-1.333Z" stroke="#A0E6F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
