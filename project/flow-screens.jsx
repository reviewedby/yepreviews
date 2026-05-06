// flow-screens.jsx — individual screens used across the 4 variations

// ────────────────────────────────────────────────────────
// Shared screen pieces
// ────────────────────────────────────────────────────────
function BusinessHeader({ business, compact = false }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      marginBottom: compact ? 12 : 20,
    }}>
      <div style={{
        width: compact ? 36 : 44, height: compact ? 36 : 44,
        borderRadius: 10, background: business.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: YEP.sans, fontSize: compact ? 14 : 16, fontWeight: 700, color: '#fff',
        flexShrink: 0,
      }}>{business.initials}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: YEP.sans, fontSize: compact ? 13 : 15, fontWeight: 600,
          color: YEP.ink, lineHeight: 1.2,
        }}>{business.name}</div>
        <div style={{
          fontFamily: YEP.sans, fontSize: 11, color: YEP.ink40, lineHeight: 1.2,
        }}>{business.tagline}</div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// SCREEN 1 — Landing / rating screen (variations)
// ────────────────────────────────────────────────────────

// V1: Single-page classic — "How was it?" with star row
function ScreenRatingClassic({ business, activeStars = 0 }) {
  return (
    <Screen>
      <div style={{ paddingTop: 24, marginBottom: 20 }}>
        <YepLogo size={22}/>
      </div>
      <BusinessHeader business={business}/>
      <div style={{
        fontFamily: YEP.sans, fontSize: 22, fontWeight: 700,
        color: YEP.ink, letterSpacing: -0.5, marginBottom: 6,
        lineHeight: 1.2,
      }}>How was your visit?</div>
      <div style={{
        fontFamily: YEP.sans, fontSize: 13, color: YEP.ink70,
        marginBottom: 26, lineHeight: 1.4,
      }}>Tap a star to get started.</div>

      {/* star row */}
      <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between', marginBottom: 20 }}>
        {[1,2,3,4,5].map(i => (
          <Star key={i} size={42} filled={i <= activeStars}/>
        ))}
      </div>

      <div style={{ flex: 1 }}/>
      <div style={{
        fontFamily: YEP.mono, fontSize: 9, color: YEP.ink40,
        textAlign: 'center', marginBottom: 10, letterSpacing: 0.5,
      }}>POWERED BY YEP</div>
    </Screen>
  );
}

// V2: Multi-step intro — big brand moment, then rating on next screen
function ScreenHelloIntro({ business }) {
  return (
    <Screen padding="0">
      <div style={{
        flex: 1, background: business.color,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        alignItems: 'center', padding: '0 24px', position: 'relative',
        color: '#fff',
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: 20, background: 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: YEP.sans, fontSize: 28, fontWeight: 700, color: '#fff',
          marginBottom: 20, border: '2px solid rgba(255,255,255,0.4)',
        }}>{business.initials}</div>
        <div style={{
          fontFamily: YEP.font, fontSize: 40, fontWeight: 700, lineHeight: 1,
          textAlign: 'center', marginBottom: 10,
        }}>Hey there!</div>
        <div style={{
          fontFamily: YEP.sans, fontSize: 15, textAlign: 'center',
          opacity: 0.9, lineHeight: 1.4, maxWidth: 220,
        }}>Thanks for visiting {business.name}. Got a sec to share how it went?</div>
      </div>
      <div style={{ padding: '20px', background: YEP.paper }}>
        <YepButton color={YEP.ink} textColor="#fff">Let's do it →</YepButton>
      </div>
    </Screen>
  );
}

