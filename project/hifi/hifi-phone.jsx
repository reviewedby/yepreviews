// hifi-phone.jsx — clean iOS phone frame for hi-fi use
function HiPhone({ children, width = 390, height = 810, label, labelNote }) {
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      {label && (
        <div style={{
          position: 'absolute', bottom: '100%', left: 4, paddingBottom: 12,
          fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.ink80,
          whiteSpace: 'nowrap', display: 'flex', alignItems: 'baseline', gap: 8,
        }}>
          <span>{label}</span>
          {labelNote && (
            <span style={{ color: T.ink40, fontSize: 12, fontWeight: 400 }}>{labelNote}</span>
          )}
        </div>
      )}
      <div style={{
        width, height, borderRadius: 48,
        background: '#0a0a0c', padding: 9,
        boxShadow: '0 30px 60px rgba(0,0,0,0.12), 0 10px 20px rgba(0,0,0,0.08), 0 0 0 1.5px rgba(0,0,0,0.08)',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 32, borderRadius: 20, background: '#000', zIndex: 20,
        }}/>
        <div style={{
          width: '100%', height: '100%', borderRadius: 40,
          background: T.paperWarm, overflow: 'hidden', position: 'relative',
          display: 'flex', flexDirection: 'column',
        }}>
          <HiStatus/>
          {children}
          <div style={{
            position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
            width: 134, height: 5, borderRadius: 100, background: 'rgba(14,18,32,0.25)', zIndex: 15,
          }}/>
        </div>
      </div>
    </div>
  );
}

function HiStatus({ dark = false }) {
  const c = dark ? '#fff' : T.ink;
  return (
    <div style={{
      height: 54, display: 'flex', alignItems: 'flex-end',
      justifyContent: 'space-between', padding: '0 32px 8px',
      fontFamily: T.sans, fontSize: 15, fontWeight: 600, color: c,
      flexShrink: 0, position: 'relative', zIndex: 10,
    }}>
      <span>9:41</span>
      <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
        <svg width="17" height="11" viewBox="0 0 17 11" fill={c}>
          <rect x="0" y="6" width="3" height="5" rx="0.7"/>
          <rect x="4.5" y="4" width="3" height="7" rx="0.7"/>
          <rect x="9" y="2" width="3" height="9" rx="0.7"/>
          <rect x="13.5" y="0" width="3" height="11" rx="0.7"/>
        </svg>
        <svg width="24" height="11" viewBox="0 0 24 11">
          <rect x="0.5" y="0.5" width="21" height="10" rx="3" stroke={c} strokeOpacity="0.4" fill="none"/>
          <rect x="2" y="2" width="18" height="7" rx="1.5" fill={c}/>
        </svg>
      </span>
    </div>
  );
}

Object.assign(window, { HiPhone, HiStatus });
