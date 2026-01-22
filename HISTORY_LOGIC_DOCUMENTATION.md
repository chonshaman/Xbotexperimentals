# History Board - Complete Logic Documentation

## Overview
The History component displays a baccarat-style grid that tracks all settled trades in a visual pattern-based format. It supports two different display algorithms and includes sophisticated animations and state management.

---

## 📊 Data Structures

### HistoryItem Interface
```typescript
export interface HistoryItem {
  id: string;              // Unique identifier for the trade
  symbol: string;          // Trading pair (e.g., 'BTC/USDT', 'ETH/USDT', 'SOL/USDT')
  direction: 'UP' | 'DOWN'; // User's prediction/tap direction
  result: 'WIN' | 'LOSE';   // Settlement outcome
  entryPrice: number;       // Price when trade was opened
  exitPrice: number;        // Price when trade was settled
  betAmount: number;        // Amount wagered
  pnl: number;             // Profit/Loss after settlement
  settledAt: number;       // Timestamp of settlement
}
```

### CellType
```typescript
type CellType = 'WIN' | 'LOSE' | null;
```
- `'WIN'`: Displayed as blue cell with "U" text
- `'LOSE'`: Displayed as red cell with "D" text
- `null`: Empty cell with checkered pattern background

### Result Type
```typescript
type Result = 'WIN' | 'LOSE';
```

---

## 🎲 Two Algorithm Modes

### Configuration
```typescript
const USE_BIG_ROAD = true; // Set to false for Bead Plate mode
```

### 1. BEAD PLATE LOGIC (Sequential Grid)
**Algorithm**: Simple left-to-right, top-to-bottom sequential filling

**Rules**:
- Row index = `index % 6`
- Column index = `Math.floor(index / 6)`
- Each new result fills the next available position in reading order
- No pattern tracking or grouping
- WIN = Blue Circle with "U"
- LOSE = Red Circle with "D"

**Use Case**: When you want a simple chronological display without pattern recognition

**Example Pattern**:
```
Column 0  Column 1  Column 2
[0] WIN   [6] LOSE  [12] WIN
[1] WIN   [7] LOSE  [13] LOSE
[2] WIN   [8] WIN   [14] ...
[3] LOSE  [9] WIN
[4] LOSE  [10] LOSE
[5] LOSE  [11] WIN
```

---

### 2. BIG ROAD LOGIC (Trend Tracking) - **DEFAULT**
**Algorithm**: Groups consecutive identical results in columns, tracks streaks and patterns

**Core Rules**:

#### Rule 1: First Result
- Always starts at position `(col: 0, row: 0)`
- Initializes `prevResult` and `currentStreak = 1`

#### Rule 2: SAME Result (Streak Continues)
- Increments `currentStreak`
- **If row + 1 < 6 AND cell below is empty**: Move down
- **If at bottom OR cell blocked**: DRAGON TAIL - Move right horizontally
- Stays in same column until bottom is reached

#### Rule 3: DIFFERENT Result (Trend Change)
- Resets `currentStreak = 1`
- Moves to next column, starts at `row: 0`
- If collision detected, keeps moving right until empty column found

**Example Pattern**:
```
Column 0  Column 1  Column 2  Column 3
[WIN]     [LOSE]    [WIN]     [LOSE]
[WIN]     [LOSE]    [WIN]     [LOSE]
[WIN]                         [LOSE]
                              [LOSE]
                              [LOSE] ←Dragon Tail→ [LOSE]
```

**Dragon Tail**: When a streak continues but the column is full (6 rows), results continue horizontally to the right at the same row level.

---

## 🎯 State Management

### Local Component States

```typescript
// Board data - 2D array of cells
const [historyData, setHistoryData] = useState<CellType[][]>(() => {
  historyBoard.initializeMockData();
  return historyBoard.getBoard();
});

// Complete trade history with full details
const [tradeHistory, setTradeHistory] = useState<HistoryItem[]>([]);

// Position of the most recently added result (for flash animation)
const [lastPosition, setLastPosition] = useState<{ col: number; row: number } | null>(null);

// Whether the next predicted cell should flash during live trading
const [isNextFlashing, setIsNextFlashing] = useState(false);

// Position to flash for settled result (5-flash animation)
const [flashingSettledPosition, setFlashingSettledPosition] = useState<{ col: number; row: number } | null>(null);
```

