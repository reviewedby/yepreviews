// poster-templates.jsx — four poster layouts you can print and stick up

// ── Classic: dark header, big QR, footer tip ──
function PosterClassic({ biz, employee, accent, qrSeed, size = 1, showBleed = false }) {
  const W = 420, H = 560;
  return (
    <PosterShell W={W} H={H} size={size} bg="#ffffff">
      {/* dark header */}
      <div style={{
        background: '#0e1220', color: '#fff',
        padding: '28px 32px 26px', textAlign: 'center',
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, opacity: 0.7, fontWeight: 600 }}>
          <YepMark size={16} color="#fff" dot={accent}/>
          <span style={{ marginLeft: 4 }}>/ {biz.sub}</span>
        </div>
        <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1.2, marginTop: 10, lineHeight: 1.05, fontFamily: T.sans }}>
          How was your<br/>visit today?
        </div>
      </div>

      <div style={{ padding: '34px 32px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: 12, border: `2px dashed ${T.ink10}`, borderRadius: 20 }}>
          <FakeQR seed={qrSeed} size={190} color="#0e1220"/>
        </div>
        <div style={{
          fontSize: 18, fontWeight: 600, marginTop: 18,
          color: T.ink, letterSpacing: -0.3, fontFamily: T.sans,
        }}>Scan to leave a review</div>
        <div style={{ fontSize: 13, color: T.ink60, marginTop: 6, fontFamily: T.mono }}>
          yep.to/{qrSeed}
        </div>
      </div>

      {/* Employee attribution */}
      {employee && (
        <div style={{
          margin: '0 24px 24px', padding: '12px 16px',
          background: T.ink05, borderRadius: 14,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <Avatar seed={employee.name} size={40} color={employee.color}/>
          <div>
            <div style={{ fontSize: 11, color: T.ink60, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.6 }}>Served by</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: T.ink, letterSpacing: -0.2 }}>{employee.name}</div>
          </div>
        </div>
      )}

      <div style={{
        padding: '14px 24px', borderTop: `1px solid ${T.ink10}`,
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 11, color: T.ink60, fontFamily: T.sans,
      }}>
        <span>⚡ Takes less than 20 seconds</span>
        <span style={{ marginLeft: 'auto', opacity: 0.5 }}>powered by yep</span>
      </div>

      {showBleed && <BleedMarks W={W} H={H}/>}
    </PosterShell>
  );
}

// ── Tent card (4x6 folded table talker) ──
function PosterTent({ biz, employee, accent, qrSeed, size = 1, showBleed = false }) {
  const W = 420, H = 420;
  return (
    <PosterShell W={W} H={H} size={size} bg={accent + '14'}>
      {/* fold crease line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '50%',
        borderTop: `1px dashed ${T.ink20}`, zIndex: 5,
      }}/>
      <div style={{ position: 'absolute', top: 'calc(50% - 18px)', right: 20, fontSize: 9, color: T.ink40, fontFamily: T.mono, textTransform: 'uppercase', letterSpacing: 1 }}>← fold here →</div>

      {/* TOP half (upside-down when folded, visible from one side) */}
      <div style={{
        padding: '32px 32px 18px', textAlign: 'center',
        transform: 'rotate(180deg)', height: 210,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: T.ink, letterSpacing: -0.8, lineHeight: 1.1 }}>
          Enjoy your meal?
        </div>
        <div style={{ fontSize: 14, color: T.ink60, marginTop: 6 }}>
          Tell us below ↓
        </div>
        {employee && (
          <div style={{ marginTop: 10, fontSize: 12, color: T.ink80 }}>
            Served by <b>{employee.name.split(' ')[0]}</b>
          </div>
        )}
      </div>

      {/* BOTTOM half — QR side */}
      <div style={{
        padding: '24px 32px', textAlign: 'center',
        height: 210,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ display: 'inline-block', padding: 8, background: '#fff', borderRadius: 14, boxShadow: T.shadowSm }}>
          <FakeQR seed={qrSeed} size={130} color="#0e1220"/>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, marginTop: 10, color: T.ink }}>
          Scan to leave a quick review
        </div>
      </div>

      {showBleed && <BleedMarks W={W} H={H}/>}
    </PosterShell>
  );
}

