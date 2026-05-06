// onboarding-steps.jsx — individual step components for the business onboarding flow

// ── Step 1: Welcome ──
function StepWelcome({ state, update, next }) {
  return (
    <StepLayout
      eyebrow="Welcome to Yep"
      title="Let's set up your review funnel."
      sub="About 4 minutes. You'll have your first QR poster printable by the end."
    >
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 10,
        background: T.paperWarm, border: `1px solid ${T.ink10}`,
        borderRadius: 12, padding: 18, marginBottom: 24,
      }}>
        {[
          ['01', 'Tell us about your business'],
          ['02', 'Pick where happy reviews go'],
          ['03', 'Add your team (optional)'],
          ['04', 'Print your first poster'],
        ].map(([n, l]) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: T.ink, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, fontFamily: T.mono,
            }}>{n}</div>
            <div style={{ fontSize: 14, color: T.ink80 }}>{l}</div>
          </div>
        ))}
      </div>
      <PrimaryButton onClick={next}>Let's go →</PrimaryButton>
      <div style={{ fontSize: 12, color: T.ink40, textAlign: 'center', marginTop: 14 }}>
        Already have an account? <span style={{ color: T.accent, fontWeight: 500, cursor: 'pointer' }}>Sign in</span>
      </div>
    </StepLayout>
  );
}

// ── Step 2: Business basics ──
function StepBasics({ state, update, next, back }) {
  const canContinue = state.bizName && state.bizType;
  return (
    <StepLayout
      eyebrow="Step 1 of 5"
      title="What's your business?"
      sub="We'll use this on the customer-facing page."
    >
      <Field label="Business name">
        <Input value={state.bizName} onChange={v => update({ bizName: v })} placeholder="e.g. Kaya Sushi" autoFocus/>
      </Field>
      <Field label="Location (optional)">
        <Input value={state.bizSub} onChange={v => update({ bizSub: v })} placeholder="e.g. Midtown"/>
      </Field>
      <Field label="Business type">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {ONB_BIZ_TYPES.map(t => (
            <div key={t.id} onClick={() => update({ bizType: t.id })}
              style={{
                padding: '14px 8px', textAlign: 'center',
                border: `2px solid ${state.bizType === t.id ? T.accent : T.ink10}`,
                background: state.bizType === t.id ? T.accentSoft : '#fff',
                borderRadius: 10, cursor: 'pointer',
              }}>
              <div style={{ fontSize: 22 }}>{t.emoji}</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: T.ink, marginTop: 4 }}>{t.label}</div>
            </div>
          ))}
        </div>
      </Field>
      <StepFooter>
        <SecondaryButton onClick={back}>Back</SecondaryButton>
        <PrimaryButton onClick={next} disabled={!canContinue}>Continue</PrimaryButton>
      </StepFooter>
    </StepLayout>
  );
}

// ── Step 3: Threshold ──
function StepThreshold({ state, update, next, back }) {
  return (
    <StepLayout
      eyebrow="Step 2 of 5"
      title="When should we ask for a public review?"
      sub="Below this rating, customers go to a private feedback form that only you see."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {[5, 4, 3].map(n => {
          const active = state.threshold === n;
          return (
            <div key={n} onClick={() => update({ threshold: n })}
              style={{
                padding: 16, cursor: 'pointer',
                border: `2px solid ${active ? T.accent : T.ink10}`,
                background: active ? T.accentSoft : '#fff',
                borderRadius: 12, display: 'flex', alignItems: 'center', gap: 14,
              }}>
              <div style={{ display: 'inline-flex', gap: 1 }}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24">
                    <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7L12 2z" fill={i >= n ? T.gold : T.ink20}/>
                  </svg>
                ))}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>
                  {n === 5 ? '5 stars only' : `${n}+ stars`}
                </div>
                <div style={{ fontSize: 12, color: T.ink60 }}>
                  {n === 5 && 'Strictest — only perfect reviews go public.'}
                  {n === 4 && 'Recommended — filters out 1–3★ into private feedback.'}
                  {n === 3 && 'Loosest — most reviews go public.'}
                </div>
              </div>
              {n === 4 && <Pill>Recommended</Pill>}
            </div>
          );
        })}
      </div>
      <StepFooter>
        <SecondaryButton onClick={back}>Back</SecondaryButton>
        <PrimaryButton onClick={next}>Continue</PrimaryButton>
      </StepFooter>
    </StepLayout>
  );
}

