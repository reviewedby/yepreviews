// dashboard-sections.jsx — main sections of the owner dashboard

// ─── Action-needed card ─────────────────────────────
function ActionCard({ item, employee }) {
  return (
    <div style={{
      padding: 14, background: T.paper,
      border: `1px solid ${item.unread ? T.accent + '33' : T.ink10}`,
      borderLeft: `3px solid ${item.stars <= 2 ? T.danger : T.warn}`,
      borderRadius: 10, display: 'flex', gap: 12, alignItems: 'flex-start',
      position: 'relative',
    }}>
      {item.unread && (
        <div style={{
          position: 'absolute', top: 10, right: 10,
          width: 7, height: 7, borderRadius: '50%', background: T.accent,
        }}/>
      )}
      {employee ? (
        <Avatar seed={employee.name} size={32} color={employee.color}/>
      ) : (
        <div style={{
          width: 32, height: 32, borderRadius: '50%', background: T.ink10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: T.ink60, fontSize: 14, flexShrink: 0,
        }}>?</div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
          <Stars value={item.stars} size={11}/>
          <span style={{ fontSize: 12, fontWeight: 600, color: T.ink }}>
            {employee ? employee.name : 'Anonymous customer'}
          </span>
          <span style={{ fontSize: 11, color: T.ink40 }}>· {item.when}</span>
          {item.chips.map(c => (
            <span key={c} style={{
              fontSize: 10, fontWeight: 600, padding: '1px 6px',
              background: T.ink05, color: T.ink60, borderRadius: 4,
            }}>{c}</span>
          ))}
        </div>
        <div style={{ fontSize: 13, color: T.ink80, lineHeight: 1.45, marginBottom: 8 }}>
          "{item.text}"
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {item.email ? (
            <>
              <button style={{
                padding: '6px 10px', background: T.ink, color: '#fff',
                border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 500,
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5,
              }}>
                <Icon name="mail" size={12} color="#fff"/> Reply
              </button>
              <span style={{ fontSize: 11, color: T.ink60, fontFamily: T.mono }}>{item.email}</span>
            </>
          ) : (
            <span style={{ fontSize: 11, color: T.ink40, fontStyle: 'italic' }}>
              No contact info left
            </span>
          )}
          <div style={{ flex: 1 }}/>
          <button style={{
            padding: '6px 10px', background: 'transparent', color: T.ink60,
            border: `1px solid ${T.ink10}`, borderRadius: 6, fontSize: 12, fontWeight: 500,
            cursor: 'pointer',
          }}>Mark resolved</button>
        </div>
      </div>
    </div>
  );
}

// ─── Leaderboard row ─────────────────────────────────
function LeaderRow({ employee, rank }) {
  const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : null;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 0', borderBottom: `1px solid ${T.ink10}`,
    }}>
      <div style={{
        width: 24, textAlign: 'center', fontSize: 13,
        fontWeight: 600, color: T.ink60,
      }}>{medal || `#${rank}`}</div>
      <Avatar seed={employee.name} size={32} color={employee.color}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, lineHeight: 1.2 }}>{employee.name}</div>
        <div style={{ fontSize: 11, color: T.ink60 }}>{employee.role}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>{employee.avg.toFixed(1)}</span>
          <svg width="11" height="11" viewBox="0 0 24 24">
            <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7L12 2z" fill={T.gold}/>
          </svg>
        </div>
        <div style={{ fontSize: 10, color: T.ink60 }}>{employee.reviews} reviews</div>
      </div>
      <div style={{
        fontSize: 11, fontWeight: 500,
        color: employee.trend > 0 ? T.good : employee.trend < 0 ? T.danger : T.ink40,
        width: 40, textAlign: 'right',
      }}>
        {employee.trend > 0 ? '↑' : employee.trend < 0 ? '↓' : '—'}
        {employee.trend !== 0 && ` ${employee.trend > 0 ? '+' : ''}${employee.trend.toFixed(1)}`}
      </div>
    </div>
  );
}

// ─── Recent feedback row ─────────────────────────────
function FeedbackRow({ item, employeeLookup }) {
  const emp = item.employee ? employeeLookup[item.employee] : null;
  return (
    <div style={{
      display: 'flex', gap: 10, padding: '10px 0',
      borderBottom: `1px solid ${T.ink10}`, alignItems: 'flex-start',
    }}>
      {emp ? <Avatar seed={emp.name} size={26} color={emp.color}/> : (
        <div style={{
          width: 26, height: 26, borderRadius: '50%',
          background: T.ink10, color: T.ink60,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, flexShrink: 0,
        }}>?</div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2, flexWrap: 'wrap' }}>
          <Stars value={item.stars} size={10}/>
          {emp && <span style={{ fontSize: 11, fontWeight: 600, color: T.ink }}>{emp.name.split(' ')[0]}</span>}
          {item.public ? <PlatformBadge platform={item.platform}/> : (
            <span style={{
              fontSize: 10, fontWeight: 600, padding: '2px 7px',
              background: T.ink05, color: T.ink60, borderRadius: 4,
              textTransform: 'uppercase', letterSpacing: 0.3,
            }}>Private</span>
          )}
          <span style={{ fontSize: 10, color: T.ink40, marginLeft: 'auto' }}>{item.when}</span>
        </div>
        <div style={{ fontSize: 12, color: T.ink80, lineHeight: 1.4 }}>{item.text}</div>
      </div>
    </div>
  );
}

Object.assign(window, { ActionCard, LeaderRow, FeedbackRow });
