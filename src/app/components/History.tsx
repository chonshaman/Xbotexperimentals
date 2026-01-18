import { useState, useImperativeHandle, forwardRef } from 'react';
import './HistoryCSS.css';

/**
 * ========================================
 * HISTORY BOARD - TWO ALGORITHM MODES
 * ========================================
 * 
 * This component supports two different display algorithms:
 * 
 * 1. BEAD PLATE LOGIC (Sequential Grid)
 *    - Displays results in strict sequential order
 *    - Row index = index % 6
 *    - Column index = floor(index / 6)
 *    - WIN = Blue Circle, LOSE = Red Circle
 *    - Simple left-to-right, top-to-bottom filling
 * 
 * 2. BIG ROAD LOGIC (Trend Tracking - DEFAULT)
 *    - Groups consecutive identical results in columns
 *    - Tracks streaks and patterns (like Baccarat)
 *    - Dragon tail: When column is full, moves right horizontally
 *    - New result type starts new column
 *    - WIN = Blue Circle, LOSE = Red Circle
 * 
 * CONFIGURATION:
 * Set USE_BIG_ROAD = true for Big Road (default)
 * Set USE_BIG_ROAD = false for Bead Plate
 * 
 * FEATURES:
 * - Auto-scroll to latest result
 * - Flash animation on new results
 * - Next cell flashing during live trading
 * - Streak detection and tracking
 * - Checkered pattern background
 * ========================================
 */

const ROWS = 6;

type CellType = 'WIN' | 'LOSE' | null;
type Result = 'WIN' | 'LOSE';

// Trade History Item
export interface HistoryItem {
  id: string;
  symbol: string;
  direction: 'UP' | 'DOWN';  // what user tapped
  result: 'WIN' | 'LOSE';    // settlement outcome
  entryPrice: number;
  exitPrice: number;
  betAmount: number;
  pnl: number;               // final pnl after settlement
  settledAt: number;         // timestamp
}

// ========================================
// 1. BEAD PLATE LOGIC (Raw Sequential Grid)
// ========================================
class BeadPlateBoard {
  private results: Result[];
  private mockInitialized: boolean;

  constructor() {
    this.results = [];
    this.mockInitialized = false;
  }

  addResult(result: Result): void {
    this.results.push(result);
  }

  getBoard(): CellType[][] {
    const board: CellType[][] = [];
    
    this.results.forEach((result, index) => {
      const rowIndex = index % ROWS;
      const colIndex = Math.floor(index / ROWS);
      
      // Ensure column exists
      while (board.length <= colIndex) {
        board.push(Array(ROWS).fill(null));
      }
      
      board[colIndex][rowIndex] = result;
    });
    
    // Add empty columns to fill the view
    const minColumns = 22;
    while (board.length < minColumns) {
      board.push(Array(ROWS).fill(null));
    }
    
    return board;
  }

  getLastPosition(): { col: number; row: number } | null {
    if (this.results.length === 0) return null;
    const lastIndex = this.results.length - 1;
    const row = lastIndex % ROWS;
    const col = Math.floor(lastIndex / ROWS);
    return { col, row };
  }

  getNextPosition(): { col: number; row: number } {
    const nextIndex = this.results.length;
    const row = nextIndex % ROWS;
    const col = Math.floor(nextIndex / ROWS);
    return { col, row };
  }

  initializeMockData(): void {
    // Initialize with 5 mock results (2 columns on first load only)
    if (!this.mockInitialized) {
      this.addResult('WIN');
      this.addResult('WIN');
      this.addResult('WIN');
      this.addResult('LOSE');
      this.addResult('LOSE');
      this.mockInitialized = true;
    }
  }
}

// ========================================
// 2. BIG ROAD LOGIC (Trend Tracking)
// ========================================
class BigRoadBoard {
  private matrix: CellType[][];
  private prevResult: Result | null;
  private currRow: number;
  private currCol: number;
  private currentStreak: number; // Track current winning/losing streak
  private mockInitialized: boolean; // Track if mock data has been added

