import './HistoryCSS.css';

// Mock history data - array of arrays (columns x rows)
// 'U' = UP (blue), 'D' = DOWN (red), null = empty
const historyData = [
  ['U', 'U', 'U', 'D', 'U', 'U'],
  ['U', 'U', 'U', 'D', 'D', 'D'],
  ['D', 'D', 'D', 'D', 'U', 'D'],
  ['U', 'D', 'U', 'U', 'D', 'U'],
  ['U', 'U', 'U', 'D', 'D', 'U'],
  ['D', 'U', 'D', 'D', 'U', 'U'],
  ['U', 'U', 'D', 'U', 'U', 'U'],
  ['U', 'D', 'U', 'D', 'D', 'D'],
  ['D', 'U', 'U', 'D', 'D', 'U'],
  ['U', 'D', 'D', 'U', 'U', 'D'],
  ['U', 'D', 'U', 'U', 'U', 'D'],
  ['D', 'U', 'U', 'D', 'D', 'U'],
  ['U', 'U', 'D', 'U', 'D', 'D'],
  ['D', 'U', 'D', 'D', 'U', 'U'],
  ['U', 'U', 'U', 'D', 'U', 'D'],
  ['D', 'D', 'D', 'U', 'D', 'U'],
  ['U', 'D', 'U', 'U', 'U', 'D'],
  ['D', 'U', 'D', 'D', 'U', 'U'],
  ['U', 'U', 'D', 'U', 'D', 'D'],
  ['D', 'D', 'U', 'D', 'U', 'U'],
  ['U', 'U', 'U', 'D', 'U', 'D'],
  [null, null, null, null, null, null],
];

function HistoryDot({ type }: { type: 'U' | 'D' | null }) {
  if (!type) {
    return <div className="history-dot-empty" />;
  }
  
  return (
    <div className={`history-dot-wrapper ${type === 'U' ? 'up' : 'down'}`}>
      <div className="history-dot-inner">
        <div className="history-dot-bg">
          <div className="history-dot-text">{type}</div>
        </div>
      </div>
      <div className="history-dot-border" />
    </div>
  );
}

function HistoryColumn({ data }: { data: Array<'U' | 'D' | null> }) {
  return (
    <div className="history-column">
      {data.map((type, index) => (
        <HistoryDot key={index} type={type} />
      ))}
    </div>
  );
}

export default function History() {
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
              {historyData.map((column, index) => (
                <HistoryColumn key={index} data={column} />
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
}
