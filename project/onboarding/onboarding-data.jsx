// onboarding-data.jsx — content for each step of the business onboarding flow

const ONB_PLATFORMS = [
  { id: 'google',      name: 'Google',      color: '#4285F4', desc: 'Most important for SEO', recommended: true, enabledByDefault: true },
  { id: 'yelp',        name: 'Yelp',        color: '#D32323', desc: 'Local discovery',         recommended: true, enabledByDefault: true },
  { id: 'facebook',    name: 'Facebook',    color: '#1877F2', desc: 'Social proof',            recommended: false, enabledByDefault: false },
  { id: 'tripadvisor', name: 'TripAdvisor', color: '#00AF87', desc: 'Tourist traffic',         recommended: false, enabledByDefault: false },
  { id: 'opentable',   name: 'OpenTable',   color: '#DA3743', desc: 'Reservations',            recommended: false, enabledByDefault: false },
  { id: 'trustpilot',  name: 'Trustpilot',  color: '#00B67A', desc: 'General trust',           recommended: false, enabledByDefault: false },
];

const ONB_FEEDBACK_TAGS = [
  { id: 'food',        label: 'Food quality' },
  { id: 'service',     label: 'Service' },
  { id: 'wait',        label: 'Wait time' },
  { id: 'cleanliness', label: 'Cleanliness' },
  { id: 'value',       label: 'Value for money' },
  { id: 'atmosphere',  label: 'Atmosphere' },
  { id: 'accuracy',    label: 'Order accuracy' },
  { id: 'noise',       label: 'Noise level' },
];

const ONB_BIZ_TYPES = [
  { id: 'restaurant', label: 'Restaurant', emoji: '🍝' },
  { id: 'cafe',       label: 'Café / bakery', emoji: '☕' },
  { id: 'bar',        label: 'Bar / brewery', emoji: '🍺' },
  { id: 'hotel',      label: 'Hotel / stay',  emoji: '🏨' },
  { id: 'salon',      label: 'Salon / spa',   emoji: '💇' },
  { id: 'service',    label: 'Home service',  emoji: '🔧' },
  { id: 'retail',     label: 'Retail store',  emoji: '🛍' },
  { id: 'other',      label: 'Something else', emoji: '✨' },
];

const ONB_SAMPLE_TEAM = [
  { id: 'aiko',  name: 'Aiko Tanaka',  role: 'Head server',    color: '#c44fa8' },
  { id: 'david', name: 'David Chen',   role: 'Sushi chef',     color: '#3a79e8' },
  { id: 'maria', name: 'Maria Rossi',  role: 'Server',         color: '#e85a5a' },
];

Object.assign(window, { ONB_PLATFORMS, ONB_FEEDBACK_TAGS, ONB_BIZ_TYPES, ONB_SAMPLE_TEAM });
