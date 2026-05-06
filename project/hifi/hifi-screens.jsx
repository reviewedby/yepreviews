// hifi-screens.jsx — hi-fi Classic flow screens

// ───────────────────────────────────────────────────────
// Shared bits
// ───────────────────────────────────────────────────────
function BrandBar({ business, compact = false }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: compact ? '0' : '0',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 9,
        background: business.color, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: T.sans, fontWeight: 700, fontSize: 13, letterSpacing: -0.3,
      }}>{business.initials}</div>
      <div>
        <div style={{ fontFamily: T.sans, fontWeight: 600, fontSize: 14, color: T.ink, lineHeight: 1.1 }}>{business.name}</div>
        <div style={{ fontFamily: T.sans, fontSize: 11, color: T.ink40, lineHeight: 1.2 }}>{business.tagline}</div>
      </div>
    </div>
  );
}

function PoweredBy({ dark = false }) {
  return (
    <div style={{
      fontFamily: T.sans, fontSize: 10, fontWeight: 500,
      color: dark ? 'rgba(255,255,255,0.5)' : T.ink40,
      textAlign: 'center', letterSpacing: 0.3,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
    }}>
      <span>powered by</span>
      <YepMark size={12} color={dark ? 'rgba(255,255,255,0.7)' : T.ink60}/>
    </div>
  );
}

