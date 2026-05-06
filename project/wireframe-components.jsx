// wireframe-components.jsx — sketchy wireframe primitives for Yep

// Design tokens
const YEP = {
  ink: '#1a1a1a',
  ink70: 'rgba(26,26,26,0.7)',
  ink40: 'rgba(26,26,26,0.4)',
  ink20: 'rgba(26,26,26,0.2)',
  ink10: 'rgba(26,26,26,0.1)',
  paper: '#fafaf7',
  paperDark: '#f2f1ec',
  // single accent — warm coral
  accent: '#ff5a3c',
  accentSoft: '#ffe4dd',
  good: '#2fb380',
  goodSoft: '#d9f2e6',
  warn: '#f0b94a',
  font: '"Caveat", "Comic Sans MS", "Marker Felt", cursive',
  sans: '"Inter", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

// ────────────────────────────────────────────────────────
// Sketchy rounded rect border (SVG, hand-drawn-ish)
// ────────────────────────────────────────────────────────
function SketchBox({ children, style = {}, fill = 'transparent', stroke = YEP.ink, strokeWidth = 1.5, radius = 12, dashed = false }) {
  return (
    <div style={{ position: 'relative', ...style }}>
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        preserveAspectRatio="none"
      >
        <rect
          x={strokeWidth / 2} y={strokeWidth / 2}
          width={`calc(100% - ${strokeWidth}px)`}
          height={`calc(100% - ${strokeWidth}px)`}
          rx={radius} ry={radius}
          fill={fill} stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={dashed ? '5 4' : undefined}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>{children}</div>
    </div>
  );
}

// A placeholder image box with hatched lines
function HatchBox({ style = {}, label, height = 120 }) {
  return (
    <div style={{
      position: 'relative', width: '100%', height,
      background: `repeating-linear-gradient(135deg, transparent 0 8px, ${YEP.ink10} 8px 9px)`,
      border: `1.5px dashed ${YEP.ink40}`,
      borderRadius: 8,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: YEP.mono, fontSize: 10, color: YEP.ink40,
      textTransform: 'uppercase', letterSpacing: 0.5,
      ...style,
    }}>
      {label || 'image'}
    </div>
  );
}

// Squiggly line (simulated text)
function Squiggle({ width = '80%', height = 8, opacity = 0.6 }) {
  return (
    <div style={{
      width, height, background: YEP.ink,
      opacity, borderRadius: 4,
    }}/>
  );
}

// Text placeholder lines
function TextLines({ lines = 3, widths = ['90%', '70%', '55%'], gap = 6, height = 6 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Squiggle key={i} width={widths[i % widths.length]} height={height} opacity={0.35} />
      ))}
    </div>
  );
}

