import { useState } from 'react';
import ButtonBlue from './ButtonBlue';
import ButtonRed from './ButtonRed';
import LiveChartWithStates from '@/app/components/LiveChartWithStates';
import TradingPanel from './TradingPanel';

type ButtonState = 'default' | 'entry-locked' | 'disabled';
type ChartState = 'idle' | 'opened' | 'live';
type MainTab = 'components' | 'history';
type Language = 'en' | 'vi';

export default function ComponentsShowcase() {
  const [selectedButtonState, setSelectedButtonState] = useState<ButtonState>('default');
  const [selectedChartState, setSelectedChartState] = useState<ChartState>('idle');
  const [activeTab, setActiveTab] = useState<MainTab>('components');
  const [language, setLanguage] = useState<Language>('en');

  return (
    <div className="size-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-auto">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <h1 className="text-4xl font-bold text-white mb-8">Components Showcase</h1>

        {/* Master Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('components')}
            className={`px-6 py-3 font-semibold text-lg transition-all relative ${
              activeTab === 'components'
                ? 'text-blue-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Components
            {activeTab === 'components' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400 rounded-t" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 font-semibold text-lg transition-all relative ${
              activeTab === 'history'
                ? 'text-blue-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            History Logic
            {activeTab === 'history' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400 rounded-t" />
            )}
          </button>
        </div>

        {/* Components Tab Content */}
        {activeTab === 'components' && (
          <div>
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
        )}

        {/* History Logic Tab Content */}
        {activeTab === 'history' && (
          <div>
            {/* Language Selector */}
            <div className="flex justify-end gap-3 mb-6">
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-lg transition-colors font-semibold ${
                  language === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => setLanguage('vi')}
                className={`px-4 py-2 rounded-lg transition-colors font-semibold ${
                  language === 'vi'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                🇻🇳 Tiếng Việt
              </button>
            </div>

            {/* English Content */}
            {language === 'en' && (
              <div>
                {/* Big Road Visual Diagram */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                  <h3 className="text-2xl font-semibold text-blue-400 mb-6 text-center">📊 Baccarat Big Road History Board Rules (No-Tie Logic)</h3>
                  
                  {/* Diagram Image */}
                  <div className="bg-gray-900 rounded-lg p-4 mb-6 flex justify-center">
                    <img 
                      src="https://raw.githubusercontent.com/chonshaman/riv_store/759c8d5d06fdf73d381c114593a0c1f085e8a043/haluuimg/public/unnamedv.webp" 
                      alt="Big Road Baccarat Rules Diagram" 
                      className="max-w-full h-auto rounded-lg"
                      style={{ maxHeight: '500px' }}
                    />
                  </div>

                  {/* Explanation Text */}
                  <div className="divide-y divide-white/5 text-gray-300">
                    <div className="pb-3">
                      <h4 className="text-lg font-medium text-white mb-1">Case 1: Same-Side Wins (Vertical Move)</h4>
                      <p className="text-sm">
                        As shown in the first column, when the same side wins consecutively (e.g., Banker), the subsequent circle is placed directly below the previous one.
                      </p>
                    </div>

                    <div className="py-3">
                      <h4 className="text-lg font-medium text-white mb-1">Case 2: Side Change (New Column Jump)</h4>
                      <p className="text-sm">
                        When the result shifts from Banker to Player (or vice versa), move to the next column to the right and start recording from Row 1.
                      </p>
                    </div>

                    <div className="py-3">
                      <h4 className="text-lg font-medium text-white mb-1">Case 3: L-shape / Dragon Tail (Horizontal Bend)</h4>
                      <p className="text-sm">
                        When a side wins for the 7th consecutive time—exceeding the standard 6 rows of the board—the streak begins to bend horizontally to the right along Row 6.
                      </p>
                    </div>

                    <div className="py-3">
                      <h4 className="text-lg font-medium text-white mb-1">Case 4: Side Change After a Dragon Tail</h4>
                      <p className="text-sm">
                        If the winner changes while a "dragon" is active (for example, after B8), the next result (P) must jump to Row 1 of the next available empty column. 
                        It is never recorded in the empty rows directly above the horizontal tail segments (e.g., the empty spaces above B7 or B8).
                      </p>
                    </div>

                    <div className="pt-3">
                      <h4 className="text-lg font-medium text-white mb-1">Case 5: Double Dragon (Overlapping Tails)</h4>
                      <p className="text-sm">
                        This is an advanced scenario. When a new win streak (Player) also grows long enough to hit the bottom of the board, but Row 6 is already occupied by the previous Banker's tail, 
                        the Player's streak must bend horizontally earlier at Row 5.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trade Settlement Flow */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">🔄 Complete Trade Settlement Flow</h3>
                  
                  <div className="divide-y divide-white/5">
                    <div className="pb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">1</div>
                        <h4 className="text-white font-semibold">Trade Start (30s/60s Mode)</h4>
                      </div>
                      <pre className="text-green-400 text-xs ml-8">// If user bets UP, predict 'WIN' (market UP){'\n'}historyRef.current?.setNextFlashing(true, 'WIN');{'\n'}// If user bets DOWN, predict 'LOSE' (market DOWN){'\n'}historyRef.current?.setNextFlashing(true, 'LOSE');</pre>
                    </div>

                    <div className="py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">2</div>
                        <h4 className="text-white font-semibold">During Trade</h4>
                      </div>
                      <p className="text-gray-300 text-sm ml-8">Next cell is flashing, chart shows entry price line and countdown</p>
                    </div>

                    <div className="py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">3</div>
                        <h4 className="text-white font-semibold">Trade Settlement</h4>
                      </div>
                      <p className="text-gray-300 text-sm ml-8">Determine win/loss, calculate PnL, update balance</p>
                    </div>

                    <div className="py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">4</div>
                        <h4 className="text-white font-semibold">Add to History</h4>
                      </div>
                      <pre className="text-green-400 text-xs ml-8">historyRef.current?.addSettledTrade(historyItem);</pre>
                    </div>

                    <div className="py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">5</div>
                        <h4 className="text-white font-semibold">Stop Flashing & Show Toast</h4>
                      </div>
                      <pre className="text-green-400 text-xs ml-8">historyRef.current?.setNextFlashing(false);</pre>
                    </div>

                    <div className="pt-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">6</div>
                        <h4 className="text-white font-semibold">After 2 Seconds - Flash Celebration</h4>
                      </div>
                      <pre className="text-green-400 text-xs ml-8">historyRef.current?.flashLastResult();</pre>
                    </div>
                  </div>
                </div>

                {/* Overview */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">Overview</h3>
                  <p className="text-gray-300">
                    The History component displays a baccarat-style grid that tracks all settled trades in a visual pattern-based format. 
                    It supports two different display algorithms and includes sophisticated animations and state management.
                  </p>
                </div>

                {/* Data Structures */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">📊 Data Structures</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">HistoryItem Interface</h4>
                      <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm">
                        <code className="text-green-400">{`export interface HistoryItem {
  id: string;              // Unique identifier for the trade
  symbol: string;          // Trading pair (e.g., 'BTC/USDT', 'ETH/USDT', 'SOL/USDT')
  direction: 'UP' | 'DOWN'; // User's prediction/tap direction
  result: 'WIN' | 'LOSE';   // Settlement outcome
  entryPrice: number;       // Price when trade was opened
  exitPrice: number;        // Price when trade was settled
  betAmount: number;        // Amount wagered
  pnl: number;             // Profit/Loss after settlement
  settledAt: number;       // Timestamp of settlement
}`}</code>
                      </pre>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">CellType & Result</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-900 rounded-lg p-4">
                          <p className="text-gray-400 text-sm mb-2">CellType:</p>
                          <ul className="text-gray-300 space-y-1 text-sm">
                            <li>• <span className="text-blue-400">'WIN'</span>: Blue cell with "U" text</li>
                            <li>• <span className="text-red-400">'LOSE'</span>: Red cell with "D" text</li>
                            <li>• <span className="text-gray-400">null</span>: Empty cell with checkered pattern</li>
                          </ul>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-4">
                          <p className="text-gray-400 text-sm mb-2">Result Type:</p>
                          <pre className="text-green-400 text-sm">type Result = 'WIN' | 'LOSE';</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Two Algorithm Modes */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">🎲 Two Algorithm Modes</h3>
                  
                  <div className="mb-4 bg-gray-900 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-2">Configuration:</p>
                    <pre className="text-green-400 text-sm">const USE_BIG_ROAD = true; // Set to false for Bead Plate mode</pre>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Bead Plate */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-green-400 mb-3">1. BEAD PLATE LOGIC</h4>
                      <p className="text-gray-300 text-sm mb-3">Simple left-to-right, top-to-bottom sequential filling</p>
                      
                      <div className="space-y-2 text-sm">
                        <p className="text-white font-semibold">Rules:</p>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Row index = index % 6</li>
                          <li>• Column index = floor(index / 6)</li>
                          <li>• Sequential filling (reading order)</li>
                          <li>• No pattern tracking</li>
                        </ul>
                      </div>

                      <div className="mt-3 p-3 bg-gray-950 rounded">
                        <p className="text-gray-400 text-xs mb-2">Example Pattern:</p>
                        <pre className="text-xs text-gray-300">{`Column 0  Column 1  Column 2
[0] WIN   [6] LOSE  [12] WIN
[1] WIN   [7] LOSE  [13] LOSE
[2] WIN   [8] WIN   [14] ...
[3] LOSE  [9] WIN
[4] LOSE  [10] LOSE
[5] LOSE  [11] WIN`}</pre>
                      </div>
                    </div>

                    {/* Big Road */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-blue-400 mb-3">2. BIG ROAD LOGIC (DEFAULT)</h4>
                      <p className="text-gray-300 text-sm mb-3">Groups consecutive identical results, tracks streaks and patterns</p>
                      
                      <div className="space-y-2 text-sm">
                        <p className="text-white font-semibold">Core Rules:</p>
                        <ul className="text-gray-300 space-y-1">
                          <li>• <span className="text-yellow-400">Rule 1:</span> First result at (0,0)</li>
                          <li>• <span className="text-yellow-400">Rule 2:</span> SAME result → Move down</li>
                          <li>• <span className="text-yellow-400">Rule 3:</span> DIFFERENT result → New column</li>
                          <li>• <span className="text-red-400">Dragon Tail:</span> When column full → Move right</li>
                        </ul>
                      </div>

                      <div className="mt-3 p-3 bg-gray-950 rounded">
                        <p className="text-gray-400 text-xs mb-2">Example Pattern:</p>
                        <pre className="text-xs text-gray-300">{`Column 0  Column 1  Column 2
[WIN]     [LOSE]    [WIN]
[WIN]     [LOSE]    [WIN]
[WIN]              
          Dragon Tail →
[LOSE] [LOSE] [LOSE]`}</pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* State Management */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">🎯 State Management</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Local Component States:</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <code className="text-green-400">historyData</code>: 2D array of cells (visual board)</li>
                        <li>• <code className="text-green-400">tradeHistory</code>: Complete trade history with full details</li>
                        <li>• <code className="text-green-400">lastPosition</code>: Position of most recently added result (flash animation)</li>
                        <li>• <code className="text-green-400">isNextFlashing</code>: Whether next predicted cell should flash during live trading</li>
                        <li>• <code className="text-green-400">flashingSettledPosition</code>: Position to flash for settled result (5-flash animation)</li>
                      </ul>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Singleton Board Instance:</h4>
                      <pre className="text-green-400 text-sm mb-2">const historyBoard = USE_BIG_ROAD ? new BigRoadBoard() : new BeadPlateBoard();</pre>
                      <p className="text-gray-400 text-sm">Maintains state across component re-renders and preserves grid patterns.</p>
                    </div>
                  </div>
                </div>

                {/* Exposed Ref Methods */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">📡 Exposed Ref Methods (HistoryRef)</h3>
                  
                  <div className="space-y-4">
                    {/* addSettledTrade */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-green-400 mb-2">1. addSettledTrade(trade: HistoryItem)</h4>
                      <p className="text-gray-400 text-sm mb-3">Add a completed trade to the history</p>
                      
                      <div className="space-y-2 text-sm">
                        <p className="text-white">Called: When a trade settles (wins or loses)</p>
                        <div className="bg-gray-950 rounded p-3">
                          <p className="text-gray-400 mb-2">Logic Flow:</p>
                          <ol className="text-gray-300 space-y-1 list-decimal list-inside">
                            <li>Store complete trade data</li>
                            <li>Add to visual board (uses only result: WIN/LOSE)</li>
                            <li>Track position for flash animation</li>
                            <li>Clear flash after 600ms</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    {/* setNextFlashing */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-green-400 mb-2">2. setNextFlashing(isLive: boolean, predictedResult?: 'WIN' | 'LOSE')</h4>
                      <p className="text-gray-400 text-sm mb-3">Control flashing animation on predicted next cell based on user's bet</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="bg-gray-950 rounded p-3">
                          <p className="text-white mb-1">When true + predictedResult:</p>
                          <p className="text-gray-300">Flashes the position where the result would appear if user wins their bet</p>
                          <p className="text-gray-400 text-xs mt-1">• User bets UP → predict 'WIN' (market UP)</p>
                          <p className="text-gray-400 text-xs">• User bets DOWN → predict 'LOSE' (market DOWN)</p>
                        </div>
                        <div className="bg-gray-950 rounded p-3">
                          <p className="text-white mb-1">When false:</p>
                          <p className="text-gray-300">Flash animation stops</p>
                        </div>
                      </div>
                    </div>

                    {/* flashLastResult */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-green-400 mb-2">3. flashLastResult()</h4>
                      <p className="text-gray-400 text-sm mb-3">Flash the most recently settled result 5 times (celebration effect)</p>
                      
                      <div className="space-y-2 text-sm">
                        <p className="text-white">Called: After win/loss toast disappears (2 seconds after settlement)</p>
                        <div className="bg-gray-950 rounded p-3">
                          <p className="text-gray-400 mb-2">Animation Timing:</p>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Total duration: 3 seconds</li>
                            <li>• Flash on: 300ms</li>
                            <li>• Flash off: 300ms</li>
                            <li>• Repeats 5 times</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual States & Animations */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">🎨 Visual States & Animations</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Cell States */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3">Empty Cell (null)</h4>
                      <div className="w-12 h-12 rounded-full border-2 border-gray-600 bg-gray-800 mx-auto mb-2" style={{
                        background: 'repeating-conic-gradient(#374151 0% 25%, #1f2937 0% 50%)'
                      }}></div>
                      <p className="text-gray-400 text-xs text-center">Checkered pattern</p>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3">WIN Cell (Blue)</h4>
                      <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold" style={{
                        background: 'linear-gradient(135deg, #47FBF5 0%, #47B6FB 100%)'
                      }}>U</div>
                      <p className="text-gray-400 text-xs text-center">Blue with "U"</p>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3">LOSE Cell (Red)</h4>
                      <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold" style={{
                        background: 'linear-gradient(135deg, #FF2222 0%, #C50000 100%)'
                      }}>D</div>
                      <p className="text-gray-400 text-xs text-center">Red with "D"</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Animation States:</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <span className="text-yellow-400">New Result Flash:</span> Triggers on newly added result (600ms duration)</li>
                        <li>• <span className="text-blue-400">Next Cell Flashing:</span> Continuous pulsing during live trading (infinite loop)</li>
                        <li>• <span className="text-green-400">Settled Flash (5×):</span> Celebration effect after toast (300ms on/off × 5)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Key Design Decisions */}
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">🎯 Key Design Decisions</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-green-400 font-semibold mb-2">Why Two Algorithms?</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• <span className="text-white">Bead Plate:</span> Simple chronological tracking</li>
                        <li>• <span className="text-white">Big Road:</span> Pattern recognition (mimics casino baccarat)</li>
                      </ul>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-green-400 font-semibold mb-2">Why Singleton Instance?</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Preserves state across re-renders</li>
                        <li>• Avoids data loss during updates</li>
                        <li>• Ensures consistent grid positions</li>
                      </ul>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-green-400 font-semibold mb-2">Why Three Flash States?</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• <span className="text-yellow-400">New Result:</span> Immediate feedback</li>
                        <li>• <span className="text-blue-400">Next Cell:</span> Live trading indicator</li>
                        <li>• <span className="text-green-400">Settled 5×:</span> Celebration emphasis</li>
                      </ul>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-green-400 font-semibold mb-2">Why Store Full History?</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Enables future features (stats, filters)</li>
                        <li>• Maintains complete audit trail</li>
                        <li>• Separates visual board from data</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Vietnamese Content */}
            {language === 'vi' && (
              <div>
                {/* Big Road Visual Diagram - Vietnamese */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                  <h3 className="text-2xl font-semibold text-blue-400 mb-6 text-center">📊 Quy Tắc Bảng Lịch Sử Big Road Baccarat (Không Có Tie)</h3>
                  
                  {/* Diagram Image */}
                  <div className="bg-gray-900 rounded-lg p-4 mb-6 flex justify-center">
                    <img 
                      src="https://raw.githubusercontent.com/chonshaman/riv_store/759c8d5d06fdf73d381c114593a0c1f085e8a043/haluuimg/public/unnamedv.webp" 
                      alt="Sơ Đồ Quy Tắc Big Road Baccarat" 
                      className="max-w-full h-auto rounded-lg"
                      style={{ maxHeight: '500px' }}
                    />
                  </div>

                  {/* Explanation Text - Vietnamese */}
                  <div className="divide-y divide-white/5 text-gray-300">
                    <div className="pb-3">
                      <h4 className="text-lg font-medium text-white mb-1">Trường hợp 1: Cùng Bên Thắng (Di Chuyển Dọc)</h4>
                      <p className="text-sm">
                        Thể hiện ở cột đầu tiên. Khi cùng một bên thắng (Banker), ô sau nằm ngay dưới ô trước.
                      </p>
                    </div>

                    <div className="py-3">
                      <h4 className="text-lg font-medium text-white mb-1">Trường hợp 2: Đổi Bên (Nhảy Cột Mới)</h4>
                      <p className="text-sm">
                        Khi kết quả chuyển từ Banker sang Player (hoặc ngược lại), di chuyển sang cột tiếp theo bên phải và bắt đầu ghi lại từ Hàng 1.
                      </p>
                    </div>

                    <div className="py-3">
                      <h4 className="text-lg font-medium text-white mb-1">Trường hợp 3: Hình chữ L / Đuôi Rồng (Uốn Ngang)</h4>
                      <p className="text-sm">
                        Khi Banker thắng đến ván thứ 7 (vượt quá 6 hàng của bảng), nó bắt đầu bẻ ngang sang phải tại Hàng 6.
                      </p>
                    </div>

                    <div className="py-3">
                      <h4 className="text-lg font-medium text-white mb-1">Trường hợp 4: Đổi Bên Sau Đuôi Rồng</h4>
                      <p className="text-sm">
                        Khi đang có đuôi rồng (B8) mà đổi bên, ô tiếp theo (P) phải nhảy lên Hàng 1 của cột trống tiếp theo (không được ghi vào các hàng trống phía trên B7, B8).
                      </p>
                    </div>

                    <div className="pt-3">
                      <h4 className="text-lg font-medium text-white mb-1">Trường hợp 5: Rồng Kép (Đuôi Chồng Lấn)</h4>
                      <p className="text-sm">
                        Đây là trường hợp nâng cao. Khi một chuỗi thắng mới (Player) cũng dài và chạm đáy, nhưng Hàng 6 đã bị cái đuôi của Banker chiếm mất, thì chuỗi Player này sẽ phải bẻ ngang sớm hơn ở Hàng 5.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Luồng thanh toán giao dịch */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">🔄 Luồng Thanh Toán Giao Dịch Hoàn Chỉnh</h3>
                  
                  <div className="divide-y divide-white/5">
                    <div className="pb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">1</div>
                        <h4 className="text-white font-semibold">Bắt Đầu Giao Dịch (Chế độ 30s/60s)</h4>
                      </div>
                      <pre className="text-green-400 text-xs ml-8">// Nếu chọn UP, dự đoán 'WIN' (thị trường tăng){'\n'}historyRef.current?.setNextFlashing(true, 'WIN');{'\n'}// Nếu chọn DOWN, dự đoán 'LOSE' (thị trường giảm){'\n'}historyRef.current?.setNextFlashing(true, 'LOSE');</pre>
                    </div>

                    <div className="py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">2</div>
                        <h4 className="text-white font-semibold">Trong Giao Dịch</h4>
                      </div>
                      <p className="text-gray-300 text-sm ml-8">Ô tiếp theo đang nhấp nháy, biểu đồ hiển thị đường giá vào và đếm ngược</p>
                    </div>

                    <div className="py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">3</div>
                        <h4 className="text-white font-semibold">Thanh Toán Giao Dịch</h4>
                      </div>
                      <p className="text-gray-300 text-sm ml-8">Xác định thắng/thua, tính toán PnL, cập nhật số dư</p>
                    </div>

                    <div className="py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">4</div>
                        <h4 className="text-white font-semibold">Thêm Vào Lịch Sử</h4>
                      </div>
                      <pre className="text-green-400 text-xs ml-8">historyRef.current?.addSettledTrade(historyItem);</pre>
                    </div>

                    <div className="py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">5</div>
                        <h4 className="text-white font-semibold">Dừng Nhấp Nháy & Hiển Thị Toast</h4>
                      </div>
                      <pre className="text-green-400 text-xs ml-8">historyRef.current?.setNextFlashing(false);</pre>
                    </div>

                    <div className="pt-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">6</div>
                        <h4 className="text-white font-semibold">Sau 2 Giây - Nhấp Nháy Ăn Mừng</h4>
                      </div>
                      <pre className="text-green-400 text-xs ml-8">historyRef.current?.flashLastResult();</pre>
                    </div>
                  </div>
                </div>

                {/* Tổng quan */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">Tổng Quan</h3>
                  <p className="text-gray-300">
                    Component History hiển thị lưới kiểu baccarat theo dõi tất cả các giao dịch đã thanh toán theo định dạng mẫu trực quan. 
                    Nó hỗ trợ hai thuật toán hiển thị khác nhau và bao gồm hoạt ảnh và quản lý trạng thái phức tạp.
                  </p>
                </div>

                {/* Cấu trúc dữ liệu */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">📊 Cấu Trúc Dữ Liệu</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Interface HistoryItem</h4>
                      <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm">
                        <code className="text-green-400">{`export interface HistoryItem {
  id: string;              // Mã định danh duy nhất cho giao dịch
  symbol: string;          // Cặp giao dịch (ví dụ: 'BTC/USDT', 'ETH/USDT', 'SOL/USDT')
  direction: 'UP' | 'DOWN'; // Hướng dự đoán/chọn của người dùng
  result: 'WIN' | 'LOSE';   // Kết quả thanh toán
  entryPrice: number;       // Giá khi mở giao dịch
  exitPrice: number;        // Giá khi thanh toán giao dịch
  betAmount: number;        // Số tiền đặt cược
  pnl: number;             // Lãi/Lỗ sau khi thanh toán
  settledAt: number;       // Dấu thời gian thanh toán
}`}</code>
                      </pre>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">CellType & Result</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-900 rounded-lg p-4">
                          <p className="text-gray-400 text-sm mb-2">CellType:</p>
                          <ul className="text-gray-300 space-y-1 text-sm">
                            <li>• <span className="text-blue-400">'WIN'</span>: Ô màu xanh với chữ "U"</li>
                            <li>• <span className="text-red-400">'LOSE'</span>: Ô màu đỏ với chữ "D"</li>
                            <li>• <span className="text-gray-400">null</span>: Ô trống với mẫu ô vuông</li>
                          </ul>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-4">
                          <p className="text-gray-400 text-sm mb-2">Kiểu Result:</p>
                          <pre className="text-green-400 text-sm">type Result = 'WIN' | 'LOSE';</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hai chế độ thuật toán */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">🎲 Hai Chế Độ Thuật Toán</h3>
                  
                  <div className="mb-4 bg-gray-900 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-2">Cấu hình:</p>
                    <pre className="text-green-400 text-sm">const USE_BIG_ROAD = true; // Đặt false để dùng chế độ Bead Plate</pre>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Bead Plate */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-green-400 mb-3">1. THUẬT TOÁN BEAD PLATE</h4>
                      <p className="text-gray-300 text-sm mb-3">Điền tuần tự đơn giản từ trái sang phải, từ trên xuống dưới</p>
                      
                      <div className="space-y-2 text-sm">
                        <p className="text-white font-semibold">Quy tắc:</p>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Chỉ số hàng = index % 6</li>
                          <li>• Chỉ số cột = floor(index / 6)</li>
                          <li>• Điền tuần tự (thứ tự đọc)</li>
                          <li>• Không theo dõi mẫu</li>
                        </ul>
                      </div>

                      <div className="mt-3 p-3 bg-gray-950 rounded">
                        <p className="text-gray-400 text-xs mb-2">Ví dụ mẫu:</p>
                        <pre className="text-xs text-gray-300">{`Cột 0     Cột 1     Cột 2
[0] WIN   [6] LOSE  [12] WIN
[1] WIN   [7] LOSE  [13] LOSE
[2] WIN   [8] WIN   [14] ...
[3] LOSE  [9] WIN
[4] LOSE  [10] LOSE
[5] LOSE  [11] WIN`}</pre>
                      </div>
                    </div>

                    {/* Big Road */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-blue-400 mb-3">2. THUẬT TOÁN BIG ROAD (MẶC ĐỊNH)</h4>
                      <p className="text-gray-300 text-sm mb-3">Nhóm các kết quả giống nhau liên tiếp, theo dõi chuỗi và mẫu</p>
                      
                      <div className="space-y-2 text-sm">
                        <p className="text-white font-semibold">Quy tắc cốt lõi:</p>
                        <ul className="text-gray-300 space-y-1">
                          <li>• <span className="text-yellow-400">Quy tắc 1:</span> Kết quả đầu tiên tại (0,0)</li>
                          <li>• <span className="text-yellow-400">Quy tắc 2:</span> Kết quả GIỐNG → Di chuyển xuống</li>
                          <li>• <span className="text-yellow-400">Quy tắc 3:</span> Kết quả KHÁC → Cột mới</li>
                          <li>• <span className="text-red-400">Đuôi Rồng:</span> Khi cột đầy → Di chuyển sang phải</li>
                        </ul>
                      </div>

                      <div className="mt-3 p-3 bg-gray-950 rounded">
                        <p className="text-gray-400 text-xs mb-2">Ví dụ mẫu:</p>
                        <pre className="text-xs text-gray-300">{`Cột 0     Cột 1     Cột 2
[WIN]     [LOSE]    [WIN]
[WIN]     [LOSE]    [WIN]
[WIN]              
          Đuôi Rồng →
[LOSE] [LOSE] [LOSE]`}</pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quản lý trạng thái */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">🎯 Quản Lý Trạng Thái</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Trạng thái Component cục bộ:</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <code className="text-green-400">historyData</code>: Mảng 2D các ô (bảng hiển thị)</li>
                        <li>• <code className="text-green-400">tradeHistory</code>: Lịch sử giao dịch đầy đủ với chi tiết</li>
                        <li>• <code className="text-green-400">lastPosition</code>: Vị trí kết quả được thêm gần nhất (hoạt ảnh nhấp nháy)</li>
                        <li>• <code className="text-green-400">isNextFlashing</code>: Ô tiếp theo có nhấp nháy trong giao dịch trực tiếp không</li>
                        <li>• <code className="text-green-400">flashingSettledPosition</code>: Vị trí nhấp nháy cho kết quả đã thanh toán (hoạt ảnh 5 lần)</li>
                      </ul>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Instance Board Singleton:</h4>
                      <pre className="text-green-400 text-sm mb-2">const historyBoard = USE_BIG_ROAD ? new BigRoadBoard() : new BeadPlateBoard();</pre>
                      <p className="text-gray-400 text-sm">Duy trì trạng thái qua các lần render component và bảo toàn mẫu lưới.</p>
                    </div>
                  </div>
                </div>

                {/* Phương thức Ref được công khai */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">📡 Phương Thức Ref Được Công Khai (HistoryRef)</h3>
                  
                  <div className="space-y-4">
                    {/* addSettledTrade */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-green-400 mb-2">1. addSettledTrade(trade: HistoryItem)</h4>
                      <p className="text-gray-400 text-sm mb-3">Thêm giao dịch đã hoàn thành vào lịch sử</p>
                      
                      <div className="space-y-2 text-sm">
                        <p className="text-white">Được gọi: Khi giao dịch thanh toán (thắng hoặc thua)</p>
                        <div className="bg-gray-950 rounded p-3">
                          <p className="text-gray-400 mb-2">Luồng Logic:</p>
                          <ol className="text-gray-300 space-y-1 list-decimal list-inside">
                            <li>Lưu trữ dữ liệu giao dịch đầy đủ</li>
                            <li>Thêm vào bảng hiển thị (chỉ sử dụng kết quả: WIN/LOSE)</li>
                            <li>Theo dõi vị trí cho hoạt ảnh nhấp nháy</li>
                            <li>Xóa nhấp nháy sau 600ms</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    {/* setNextFlashing */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-green-400 mb-2">2. setNextFlashing(isLive: boolean, predictedResult?: 'WIN' | 'LOSE')</h4>
                      <p className="text-gray-400 text-sm mb-3">Điều khiển hoạt ảnh nhấp nháy trên ô tiếp theo dựa trên lựa chọn của người dùng</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="bg-gray-950 rounded p-3">
                          <p className="text-white mb-1">Khi true + predictedResult:</p>
                          <p className="text-gray-300">Nhấp nháy vị trí mà kết quả sẽ xuất hiện nếu người dùng thắng cược</p>
                          <p className="text-gray-400 text-xs mt-1">• Chọn UP → dự đoán 'WIN' (thị trường tăng)</p>
                          <p className="text-gray-400 text-xs">• Chọn DOWN → dự đoán 'LOSE' (thị trường giảm)</p>
                        </div>
                        <div className="bg-gray-950 rounded p-3">
                          <p className="text-white mb-1">Khi false:</p>
                          <p className="text-gray-300">Hoạt ảnh nhấp nháy dừng lại</p>
                        </div>
                      </div>
                    </div>

                    {/* flashLastResult */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-green-400 mb-2">3. flashLastResult()</h4>
                      <p className="text-gray-400 text-sm mb-3">Nhấp nháy kết quả đã thanh toán gần nhất 5 lần (hiệu ứng ăn mừng)</p>
                      
                      <div className="space-y-2 text-sm">
                        <p className="text-white">Được gọi: Sau khi toast thắng/thua biến mất (2 giây sau thanh toán)</p>
                        <div className="bg-gray-950 rounded p-3">
                          <p className="text-gray-400 mb-2">Thời gian hoạt ảnh:</p>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Tổng thời lượng: 3 giây</li>
                            <li>• Nhấp nháy bật: 300ms</li>
                            <li>• Nhấp nháy tắt: 300ms</li>
                            <li>• Lặp lại 5 lần</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trạng thái hiển thị & Hoạt ảnh */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">🎨 Trạng Thái Hiển Thị & Hoạt Ảnh</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Trạng thái ô */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3">Ô Trống (null)</h4>
                      <div className="w-12 h-12 rounded-full border-2 border-gray-600 bg-gray-800 mx-auto mb-2" style={{
                        background: 'repeating-conic-gradient(#374151 0% 25%, #1f2937 0% 50%)'
                      }}></div>
                      <p className="text-gray-400 text-xs text-center">Mẫu ô vuông</p>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3">Ô WIN (Xanh)</h4>
                      <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold" style={{
                        background: 'linear-gradient(135deg, #47FBF5 0%, #47B6FB 100%)'
                      }}>U</div>
                      <p className="text-gray-400 text-xs text-center">Xanh với chữ "U"</p>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3">Ô LOSE (Đỏ)</h4>
                      <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold" style={{
                        background: 'linear-gradient(135deg, #FF2222 0%, #C50000 100%)'
                      }}>D</div>
                      <p className="text-gray-400 text-xs text-center">Đỏ với chữ "D"</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Trạng thái hoạt ảnh:</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <span className="text-yellow-400">Nhấp Nháy Kết Quả Mới:</span> Kích hoạt khi thêm kết quả mới (thời lượng 600ms)</li>
                        <li>• <span className="text-blue-400">Nhấp Nháy Ô Tiếp Theo:</span> Xung liên tục trong giao dịch trực tiếp (vòng lặp vô hạn)</li>
                        <li>• <span className="text-green-400">Nhấp Nháy Đã Thanh Toán (5×):</span> Hiệu ứng ăn mừng sau toast (bật/tắt 300ms × 5)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Quyết định thiết kế chính */}
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">🎯 Quyết Định Thiết Kế Chính</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-green-400 font-semibold mb-2">Tại Sao Hai Thuật Toán?</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• <span className="text-white">Bead Plate:</span> Theo dõi thời gian đơn giản</li>
                        <li>• <span className="text-white">Big Road:</span> Nhận dạng mẫu (bắt chước bảng baccarat casino)</li>
                      </ul>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-green-400 font-semibold mb-2">Tại Sao Instance Singleton?</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Bảo toàn trạng thái qua các lần render</li>
                        <li>• Tránh mất dữ liệu trong cập nhật</li>
                        <li>• Đảm bảo vị trí lưới nhất quán</li>
                      </ul>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-green-400 font-semibold mb-2">Tại Sao Ba Trạng Thái Nhấp Nháy?</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• <span className="text-yellow-400">Kết Quả Mới:</span> Phản hồi ngay lập tức</li>
                        <li>• <span className="text-blue-400">Ô Tiếp Theo:</span> Chỉ báo giao dịch trực tiếp</li>
                        <li>• <span className="text-green-400">Đã Thanh Toán 5×:</span> Nhấn mạnh ăn mừng</li>
                      </ul>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-green-400 font-semibold mb-2">Tại Sao Lưu Lịch Sử Đầy Đủ?</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Cho phép tính năng tương lai (thống kê, bộ lọc)</li>
                        <li>• Duy trì dấu vết kiểm toán hoàn chỉnh</li>
                        <li>• Tách bảng hiển thị khỏi dữ liệu</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
