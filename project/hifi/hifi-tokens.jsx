// hifi-tokens.jsx — design tokens for the Yep hi-fi prototype
const T = {
  // Inks (warm-cool neutral)
  ink:     '#0e1220',
  ink80:   '#2a2e3d',
  ink60:   '#5b5f6e',
  ink40:   '#9094a1',
  ink20:   '#d5d7dd',
  ink10:   '#e9eaee',
  ink05:   '#f4f5f7',
  paper:   '#ffffff',
  paperWarm: '#fafafb',

  // Accent — indigo from user tweak
  accent:  '#5a5af0',
  accentSoft: '#eeeefe',
  accentDark: '#3e3ec8',

  // Semantic
  good:    '#12a66a',
  goodSoft: '#e3f6ee',
  warn:    '#e8a033',
  danger:  '#e04e4e',
  gold:    '#f5b700',

  // Type
  sans:    '"Inter", -apple-system, system-ui, sans-serif',
  display: '"Fraunces", "Inter", serif', // not actually used - kept to Inter
  mono:    '"JetBrains Mono", ui-monospace, monospace',

  // Elevation
  shadowSm: '0 1px 2px rgba(14,18,32,0.06), 0 1px 3px rgba(14,18,32,0.04)',
  shadowMd: '0 4px 12px rgba(14,18,32,0.08), 0 1px 3px rgba(14,18,32,0.04)',
  shadowLg: '0 12px 32px rgba(14,18,32,0.12), 0 2px 8px rgba(14,18,32,0.06)',

  // Radii
  r: { xs: 8, sm: 10, md: 14, lg: 18, xl: 24, pill: 999 },
};

// Yep logo mark
function YepMark({ size = 22, color = T.ink, dot = T.accent }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontFamily: T.sans, fontSize: size, fontWeight: 700,
      color, letterSpacing: -0.8, lineHeight: 1,
    }}>
      <span>yep</span>
      <span style={{
        width: size * 0.3, height: size * 0.3, borderRadius: '50%',
        background: dot, display: 'inline-block',
        marginBottom: size * 0.05,
      }}/>
    </div>
  );
}

// Avatar — initials with colored background. Deterministic from seed.
function Avatar({ seed = 'A', size = 48, color, ring = false }) {
  const colors = ['#e85a5a', '#e88a3a', '#d4a82a', '#3aa657', '#2ca39a', '#3a79e8', '#7a52d4', '#c44fa8'];
  const hash = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0);
  const bg = color || colors[hash % colors.length];
  const initials = seed.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `linear-gradient(135deg, ${bg}, ${bg}dd)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: T.sans, fontWeight: 600, color: '#fff',
      fontSize: size * 0.38, flexShrink: 0,
      boxShadow: ring ? `0 0 0 3px #fff, 0 0 0 5px ${bg}` : 'none',
      letterSpacing: -0.5,
    }}>{initials}</div>
  );
}

// Icon wrapper
function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 2 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    star: <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7L12 2z"/>,
    check: <path d="M20 6L9 17l-5-5"/>,
    arrow: <><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></>,
    back: <><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></>,
    external: <><path d="M7 17l10-10"/><path d="M7 7h10v10"/></>,
    camera: <><rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13" r="3.5"/><path d="M8 7l2-3h4l2 3"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></>,
    close: <><path d="M18 6L6 18"/><path d="M6 6l12 12"/></>,
    chevron: <path d="M9 6l6 6-6 6"/>,
    heart: <path d="M12 21s-7-4.5-9-9c-1.3-3 1-7 4.5-7 2 0 3.5 1 4.5 2.5C13 6 14.5 5 16.5 5c3.5 0 5.8 4 4.5 7-2 4.5-9 9-9 9z"/>,
    sparkle: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></>,
    trending: <><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></>,
    chart: <><path d="M3 3v18h18"/><path d="M7 15l4-4 4 4 5-5"/></>,
  };
  return <svg {...p}>{paths[name]}</svg>;
}

Object.assign(window, { T, YepMark, Avatar, Icon });
