// dashboard-ui.jsx — shared UI bits for the Yep owner dashboard

// Simple star rendering
function Stars({ value, size = 12, gap = 1 }) {
  return (
    <div style={{ display: 'inline-flex', gap }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24">
          <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7L12 2z"
            fill={i <= value ? T.gold : T.ink20}/>
        </svg>
      ))}
    </div>
  );
}

// Nav item in sidebar
function NavItem({ icon, label, active, count }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '7px 10px', borderRadius: 8,
      background: active ? T.ink05 : 'transparent',
      color: active ? T.ink : T.ink60,
      fontFamily: T.sans, fontSize: 13, fontWeight: active ? 600 : 500,
      cursor: 'pointer', marginBottom: 2,
    }}>
      <span style={{ width: 16, height: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: active ? T.accent : T.ink60 }}>
        {icon}
      </span>
      <span style={{ flex: 1 }}>{label}</span>
      {count != null && (
        <span style={{
          background: active ? T.accent : T.ink10,
          color: active ? '#fff' : T.ink60,
          fontSize: 10, fontWeight: 700, padding: '1px 6px',
          borderRadius: 999, minWidth: 16, textAlign: 'center',
        }}>{count}</span>
      )}
    </div>
  );
}

// Stat card
function StatCard({ label, value, sub, trend, accent }) {
  const up = trend > 0, down = trend < 0;
  return (
    <div style={{
      flex: 1, padding: 16, background: T.paper,
      border: `1px solid ${T.ink10}`, borderRadius: 12,
    }}>
      <div style={{ fontSize: 11, color: T.ink60, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: T.ink, letterSpacing: -0.8, fontFamily: T.sans }}>{value}</div>
        {sub && <div style={{ fontSize: 13, color: T.ink60 }}>{sub}</div>}
      </div>
      {trend != null && (
        <div style={{
          marginTop: 8, fontSize: 12, fontWeight: 500,
          color: up ? T.good : down ? T.danger : T.ink60,
          display: 'inline-flex', alignItems: 'center', gap: 3,
        }}>
          <span>{up ? '↑' : down ? '↓' : '→'}</span>
          <span>{up ? '+' : ''}{trend}{typeof trend === 'number' && Math.abs(trend) < 10 ? '' : '%'}</span>
          <span style={{ color: T.ink40, fontWeight: 400, marginLeft: 4 }}>vs last 30d</span>
        </div>
      )}
    </div>
  );
}

// Rating trend line chart
function TrendChart({ data, volumeData, width = 720, height = 200 }) {
  const pad = { top: 16, right: 16, bottom: 26, left: 28 };
  const w = width - pad.left - pad.right;
  const h = height - pad.top - pad.bottom;
  const yMin = 3, yMax = 5;
  const x = (i) => pad.left + (i / (data.length - 1)) * w;
  const y = (v) => pad.top + (1 - (v - yMin) / (yMax - yMin)) * h;
  const maxVol = Math.max(...volumeData);

  const linePath = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v)}`).join(' ');
  const areaPath = `${linePath} L ${x(data.length - 1)} ${pad.top + h} L ${x(0)} ${pad.top + h} Z`;

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      {/* y gridlines */}
      {[3, 3.5, 4, 4.5, 5].map(v => (
        <g key={v}>
          <line x1={pad.left} x2={pad.left + w} y1={y(v)} y2={y(v)} stroke={T.ink10} strokeDasharray={v === 4 ? '0' : '3 3'}/>
          <text x={pad.left - 8} y={y(v) + 4} textAnchor="end" fontSize="10" fill={T.ink60} fontFamily={T.sans}>{v}</text>
        </g>
      ))}
      {/* volume bars */}
      {volumeData.map((v, i) => {
        const barH = (v / maxVol) * 32;
        return (
          <rect key={i} x={x(i) - 4} y={pad.top + h - barH} width="8" height={barH}
            fill={T.accent} opacity={0.12} rx={1}/>
        );
      })}
      {/* area */}
      <defs>
        <linearGradient id="trendGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={T.accent} stopOpacity={0.18}/>
          <stop offset="100%" stopColor={T.accent} stopOpacity={0}/>
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#trendGrad)"/>
      {/* line */}
      <path d={linePath} fill="none" stroke={T.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* last dot */}
      <circle cx={x(data.length - 1)} cy={y(data[data.length - 1])} r="4" fill="#fff" stroke={T.accent} strokeWidth="2"/>

      {/* x labels */}
      {[0, 7, 14, 21, 29].map(i => (
        <text key={i} x={x(i)} y={height - 6} textAnchor="middle" fontSize="10" fill={T.ink60} fontFamily={T.sans}>
          {i === 29 ? 'today' : `${29 - i}d`}
        </text>
      ))}
    </svg>
  );
}

// Platform badge
function PlatformBadge({ platform }) {
  const p = {
    google:      { label: 'Google',      bg: '#f0f4fc', fg: '#1a73e8' },
    yelp:        { label: 'Yelp',        bg: '#fde9e9', fg: '#D32323' },
    facebook:    { label: 'Facebook',    bg: '#e7f0fd', fg: '#1877F2' },
    tripadvisor: { label: 'TripAdvisor', bg: '#dff7eb', fg: '#00875a' },
  }[platform];
  if (!p) return null;
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, padding: '2px 7px',
      background: p.bg, color: p.fg, borderRadius: 4,
      textTransform: 'uppercase', letterSpacing: 0.3,
    }}>{p.label}</span>
  );
}

Object.assign(window, { Stars, NavItem, StatCard, TrendChart, PlatformBadge });
