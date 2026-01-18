import { useState } from 'react';
import ButtonBlue from './ButtonBlue';
import ButtonRed from './ButtonRed';
import LiveChartWithStates from '@/app/components/LiveChartWithStates';
import TradingPanel from './TradingPanel';

type ButtonState = 'default' | 'entry-locked' | 'disabled';
type ChartState = 'idle' | 'opened' | 'live';

export default function ComponentsShowcase() {
  const [selectedButtonState, setSelectedButtonState] = useState<ButtonState>('default');
  const [selectedChartState, setSelectedChartState] = useState<ChartState>('idle');

  return (
    <div className="size-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-auto">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <h1 className="text-4xl font-bold text-white mb-8">Components Showcase</h1>

        {/* Button States Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Button States</h2>
          
          {/* State Selector */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setSelectedButtonState('default')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedButtonState === 'default'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Default State
            </button>
            <button
              onClick={() => setSelectedButtonState('entry-locked')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedButtonState === 'entry-locked'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Entry Locked
            </button>
            <button
              onClick={() => setSelectedButtonState('disabled')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedButtonState === 'disabled'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Disabled
            </button>
          </div>

          {/* Button States Display */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Default State */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Default State</h3>
              <div className="space-y-4">
                <div className="h-[100px]">
                  <ButtonRed state="default" />
                </div>
                <div className="h-[100px]">
                  <ButtonBlue state="default" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-4 text-center">
                Interactive, hover and press effects enabled
              </p>
            </div>

            {/* Entry Locked State */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Entry Locked State</h3>
              <div className="space-y-4">
                <div className="h-[100px]">
                  <ButtonRed state="entry-locked" />
                </div>
                <div className="h-[100px]">
                  <ButtonBlue state="entry-locked" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-4 text-center">
                Shows "Entry Locked" subtitle, interactive
              </p>
            </div>

            {/* Disabled State */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Disabled State</h3>
              <div className="space-y-4">
                <div className="h-[100px]">
                  <ButtonRed state="disabled" />
                </div>
                <div className="h-[100px]">
                  <ButtonBlue state="disabled" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-4 text-center">
                20% opacity, no interactions
              </p>
            </div>
          </div>

          {/* Active State Demo */}
          <div className="mt-8 bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              Active State: {selectedButtonState.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h3>
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="h-[100px]">
                <ButtonRed state={selectedButtonState} />
              </div>
              <div className="h-[100px]">
                <ButtonBlue state={selectedButtonState} />
              </div>
            </div>
          </div>
        </section>

        {/* Chart States Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Chart States</h2>
          
          {/* Chart State Selector */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setSelectedChartState('idle')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedChartState === 'idle'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Idle State
            </button>
            <button
              onClick={() => setSelectedChartState('opened')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedChartState === 'opened'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Position Opened
            </button>
            <button
              onClick={() => setSelectedChartState('live')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedChartState === 'live'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Live Round
            </button>
          </div>

          {/* Chart States Display */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Idle State */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Idle State</h3>
              <div className="h-[400px] bg-gray-900 rounded-lg overflow-hidden">
                <LiveChartWithStates state="idle" />
              </div>
              <p className="text-gray-400 text-sm mt-4 text-center">
                Shows "Pick UP or DOWN to start", chart continues animating
              </p>
            </div>

            {/* Position Opened State */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Position Opened</h3>
              <div className="h-[400px] bg-gray-900 rounded-lg overflow-hidden">
                <LiveChartWithStates state="opened" />
              </div>
              <p className="text-gray-400 text-sm mt-4 text-center">
                Shows entry price, "Position Opened - UP", "Starting round..."
              </p>
            </div>

            {/* Live Round State */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Live Round</h3>
              <div className="h-[400px] bg-gray-900 rounded-lg overflow-hidden">
                <LiveChartWithStates 
                  state="live" 
                  countdown={18}
                  mode="30s"
                  direction="UP"
                  entryPrice={96500}
                  betAmount={400}
                />
              </div>
              <p className="text-gray-400 text-sm mt-4 text-center">
                Shows green/red zones, PnL display, "Settles in 18s"
              </p>
            </div>
          </div>

          {/* Active Chart State Demo */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              Active State: {selectedChartState.charAt(0).toUpperCase() + selectedChartState.slice(1)}
            </h3>
            <div className="h-[400px] bg-gray-900 rounded-lg overflow-hidden max-w-2xl mx-auto">
              <LiveChartWithStates state={selectedChartState} />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-900 rounded-lg p-4">
                <p className="font-semibold text-white mb-2">Idle Features:</p>
                <ul className="text-gray-400 space-y-1">
                  <li>• Blue chart line</li>
                  <li>• "Pick UP or DOWN to start"</li>
                  <li>• Continuous animation</li>
                  <li>• No overlays</li>
                </ul>
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <p className="font-semibold text-white mb-2">Opened Features:</p>
                <ul className="text-gray-400 space-y-1">
                  <li>• Entry price badge</li>
                  <li>• "Position Opened - UP"</li>
                  <li>• "Starting round..."</li>
                  <li>• Bet amount display</li>
                </ul>
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <p className="font-semibold text-white mb-2">Live Features:</p>
                <ul className="text-gray-400 space-y-1">
                  <li>• Green/red zone overlay</li>
                  <li>• Yellow-green chart line</li>
                  <li>• PnL display (+56.27)</li>
                  <li>• "Settles in 18s"</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Trading Panel States Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Trading Panel States</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Trading Panel</h3>
              <div className="max-w-md mx-auto">
                <TradingPanel />
              </div>
              <p className="text-gray-400 text-sm mt-4 text-center">
                Interactive trading controls with margin slider
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Panel Features</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Leverage Selector</p>
                    <p className="text-sm text-gray-400">Multiple leverage options (5x, 10x, 25x, etc.)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Margin Slider</p>
                    <p className="text-sm text-gray-400">Custom margin amount with smooth interactions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">TP/SL Controls</p>
                    <p className="text-sm text-gray-400">Take Profit and Stop Loss configuration</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Metallic Design</p>
                    <p className="text-sm text-gray-400">High-fidelity gradients and glow effects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Component Interactions */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Component Interactions</h2>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-blue-400">Button Interactions</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Hover: Lift animation + icon animations</li>
                  <li>• Press: Scale down + padding adjustment</li>
                  <li>• Glow: Dynamic blur effects</li>
                  <li>• SVG: Animated bomb/rocket icons</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-green-400">Chart Interactions</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Real-time candlestick updates</li>
                  <li>• Smooth price transitions</li>
                  <li>• Trend indicators</li>
                  <li>• Responsive scaling</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-yellow-400">Panel Interactions</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Leverage toggle selection</li>
                  <li>• Drag slider for margin</li>
                  <li>• TP/SL input validation</li>
                  <li>• Real-time calculations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Design System */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Design System</h2>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Colors</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg" style={{ background: 'linear-gradient(135deg, #FF2222 0%, #C50000 100%)' }} />
                    <div>
                      <p className="text-white font-semibold">Red Button</p>
                      <p className="text-gray-400 text-sm">#FF2222 → #C50000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg" style={{ background: 'linear-gradient(135deg, #47FBF5 0%, #47B6FB 100%)' }} />
                    <div>
                      <p className="text-white font-semibold">Blue Button</p>
                      <p className="text-gray-400 text-sm">#47FBF5 → #47B6FB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-b from-gray-950 to-black" />
                    <div>
                      <p className="text-white font-semibold">Background</p>
                      <p className="text-gray-400 text-sm">Gray-950 → Black</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Typography</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-white font-bold text-xl" style={{ fontFamily: 'IBM Plex Sans Condensed, sans-serif' }}>
                      IBM Plex Sans Condensed
                    </p>
                    <p className="text-gray-400 text-sm">Primary font for buttons and labels</p>
                  </div>
                  <div className="space-y-1 text-sm text-gray-300">
                    <p><span className="text-white font-semibold">Bold (700):</span> Button titles</p>
                    <p><span className="text-white font-semibold">SemiBold (600):</span> Subtitles</p>
                    <p><span className="text-white font-semibold">Regular (400):</span> Body text</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}