  constructor() {
    this.matrix = [];
    this.prevResult = null;
    this.currRow = 0;
    this.currCol = 0;
    this.currentStreak = 0;
    this.mockInitialized = false;
  }

  addResult(result: Result): void {
    // Rule 1: First result - start at (0, 0)
    if (this.prevResult === null) {
      this.currCol = 0;
      this.currRow = 0;
      this.place(result, this.currRow, this.currCol);
      this.prevResult = result;
      this.currentStreak = 1;
      return;
    }

    // Rule 2: SAME result as previous (streak continues)
    if (result === this.prevResult) {
      this.currentStreak++;
      
      // Check if we can go down (not at bottom and cell below is empty)
      if (this.currRow + 1 < ROWS && this.isCellEmpty(this.currRow + 1, this.currCol)) {
        this.currRow++;
        this.place(result, this.currRow, this.currCol);
      } 
      // Dragon Tail: Bottom reached, move right
      else {
        this.currCol++;
        // Stay at current row, move right until empty cell found
        while (!this.isCellEmpty(this.currRow, this.currCol)) {
          this.currCol++;
        }
        this.place(result, this.currRow, this.currCol);
      }
    } 
    // Rule 3: DIFFERENT result (trend change - start new column)
    else {
      this.currentStreak = 1; // Reset streak
      
      // Find next available column (first column where row 0 is empty)
      this.currCol++;
      this.currRow = 0;
      
      // Handle collisions - keep moving right
      while (!this.isCellEmpty(this.currRow, this.currCol)) {
        this.currCol++;
      }
      
      this.place(result, this.currRow, this.currCol);
      this.prevResult = result;
    }
  }

  private place(result: Result, row: number, col: number): void {
    this.ensureColumn(col);
    this.matrix[col][row] = result;
    this.currRow = row;
    this.currCol = col;
  }

  private isCellEmpty(row: number, col: number): boolean {
    if (col >= this.matrix.length) return true;
    if (row >= ROWS || row < 0) return false;
    return this.matrix[col][row] === null;
  }

  private ensureColumn(col: number): void {
    while (this.matrix.length <= col) {
      this.matrix.push(Array(ROWS).fill(null));
    }
  }

  getBoard(): CellType[][] {
    // Return a copy with empty columns for scrolling
    const result = [...this.matrix];
    
    // Add empty columns to fill the view
    const minColumns = 22;
    while (result.length < minColumns) {
      result.push(Array(ROWS).fill(null));
    }
    
    return result;
  }

  getLastPosition(): { col: number; row: number } | null {
    if (this.matrix.length === 0) return null;
    return { col: this.currCol, row: this.currRow };
  }

  getNextPosition(): { col: number; row: number } {
    // Predict next position assuming SAME result (most common scenario)
    if (this.prevResult === null) {
      return { col: 0, row: 0 };
    }
    
    let nextCol = this.currCol;
    let nextRow = this.currRow;
    
    // If not at bottom and cell below is empty, next goes down
    if (this.currRow + 1 < ROWS && this.isCellEmpty(this.currRow + 1, this.currCol)) {
      nextRow = this.currRow + 1;
    } 
    // Dragon Tail: move right
    else {
      nextCol = this.currCol + 1;
      nextRow = this.currRow;
      
      // Handle potential collisions
      while (!this.isCellEmpty(nextRow, nextCol)) {
        nextCol++;
      }
    }
    
    return { col: nextCol, row: nextRow };
  }

  getCurrentStreak(): number {
    return this.currentStreak;
  }

  initializeMockData(): void {
    // Initialize with pattern showing streaks
    if (!this.mockInitialized) {
      this.addResult('WIN');
      this.addResult('WIN');
      this.addResult('WIN');
      this.addResult('LOSE');
      this.addResult('LOSE');
      this.mockInitialized = true;
    }
  }
}

// ========================================
// Choose which algorithm to use
// ========================================
const USE_BIG_ROAD = true; // Set to false for Bead Plate mode

// Create singleton instance based on config
const historyBoard = USE_BIG_ROAD ? new BigRoadBoard() : new BeadPlateBoard();