### Singleton Board Instance

```typescript
const historyBoard = USE_BIG_ROAD ? new BigRoadBoard() : new BeadPlateBoard();
```

**Why Singleton?**
- Maintains state across component re-renders
- Preserves grid patterns and positions
- Ensures data consistency

---

## 🔄 Core Methods & Logic Flow

### BeadPlateBoard Class Methods

```typescript
class BeadPlateBoard {
  // Add a new result to the sequential grid
  addResult(result: Result): void
  
  // Get the current board state as 2D array
  getBoard(): CellType[][]
  
  // Get position of the last placed result
  getLastPosition(): { col: number; row: number } | null
  
  // Get position where next result will be placed
  getNextPosition(): { col: number; row: number }
  
  // Initialize with mock data (called once on mount)
  initializeMockData(): void
}
```

### BigRoadBoard Class Methods

```typescript
class BigRoadBoard {
  // Add a new result with streak/pattern tracking
  addResult(result: Result): void
  
  // Get the current board state as 2D array
  getBoard(): CellType[][]
  
  // Get position of the last placed result
  getLastPosition(): { col: number; row: number } | null
  
  // Predict next position (assumes streak continues)
  getNextPosition(): { col: number; row: number }
  
  // Get current winning/losing streak count
  getCurrentStreak(): number
  
  // Initialize with mock data (called once on mount)
  initializeMockData(): void
  
  // Private: Place result at specific position
  private place(result: Result, row: number, col: number): void
  
  // Private: Check if cell is empty
  private isCellEmpty(row: number, col: number): boolean
  
  // Private: Ensure column exists in matrix
  private ensureColumn(col: number): void
}
```

---

## 📡 Exposed Ref Methods (HistoryRef)

The History component exposes these methods via `forwardRef`:

```typescript
export interface HistoryRef {
  addSettledTrade: (trade: HistoryItem) => void;
  setNextFlashing: (isLive: boolean) => void;
  flashLastResult: () => void;
}
```

### 1. `addSettledTrade(trade: HistoryItem)`
**Purpose**: Add a completed trade to the history

**Called**: When a trade settles (wins or loses)

**Logic Flow**:
```typescript
const addSettledTrade = (trade: HistoryItem) => {
  // 1. Store complete trade data
  setTradeHistory(prev => [...prev, trade]);
  
  // 2. Add to visual board (uses only result: WIN/LOSE)
  historyBoard.addResult(trade.result);
  setHistoryData(historyBoard.getBoard());
  
  // 3. Track position for flash animation
  const newPos = historyBoard.getLastPosition();
  setLastPosition(newPos);
  
  // 4. Clear flash after 600ms
  setTimeout(() => {
    setLastPosition(null);
  }, 600);
};
```

**Called From App.tsx**:
```typescript
// After trade settlement
const historyItem: HistoryItem = {
  id: `trade-${Date.now()}`,
  symbol: selectedPair,
  direction: tradeDirection!,
  result: finalResult,
  entryPrice: entryPrice!,
  exitPrice: currentExitPrice,
  betAmount: betAmount,
  pnl: pnl,
  settledAt: Date.now()
};
historyRef.current?.addSettledTrade(historyItem);
```

---

### 2. `setNextFlashing(isLive: boolean)`
**Purpose**: Control flashing animation on the predicted next cell

**Called**: 
- When trade starts (isLive = true)
- When trade settles (isLive = false)

**Logic Flow**:
```typescript
const setNextFlashing = (isLive: boolean) => {
  setIsNextFlashing(isLive);
};
```

**Effect**:
- When `true`: Next predicted cell flashes with pulsing animation
- When `false`: Flash animation stops

**Rendering Logic**:
```typescript
const nextPosition = isNextFlashing ? historyBoard.getNextPosition() : null;

// In render:
const isFlashing = nextPosition && 
                   nextPosition.col === colIndex && 
                   nextPosition.row === rowIndex;
```

**Called From App.tsx**:
```typescript
// When trade starts (30s or 60s mode)
historyRef.current?.setNextFlashing(true);

// When trade settles
historyRef.current?.setNextFlashing(false);
```

---

### 3. `flashLastResult()`
**Purpose**: Flash the most recently settled result 5 times (celebration effect)

**Called**: After the win/loss toast disappears (2 seconds after settlement)

