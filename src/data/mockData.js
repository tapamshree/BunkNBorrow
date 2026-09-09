/* ═══════════════════════════════
   MOCK DATA — BunkNBorrow
   ═══════════════════════════════ */

export const users = [
  { id: 'u1', name: 'Aarav Patel', initials: 'AP', hostel: 'Hostel 12', campus: 'IIT Bombay', rating: 4.9, reviews: 23, email: 'aarav@iitb.ac.in' },
  { id: 'u2', name: 'Maya Sen', initials: 'MS', hostel: 'Hostel 10', campus: 'IIT Bombay', rating: 4.8, reviews: 15, email: 'maya@iitb.ac.in' },
  { id: 'u3', name: 'Devansh Roy', initials: 'DR', hostel: 'Hostel 5', campus: 'IIT Bombay', rating: 4.7, reviews: 31, email: 'devansh@iitb.ac.in' },
  { id: 'u4', name: 'Priya Sharma', initials: 'PS', hostel: 'Hostel 14', campus: 'IIT Bombay', rating: 5.0, reviews: 8, email: 'priya@iitb.ac.in' },
  { id: 'u5', name: 'Rohan Mehta', initials: 'RM', hostel: 'Hostel 3', campus: 'IIT Bombay', rating: 4.6, reviews: 19, email: 'rohan@iitb.ac.in' },
];

export const categories = [
  { id: 'all', label: 'All Items' },
  { id: 'cameras', label: 'Cameras' },
  { id: 'camping', label: 'Camping' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'sports', label: 'Sports' },
  { id: 'books', label: 'Books' },
  { id: 'audio', label: 'Audio' },
  { id: 'lab', label: 'Lab Gear' },
];

export const listings = [
  {
    id: 'l1', ownerId: 'u1', title: 'Sony Alpha A6400 — Body + Kit Lens',
    category: 'cameras', type: 'Rent',
    terms: '₹500/day · ₹1,200 deposit · Aadhar ID proof needed · Pickup from Hostel 12 lobby',
    description: 'Barely used Sony mirrorless camera. Perfect for events, club shoots, and semester projects. Comes with 16-50mm kit lens, battery charger, and carry bag.',
    status: 'available', rating: 4.9,
  },
  {
    id: 'l2', ownerId: 'u2', title: 'Quechua 3-Person Waterproof Tent',
    category: 'camping', type: 'Rent',
    terms: '₹300/night · Max 5 nights · Clean before return · Hostel 10, Room 204',
    description: 'Decathlon Quechua tent, tested in Lonavala monsoon. Fits 3 people snugly. Includes rain fly and ground sheet.',
    status: 'available', rating: 4.8,
  },
  {
    id: 'l3', ownerId: 'u3', title: 'Arduino Mega 2560 Starter Kit',
    category: 'electronics', type: 'Rent + Sell',
    terms: 'Rent: ₹100/week · Buy: ₹2,800 (MRP ₹4,200) · All sensors included · Hostel 5 gate',
    description: 'Complete Arduino kit with 37 sensor modules, breadboard, jumper wires, LCD display, and tutorial booklet. Perfect for EE/CS course projects.',
    status: 'available', rating: 4.7,
  },
  {
    id: 'l4', ownerId: 'u4', title: 'Yonex Astrox 88D Badminton Racket',
    category: 'sports', type: 'Rent',
    terms: '₹150/session · Grip tape fresh · Bring your own shuttles · Sports complex lobby',
    description: 'Tournament-grade Yonex racket, recently restrung at 26lbs. Great for inter-hostel tournament practice.',
    status: 'rented', rating: 5.0,
  },
  {
    id: 'l5', ownerId: 'u5', title: 'TI-84 Plus CE Graphing Calculator',
    category: 'electronics', type: 'Rent + Sell',
    terms: 'Rent: ₹50/day · Buy: ₹6,500 · Fresh batteries included · Hostel 3, Wing B',
    description: 'Color screen graphing calculator. Loaded with programs for calculus, stats, and linear algebra. Exam-approved model.',
    status: 'available', rating: 4.6,
  },
  {
    id: 'l6', ownerId: 'u1', title: 'JBL Charge 5 Bluetooth Speaker',
    category: 'audio', type: 'Rent',
    terms: '₹200/day · ₹500 deposit · Fully charged on pickup · Hostel 12 common room',
    description: 'Waterproof JBL speaker with 20hr battery life. Ideal for hostel parties, picnics, and outdoor jams.',
    status: 'available', rating: 4.9,
  },
  {
    id: 'l7', ownerId: 'u2', title: 'Molecular Biology of the Cell — Alberts (7th Ed)',
    category: 'books', type: 'Sell',
    terms: 'Selling at ₹800 (MRP ₹3,200) · Minor highlighting · Hostel 10 mess',
    description: 'Gold standard biology textbook. Clean pages with minimal margin notes. Perfect for biotech and life sciences students.',
    status: 'available', rating: 4.8,
  },
  {
    id: 'l8', ownerId: 'u3', title: 'Philips NeoPix Ultra 2+ Projector',
    category: 'electronics', type: 'Rent',
    terms: '₹400/night · HDMI cable included · 1080p · Return next morning by 10am · Hostel 5 room 312',
    description: 'Full HD projector for movie nights, presentations, and gaming. Bright enough for a dark dorm room. Comes with remote and power cable.',
    status: 'available', rating: 4.7,
  },
];

