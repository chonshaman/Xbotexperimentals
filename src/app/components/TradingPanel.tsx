import { memo } from 'react';
import './TradingPanelCSS.css';
import MarginSlider from './MarginSlider';

function TradingPanel({ value, onChange }: { value: number; onChange: (val: number) => void }) {
  return (
    <div className="trading-panel">
      {/* Yellow Container */}
      <div className="trading-panel-yellow-outer">
        <div className="trading-panel-yellow-inner">
          
          {/* Slider Section */}
          <MarginSlider value={value} onChange={onChange} />

        </div>
      </div>
    </div>
  );
}

export default memo(TradingPanel);