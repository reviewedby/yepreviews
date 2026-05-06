// poster-qr.jsx — tiny QR-code-looking graphic (not a real QR, just a faux design placeholder)
// Deterministic from a seed string so each employee gets a stable pattern.

function FakeQR({ seed = 'yep', size = 240, color = '#0e1220', bg = '#fff', logoText = 'yep' }) {
  // Simple seeded PRNG so same seed -> same pattern
  const rng = (function () {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i++) {
      h ^= seed.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return () => {
      h += 0x6D2B79F5;
      let t = h;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  })();

  const N = 25;           // grid 25x25
  const cell = size / N;
  const modules = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      // corner finder rectangles
      const inFinder = (
        (x < 7 && y < 7) ||
        (x >= N - 7 && y < 7) ||
        (x < 7 && y >= N - 7)
      );
      // middle is reserved for logo
      const inLogo = (x >= 10 && x < 15 && y >= 10 && y < 15);
      if (inFinder || inLogo) continue;
      if (rng() > 0.52) modules.push({ x, y });
    }
  }

  const FinderSquare = ({ x, y }) => (
    <g>
      <rect x={x * cell} y={y * cell} width={7 * cell} height={7 * cell} rx={cell * 1.8} fill={color}/>
      <rect x={(x + 1) * cell} y={(y + 1) * cell} width={5 * cell} height={5 * cell} rx={cell * 1.2} fill={bg}/>
      <rect x={(x + 2) * cell} y={(y + 2) * cell} width={3 * cell} height={3 * cell} rx={cell * 0.7} fill={color}/>
    </g>
  );

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      style={{ display: 'block', background: bg, borderRadius: cell * 2 }}>
      {modules.map((m, i) => (
        <rect key={i} x={m.x * cell + 1} y={m.y * cell + 1}
          width={cell - 2} height={cell - 2} rx={cell * 0.3} fill={color}/>
      ))}
      <FinderSquare x={0} y={0}/>
      <FinderSquare x={N - 7} y={0}/>
      <FinderSquare x={0} y={N - 7}/>
      {/* center logo */}
      <g>
        <rect x={10 * cell} y={10 * cell} width={5 * cell} height={5 * cell} rx={cell * 1.2} fill={bg}/>
        <rect x={10.5 * cell} y={10.5 * cell} width={4 * cell} height={4 * cell} rx={cell * 1} fill={color}/>
        <text x={12.5 * cell} y={13.2 * cell} textAnchor="middle"
          fontFamily="Inter, sans-serif" fontWeight="800" fill={bg}
          fontSize={cell * 1.6} letterSpacing="-0.5">{logoText}</text>
      </g>
    </svg>
  );
}

Object.assign(window, { FakeQR });