// ────────────────────────────────────────────────────────
// Colored pill button (the "key button" color accent)
// ────────────────────────────────────────────────────────
function YepButton({ children, color = YEP.accent, textColor = '#fff', fullWidth = true, style = {}, small = false }) {
  return (
    <div style={{
      background: color, color: textColor,
      borderRadius: 999,
      padding: small ? '10px 18px' : '16px 22px',
      fontFamily: YEP.sans, fontWeight: 600,
      fontSize: small ? 14 : 16,
      letterSpacing: -0.1,
      textAlign: 'center',
      width: fullWidth ? '100%' : undefined,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      boxSizing: 'border-box',
      boxShadow: `0 2px 0 ${YEP.ink}`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SketchButton({ children, style = {}, small = false }) {
  return (
    <SketchBox radius={999} strokeWidth={1.5} style={{
      padding: small ? '10px 18px' : '14px 20px',
      display: 'inline-block', ...style,
    }}>
      <div style={{
        fontFamily: YEP.sans, fontWeight: 500,
        fontSize: small ? 13 : 15,
        color: YEP.ink, textAlign: 'center',
      }}>{children}</div>
    </SketchBox>
  );
}

// ────────────────────────────────────────────────────────
// Star — sketchy outline or filled (accent colored)
// ────────────────────────────────────────────────────────
function Star({ size = 44, filled = false, color = YEP.accent, strokeColor = YEP.ink }) {
  const path = "M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7L12 2z";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>
      <path d={path}
        fill={filled ? color : 'none'}
        stroke={filled ? color : strokeColor}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ────────────────────────────────────────────────────────
// Simple logo mark for Yep
// ────────────────────────────────────────────────────────
function YepLogo({ size = 28, color = YEP.ink }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontFamily: YEP.font, fontSize: size, fontWeight: 700,
      color, letterSpacing: -1, lineHeight: 1,
    }}>
      <span>yep</span>
      <span style={{
        width: 8, height: 8, borderRadius: '50%',
        background: YEP.accent, display: 'inline-block',
        marginBottom: size * 0.1,
      }}/>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// Phone frame — simplified, minimal chrome so focus is on flow
// ────────────────────────────────────────────────────────
function Phone({ children, label, width = 300, height = 620, bg = YEP.paper }) {
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      {label && (
        <div style={{
          position: 'absolute', bottom: '100%', left: 0, paddingBottom: 10,
          fontFamily: YEP.font, fontSize: 20, color: YEP.ink,
          whiteSpace: 'nowrap', fontWeight: 600,
        }}>{label}</div>
      )}
      <div style={{
        width, height, borderRadius: 38,
        background: '#111',
        padding: 8,
        boxShadow: '0 30px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.2)',
        position: 'relative',
      }}>
        {/* dynamic island */}
        <div style={{
          position: 'absolute', top: 18, left: '50%', transform: 'translateX(-50%)',
          width: 90, height: 24, borderRadius: 16, background: '#000', zIndex: 10,
        }}/>
        <div style={{
          width: '100%', height: '100%', borderRadius: 32,
          background: bg, overflow: 'hidden', position: 'relative',
          display: 'flex', flexDirection: 'column',
        }}>
          {children}
          {/* home indicator */}
          <div style={{
            position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)',
            width: 100, height: 4, borderRadius: 100, background: YEP.ink20, zIndex: 5,
          }}/>
        </div>
      </div>
    </div>
  );
}

// Status bar placeholder (minimal)
function FakeStatus() {
  return (
    <div style={{
      height: 44, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 24px',
      fontFamily: YEP.sans, fontSize: 12, fontWeight: 600, color: YEP.ink,
      flexShrink: 0,
    }}>
      <span>9:41</span>
      <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
        <span style={{ display: 'inline-block', width: 14, height: 8, border: `1px solid ${YEP.ink}`, borderRadius: 2 }}/>
      </span>
    </div>
  );
}

// Screen content container (scroll-proof padding, column)
function Screen({ children, style = {}, padding = '0 20px 20px' }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      padding, overflow: 'hidden', ...style,
    }}>{children}</div>
  );
}

// Header label describing a screen
function FlowLabel({ n, title, subtitle }) {
  return (
    <div style={{ marginBottom: 8, display: 'flex', alignItems: 'baseline', gap: 10 }}>
      <span style={{
        fontFamily: YEP.font, fontSize: 28, fontWeight: 700,
        color: YEP.accent, lineHeight: 1,
      }}>{n}</span>
      <div>
        <div style={{ fontFamily: YEP.sans, fontSize: 13, fontWeight: 600, color: YEP.ink }}>{title}</div>
        {subtitle && <div style={{ fontFamily: YEP.sans, fontSize: 11, color: YEP.ink40 }}>{subtitle}</div>}
      </div>
    </div>
  );
}

// Arrow between phones
function FlowArrow({ rotate = 0, label }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 4, minWidth: 40, paddingTop: 280,
    }}>
      <svg width="60" height="40" viewBox="0 0 60 40" style={{ transform: `rotate(${rotate}deg)` }}>
        <path d="M4 20 Q 20 12, 40 20 T 56 20" fill="none" stroke={YEP.ink} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M50 14 L 56 20 L 50 26" fill="none" stroke={YEP.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {label && (
        <div style={{
          fontFamily: YEP.font, fontSize: 15, color: YEP.ink70,
          background: YEP.accentSoft, padding: '2px 8px', borderRadius: 10,
          border: `1px solid ${YEP.accent}`,
          whiteSpace: 'nowrap',
        }}>{label}</div>
      )}
    </div>
  );
}

Object.assign(window, {
  YEP, SketchBox, HatchBox, Squiggle, TextLines, YepButton, SketchButton,
  Star, YepLogo, Phone, FakeStatus, Screen, FlowLabel, FlowArrow,
});