export const communities = [
  {
    id: 'c1', name: 'Campus Shutterbugs', category: 'Photography',
    description: 'Student photography club — photo walks, editing workshops, and gear sharing. We shoot everything from street to astrophotography.',
    members: '120–180', activity: 'High',
    links: { whatsapp: '#', discord: '#', telegram: '#' },
    relatedCategories: ['cameras'],
  },
  {
    id: 'c2', name: 'Mountain & Trail Trekkers', category: 'Outdoors',
    description: 'Weekend treks, monsoon hikes, and camping trips around the Western Ghats. Gear pooling and carpooling organized through the group.',
    members: '80–120', activity: 'High',
    links: { whatsapp: '#', telegram: '#' },
    relatedCategories: ['camping', 'sports'],
  },
  {
    id: 'c3', name: 'Open Source & Robotics Guild', category: 'Tech',
    description: 'Build robots, contribute to open-source, and share electronics kits. Weekly hack sessions every Saturday at the tinkering lab.',
    members: '60–100', activity: 'Active',
    links: { discord: '#', telegram: '#' },
    relatedCategories: ['electronics', 'lab'],
  },
  {
    id: 'c4', name: 'Campus Esports & LAN', category: 'Gaming',
    description: 'Valorant, CS2, and Dota 2 scrims. Monthly LAN parties with projectors and borrowed speakers. All skill levels welcome.',
    members: '200–300', activity: 'High',
    links: { discord: '#', whatsapp: '#' },
    relatedCategories: ['electronics', 'audio'],
  },
  {
    id: 'c5', name: 'Indie Board Game Society', category: 'Recreation',
    description: 'Catan, Codenames, Azul, and more. We meet every Friday at the student lounge. Bring snacks!',
    members: '30–50', activity: 'Active',
    links: { whatsapp: '#' },
    relatedCategories: [],
  },
  {
    id: 'c6', name: 'Marathon & Running Club', category: 'Fitness',
    description: 'Morning runs at 6am, half-marathon training, and inter-college race team. All paces welcome.',
    members: '90–140', activity: 'High',
    links: { whatsapp: '#', telegram: '#' },
    relatedCategories: ['sports'],
  },
];

export const chatThreads = [
  {
    id: 't1', listingId: 'l1', participants: ['u2', 'u1'],
    messages: [
      { from: 'u2', text: 'Hey! Is the Sony A6400 available this weekend? Need it for our cultural fest coverage.', time: '2:30 PM' },
      { from: 'u1', text: 'Yes it is! ₹500/day. I can do ₹900 for the whole weekend (Fri-Sun). ID proof at pickup.', time: '2:32 PM' },
      { from: 'u2', text: 'Deal! Can I pick up Friday 4pm from H12 lobby?', time: '2:35 PM' },
      { from: 'u1', text: 'Works for me. Bring your college ID. Will send UPI after handover.', time: '2:36 PM' },
    ],
  },
  {
    id: 't2', listingId: 'l3', participants: ['u5', 'u3'],
    messages: [
      { from: 'u5', text: 'Hi, looking to buy the Arduino kit. Is the price negotiable?', time: '11:00 AM' },
      { from: 'u3', text: 'Hey! I can do ₹2,500 if you pick up today. All 37 sensors tested and working.', time: '11:05 AM' },
      { from: 'u5', text: 'Sounds good. H5 gate in 30 mins?', time: '11:08 AM' },
    ],
  },
];

