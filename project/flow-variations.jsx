// flow-variations.jsx — the 4 variations, each a row of phones

// Sample businesses (switchable via Tweaks)
const BUSINESSES = [
  { id: 'lupo',    name: "Lupo's Trattoria",     tagline: 'Wood-fired Italian',      initials: 'LT', color: '#c0392b' },
  { id: 'blue',    name: 'Blue Door Cafe',       tagline: 'Brunch & specialty coffee', initials: 'BD', color: '#2a6fb4' },
  { id: 'kaya',    name: 'Kaya Sushi',           tagline: 'Omakase · Midtown',         initials: 'KS', color: '#1a1a1a' },
  { id: 'sunrise', name: 'Sunrise Diner',        tagline: 'Open 24/7 since 1978',      initials: 'SD', color: '#e09026' },
];

// ────────────────────────────────────────────────────────
// V1 — Single-page classic (stars)
// ────────────────────────────────────────────────────────
function VariationClassic({ business, platformVariant = 'grid' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
      <Phone label="① QR lands here">
        <FakeStatus/>
        <ScreenRatingClassic business={business} activeStars={0}/>
      </Phone>

      <FlowArrow label="tap a star"/>

      <Phone label="② tapped 5 stars">
        <FakeStatus/>
        <ScreenRatingClassic business={business} activeStars={5}/>
      </Phone>

      <FlowArrow label="4+ → public"/>

      <Phone label="③ pick platform">
        <FakeStatus/>
        <ScreenPositive business={business} variant={platformVariant}/>
      </Phone>

      <FlowArrow label="done"/>

      <Phone label="④ thanks!">
        <FakeStatus/>
        <ScreenThanks business={business} positive/>
      </Phone>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// V2 — Multi-step with brand intro
// ────────────────────────────────────────────────────────
function VariationMultiStep({ business, platformVariant = 'grid' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
      <Phone label="① welcome">
        <FakeStatus/>
        <ScreenHelloIntro business={business}/>
      </Phone>

      <FlowArrow label="tap continue"/>

      <Phone label="② rate">
        <FakeStatus/>
        <ScreenRatingClassic business={business} activeStars={0}/>
      </Phone>

      <FlowArrow label="1-3 stars"/>

      <Phone label="③ ...or give feedback">
        <FakeStatus/>
        <ScreenNegative business={business} compact/>
      </Phone>

      <FlowArrow label="submit"/>

      <Phone label="④ thanks">
        <FakeStatus/>
        <ScreenThanks business={business} positive={false}/>
      </Phone>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// V3 — Emoji scale (single page)
// ────────────────────────────────────────────────────────
function VariationEmoji({ business, platformVariant = 'stacked' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
      <Phone label="① QR lands here">
        <FakeStatus/>
        <ScreenRatingEmoji business={business} active={-1}/>
      </Phone>

      <FlowArrow label="pick a face"/>

      <Phone label="② tapped 'amazing'">
        <FakeStatus/>
        <ScreenRatingEmoji business={business} active={4}/>
      </Phone>

      <FlowArrow label="4+ → public"/>

      <Phone label="③ platforms (stacked)">
        <FakeStatus/>
        <ScreenPositive business={business} variant={platformVariant}/>
      </Phone>

      <FlowArrow label="done"/>

      <Phone label="④ thanks">
        <FakeStatus/>
        <ScreenThanks business={business} positive/>
      </Phone>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// V4 — Conversational (chat-style)
// ────────────────────────────────────────────────────────
function VariationConversational({ business }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
      <Phone label="① chat opens">
        <FakeStatus/>
        <ScreenConversational business={business} step={0}/>
      </Phone>

      <FlowArrow label="tap 5 stars"/>

      <Phone label="② rating sent">
        <FakeStatus/>
        <ScreenConversational business={business} step={1}/>
      </Phone>

      <FlowArrow label="4+ → public"/>

      <Phone label="③ platform picker">
        <FakeStatus/>
        <ScreenPositive business={business} variant="stacked"/>
      </Phone>

      <FlowArrow label="done"/>

      <Phone label="④ thanks">
        <FakeStatus/>
        <ScreenThanks business={business} positive/>
      </Phone>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// Negative branch exploration (shared, shown once)
// ────────────────────────────────────────────────────────
function NegativeBranch({ business }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
      <Phone label="① tapped 2 stars">
        <FakeStatus/>
        <ScreenRatingClassic business={business} activeStars={2}/>
      </Phone>

      <FlowArrow label="1-3 → private"/>

      <Phone label="② what happened?">
        <FakeStatus/>
        <ScreenNegative business={business}/>
      </Phone>

      <FlowArrow label="submit"/>

      <Phone label="③ sent to owner">
        <FakeStatus/>
        <ScreenThanks business={business} positive={false}/>
      </Phone>
    </div>
  );
}

Object.assign(window, {
  BUSINESSES,
  VariationClassic, VariationMultiStep, VariationEmoji, VariationConversational,
  NegativeBranch,
});