function HistoryDot({ type, isNew, isFlashing }: { type: 'WIN' | 'LOSE' | null; isNew?: boolean; isFlashing?: boolean }) {
  // Empty cell - match Figma design exactly
  if (!type) {
    return (
      <div className={`history-dot-empty ${isFlashing ? 'flashing' : ''}`}>
        <div className="history-dot-empty-inner">
          <div className="history-dot-empty-bg" />
        </div>
        <div className="history-dot-empty-border" />
      </div>
    );
  }
  
  // Filled cell with WIN or LOSE - display as U or D
  const displayText = type === 'WIN' ? 'U' : 'D';
  
  return (
    <div className={`history-dot-wrapper ${type === 'WIN' ? 'up' : 'down'} ${isNew ? 'flash' : ''}`}>
      <div className="history-dot-inner">
        <div className="history-dot-bg">
          <div className="history-dot-text">{displayText}</div>
        </div>
      </div>
      <div className="history-dot-border" />
    </div>
  );
}

function HistoryColumn({ data, newResultKey }: { data: Array<'WIN' | 'LOSE' | null>; newResultKey?: string }) {
  return (
    <div className="history-column">
      {data.map((type, index) => {
        const cellKey = `${index}`;
        const isNew = newResultKey === cellKey;
        return <HistoryDot key={index} type={type} isNew={isNew} />;
      })}
    </div>
  );
}

// Export ref methods interface
export interface HistoryRef {
  addSettledTrade: (trade: HistoryItem) => void;
  setNextFlashing: (isLive: boolean) => void; // Flash next cell during live trading
}

const History = forwardRef<HistoryRef>((props, ref) => {
  const [historyData, setHistoryData] = useState<CellType[][]>(() => {
    historyBoard.initializeMockData();
    return historyBoard.getBoard();
  });
  
  const [tradeHistory, setTradeHistory] = useState<HistoryItem[]>([]);
  const [lastPosition, setLastPosition] = useState<{ col: number; row: number } | null>(null);
  const [isNextFlashing, setIsNextFlashing] = useState(false);

  // Function to add a settled trade
  const addSettledTrade = (trade: HistoryItem) => {
    // Store the full trade data
    setTradeHistory(prev => [...prev, trade]);
    
    // Add to Big Road board (uses direction only)
    historyBoard.addResult(trade.result);
    setHistoryData(historyBoard.getBoard());
    
    // Track latest position for flash animation
    const newPos = historyBoard.getLastPosition();
    setLastPosition(newPos);
    
    // Clear flash after animation completes
    setTimeout(() => {
      setLastPosition(null);
    }, 600);
  };
  
  // Function to control next cell flashing during live trading
  const setNextFlashing = (isLive: boolean) => {
    setIsNextFlashing(isLive);
  };

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    addSettledTrade,
    setNextFlashing
  }));
  
  // Get the next position for flashing
  const nextPosition = isNextFlashing ? historyBoard.getNextPosition() : null;

  return (
    <div className="history-panel">
      {/* Header */}
      <div className="history-header">
        <p className="history-title">HISTORY</p>
        <div className="history-legend">
          <p className="legend-down">D=DOWN</p>
          <p className="legend-up">U=UP</p>
        </div>
      </div>

      {/* Grid Container */}
      <div className="history-inside">
        <div className="history-inside-content">
          <div className="history-grid-wrapper">
            <div className="history-grid">
              {historyData.map((column, colIndex) => (
                <div key={colIndex} className="history-column">
                  {column.map((type, rowIndex) => {
                    const isNew = lastPosition && lastPosition.col === colIndex && lastPosition.row === rowIndex;
                    const isFlashing = nextPosition && nextPosition.col === colIndex && nextPosition.row === rowIndex;
                    return <HistoryDot key={rowIndex} type={type} isNew={isNew} isFlashing={isFlashing} />;
                  })}
                </div>
              ))}
            </div>
            <div className="history-grid-border" />
          </div>
        </div>
        <div className="history-inside-shadow" />
      </div>

      {/* Outer Shadow */}
      <div className="history-outer-shadow" />
    </div>
  );
});

History.displayName = 'History';

export default History;