// ── Step 4: Platforms ──
function StepPlatforms({ state, update, next, back }) {
  const toggle = id => {
    const s = new Set(state.platforms);
    if (s.has(id)) s.delete(id); else s.add(id);
    update({ platforms: [...s] });
  };
  return (
    <StepLayout
      eyebrow="Step 3 of 5"
      title="Where should happy reviews go?"
      sub="Customers with 4+ stars will choose from these. Add your own links later."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {ONB_PLATFORMS.map(p => {
          const on = state.platforms.includes(p.id);
          return (
            <div key={p.id} onClick={() => toggle(p.id)}
              style={{
                padding: '12px 14px', cursor: 'pointer',
                border: `2px solid ${on ? T.accent : T.ink10}`,
                background: on ? T.accentSoft : '#fff',
                borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12,
              }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, background: p.color,
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700,
              }}>{p.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.ink, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {p.name}
                  {p.recommended && <Pill>Recommended</Pill>}
                </div>
                <div style={{ fontSize: 12, color: T.ink60 }}>{p.desc}</div>
              </div>
              <Toggle on={on}/>
            </div>
          );
        })}
      </div>
      <StepFooter>
        <SecondaryButton onClick={back}>Back</SecondaryButton>
        <PrimaryButton onClick={next} disabled={state.platforms.length === 0}>Continue</PrimaryButton>
      </StepFooter>
    </StepLayout>
  );
}

// ── Step 5: Team ──
function StepTeam({ state, update, next, back }) {
  const [draftName, setDraftName] = React.useState('');
  const [draftRole, setDraftRole] = React.useState('');
  const addMember = () => {
    if (!draftName.trim()) return;
    const colors = ['#e85a5a', '#e88a3a', '#d4a82a', '#3aa657', '#2ca39a', '#3a79e8', '#7a52d4', '#c44fa8'];
    const next = [...state.team, {
      id: `m${Date.now()}`, name: draftName, role: draftRole || 'Team member',
      color: colors[state.team.length % colors.length],
    }];
    update({ team: next });
    setDraftName(''); setDraftRole('');
  };
  const removeMember = id => update({ team: state.team.filter(m => m.id !== id) });
  return (
    <StepLayout
      eyebrow="Step 4 of 5"
      title="Who's on your team?"
      sub="Each person gets their own QR poster — so you'll know who earned every 5-star review. Optional, but powerful."
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <Input value={draftName} onChange={setDraftName} placeholder="Full name"
          onEnter={addMember} style={{ flex: 2 }}/>
        <Input value={draftRole} onChange={setDraftRole} placeholder="Role"
          onEnter={addMember} style={{ flex: 1 }}/>
        <button onClick={addMember} style={{
          padding: '10px 16px', background: T.ink, color: '#fff',
          border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>Add</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20, minHeight: 60 }}>
        {state.team.length === 0 && (
          <div style={{
            padding: 20, textAlign: 'center', color: T.ink40,
            border: `1.5px dashed ${T.ink10}`, borderRadius: 10, fontSize: 12,
          }}>No team members yet — that's OK, you can add them later.</div>
        )}
        {state.team.map(m => (
          <div key={m.id} style={{
            padding: '10px 12px', background: T.paperWarm,
            border: `1px solid ${T.ink10}`, borderRadius: 8,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <Avatar seed={m.name} size={28} color={m.color}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>{m.name}</div>
              <div style={{ fontSize: 11, color: T.ink60 }}>{m.role}</div>
            </div>
            <span onClick={() => removeMember(m.id)} style={{
              color: T.ink60, cursor: 'pointer', padding: 4, fontSize: 16,
            }}>×</span>
          </div>
        ))}
      </div>
      <StepFooter>
        <SecondaryButton onClick={back}>Back</SecondaryButton>
        <div style={{ display: 'flex', gap: 8 }}>
          <SecondaryButton onClick={next}>Skip</SecondaryButton>
          <PrimaryButton onClick={next}>Continue</PrimaryButton>
        </div>
      </StepFooter>
    </StepLayout>
  );
}

// ── Step 6: Finish / First poster ──
function StepFinish({ state, back, onRestart }) {
  return (
    <StepLayout
      eyebrow="Step 5 of 5 · You're in 🎉"
      title={`Here's your first poster.`}
      sub="Print it, stick it somewhere customers will see. We've pre-built one per team member too."
    >
      <div style={{
        background: T.paperWarm, border: `1px solid ${T.ink10}`,
        borderRadius: 14, padding: 20,
        display: 'flex', gap: 20, alignItems: 'center', marginBottom: 20,
      }}>
        <div style={{ flexShrink: 0 }}>
          <PosterClassic
            biz={{ id: 'you', name: state.bizName || 'Your business', sub: state.bizSub || 'Location' }}
            employee={state.team[0] || null}
            accent={T.accent}
            qrSeed={state.bizName ? state.bizName.toLowerCase().replace(/\s+/g, '-') : 'your-biz'}
            size={0.46}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, textTransform: 'uppercase', letterSpacing: 0.7, marginBottom: 6 }}>
            First poster ready
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, letterSpacing: -0.2, marginBottom: 12 }}>
            {state.bizName || 'Your business'}{state.bizSub ? ` · ${state.bizSub}` : ''}
          </div>
          <SummaryRow label="Public threshold" value={`${state.threshold}+ stars`}/>
          <SummaryRow label="Platforms" value={`${state.platforms.length} enabled`}/>
          <SummaryRow label="Team posters" value={`${state.team.length} ready`}/>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        <SuggestedAction icon="🖨" title="Download PDF pack" sub={`${Math.max(1, state.team.length)} posters, print-ready`}/>
        <SuggestedAction icon="📬" title="Ship pre-printed" sub="Laminated tent cards, arrives in 3 days"/>
        <SuggestedAction icon="✉️" title="Invite your team" sub="They'll see their own reviews in the app"/>
      </div>

      <StepFooter>
        <SecondaryButton onClick={back}>Back</SecondaryButton>
        <div style={{ display: 'flex', gap: 8 }}>
          <SecondaryButton onClick={onRestart}>Restart</SecondaryButton>
          <PrimaryButton>Go to dashboard →</PrimaryButton>
        </div>
      </StepFooter>
    </StepLayout>
  );
}

