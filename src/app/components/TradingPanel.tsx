import { useState } from 'react';
import './TradingPanelCSS.css';
import MarginSlider from './MarginSlider';

export default function TradingPanel() {
  const [margin, setMargin] = useState(400);

  return (
    <div className="trading-panel">
      {/* Yellow Container */}
      <div className="trading-panel-yellow-outer">
        <div className="trading-panel-yellow-inner">
          
          {/* Slider Section */}
          <MarginSlider value={margin} onChange={setMargin} />

        </div>
      </div>
    </div>
  );
}