**Logic Flow**:
```typescript
const flashLastResult = () => {
  const lastPos = historyBoard.getLastPosition();
  if (!lastPos) return;
  
  let flashCount = 0;
  const maxFlashes = 5;
  
  const flashInterval = setInterval(() => {
    if (flashCount >= maxFlashes * 2) {
      clearInterval(flashInterval);
      setFlashingSettledPosition(null);
      return;
    }
    
    // Toggle between showing and hiding the flash
    setFlashingSettledPosition(flashCount % 2 === 0 ? lastPos : null);
    flashCount++;
  }, 300); // Flash every 300ms (on/off cycle)
};
```

**Animation Timing**:
- Total duration: 3 seconds (5 flashes × 2 states × 300ms)
- Flash on: 300ms
- Flash off: 300ms
- Repeats 5 times

**Called From App.tsx**:
```typescript
setTimeout(() => {
  setChartState('idle');
  
  // Flash the settled result 5 times after toast disappears
  historyRef.current?.flashLastResult();
  
  // Show confetti AFTER win toast disappears (only for wins)
  if (finalResult === 'WIN') {
    setShowConfetti(true);
  }
}, 2000);
```

---

## 🎨 Visual States & Animations

### Cell States

#### 1. Empty Cell (null)
```tsx
<div className="history-dot-empty">
  <div className="history-dot-empty-inner">
    <div className="history-dot-empty-bg" /> {/* Checkered pattern */}
  </div>
  <div className="history-dot-empty-border" /> {/* Border */}
</div>
```

**CSS Classes**: `.history-dot-empty`
- Checkered pattern background
- Semi-transparent border
- No text

---

#### 2. WIN Cell (Blue)
```tsx
<div className="history-dot-wrapper up">
  <div className="history-dot-inner">
    <div className="history-dot-bg">
      <div className="history-dot-text">U</div>
    </div>
  </div>
  <div className="history-dot-border" />
</div>
```

**CSS Classes**: `.history-dot-wrapper.up`
- Blue gradient background
- White "U" text
- Blue border glow

---

#### 3. LOSE Cell (Red)
```tsx
<div className="history-dot-wrapper down">
  <div className="history-dot-inner">
    <div className="history-dot-bg">
      <div className="history-dot-text">D</div>
    </div>
  </div>
  <div className="history-dot-border" />
</div>
```

**CSS Classes**: `.history-dot-wrapper.down`
- Red gradient background
- White "D" text
- Red border glow

---

### Animation States

#### 1. New Result Flash (isNew)
```tsx
<HistoryDot type={type} isNew={true} />
```

**CSS**: `.flash` class added
- Triggers on newly added result
- Duration: 600ms
- Auto-clears via setTimeout

**Trigger**: When `lastPosition` matches cell coordinates

---

#### 2. Next Cell Flashing (isFlashing)
```tsx
<HistoryDot type={null} isFlashing={true} />
```

**CSS**: `.flashing` class added
- Continuous pulsing animation
- Only on empty cells
- Active during live trading

**Trigger**: When `nextPosition` matches cell coordinates AND `isNextFlashing === true`

**Animation**:
```css
@keyframes pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.flashing {
  animation: pulse 1s infinite;
}
```

---

#### 3. Settled Result Flash (5× Flash)
```tsx
<HistoryDot type={type} isNew={isFlashingSettled} />
```

**Trigger**: When `flashingSettledPosition` matches cell coordinates

**Logic**:
- Toggles every 300ms
- Flashes 5 times total
- Uses same `.flash` CSS as new result

---

## 🔄 Complete Trade Settlement Flow

### Step-by-Step Integration with App.tsx