// V3: Emoji scale — tap-to-rate with faces
function ScreenRatingEmoji({ business, active = -1 }) {
  const faces = [
    { e: '😤', l: 'Awful' },
    { e: '😕', l: 'Meh' },
    { e: '🙂', l: 'Okay' },
    { e: '😊', l: 'Great' },
    { e: '🤩', l: 'Amazing' },
  ];
  return (
    <Screen>
      <div style={{ paddingTop: 24, marginBottom: 16 }}>
        <YepLogo size={22}/>
      </div>
      <BusinessHeader business={business}/>
      <div style={{
        fontFamily: YEP.sans, fontSize: 22, fontWeight: 700,
        color: YEP.ink, letterSpacing: -0.5, marginBottom: 22,
        lineHeight: 1.2,
      }}>How do you feel?</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {faces.map((f, i) => {
          const isActive = i === active;
          return (
            <SketchBox key={i} radius={16}
              strokeWidth={isActive ? 2 : 1.5}
              stroke={isActive ? YEP.accent : YEP.ink}
              fill={isActive ? YEP.accentSoft : 'transparent'}
              style={{ padding: '12px 14px', display: 'flex' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
                <div style={{ fontSize: 28, lineHeight: 1 }}>{f.e}</div>
                <div style={{
                  fontFamily: YEP.sans, fontSize: 15, fontWeight: 600,
                  color: YEP.ink, flex: 1,
                }}>{f.l}</div>
                <div style={{
                  display: 'flex', gap: 1,
                }}>
                  {[1,2,3,4,5].map(n => (
                    <Star key={n} size={10} filled={n <= i + 1}/>
                  ))}
                </div>
              </div>
            </SketchBox>
          );
        })}
      </div>
      <div style={{ flex: 1 }}/>
    </Screen>
  );
}

// V4: Conversational — chat-bubble style
function ScreenConversational({ business, step = 0 }) {
  return (
    <Screen padding="0">
      <div style={{
        padding: '16px 20px 12px',
        borderBottom: `1px solid ${YEP.ink10}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <BusinessHeader business={business} compact/>
        <div style={{ flex: 1 }}/>
        <YepLogo size={16}/>
      </div>
      <div style={{ flex: 1, padding: '20px 20px 10px', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
        {/* assistant bubble */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: business.color, flexShrink: 0,
            fontFamily: YEP.sans, color: '#fff', fontSize: 11, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{business.initials}</div>
          <div style={{
            background: YEP.paperDark, padding: '10px 14px',
            borderRadius: '14px 14px 14px 4px',
            fontFamily: YEP.sans, fontSize: 13, color: YEP.ink, lineHeight: 1.4,
            maxWidth: '80%',
          }}>Thanks for stopping by! How'd we do today? 👀</div>
        </div>

        {step >= 1 && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{
              background: YEP.accent, color: '#fff',
              padding: '10px 14px', borderRadius: '14px 14px 4px 14px',
              fontFamily: YEP.sans, fontSize: 13, fontWeight: 500,
              display: 'flex', gap: 3,
            }}>
              {[1,2,3,4,5].map(n => <Star key={n} size={14} filled={true} color="#fff" strokeColor="#fff"/>)}
            </div>
          </div>
        )}
      </div>

      {/* quick-reply bar at bottom */}
      <div style={{
        padding: '12px 16px 16px', borderTop: `1px solid ${YEP.ink10}`,
        background: YEP.paper,
      }}>
        <div style={{ fontFamily: YEP.mono, fontSize: 9, color: YEP.ink40, marginBottom: 8, letterSpacing: 0.5 }}>QUICK REPLY</div>
        <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between' }}>
          {[1,2,3,4,5].map(n => (
            <div key={n} style={{
              flex: 1, aspectRatio: '1',
              background: n === 5 ? YEP.accent : 'transparent',
              border: `1.5px solid ${n === 5 ? YEP.accent : YEP.ink20}`,
              borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Star size={18} filled={n === 5} color="#fff" strokeColor={n === 5 ? '#fff' : YEP.ink70}/>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}

// ────────────────────────────────────────────────────────
// SCREEN 2 — Positive redirect (4+ stars → public platforms)
// ────────────────────────────────────────────────────────

function PlatformTile({ name, logo, primary = false, stacked = false }) {
  return (
    <SketchBox radius={stacked ? 14 : 16}
      strokeWidth={primary ? 2 : 1.5}
      stroke={primary ? YEP.accent : YEP.ink}
      fill={primary ? YEP.accentSoft : '#fff'}
      style={{ padding: stacked ? '14px 16px' : '18px 14px', display: 'flex' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        width: '100%', flexDirection: stacked ? 'row' : 'column',
        justifyContent: stacked ? 'flex-start' : 'center',
      }}>
        <div style={{
          width: stacked ? 40 : 52, height: stacked ? 40 : 52,
          borderRadius: 12,
          background: logo.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: YEP.sans, fontSize: stacked ? 20 : 26, fontWeight: 700,
          color: logo.fg, flexShrink: 0,
        }}>{logo.letter}</div>
        <div style={{
          fontFamily: YEP.sans, fontSize: 14, fontWeight: 600,
          color: YEP.ink, textAlign: stacked ? 'left' : 'center',
          flex: stacked ? 1 : undefined,
        }}>{name}</div>
        {stacked && (
          <div style={{ fontFamily: YEP.sans, fontSize: 18, color: YEP.ink40 }}>→</div>
        )}
      </div>
    </SketchBox>
  );
}

function ScreenPositive({ business, variant = 'grid' }) {
  const platforms = [
    { name: 'Google', logo: { bg: '#fff', fg: '#4285F4', letter: 'G' }, primary: true },
    { name: 'Yelp', logo: { bg: '#fff', fg: '#D32323', letter: 'Y' } },
    { name: 'Facebook', logo: { bg: '#fff', fg: '#1877F2', letter: 'f' } },
    { name: 'TripAdvisor', logo: { bg: '#fff', fg: '#34E0A1', letter: 'T' } },
  ];

  return (
    <Screen>
      <div style={{ paddingTop: 24, marginBottom: 16 }}>
        <YepLogo size={22}/>
      </div>

      {/* celebratory banner */}
      <div style={{
        background: YEP.goodSoft, border: `1.5px solid ${YEP.good}`,
        borderRadius: 14, padding: '12px 14px', marginBottom: 16,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ fontSize: 22 }}>🎉</div>
        <div>
          <div style={{ fontFamily: YEP.sans, fontSize: 13, fontWeight: 700, color: YEP.ink }}>Awesome, thank you!</div>
          <div style={{ fontFamily: YEP.sans, fontSize: 11, color: YEP.ink70, lineHeight: 1.3 }}>Mind sharing the love publicly?</div>
        </div>
      </div>

      <div style={{
        fontFamily: YEP.sans, fontSize: 15, fontWeight: 600, color: YEP.ink,
        marginBottom: 12,
      }}>Pick where to post</div>

      {variant === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {platforms.map(p => <PlatformTile key={p.name} {...p}/>)}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {platforms.map(p => <PlatformTile key={p.name} {...p} stacked/>)}
        </div>
      )}

      <div style={{ flex: 1 }}/>

      <div style={{
        fontFamily: YEP.sans, fontSize: 11, color: YEP.ink40,
        textAlign: 'center', marginTop: 16,
      }}>Takes 10 seconds — we'll pre-fill your review.</div>
    </Screen>
  );
}

// ────────────────────────────────────────────────────────
// SCREEN 3 — Negative feedback (1-3 stars → private)
// ────────────────────────────────────────────────────────

function Chip({ children, active = false }) {
  return (
    <div style={{
      padding: '8px 12px',
      border: `1.5px solid ${active ? YEP.accent : YEP.ink20}`,
      background: active ? YEP.accentSoft : 'transparent',
      borderRadius: 999,
      fontFamily: YEP.sans, fontSize: 12, fontWeight: 500,
      color: active ? YEP.accent : YEP.ink70,
      display: 'inline-flex', alignItems: 'center', gap: 4,
      whiteSpace: 'nowrap',
    }}>
      {active && <span>✓</span>}
      {children}
    </div>
  );
}

function ScreenNegative({ business, compact = false }) {
  const categories = ['Food', 'Service', 'Wait time', 'Cleanliness', 'Noise', 'Value', 'Atmosphere', 'Other'];
  return (
    <Screen>
      <div style={{ paddingTop: 24, marginBottom: 12 }}>
        <YepLogo size={22}/>
      </div>
      <div style={{
        fontFamily: YEP.sans, fontSize: 20, fontWeight: 700,
        color: YEP.ink, letterSpacing: -0.4, marginBottom: 4, lineHeight: 1.2,
      }}>We're sorry — what happened?</div>
      <div style={{
        fontFamily: YEP.sans, fontSize: 12, color: YEP.ink70,
        marginBottom: 16, lineHeight: 1.4,
      }}>This goes straight to {business.name.split(' ')[0]}. Not public.</div>

      {/* category chips */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: YEP.sans, fontSize: 11, fontWeight: 600, color: YEP.ink70, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>What specifically?</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {categories.map((c, i) => (
            <Chip key={c} active={i === 1 || i === 2}>{c}</Chip>
          ))}
        </div>
      </div>

      {/* text area */}
      <SketchBox radius={12} style={{ padding: 12, marginBottom: 10, height: compact ? 60 : 80 }}>
        <div style={{
          fontFamily: YEP.sans, fontSize: 12, color: YEP.ink40,
        }}>Tell us more (optional)...</div>
      </SketchBox>

      {/* photo + contact */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <SketchBox radius={10} dashed style={{ padding: '10px 12px', flex: 1 }}>
          <div style={{ fontFamily: YEP.sans, fontSize: 11, color: YEP.ink70, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>📷</span> Add photo
          </div>
        </SketchBox>
        <SketchBox radius={10} dashed style={{ padding: '10px 12px', flex: 1 }}>
          <div style={{ fontFamily: YEP.sans, fontSize: 11, color: YEP.ink70, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>✉️</span> Leave email
          </div>
        </SketchBox>
      </div>

      <div style={{ flex: 1 }}/>

      <YepButton>Send feedback</YepButton>
      <div style={{ fontFamily: YEP.sans, fontSize: 10, color: YEP.ink40, textAlign: 'center', marginTop: 8 }}>
        Stays private — business owner only.
      </div>
    </Screen>
  );
}

// ────────────────────────────────────────────────────────
// SCREEN 4 — Thank you
// ────────────────────────────────────────────────────────
function ScreenThanks({ business, positive = true }) {
  return (
    <Screen>
      <div style={{ paddingTop: 24, marginBottom: 16 }}>
        <YepLogo size={22}/>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: positive ? YEP.goodSoft : YEP.accentSoft,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, marginBottom: 16,
          border: `2px solid ${positive ? YEP.good : YEP.accent}`,
        }}>{positive ? '✓' : '💌'}</div>
        <div style={{
          fontFamily: YEP.font, fontSize: 34, fontWeight: 700, color: YEP.ink,
          lineHeight: 1, marginBottom: 8,
        }}>Thanks so much!</div>
        <div style={{
          fontFamily: YEP.sans, fontSize: 13, color: YEP.ink70,
          lineHeight: 1.4, maxWidth: 220,
        }}>{positive
          ? `Your review is up. ${business.name} will love seeing it.`
          : `${business.name.split(' ')[0]} will get back to you soon.`}</div>
      </div>
      <div style={{
        fontFamily: YEP.mono, fontSize: 9, color: YEP.ink40,
        textAlign: 'center', marginBottom: 10, letterSpacing: 0.5,
      }}>POWERED BY YEP</div>
    </Screen>
  );
}

Object.assign(window, {
  BusinessHeader,
  ScreenRatingClassic, ScreenHelloIntro, ScreenRatingEmoji, ScreenConversational,
  ScreenPositive, ScreenNegative, ScreenThanks, PlatformTile, Chip,
});