export const stats = [
  { value: 2400, label: 'Gear exchanges', suffix: '+' },
  { value: 480000, label: 'Saved by students', prefix: '₹', suffix: '+', format: 'compact' },
  { value: 60, label: 'Active clubs', suffix: '+' },
  { value: 4.9, label: 'Avg trust score', suffix: '★', decimals: 1 },
];

export const faqItems = [
  { q: 'Is BunkNBorrow free to use?', a: 'Completely free. No commissions, no subscriptions, no hidden fees. All payments happen directly between students — we just connect you.' },
  { q: 'How do I know the gear is in good condition?', a: 'Every user has a rating based on past exchanges. Owners describe item condition in their listing terms, and you can chat with them directly to ask for photos or details before committing.' },
  { q: 'What if something gets damaged or lost?', a: 'Damage and return disputes are handled directly between students. We strongly recommend setting clear terms (deposit, ID proof) before handover. Your rating history is your reputation.' },
  { q: 'How do community links work?', a: `Communities link to existing WhatsApp, Discord, or Telegram groups. We don't host the chat — we just make it easy to discover and join groups relevant to your interests.` },
  { q: 'Can I list items for sale, not just rental?', a: `Yes! You can list items as Rent, Sell, or both. Set your own price and terms — it's entirely flexible.` },
  { q: 'Which campuses are supported?', a: 'We launch on a single campus first. The app is designed for multi-campus expansion — each listing and community carries a campus tag, so we can add new campuses seamlessly.' },
];

export const heroChips = [
  { label: 'DSLR for 2 days', color: '#1E293B', textColor: '#fff', rotate: -5 },
  { label: 'Camping stove', color: '#22C55E', textColor: '#fff', rotate: 3 },
  { label: 'Arduino kit', color: '#7C3AED', textColor: '#fff', rotate: -3 },
  { label: 'TI-84 calculator', color: '#FF6A3D', textColor: '#fff', rotate: 6 },
  { label: 'Projector night', color: '#1A1A1A', textColor: '#fff', rotate: -7 },
  { label: 'Badminton racket', color: '#0EA5E9', textColor: '#fff', rotate: 2 },
  { label: 'Textbook swap', color: '#F59E0B', textColor: '#fff', rotate: -4 },
  { label: 'Speaker rental', color: '#EC4899', textColor: '#fff', rotate: 5 },
  { label: 'Lab equipment', color: '#6366F1', textColor: '#fff', rotate: -2 },
  { label: 'Hostel pickup', color: '#14B8A6', textColor: '#fff', rotate: 4 },
];

export const marqueeFeatures = [
  { title: 'Instant Chat', desc: 'Message owners directly', status: 'Live' },
  { title: 'Hostel Pickup', desc: '5-min walk, zero delivery fees', status: 'Live' },
  { title: 'Rating System', desc: 'Two-sided trust after every exchange', status: 'Live' },
  { title: 'Category Filters', desc: 'Find gear by type instantly', status: 'Live' },
  { title: 'Community Links', desc: 'Join clubs via WhatsApp / Discord', status: 'Live' },
  { title: 'Cross-Linking', desc: 'Gear listings meet related clubs', status: 'Live' },
  { title: 'Price Negotiation', desc: 'Chat-based, no fixed pricing', status: 'Live' },
  { title: 'Dead Link Reports', desc: 'Keep community links fresh', status: 'Live' },
  { title: 'Multi-Campus', desc: 'Expand to new campuses seamlessly', status: 'Coming soon' },
  { title: 'Deposit Escrow', desc: 'Automated deposit protection', status: 'Coming soon' },
];
