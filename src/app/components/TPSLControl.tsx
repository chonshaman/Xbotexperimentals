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
    onSlChange(sl === 20 ? 40 : sl === 40 ? 60 : 20);
  };

  return (
    <div className="trading-panel-tpsl-section">
      <div className="flex gap-3 w-full">
        {/* TP Control */}
        <div className="flex-1">
          <div className="trading-panel-tpsl-label">
            <span className="label-text" style={{ opacity: 0.72 }}>TP</span>
            <span className="label-value">{tp}%</span>
          </div>
          <button
            onClick={handleTpClick}
            className="w-full h-[40px] rounded-[8px] transition-all duration-200 hover:opacity-80 active:scale-95"
            style={{
              background: 'linear-gradient(180deg, #2F7AEC 0%, #245BB8 100%)',
              border: '2px solid #4A8FFF',
              boxShadow: '0px 2px 8px rgba(47,122,236,0.3)',
            }}
          >
            <span className="text-white font-semibold">{tp}%</span>
          </button>
        </div>

        {/* SL Control */}
        <div className="flex-1">
          <div className="trading-panel-tpsl-label">
            <span className="label-text" style={{ opacity: 0.72 }}>SL</span>
            <span className="label-value">{sl}%</span>
          </div>
          <button
            onClick={handleSlClick}
            className="w-full h-[40px] rounded-[8px] transition-all duration-200 hover:opacity-80 active:scale-95"
            style={{
              background: 'linear-gradient(180deg, #FF4444 0%, #CC0000 100%)',
              border: '2px solid #FF6666',
              boxShadow: '0px 2px 8px rgba(255,68,68,0.3)',
            }}
          >
            <span className="text-white font-semibold">{sl}%</span>
          </button>
        </div>
      </div>
    </div>
  );
}
