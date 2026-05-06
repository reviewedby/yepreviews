// landing-data.jsx — copy + data for the Yep marketing page
// Theme: private feedback → learn → grow. Protecting your rating is the side effect.

const HERO_VARIANTS = {
  learn: {
    kicker: 'Catch the bad · show the good',
    title: ['Catch the bad.', 'Show', 'the good.'],
    sub: "One QR, two paths. Unhappy customers land in a private inbox where you can actually fix it. Happy ones land on Google, Yelp, and Facebook where it actually counts. Your rating reflects your best work. Your team learns from the rest.",
    ctaPrimary: 'Start free',
    ctaSecondary: 'See the split',
  },
  loop: {
    kicker: 'The right feedback in the right place',
    title: ['Private problems.', 'Public', 'praise.'],
    sub: "Problems belong in a place you can do something about them — your inbox, tagged and timestamped. Praise belongs somewhere that grows your business — the platforms new customers actually read. Yep routes each to where it does the most good.",
    ctaPrimary: 'Route it right',
    ctaSecondary: 'How it works',
  },
  mentor: {
    kicker: 'Two customers. Two destinations.',
    title: ["Their worst day", "stays with you.", "Their best day goes everywhere."],
    sub: "A bad visit is a lesson — and lessons belong to the owner, not to Google. A great visit is a referral — and referrals belong in public, working for you. Yep makes the split automatic. You learn in private. You grow in public.",
    ctaPrimary: 'Split the signal',
    ctaSecondary: 'See a live demo',
  },
};

const INDUSTRIES = {
  restaurant: {
    label: 'Restaurants',
    emoji: '🍝',
    biz: 'Kaya Sushi',
    sub: 'Midtown',
    employee: 'Aiko',
    context: 'after dinner',
  },
  salon: {
    label: 'Salons & spas',
    emoji: '💇',
    biz: 'Thread & Bloom',
    sub: 'Salon',
    employee: 'Maya',
    context: 'after your appointment',
  },
  service: {
    label: 'Home services',
    emoji: '🔧',
    biz: "Ridge HVAC",
    sub: 'Pros',
    employee: 'Marcus',
    context: 'after the job',
  },
  retail: {
    label: 'Retail',
    emoji: '🛍',
    biz: 'North & Pine',
    sub: 'Shop',
    employee: null,
    context: 'at checkout',
  },
};

// Stats reframed around learning + outcomes, not "we hide bad reviews"
const STATS = [
  { value: '84%',   label: 'of unhappy customers who leave quietly would have told you — if you asked right' },
  { value: '3.2×',  label: 'more issues surfaced vs. public review sites alone' },
  { value: '11 days', label: 'avg time from first signal to shipped fix' },
  { value: '+1.2★', label: 'rating lift in 60 days — because the business got better' },
];

const TESTIMONIALS = [
  { name: 'Elena García', role: 'Owner · Casa Elena', avatar: '#e85a5a', rating: 5,
    quote: "I used to find out about a bad night on Google at 11pm. Now I read it in a private note at 9pm and call the table by 9:15. Different business." },
  { name: 'Dev Patel', role: 'GM · Lotus Salon Group (4 locations)', avatar: '#7a52d4', rating: 5,
    quote: "Yep isn't a review tool for us — it's a management tool. Every Monday I read the week's private feedback before I walk the floor. I run a better shop because of it." },
  { name: 'Marcus Reid', role: 'Owner · Ridge HVAC', avatar: '#2ca39a', rating: 5,
    quote: "One chip — 'communication' — kept coming up for one tech. Invisible on Google. Glaring on Yep. One training conversation later, it stopped. That's the whole product." },
  { name: 'Priya Shah', role: 'Founder · North & Pine Retail', avatar: '#3a79e8', rating: 5,
    quote: "I read every piece of private feedback like it's a memo from a mentor. My rating has never looked better, and I've never learned faster. Those two things are the same thing." },
];

const LOGOS = [
  'Casa Elena', 'Lotus Salons', 'Ridge HVAC', 'Kaya Sushi',
  'North & Pine', 'Blue Fox Café', 'Thread & Bloom', 'Bright Dental',
];

// Steps reframed: Catch → Understand → Fix
const STEPS_HIW = [
  { n: '01', title: 'Catch the moment — privately',
    desc: "Customer scans your QR, taps a star. If it's a low one, they land on a private form — not a public review page. What went wrong, category chips, optional contact. Straight to your inbox. Nothing goes public unless they choose." },
  { n: '02', title: 'Understand the pattern',
    desc: "One complaint is noise. Twelve complaints about \"wait time on Fridays\" is a strategy meeting. Yep groups feedback by theme, location, employee, and week — so you see what to fix, not just what happened." },
  { n: '03', title: 'Ship the fix — and watch it work',
    desc: "Change the schedule, retrain the tech, fix the menu. Yep tracks whether that category stops showing up. You're not managing reviews anymore. You're running a feedback loop." },
];

const FAQ = [
  { q: "Isn't this just hiding bad reviews?", a: "No. Customers can still post anywhere they want — we never block them. We just ask privately first, because most unhappy customers would rather vent to you than to the internet. The fix is what matters; the rating follows." },
  { q: 'Does this work with Google?', a: "Yep. Google is our #1 destination for happy customers. Your posted reviews show up on your Business Profile like any other." },
  { q: 'What happens to the private feedback?', a: "It lives in your Yep inbox — tagged, searchable, exportable. Most owners read it weekly like a management report. Nothing is ever posted publicly without the customer explicitly doing it." },
  { q: 'What if I have multiple locations?', a: "Add as many as you want on Pro. Each location gets its own QR, inbox, and insights — so you can see whose problems are whose." },
  { q: 'Do I need to install anything?', a: "Nope. Print a QR. You're live." },
];

Object.assign(window, { HERO_VARIANTS, INDUSTRIES, STATS, TESTIMONIALS, LOGOS, STEPS_HIW, FAQ });