// ── Big & Bold: accent flood with huge QR ──
function PosterBold({ biz, employee, accent, qrSeed, size = 1, showBleed = false }) {
  const W = 420, H = 560;
  return (
    <PosterShell W={W} H={H} size={size} bg={accent}>
      <div style={{ padding: '36px 32px 0', color: '#fff' }}>
        <YepMark size={18} color="#fff" dot="#fff"/>
        <div style={{
          fontSize: 60, fontWeight: 800, letterSpacing: -2.5,
          lineHeight: 0.95, marginTop: 24, fontFamily: T.sans,
        }}>
          Loved<br/>it?<br/>
          <span style={{ opacity: 0.55 }}>Tell us.</span>
        </div>
        <div style={{ fontSize: 15, opacity: 0.85, marginTop: 18, maxWidth: 280 }}>
          Point your camera at the code. 20 seconds, tops.
        </div>
      </div>

      <div style={{ flex: 1 }}/>

      <div style={{
        margin: '24px', padding: 18, background: '#fff',
        borderRadius: 20, display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <FakeQR seed={qrSeed} size={130} color="#0e1220"/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: T.ink60, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.7 }}>
            {biz.name}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, marginTop: 2, letterSpacing: -0.3 }}>
            {biz.sub}
          </div>
          {employee && (
            <div style={{
              marginTop: 10, display: 'flex', alignItems: 'center', gap: 8,
              paddingTop: 10, borderTop: `1px solid ${T.ink10}`,
            }}>
              <Avatar seed={employee.name} size={24} color={employee.color}/>
              <div style={{ fontSize: 12, color: T.ink80 }}>
                Served by <b>{employee.name.split(' ')[0]}</b>
              </div>
            </div>
          )}
          <div style={{ fontSize: 11, color: T.ink40, marginTop: 10, fontFamily: T.mono }}>
            yep.to/{qrSeed}
          </div>
        </div>
      </div>

      {showBleed && <BleedMarks W={W} H={H}/>}
    </PosterShell>
  );
}

// ── Receipt / check-drop strip (narrow, tucks in check holder) ──
function PosterReceipt({ biz, employee, accent, qrSeed, size = 1, showBleed = false }) {
  const W = 300, H = 560;
  return (
    <PosterShell W={W} H={H} size={size} bg="#fff">
      <div style={{
        padding: '24px 20px 18px', borderBottom: `1px dashed ${T.ink20}`, textAlign: 'center',
      }}>
        <div style={{ fontSize: 10, color: T.ink60, fontFamily: T.mono, letterSpacing: 1.5, textTransform: 'uppercase' }}>
          —— THANK YOU ——
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: T.ink, marginTop: 10, letterSpacing: -0.5, lineHeight: 1.15 }}>
          {biz.name}
        </div>
        <div style={{ fontSize: 12, color: T.ink60, marginTop: 2 }}>{biz.sub}</div>
      </div>

      <div style={{ padding: '22px 20px 12px', textAlign: 'center' }}>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: T.ink60, lineHeight: 1.9, textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Table</span><span>12</span>
          </div>
          {employee && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Server</span><span>{employee.name}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Date</span><span>Apr 17, 2026</span>
          </div>
        </div>
        <div style={{ margin: '12px 0', borderBottom: `1px dashed ${T.ink20}` }}/>
        <div style={{ fontSize: 17, fontWeight: 700, color: T.ink, letterSpacing: -0.3 }}>
          How'd we do?
        </div>
        <div style={{ fontSize: 12, color: T.ink60, marginTop: 4 }}>
          Scan below to rate your visit.
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '8px 16px 16px' }}>
        <FakeQR seed={qrSeed} size={180} color="#0e1220"/>
        <div style={{ fontSize: 11, color: T.ink60, marginTop: 10, fontFamily: T.mono }}>
          yep.to/{qrSeed}
        </div>
      </div>

      <div style={{
        padding: '10px 16px', borderTop: `1px dashed ${T.ink20}`,
        fontSize: 10, color: T.ink40, fontFamily: T.mono, textAlign: 'center',
        letterSpacing: 0.6,
      }}>
        *** SEE YOU SOON ***
      </div>

      {showBleed && <BleedMarks W={W} H={H}/>}
    </PosterShell>
  );
}

// ── Poster shell + bleed marks ──
function PosterShell({ W, H, size, bg, children }) {
  return (
    <div style={{
      width: W * size, height: H * size,
      flexShrink: 0,
    }}>
      <div style={{
        width: W, height: H, background: bg,
        transform: `scale(${size})`, transformOrigin: 'top left',
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        borderRadius: 4, boxShadow: '0 8px 24px rgba(14,18,32,0.1), 0 2px 6px rgba(14,18,32,0.06)',
      }}>
        {children}
      </div>
    </div>
  );
}

function BleedMarks({ W, H }) {
  const c = { position: 'absolute', background: T.ink };
  const sz = 12, th = 1;
  return (
    <>
      <div style={{ ...c, left: 0, top: 0, width: sz, height: th }}/>
      <div style={{ ...c, left: 0, top: 0, width: th, height: sz }}/>
      <div style={{ ...c, right: 0, top: 0, width: sz, height: th }}/>
      <div style={{ ...c, right: 0, top: 0, width: th, height: sz }}/>
      <div style={{ ...c, left: 0, bottom: 0, width: sz, height: th }}/>
      <div style={{ ...c, left: 0, bottom: 0, width: th, height: sz }}/>
      <div style={{ ...c, right: 0, bottom: 0, width: sz, height: th }}/>
      <div style={{ ...c, right: 0, bottom: 0, width: th, height: sz }}/>
    </>
  );
}

Object.assign(window, {
  PosterClassic, PosterTent, PosterBold, PosterReceipt,
  PosterShell, BleedMarks,
});