```typescript
// ===== 1. TRADE START (30s/60s Mode) =====
const handleUpButtonClick = () => {
  setTradeDirection('UP');
  setEntryPrice(currentPrice);
  setChartState('opened');
  
  // Start flashing next history cell
  historyRef.current?.setNextFlashing(true);
  
  // Set up countdown...
};

// ===== 2. DURING TRADE =====
// Next cell is flashing, user can see prediction indicator
// Chart shows entry price line and countdown

// ===== 3. TRADE SETTLEMENT =====
if (countdownRef.current) {
  clearTimeout(countdownRef.current);
  countdownRef.current = null;
}

setCountdown(undefined);
const finalDirection = tradeDirection;
const finalEntryPrice = entryPrice!;
const currentExitPrice = currentPriceRef.current;

// Determine win/loss
const finalResult = (
  (finalDirection === 'UP' && currentExitPrice > finalEntryPrice) ||
  (finalDirection === 'DOWN' && currentExitPrice < finalEntryPrice)
) ? 'WIN' : 'LOSE';

// Calculate PnL
const priceChange = Math.abs(currentExitPrice - finalEntryPrice);
const percentChange = (priceChange / finalEntryPrice) * 100;
const leveragedGain = percentChange * leverage;
const pnl = finalResult === 'WIN'
  ? betAmount * (leveragedGain / 100)
  : -betAmount;

// Update balance
setBalance(prev => prev + pnl);

// ===== 4. ADD TO HISTORY =====
const historyItem: HistoryItem = {
  id: `trade-${Date.now()}`,
  symbol: selectedPair,
  direction: finalDirection,
  result: finalResult,
  entryPrice: finalEntryPrice,
  exitPrice: currentExitPrice,
  betAmount: betAmount,
  pnl: pnl,
  settledAt: Date.now()
};
historyRef.current?.addSettledTrade(historyItem);

// ===== 5. STOP FLASHING NEXT CELL =====
historyRef.current?.setNextFlashing(false);

// ===== 6. SHOW WIN/LOSS TOAST =====
setChartState(finalResult === 'WIN' ? 'win' : 'lose');

// ===== 7. AFTER 2 SECONDS =====
setTimeout(() => {
  setChartState('idle');
  
  // Flash the settled result 5 times
  historyRef.current?.flashLastResult();
  
  // Show confetti for wins
  if (finalResult === 'WIN') {
    setShowConfetti(true);
  }
}, 2000);
```

---

## 📐 Grid Structure & Constants

### Grid Dimensions
```typescript
const ROWS = 6; // Fixed height (6 rows)
const MIN_COLUMNS = 22; // Minimum columns for scrolling
```

### Board Initialization
```typescript
// Mock data added on first mount
initializeMockData(): void {
  if (!this.mockInitialized) {
    this.addResult('WIN');   // Creates first column
    this.addResult('WIN');   // Same column, row 1
    this.addResult('WIN');   // Same column, row 2
    this.addResult('LOSE');  // New column (trend change)
    this.addResult('LOSE');  // Same column, row 1
    this.mockInitialized = true;
  }
}
```

**Result Pattern**:
```
Column 0  Column 1
[WIN]     [LOSE]
[WIN]     [LOSE]
[WIN]     
```

---

## 🎯 String Constants

All text is dynamic and centralized:

```typescript
const HISTORY_TEXT = {
  TITLE: 'HISTORY',
  LEGEND_DOWN: 'D=DOWN',
  LEGEND_UP: 'U=UP',
  CELL_UP: 'U',
  CELL_DOWN: 'D',
  RESULT_WIN: 'WIN',
  RESULT_LOSE: 'LOSE',
} as const;
```

---

## 🎨 CSS Architecture

### Key CSS Files
- `/src/app/components/HistoryCSS.css`

### CSS Class Structure
```
.history-panel              → Main container
  .history-header           → Top section with title & legend
    .history-title          → "HISTORY" text
    .history-legend         → Legend container
      .legend-down          → "D=DOWN" text
      .legend-up            → "U=UP" text
  
  .history-inside           → Grid container with shadows
    .history-inside-content → Scrollable area
      .history-grid-wrapper → Grid positioning
        .history-grid       → Actual grid (flex layout)
          .history-column   → Each column
            .history-dot-*  → Individual cells
        .history-grid-border → Border overlay
    .history-inside-shadow  → Inner shadow effect
  
  .history-outer-shadow     → Outer shadow effect
```

### Cell CSS Classes
```css
/* Empty cell */
.history-dot-empty
.history-dot-empty-inner
.history-dot-empty-bg      /* Checkered pattern */
.history-dot-empty-border

/* Filled cell */
.history-dot-wrapper
.history-dot-wrapper.up    /* WIN - Blue */
.history-dot-wrapper.down  /* LOSE - Red */
.history-dot-inner
.history-dot-bg
.history-dot-text          /* "U" or "D" */
.history-dot-border

/* Animation states */
.flash                     /* New result flash (600ms) */
.flashing                  /* Next cell pulse (infinite) */
```

---

## 🔧 Common Operations

