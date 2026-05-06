// landing-sections.jsx — the visual sections of the Yep landing page

// ── Live mini-demo: interactive phone that branches on rating ──
function LiveDemo({ industry }) {
  const [rating, setRating] = React.useState(null);
  const [step, setStep] = React.useState('rate'); // rate → positive | negative
  const ind = INDUSTRIES[industry];

  const selectRating = (n) => {
    setRating(n);
    setTimeout(() => setStep(n >= 4 ? 'positive' : 'negative'), 350);
  };
  const reset = () => { setRating(null); setStep('rate'); };

  return (
    <div style={{
      width: 280, height: 560, background: '#fff', borderRadius: 40,
      padding: 10, position: 'relative',
      boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 10px #1a1e35, 0 0 0 11px rgba(255,255,255,0.08)',
      flexShrink: 0,
    }}>
      {/* status bar */}
      <div style={{
        height: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px 0 26px', fontSize: 11, fontWeight: 600, color: T.ink,
      }}>
        <span>9:41</span>
        <span style={{ fontSize: 10 }}>●●●  📶  🔋</span>
      </div>

      <div style={{
        height: 506, padding: '16px 20px 20px',
        display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
      }}>
        {/* biz header — always visible */}
        <div style={{
          padding: '10px 12px', background: T.paperWarm,
          borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: 7, background: T.ink,
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13,
          }}>{ind.emoji}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.ink, lineHeight: 1.1 }}>{ind.biz}</div>
            <div style={{ fontSize: 10, color: T.ink60 }}>{ind.sub}</div>
          </div>
        </div>

        {step === 'rate' && (
          <div style={{ animation: 'fadeIn 0.3s' }}>
            <div style={{ fontSize: 19, fontWeight: 700, color: T.ink, letterSpacing: -0.4, lineHeight: 1.15 }}>
              How was your<br/>visit today?
            </div>
            <div style={{ fontSize: 11, color: T.ink60, marginTop: 4, marginBottom: 26 }}>Tap a star · takes 20 seconds.</div>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
              {[1,2,3,4,5].map(i => (
                <button key={i} onClick={() => selectRating(i)} style={{
                  background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
                  transform: rating === i ? 'scale(1.2)' : 'scale(1)',
                  transition: 'transform 0.2s',
                }}>
                  <svg width="38" height="38" viewBox="0 0 24 24">
                    <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7L12 2z"
                      fill={(rating && i <= rating) ? T.gold : T.ink10}
                      stroke={(rating && i <= rating) ? T.gold : T.ink20}
                      strokeWidth="0.8"/>
                  </svg>
                </button>
              ))}
            </div>
            {ind.employee && (
              <div style={{
                marginTop: 28, padding: '10px 12px',
                background: T.accentSoft, borderRadius: 10, textAlign: 'center',
                fontSize: 11, color: T.accentDark,
              }}>
                Served by <b>{ind.employee}</b> {ind.context}
              </div>
            )}
          </div>
        )}

        {step === 'positive' && (
          <div style={{ animation: 'fadeIn 0.3s' }}>
            <div style={{ fontSize: 36, marginBottom: 4 }}>🎉</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: T.ink, letterSpacing: -0.3, lineHeight: 1.15 }}>
              Thanks! Help others<br/>find us?
            </div>
            <div style={{ fontSize: 11, color: T.ink60, marginTop: 4, marginBottom: 16 }}>Post your {rating}★ review where you prefer.</div>
            {[
              { name: 'Google',   color: '#4285F4' },
              { name: 'Yelp',     color: '#D32323' },
              { name: 'Facebook', color: '#1877F2' },
            ].map(p => (
              <div key={p.name} style={{
                padding: '10px 12px', marginBottom: 8,
                border: `1.5px solid ${T.ink10}`, borderRadius: 10,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 5, background: p.color,
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700,
                }}>{p.name[0]}</div>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.ink, flex: 1 }}>Post to {p.name}</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={T.ink40} strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
              </div>
            ))}
            <div onClick={reset} style={{
              marginTop: 14, fontSize: 11, color: T.accent,
              textAlign: 'center', cursor: 'pointer', fontWeight: 500,
            }}>↻ Reset demo</div>
          </div>
        )}

        {step === 'negative' && (
          <div style={{ animation: 'fadeIn 0.3s' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: T.ink, letterSpacing: -0.3, lineHeight: 1.15 }}>
              What went wrong?
            </div>
            <div style={{ fontSize: 11, color: T.ink60, marginTop: 4, marginBottom: 16 }}>
              Tell us. This goes to the owner, not a public site.
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              {['Wait time', 'Service', 'Food', 'Cleanliness', 'Value'].map(c => (
                <span key={c} style={{
                  fontSize: 11, fontWeight: 500, padding: '5px 10px',
                  background: T.ink05, color: T.ink80, borderRadius: 999,
                }}>{c}</span>
              ))}
            </div>
            <div style={{
              padding: 10, background: T.paperWarm,
              border: `1px solid ${T.ink10}`, borderRadius: 8, minHeight: 70,
              fontSize: 11, color: T.ink40, lineHeight: 1.4,
            }}>Tell us more (optional)…</div>
            <div onClick={reset} style={{
              marginTop: 14, fontSize: 11, color: T.accent,
              textAlign: 'center', cursor: 'pointer', fontWeight: 500,
            }}>↻ Reset demo</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── How it works section ──
function HowItWorks() {
  return (
    <section style={{
      padding: '100px 64px', background: '#fff', borderTop: `1px solid ${T.ink10}`,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          fontSize: 12, fontWeight: 700, color: T.accent, letterSpacing: 1.2,
          textTransform: 'uppercase', marginBottom: 12,
        }}>How it works</div>
        <h2 style={{
          fontSize: 'clamp(36px, 4.4vw, 56px)', fontWeight: 700, color: T.ink,
          letterSpacing: '-0.03em', lineHeight: 1.02,
          margin: 0, marginBottom: 20, maxWidth: 820, fontFamily: T.sans,
        }}>Catch it. Understand it. Fix it.</h2>
        <div style={{
          fontSize: 19, color: T.ink60, maxWidth: 640, marginBottom: 56, lineHeight: 1.45, textWrap: 'pretty',
        }}>A feedback loop for the 99% of local businesses that don't have one. Ten minutes to set up, live forever.</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {STEPS_HIW.map((s) => (
            <div key={s.n}>
              <div style={{
                fontSize: 13, fontFamily: T.mono, color: T.accent, fontWeight: 600, marginBottom: 20,
              }}>{s.n} / 03</div>
              <div style={{
                height: 1, background: T.ink, marginBottom: 24, opacity: 0.1,
              }}/>
              <div style={{
                fontSize: 22, fontWeight: 700, color: T.ink, letterSpacing: -0.4, lineHeight: 1.2, marginBottom: 10,
              }}>{s.title}</div>
              <div style={{ fontSize: 15, color: T.ink60, lineHeight: 1.5, textWrap: 'pretty' }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Logo cloud + stats bar ──
function TrustBar() {
  return (
    <section style={{
      padding: '48px 64px', background: T.paperWarm,
      borderTop: `1px solid ${T.ink10}`, borderBottom: `1px solid ${T.ink10}`,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          textAlign: 'center', fontSize: 12, color: T.ink60, fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: 22,
        }}>2,400+ owners learning from their customers, not their 1-star reviews</div>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '20px 48px',
          justifyContent: 'center', opacity: 0.55,
        }}>
          {LOGOS.map(l => (
            <div key={l} style={{
              fontSize: 18, fontWeight: 600, fontFamily: T.sans,
              color: T.ink, letterSpacing: -0.3,
              fontStyle: l.includes('&') ? 'italic' : 'normal',
            }}>{l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBlock() {
  return (
    <section style={{ padding: '80px 64px', background: '#fff' }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32,
      }}>
        {STATS.map((s) => (
          <div key={s.label}>
            <div style={{
              fontSize: 'clamp(40px, 4.5vw, 56px)', fontWeight: 700, color: T.ink,
              letterSpacing: '-0.035em',
              lineHeight: 1, fontFamily: T.sans, marginBottom: 8,
            }}>{s.value}</div>
            <div style={{ fontSize: 14, color: T.ink60, textWrap: 'pretty', lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Testimonials ──
function Testimonials() {
  return (
    <section style={{ padding: '100px 64px', background: T.paperWarm, borderTop: `1px solid ${T.ink10}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          fontSize: 12, fontWeight: 700, color: T.accent, letterSpacing: 1.2,
          textTransform: 'uppercase', marginBottom: 12,
        }}>What owners say</div>
        <h2 style={{
          fontSize: 'clamp(32px, 3.8vw, 48px)', fontWeight: 700, color: T.ink,
          letterSpacing: '-0.03em', lineHeight: 1.05,
          margin: '0 0 56px 0', maxWidth: 720,
        }}>Less drama on Google. More lessons at Monday stand-up.</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} style={{
              padding: 28, background: '#fff',
              border: `1px solid ${T.ink10}`, borderRadius: 16,
            }}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24">
                    <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7L12 2z" fill={T.gold}/>
                  </svg>
                ))}
              </div>
              <div style={{
                fontSize: 18, color: T.ink, fontWeight: 500, lineHeight: 1.45,
                letterSpacing: -0.2, marginBottom: 22, textWrap: 'pretty',
              }}>"{t.quote}"</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar seed={t.name} size={40} color={t.avatar}/>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: T.ink60 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ──
function Pricing() {
  return (
    <section style={{ padding: '100px 64px', background: '#fff', borderTop: `1px solid ${T.ink10}` }}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          fontSize: 12, fontWeight: 700, color: T.accent, letterSpacing: 1.2,
          textTransform: 'uppercase', marginBottom: 12,
        }}>Pricing</div>
        <h2 style={{
          fontSize: 'clamp(36px, 4.4vw, 56px)', fontWeight: 700, color: T.ink,
          letterSpacing: '-0.03em', lineHeight: 1.02,
          margin: 0, marginBottom: 16,
        }}>One price. No tiers.</h2>
        <div style={{ fontSize: 18, color: T.ink60, marginBottom: 40, textWrap: 'pretty' }}>
          Flat monthly. Unlimited reviews. Cancel anytime.
        </div>

        <div style={{
          border: `1px solid ${T.ink10}`, borderRadius: 20, padding: 40,
          background: T.paperWarm, textAlign: 'left',
          boxShadow: '0 1px 3px rgba(14,18,32,0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 8 }}>
            <div style={{
              fontSize: 88, fontWeight: 800, color: T.ink,
              letterSpacing: -4, lineHeight: 0.9,
            }}>$99</div>
            <div style={{ fontSize: 16, color: T.ink60, marginBottom: 16 }}>/ month, per location</div>
          </div>
          <div style={{ fontSize: 13, color: T.ink60, marginBottom: 28 }}>
            Month-to-month. Cancel anytime. No setup fees.
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px 20px',
            marginBottom: 32,
          }}>
            {[
              'Unlimited customers & reviews',
              'All review platforms',
              'Per-employee QR posters',
              'Private feedback inbox',
              'Team leaderboard',
              'Configurable star threshold',
              'Unlimited team members',
              'Email + chat support',
            ].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: T.ink80 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.good} strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                {f}
              </div>
            ))}
          </div>

          <button style={{
            width: '100%', padding: '16px 24px', background: T.ink, color: '#fff',
            border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer',
          }}>Get started →</button>
          <div style={{ fontSize: 12, color: T.ink40, textAlign: 'center', marginTop: 12 }}>
            One price. Cancel anytime.
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ──
function FinalCTA() {
  return (
    <section style={{
      padding: '120px 64px', background: T.ink, color: '#fff',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(circle at 80% 30%, ${T.accent}33, transparent 55%), radial-gradient(circle at 20% 70%, ${T.accent}22, transparent 50%)`,
      }}/>
      <div style={{
        maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative',
      }}>
        <h2 style={{
          fontSize: 'clamp(44px, 5.5vw, 72px)', fontWeight: 700,
          letterSpacing: '-0.035em', lineHeight: 0.98,
          margin: 0, marginBottom: 20, textWrap: 'balance',
        }}>Stop finding out<br/>on Google.</h2>
        <div style={{
          fontSize: 19, color: 'rgba(255,255,255,0.65)', marginBottom: 40,
          maxWidth: 620, margin: '0 auto 40px', lineHeight: 1.45, textWrap: 'pretty',
        }}>
          Hear it first. Fix it fast. Let your rating climb because your business actually got better.
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button style={{
            padding: '16px 28px', background: '#fff', color: T.ink,
            border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer',
          }}>Get started — $99/mo</button>
          <button style={{
            padding: '16px 28px', background: 'transparent', color: '#fff',
            border: `1.5px solid rgba(255,255,255,0.25)`, borderRadius: 12,
            fontSize: 15, fontWeight: 500, cursor: 'pointer',
          }}>Book a 15-min demo</button>
        </div>
      </div>
    </section>
  );
}

// ── Footer ──
function LandingFooter() {
  return (
    <footer style={{
      padding: '48px 64px 32px', background: '#fff', borderTop: `1px solid ${T.ink10}`,
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
      }}>
        <YepMark size={18}/>
        <div style={{ fontSize: 12, color: T.ink60 }}>© 2026 Yep, Inc.</div>
        <div style={{ flex: 1 }}/>
        <div style={{ display: 'flex', gap: 20, fontSize: 12, color: T.ink60 }}>
          <span style={{ cursor: 'pointer' }}>Privacy</span>
          <span style={{ cursor: 'pointer' }}>Terms</span>
          <span style={{ cursor: 'pointer' }}>Support</span>
          <span style={{ cursor: 'pointer' }}>Contact</span>
        </div>
      </div>
    </footer>
  );
}

// ── Learning Loop: the inbox + insights story ──
function LearningLoop() {
  // Mock private feedback items
  const notes = [
    { star: 2, when: '2h ago', tags: ['Wait time', 'Host'], body: "45 min wait with a reservation. Host didn't make eye contact. Food was great when it came.", name: 'Jamie R.', status: 'new' },
    { star: 3, when: '1d ago', tags: ['Noise'], body: "Love the place but the acoustics on Friday nights make it impossible to have a conversation.", name: 'Anonymous', status: 'read' },
    { star: 1, when: '2d ago', tags: ['Server: Marcus', 'Attitude'], body: "Felt rushed through our meal. Check dropped before dessert menu. Won't be back.", name: 'D. Chen', status: 'fixed' },
    { star: 3, when: '4d ago', tags: ['Wait time'], body: "Thirty minutes at the bar before someone took our drink order. Friday 7pm.", name: 'Priya V.', status: 'read' },
  ];

  const patterns = [
    { tag: 'Wait time · Fridays', count: 18, trend: '+6 this week', color: T.danger, width: 88 },
    { tag: 'Server: Marcus', count: 7, trend: '+3 this week', color: T.accent, width: 48 },
    { tag: 'Noise / acoustics', count: 5, trend: 'steady', color: T.ink40, width: 32 },
    { tag: 'Dessert menu', count: 3, trend: '−2 since fix', color: T.good, width: 22 },
  ];

  const statusMeta = {
    new:   { label: 'New',      bg: '#fef0f0', fg: T.danger },
    read:  { label: 'Read',     bg: T.ink05,   fg: T.ink60 },
    fixed: { label: 'Followed up', bg: '#e8f7ee', fg: T.good },
  };

  return (
    <section style={{
      padding: '110px 64px', background: T.paperWarm,
      borderTop: `1px solid ${T.ink10}`,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ maxWidth: 720, marginBottom: 48 }}>
          <div style={{
            fontSize: 12, fontWeight: 700, color: T.accent, letterSpacing: 1.2,
            textTransform: 'uppercase', marginBottom: 12,
          }}>Your private learning loop</div>
          <h2 style={{
            fontSize: 'clamp(36px, 4.4vw, 56px)', fontWeight: 700, color: T.ink,
            letterSpacing: '-0.03em', lineHeight: 1.02,
            margin: 0, marginBottom: 20,
          }}>Every bad visit, a private memo you can actually act on.</h2>
          <div style={{
            fontSize: 19, color: T.ink60, lineHeight: 1.45, textWrap: 'pretty',
          }}>
            Unhappy customers don't want to fight you on Google — they want to be heard. Yep captures the <em>why</em> in a private inbox, groups it into patterns, and turns your weakest moments into your sharpest lessons.
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 28,
        }}>
          {/* LEFT: private inbox */}
          <div style={{
            background: '#fff', borderRadius: 20,
            border: `1px solid ${T.ink10}`,
            boxShadow: '0 1px 3px rgba(14,18,32,0.04)',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '18px 24px', borderBottom: `1px solid ${T.ink10}`,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: T.danger, boxShadow: `0 0 0 3px ${T.danger}22`,
              }}/>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.ink, letterSpacing: -0.1 }}>
                Private feedback · inbox
              </div>
              <div style={{
                fontSize: 11, fontFamily: T.mono, color: T.ink40,
                marginLeft: 'auto',
              }}>only you see this</div>
            </div>

            <div>
              {notes.map((n, i) => {
                const sm = statusMeta[n.status];
                return (
                  <div key={i} style={{
                    padding: '18px 24px',
                    borderBottom: i < notes.length - 1 ? `1px solid ${T.ink05}` : 'none',
                    display: 'grid', gridTemplateColumns: '32px 1fr auto', gap: 14,
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, background: T.ink05,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, color: T.ink,
                    }}>
                      {n.star}
                      <svg width="8" height="8" viewBox="0 0 24 24" style={{ marginLeft: 1 }}>
                        <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7L12 2z" fill={T.gold}/>
                      </svg>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
                        {n.tags.map(t => (
                          <span key={t} style={{
                            fontSize: 10, fontWeight: 600, padding: '2px 8px',
                            background: T.accentSoft, color: T.accentDark, borderRadius: 999,
                            letterSpacing: 0.1,
                          }}>{t}</span>
                        ))}
                      </div>
                      <div style={{
                        fontSize: 14, color: T.ink, lineHeight: 1.45,
                        marginBottom: 6, textWrap: 'pretty',
                      }}>{n.body}</div>
                      <div style={{ fontSize: 11, color: T.ink40 }}>
                        {n.name} · {n.when}
                      </div>
                    </div>
                    <div style={{
                      fontSize: 10, fontWeight: 700, padding: '3px 8px',
                      background: sm.bg, color: sm.fg, borderRadius: 999,
                      alignSelf: 'start', letterSpacing: 0.3, textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}>{sm.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: patterns + fix */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{
              background: '#fff', borderRadius: 20, padding: '24px 28px',
              border: `1px solid ${T.ink10}`,
              boxShadow: '0 1px 3px rgba(14,18,32,0.04)',
            }}>
              <div style={{
                fontSize: 11, fontFamily: T.mono, fontWeight: 600, color: T.ink40,
                letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 14,
              }}>Recurring themes · last 30 days</div>
              {patterns.map((p, i) => (
                <div key={i} style={{ marginBottom: i < patterns.length - 1 ? 16 : 0 }}>
                  <div style={{
                    display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                    marginBottom: 6,
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>{p.tag}</div>
                    <div style={{ fontSize: 12, color: T.ink60 }}>
                      {p.count} mentions · <span style={{
                        color: p.trend.startsWith('−') ? T.good : p.trend.startsWith('+') ? T.danger : T.ink60,
                        fontWeight: 500,
                      }}>{p.trend}</span>
                    </div>
                  </div>
                  <div style={{
                    height: 6, background: T.ink05, borderRadius: 999, overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${p.width}%`, height: '100%', background: p.color,
                      borderRadius: 999,
                    }}/>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: T.ink, color: '#fff', borderRadius: 20, padding: '24px 28px',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: `radial-gradient(circle at 85% 20%, ${T.accent}33, transparent 55%)`,
              }}/>
              <div style={{ position: 'relative' }}>
                <div style={{
                  fontSize: 11, fontFamily: T.mono, fontWeight: 600,
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10,
                }}>This week's fix</div>
                <div style={{
                  fontSize: 20, fontWeight: 600, letterSpacing: -0.3, lineHeight: 1.3,
                  marginBottom: 16, textWrap: 'pretty',
                }}>
                  Add a second host Fri/Sat 6–9pm. Buzz reservations at 35 min.
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontSize: 12, color: 'rgba(255,255,255,0.7)',
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%', background: T.good,
                    boxShadow: `0 0 0 3px ${T.good}33`,
                  }}/>
                  Shipped · watching "Wait time" tag trend ↓
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { LiveDemo, HowItWorks, LearningLoop, TrustBar, StatsBlock, Testimonials, Pricing, FinalCTA, LandingFooter });
