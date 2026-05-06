// hifi-dashboard.jsx — employee dashboard peek
function EmployeeStatCard({ employee, business, stats }) {
  return (
    <div style={{
      width: 360,
      background: T.paper, borderRadius: T.r.lg,
      boxShadow: T.shadowLg, padding: 20, fontFamily: T.sans,
      border: `1px solid ${T.ink10}`,
    }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <Avatar seed={employee.name} size={48} color={employee.color}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, letterSpacing: -0.2 }}>{employee.name}</div>
          <div style={{ fontSize: 12, color: T.ink60 }}>{employee.role} · since {employee.since}</div>
        </div>
        <div style={{
          padding: '4px 10px', background: T.goodSoft, color: '#0a7a4e',
          borderRadius: T.r.pill, fontSize: 11, fontWeight: 600,
        }}>Top performer</div>
      </div>

      {/* big stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 18 }}>
        <div style={{ padding: '12px 10px', background: T.ink05, borderRadius: T.r.md }}>
          <div style={{ fontSize: 11, color: T.ink60, fontWeight: 600, marginBottom: 2 }}>Avg rating</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: T.ink, letterSpacing: -0.5 }}>
            {stats.avg.toFixed(1)}
            <span style={{ fontSize: 13, color: T.gold, marginLeft: 4 }}>★</span>
          </div>
        </div>
        <div style={{ padding: '12px 10px', background: T.ink05, borderRadius: T.r.md }}>
          <div style={{ fontSize: 11, color: T.ink60, fontWeight: 600, marginBottom: 2 }}>Reviews</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: T.ink, letterSpacing: -0.5 }}>{stats.total}</div>
        </div>
        <div style={{ padding: '12px 10px', background: T.ink05, borderRadius: T.r.md }}>
          <div style={{ fontSize: 11, color: T.ink60, fontWeight: 600, marginBottom: 2 }}>Public</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: T.good, letterSpacing: -0.5 }}>{stats.public}</div>
        </div>
      </div>

      {/* rating distribution */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: T.ink60, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>This month</div>
        {[5, 4, 3, 2, 1].map(n => {
          const pct = stats.dist[n] || 0;
          return (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: T.ink60, width: 14 }}>{n}★</span>
              <div style={{ flex: 1, height: 8, background: T.ink10, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${pct}%`,
                  background: n >= 4 ? T.good : n === 3 ? T.warn : T.danger,
                  borderRadius: 4,
                }}/>
              </div>
              <span style={{ fontSize: 11, color: T.ink60, width: 28, textAlign: 'right' }}>{pct}%</span>
            </div>
          );
        })}
      </div>

      {/* recent */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: T.ink60, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>Recent mentions</div>
        {stats.recent.map((r, i) => (
          <div key={i} style={{
            padding: '10px 0',
            borderBottom: i === stats.recent.length - 1 ? 'none' : `1px solid ${T.ink10}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
              <div style={{ display: 'flex', gap: 1 }}>
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="11" height="11" viewBox="0 0 24 24">
                    <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7L12 2z"
                      fill={s <= r.stars ? T.gold : T.ink20}/>
                  </svg>
                ))}
              </div>
              <span style={{
                fontSize: 10, fontWeight: 600,
                color: r.public ? T.good : T.ink60,
                padding: '2px 6px', borderRadius: 4,
                background: r.public ? T.goodSoft : T.ink05,
              }}>{r.public ? 'PUBLIC' : 'PRIVATE'}</span>
            </div>
            <div style={{ fontSize: 12, color: T.ink80, lineHeight: 1.4 }}>"{r.text}"</div>
            <div style={{ fontSize: 10, color: T.ink40, marginTop: 2 }}>{r.when}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { EmployeeStatCard });