// ───────────────────────────────────────────────────────
// 1. RATING SCREEN — employee hero, stars below
// ───────────────────────────────────────────────────────
function RatingScreen({ business, employee, activeStar = 0, onStar = () => {}, hovered = 0 }) {
  const rating = hovered || activeStar;
  const prompts = ['', 'Oof, sorry to hear', 'Not great', 'Alright', 'Pretty good!', 'Amazing!'];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* top bar */}
      <div style={{
        padding: '4px 20px 12px', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
      }}>
        <BrandBar business={business}/>
        <YepMark size={16} color={T.ink60}/>
      </div>

      {/* employee hero card */}
      {employee ? (
        <div style={{
          margin: '8px 20px 0',
          background: T.paper, borderRadius: T.r.xl,
          boxShadow: T.shadowMd,
          padding: '22px 20px 18px', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* decorative gradient corner */}
          <div style={{
            position: 'absolute', top: -40, right: -40, width: 160, height: 160,
            borderRadius: '50%', background: T.accentSoft, opacity: 0.6,
          }}/>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
              <Avatar seed={employee.name} size={72} color={employee.color} ring/>
            </div>
            <div style={{
              fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: T.accent,
              textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4,
            }}>You were helped by</div>
            <div style={{
              fontFamily: T.sans, fontSize: 26, fontWeight: 700, color: T.ink,
              letterSpacing: -0.5, lineHeight: 1.1, marginBottom: 4,
            }}>{employee.name}</div>
            <div style={{
              fontFamily: T.sans, fontSize: 13, color: T.ink60, lineHeight: 1.3,
            }}>{employee.role}</div>
          </div>
        </div>
      ) : (
        <div style={{ margin: '8px 20px 0', padding: '28px 16px', textAlign: 'center' }}>
            <div style={{
              fontFamily: T.sans, fontSize: 26, fontWeight: 700, color: T.ink,
              letterSpacing: -0.5, lineHeight: 1.2,
            }}>How was {business.name}?</div>
        </div>
      )}

      {/* question */}
      <div style={{ padding: '26px 20px 12px', textAlign: 'center' }}>
        <div style={{
          fontFamily: T.sans, fontSize: 20, fontWeight: 700, color: T.ink,
          letterSpacing: -0.4, lineHeight: 1.2, marginBottom: 4,
        }}>{employee ? `How did ${employee.name.split(' ')[0]} do?` : 'How was your visit?'}</div>
        <div style={{
          fontFamily: T.sans, fontSize: 13, color: T.ink60, lineHeight: 1.4,
          minHeight: 18,
        }}>{rating ? prompts[rating] : 'Tap a star to get started'}</div>
      </div>

      {/* star row */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 6,
        padding: '0 20px',
      }}>
        {[1,2,3,4,5].map(i => {
          const filled = i <= rating;
          return (
            <button key={i}
              onClick={() => onStar(i)}
              style={{
                background: 'transparent', border: 'none', padding: 4,
                cursor: 'pointer', transition: 'transform 0.12s',
                transform: filled ? 'scale(1.0)' : 'scale(0.96)',
              }}>
              <svg width="42" height="42" viewBox="0 0 24 24">
                <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7L12 2z"
                  fill={filled ? T.gold : 'transparent'}
                  stroke={filled ? T.gold : T.ink20}
                  strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1 }}/>
      <div style={{ padding: '0 20px 24px' }}>
        <PoweredBy/>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────
// 2. POSITIVE — pick platform (with "mention David" prompt)
// ───────────────────────────────────────────────────────
const PLATFORMS = [
  { id: 'google', name: 'Google', sub: 'Most visible', color: '#4285F4',
    logo: (
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22 12.1c0-.8-.1-1.4-.2-2.1H12v4h5.6c-.2 1.3-1 2.4-2.1 3.1v2.6h3.4c2-1.8 3.1-4.5 3.1-7.6z"/>
        <path fill="#34A853" d="M12 22c2.8 0 5.2-.9 6.9-2.5l-3.4-2.6c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.3H2.7v2.7C4.4 19.7 7.9 22 12 22z"/>
        <path fill="#FBBC04" d="M6.2 13.6c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7H2.7C2 8.4 1.6 10.1 1.6 12s.4 3.6 1.1 5l3.5-2.7z"/>
        <path fill="#EA4335" d="M12 5.8c1.5 0 2.9.5 4 1.5l3-3C17.1 2.5 14.7 1.6 12 1.6 7.9 1.6 4.4 3.9 2.7 7l3.5 2.7c.8-2.5 3.1-4.3 5.8-4.3z"/>
      </svg>
    )
  },
  { id: 'yelp', name: 'Yelp', sub: '', color: '#D32323',
    logo: <div style={{ fontFamily: T.sans, fontSize: 18, fontWeight: 900, color: '#D32323' }}>yelp</div>
  },
  { id: 'fb', name: 'Facebook', sub: '', color: '#1877F2',
    logo: <div style={{ width: 22, height: 22, borderRadius: 4, background: '#1877F2', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.sans, fontSize: 16, fontWeight: 800 }}>f</div>
  },
  { id: 'tripadvisor', name: 'TripAdvisor', sub: '', color: '#34E0A1',
    logo: <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#000', color: '#34E0A1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.sans, fontSize: 13, fontWeight: 800 }}>TA</div>
  },
];

function PositiveScreen({ business, employee, enabledPlatforms }) {
  const platforms = PLATFORMS.filter(p => enabledPlatforms[p.id]);
  const primary = platforms[0];
  const rest = platforms.slice(1);
  const firstName = employee ? employee.name.split(' ')[0] : null;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '4px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <BrandBar business={business}/>
        <YepMark size={16} color={T.ink60}/>
      </div>

      {/* celebration burst */}
      <div style={{ padding: '12px 20px 0', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: T.goodSoft, color: '#0a7a4e',
          padding: '6px 12px', borderRadius: T.r.pill,
          fontFamily: T.sans, fontSize: 12, fontWeight: 600, marginBottom: 16,
        }}>
          <span>🎉</span> Thanks for the 5 stars
        </div>
        <div style={{
          fontFamily: T.sans, fontSize: 26, fontWeight: 700, color: T.ink,
          letterSpacing: -0.5, lineHeight: 1.15, marginBottom: 8,
        }}>Share it where it counts?</div>
        <div style={{
          fontFamily: T.sans, fontSize: 14, color: T.ink60, lineHeight: 1.4,
          maxWidth: 300, margin: '0 auto',
        }}>{firstName
          ? <>It takes 20 seconds and means the world to {firstName}.</>
          : <>It takes 20 seconds and means the world to {business.name}.</>}</div>
      </div>

      {/* Mention David callout */}
      {employee && (
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{
            background: T.accentSoft, border: `1.5px solid ${T.accent}22`,
            borderRadius: T.r.lg, padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <Avatar seed={employee.name} size={40} color={employee.color}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.ink, lineHeight: 1.3 }}>
                Quick favor?
              </div>
              <div style={{ fontFamily: T.sans, fontSize: 12, color: T.ink60, lineHeight: 1.35 }}>
                Please mention <b style={{ color: T.accent }}>{firstName}</b> by name — it helps them a ton.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Platforms */}
      <div style={{ padding: '18px 20px 0', flex: 1 }}>
        {primary && (
          <button style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 14,
            padding: '16px 16px', background: T.paper,
            border: `2px solid ${T.accent}`,
            borderRadius: T.r.lg, cursor: 'pointer',
            boxShadow: `0 4px 12px ${T.accent}22`, marginBottom: 10,
            textAlign: 'left',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: T.shadowSm, flexShrink: 0,
            }}>{primary.logo}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 600, color: T.ink }}>
                Review on {primary.name}
              </div>
              <div style={{ fontFamily: T.sans, fontSize: 12, color: T.accent, fontWeight: 500 }}>
                Recommended · most visibility
              </div>
            </div>
            <Icon name="arrow" size={18} color={T.accent}/>
          </button>
        )}

        {rest.map(p => (
          <button key={p.id} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 14,
            padding: '12px 16px', background: T.paper,
            border: `1px solid ${T.ink10}`,
            borderRadius: T.r.md, cursor: 'pointer', marginBottom: 8,
            textAlign: 'left',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${T.ink10}`, flexShrink: 0,
            }}>{p.logo}</div>
            <div style={{ flex: 1, fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.ink }}>
              {p.name}
            </div>
            <Icon name="external" size={16} color={T.ink40}/>
          </button>
        ))}

        {platforms.length === 0 && (
          <div style={{
            padding: 24, textAlign: 'center',
            border: `1.5px dashed ${T.ink20}`, borderRadius: T.r.md,
            fontFamily: T.sans, fontSize: 13, color: T.ink40,
          }}>No platforms enabled. Toggle some in Tweaks →</div>
        )}
      </div>

      <div style={{ padding: '12px 20px 24px' }}>
        <PoweredBy/>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────
// 3. NEGATIVE — private feedback, employee tracked behind
// ───────────────────────────────────────────────────────
function NegativeScreen({ business, employee, selectedChips = [1, 2], hasText = false }) {
  const chips = ['Food', 'Service', 'Wait time', 'Cleanliness', 'Noise', 'Value', 'Atmosphere', 'Other'];
  const firstName = employee ? employee.name.split(' ')[0] : null;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '4px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <BrandBar business={business}/>
        <YepMark size={16} color={T.ink60}/>
      </div>

      <div style={{ padding: '8px 20px 0', flex: 1, overflow: 'auto' }}>
        <div style={{
          fontFamily: T.sans, fontSize: 22, fontWeight: 700, color: T.ink,
          letterSpacing: -0.4, lineHeight: 1.2, marginBottom: 6,
        }}>We want to make it right.</div>
        <div style={{
          fontFamily: T.sans, fontSize: 13, color: T.ink60, lineHeight: 1.4, marginBottom: 18,
        }}>
          Tell us what went wrong so we can fix it. This goes straight to the team.
        </div>

        {/* category */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: T.ink60, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>What specifically?</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {chips.map((c, i) => {
              const on = selectedChips.includes(i);
              return (
                <div key={c} style={{
                  padding: '7px 12px',
                  border: `1.5px solid ${on ? T.accent : T.ink20}`,
                  background: on ? T.accentSoft : '#fff',
                  borderRadius: T.r.pill,
                  fontFamily: T.sans, fontSize: 12, fontWeight: 500,
                  color: on ? T.accent : T.ink80,
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                }}>
                  {on && <span>✓</span>}{c}
                </div>
              );
            })}
          </div>
        </div>

        {/* text */}
        <div style={{
          background: '#fff', border: `1px solid ${T.ink10}`,
          borderRadius: T.r.md, padding: 12, minHeight: 72, marginBottom: 10,
        }}>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: hasText ? T.ink : T.ink40, lineHeight: 1.4 }}>
            {hasText ? 'The wait was really long even though the place was half empty. The server seemed rushed too.' : 'Tell us more (optional)...'}
          </div>
        </div>

        {/* photo + email */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <div style={{
            flex: 1, padding: '10px 12px', border: `1px dashed ${T.ink20}`,
            borderRadius: T.r.sm, display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: T.sans, fontSize: 12, color: T.ink60,
          }}>
            <Icon name="camera" size={16} color={T.ink60}/> Add photo
          </div>
          <div style={{
            flex: 1, padding: '10px 12px', border: `1px dashed ${T.ink20}`,
            borderRadius: T.r.sm, display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: T.sans, fontSize: 12, color: T.ink60,
          }}>
            <Icon name="mail" size={16} color={T.ink60}/> Leave email
          </div>
        </div>

      </div>

      <div style={{ padding: '12px 20px 24px' }}>
        <button style={{
          width: '100%', padding: '15px', background: T.ink, color: '#fff',
          border: 'none', borderRadius: T.r.pill,
          fontFamily: T.sans, fontSize: 15, fontWeight: 600,
          cursor: 'pointer', boxShadow: T.shadowMd,
        }}>Send feedback</button>
        <div style={{ marginTop: 12 }}><PoweredBy/></div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────
// 4. THANKS
// ───────────────────────────────────────────────────────
function ThanksScreen({ business, employee, positive = true }) {
  const firstName = employee ? employee.name.split(' ')[0] : null;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ padding: '4px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <BrandBar business={business}/>
        <YepMark size={16} color={T.ink60}/>
      </div>

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '0 32px',
      }}>
        <div style={{
          width: 88, height: 88, borderRadius: '50%',
          background: positive ? T.goodSoft : T.accentSoft,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 20,
        }}>
          <Icon name={positive ? 'check' : 'heart'} size={40} color={positive ? T.good : T.accent} strokeWidth={2.5}/>
        </div>
        <div style={{
          fontFamily: T.sans, fontSize: 28, fontWeight: 700, color: T.ink,
          letterSpacing: -0.5, lineHeight: 1.1, marginBottom: 10,
        }}>You're a legend.</div>
        <div style={{
          fontFamily: T.sans, fontSize: 14, color: T.ink60, lineHeight: 1.5,
          maxWidth: 280,
        }}>
          {positive
            ? (firstName
                ? <>Your review will make {firstName}'s day — and help new customers find {business.name}.</>
                : <>Your review will help new customers find {business.name}.</>)
            : (firstName
                ? <>{firstName} and the team will review your note and follow up soon.</>
                : <>The team will review your note and follow up soon.</>)}
        </div>
      </div>

      <div style={{ padding: '12px 20px 24px' }}>
        <PoweredBy/>
      </div>
    </div>
  );
}

Object.assign(window, {
  BrandBar, PoweredBy, PLATFORMS,
  RatingScreen, PositiveScreen, NegativeScreen, ThanksScreen,
});