### Adding a Manual Result
```typescript
historyRef.current?.addSettledTrade({
  id: 'trade-123',
  symbol: 'BTC/USDT',
  direction: 'UP',
  result: 'WIN',
  entryPrice: 96500,
  exitPrice: 96550,
  betAmount: 100,
  pnl: 15.5,
  settledAt: Date.now()
});
```

### Starting Live Trade Indicator
```typescript
historyRef.current?.setNextFlashing(true);
```

### Stopping Live Trade Indicator
```typescript
historyRef.current?.setNextFlashing(false);
```

### Triggering Celebration Flash
```typescript
historyRef.current?.flashLastResult();
```

---

## 🧪 Testing Scenarios

### Scenario 1: Winning Streak
```typescript
historyRef.current?.addSettledTrade({ ..., result: 'WIN' });
historyRef.current?.addSettledTrade({ ..., result: 'WIN' });
historyRef.current?.addSettledTrade({ ..., result: 'WIN' });
```
**Expected**: Single column with 3 blue cells stacked vertically

---

### Scenario 2: Alternating Results
```typescript
historyRef.current?.addSettledTrade({ ..., result: 'WIN' });
historyRef.current?.addSettledTrade({ ..., result: 'LOSE' });
historyRef.current?.addSettledTrade({ ..., result: 'WIN' });
historyRef.current?.addSettledTrade({ ..., result: 'LOSE' });
```
**Expected**: 4 columns, each with 1 cell (alternating blue/red)

---

### Scenario 3: Dragon Tail
```typescript
// Add 7 consecutive WINs
for (let i = 0; i < 7; i++) {
  historyRef.current?.addSettledTrade({ ..., result: 'WIN' });
}
```
**Expected**: 
- First 6 WINs fill column vertically
- 7th WIN creates dragon tail to the right at row 5

---

## 🎯 Key Design Decisions

### Why Two Algorithms?
- **Bead Plate**: Simple chronological tracking
- **Big Road**: Pattern recognition for advanced traders (mimics casino baccarat boards)

### Why Singleton Board Instance?
- Preserves state across React re-renders
- Avoids data loss during component updates
- Ensures consistent grid positions

### Why Three Different Flash States?
1. **New Result Flash**: Immediate feedback when result is added
2. **Next Cell Flash**: Shows where next result will appear during live trading
3. **Settled Flash (5×)**: Celebration/emphasis effect after toast

### Why Store Full Trade History?
- Enables future features (stats, filters, export)
- Maintains complete audit trail
- Separates visual board from data storage

---

## 📊 Performance Considerations

### Grid Rendering Optimization
```typescript
// Always render minimum 22 columns to fill viewport
const minColumns = 22;
while (result.length < minColumns) {
  result.push(Array(ROWS).fill(null));
}
```

### Animation Cleanup
```typescript
// Auto-clear flash animation to prevent memory leaks
setTimeout(() => {
  setLastPosition(null);
}, 600);
```

### Mock Data Initialization Guard
```typescript
private mockInitialized: boolean;

initializeMockData(): void {
  if (!this.mockInitialized) {
    // Add mock data
    this.mockInitialized = true;
  }
}
```

---

## 🔮 Future Enhancement Possibilities

1. **History Export**: Export trade history as CSV/JSON
2. **Pattern Recognition**: Highlight streaks, patterns
3. **Statistics Panel**: Win rate, average PnL, streak counts
4. **Time Filters**: Filter by date range
5. **Trading Pair Filters**: Show history per symbol
6. **Replay Mode**: Animate historical trades
7. **Sound Effects**: Audio feedback on new results
8. **Custom Streak Colors**: Color-code based on streak length

---

## 📝 Summary

The History component is a sophisticated baccarat-style grid system that:

✅ Supports two distinct display algorithms (Bead Plate & Big Road)  
✅ Tracks complete trade history with full metadata  
✅ Provides three animation states for visual feedback  
✅ Exposes clean ref API for parent component integration  
✅ Handles streak detection and dragon tail patterns  
✅ Maintains singleton state for consistency  
✅ Uses dynamic string constants for maintainability  
✅ Implements checkered empty cells matching Figma design  
✅ Auto-scrolls to show latest results  
✅ Includes 5-flash celebration effect for settled trades  

**Default Configuration**: Big Road algorithm with WIN/LOSE display
