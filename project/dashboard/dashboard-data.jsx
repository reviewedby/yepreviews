// dashboard-data.jsx — mock data for the owner dashboard
const DASH_LOCATIONS = [
  { id: 'kaya-mid',  name: 'Kaya Sushi',         sub: 'Midtown',       initials: 'KS', color: '#0e1220' },
  { id: 'kaya-west', name: 'Kaya Sushi',         sub: 'West Village',  initials: 'KS', color: '#0e1220' },
  { id: 'lupo',      name: "Lupo's Trattoria",   sub: 'Main',          initials: 'LT', color: '#c0392b' },
];

const DASH_EMPLOYEES = [
  { id: 'aiko',    name: 'Aiko Tanaka',   role: 'Head server',    color: '#c44fa8', avg: 4.9, reviews: 84, trend: +0.2 },
  { id: 'david',   name: 'David Chen',    role: 'Sushi chef',     color: '#3a79e8', avg: 4.7, reviews: 142, trend: +0.1 },
  { id: 'maria',   name: 'Maria Rossi',   role: 'Server · Floor', color: '#e85a5a', avg: 4.5, reviews: 67,  trend: 0 },
  { id: 'sam',     name: 'Sam Patel',     role: 'Shift lead',     color: '#7a52d4', avg: 4.3, reviews: 55,  trend: -0.1 },
  { id: 'rita',    name: 'Rita Johnson',  role: 'Server',         color: '#2ca39a', avg: 4.1, reviews: 43,  trend: +0.3 },
  { id: 'leo',     name: 'Leo Martinez',  role: 'Bar · Weekend',  color: '#e09026', avg: 3.8, reviews: 29,  trend: -0.2 },
];

// Action-needed items (unresponded negative feedback)
const ACTION_ITEMS = [
  {
    id: 'a1', stars: 2, employee: 'leo', when: '2h ago', unread: true,
    chips: ['Wait time', 'Service'],
    text: 'Bartender seemed overwhelmed even though it wasn\'t busy. Waited 20 min for a simple drink.',
    email: 'j.martinez@gmail.com',
  },
  {
    id: 'a2', stars: 1, employee: null, when: '5h ago', unread: true,
    chips: ['Food', 'Cleanliness'],
    text: 'Fish didn\'t taste right. Table was sticky too. First time here, won\'t be back.',
    email: null,
  },
  {
    id: 'a3', stars: 3, employee: 'sam', when: 'yesterday', unread: false,
    chips: ['Value'],
    text: 'Food was fine but felt overpriced for the portion size.',
    email: 'k.park@outlook.com',
  },
];

// Recent feedback — public + private mixed
const RECENT_FEEDBACK = [
  { id: 'r1', stars: 5, employee: 'aiko',  public: true,  platform: 'google', when: '12m ago', text: 'Aiko was amazing — knew the entire menu and paired the perfect sake. Best meal in months.' },
  { id: 'r2', stars: 5, employee: 'david', public: true,  platform: 'google', when: '1h ago',  text: 'The omakase was unreal. David is a true artist behind the counter.' },
  { id: 'r3', stars: 2, employee: 'leo',   public: false, platform: null,     when: '2h ago',  text: 'Bartender seemed overwhelmed even though it wasn\'t busy.' },
  { id: 'r4', stars: 4, employee: 'maria', public: true,  platform: 'yelp',   when: '3h ago',  text: 'Solid experience, Maria was friendly and attentive. Would return.' },
  { id: 'r5', stars: 5, employee: 'aiko',  public: true,  platform: 'google', when: '4h ago',  text: 'Incredible service — ask for Aiko!' },
  { id: 'r6', stars: 1, employee: null,    public: false, platform: null,     when: '5h ago',  text: 'Fish didn\'t taste right. Table was sticky too.' },
];

// 30-day trend — rating average per day + volume
const TREND_DATA = [
  4.4, 4.5, 4.3, 4.6, 4.7, 4.5, 4.4,
  4.6, 4.7, 4.8, 4.7, 4.5, 4.6, 4.7,
  4.8, 4.6, 4.7, 4.5, 4.4, 4.6, 4.7,
  4.8, 4.7, 4.6, 4.5, 4.7, 4.8, 4.7,
  4.6, 4.7,
];
const VOLUME_DATA = [
  8, 12, 10, 14, 18, 22, 19,
  11, 9,  13, 16, 20, 24, 21,
  12, 10, 14, 17, 19, 23, 20,
  13, 11, 15, 18, 22, 25, 22,
  14, 16,
];

Object.assign(window, {
  DASH_LOCATIONS, DASH_EMPLOYEES, ACTION_ITEMS, RECENT_FEEDBACK,
  TREND_DATA, VOLUME_DATA,
});