// ── Shared bits ──
function StepLayout({ eyebrow, title, sub, children }) {
  return (
    <div style={{ maxWidth: 560, width: '100%' }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: T.accent, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 8 }}>
        {eyebrow}
      </div>
      <h1 style={{
        fontSize: 32, fontWeight: 700, color: T.ink,
        letterSpacing: -1, lineHeight: 1.1, margin: 0,
      }}>{title}</h1>
      {sub && (
        <div style={{ fontSize: 15, color: T.ink60, marginTop: 8, marginBottom: 24, lineHeight: 1.5, textWrap: 'pretty' }}>
          {sub}
        </div>
      )}
      {children}
    </div>
  );
}
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: T.ink80, marginBottom: 8 }}>{label}</div>
      {children}
    </div>
  );
}
function Input({ value, onChange, placeholder, autoFocus, onEnter, style }) {
  return (
    <input type="text" value={value || ''} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} autoFocus={autoFocus}
      onKeyDown={e => e.key === 'Enter' && onEnter && onEnter()}
      style={{
        width: '100%', padding: '11px 14px', fontSize: 14,
        border: `1.5px solid ${T.ink10}`, borderRadius: 8,
        fontFamily: T.sans, color: T.ink, background: '#fff',
        outline: 'none', transition: 'border-color 0.15s',
        ...style,
      }}
      onFocus={e => e.target.style.borderColor = T.accent}
      onBlur={e => e.target.style.borderColor = T.ink10}/>
  );
}
function PrimaryButton({ children, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: '11px 22px', background: disabled ? T.ink20 : T.ink,
      color: '#fff', border: 'none', borderRadius: 10,
      fontSize: 14, fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: T.sans,
    }}>{children}</button>
  );
}
function SecondaryButton({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '11px 18px', background: '#fff', color: T.ink80,
      border: `1.5px solid ${T.ink10}`, borderRadius: 10,
      fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: T.sans,
    }}>{children}</button>
  );
}
function StepFooter({ children }) {
  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>{children}</div>;
}
function Pill({ children }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, color: T.accent,
      background: T.accentSoft, padding: '2px 8px', borderRadius: 999,
      textTransform: 'uppercase', letterSpacing: 0.5,
    }}>{children}</span>
  );
}
function Toggle({ on }) {
  return (
    <div style={{
      width: 36, height: 20, borderRadius: 999, flexShrink: 0,
      background: on ? T.accent : T.ink20, position: 'relative',
      transition: 'background 0.15s',
    }}>
      <div style={{
        position: 'absolute', top: 2, left: on ? 18 : 2,
        width: 16, height: 16, borderRadius: '50%', background: '#fff',
        transition: 'left 0.15s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }}/>
    </div>
  );
}
function SummaryRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 12 }}>
      <span style={{ color: T.ink60 }}>{label}</span>
      <span style={{ color: T.ink, fontWeight: 600 }}>{value}</span>
    </div>
  );
}
function SuggestedAction({ icon, title, sub }) {
  return (
    <div style={{
      padding: '12px 14px', background: '#fff', border: `1px solid ${T.ink10}`,
      borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 8, background: T.paperWarm,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>{title}</div>
        <div style={{ fontSize: 11, color: T.ink60 }}>{sub}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.ink40} strokeWidth="2" strokeLinecap="round"><path d="M9 6l6 6-6 6"/></svg>
    </div>
  );
}

Object.assign(window, {
  StepWelcome, StepBasics, StepThreshold, StepPlatforms, StepTeam, StepFinish,
});
