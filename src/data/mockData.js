/* ═══════════════════════════════
   MOCK DATA — BunkNBorrow
   ═══════════════════════════════ */

export const users = [
  { id: 'u1', name: 'Aarav Patel', initials: 'AP', hostel: 'Hostel 12', campus: 'IIT Bombay', rating: 4.9, reviews: 23, email: 'aarav@iitb.ac.in', college: 'IIT Bombay', bio: 'CS Sophomore | Photography nerd | Gear collector' },
  { id: 'u2', name: 'Maya Sen', initials: 'MS', hostel: 'Hostel 10', campus: 'IIT Bombay', rating: 4.8, reviews: 15, email: 'maya@iitb.ac.in', college: 'IIT Bombay', bio: 'Biotech 3rd year | Trekking addict' },
  { id: 'u3', name: 'Devansh Roy', initials: 'DR', hostel: 'Hostel 5', campus: 'IIT Bombay', rating: 4.7, reviews: 31, email: 'devansh@iitb.ac.in', college: 'IIT Bombay', bio: 'EE Junior | Robotics club lead' },
  { id: 'u4', name: 'Priya Sharma', initials: 'PS', hostel: 'Hostel 14', campus: 'IIT Bombay', rating: 5.0, reviews: 8, email: 'priya@iitb.ac.in', college: 'IIT Bombay', bio: 'Sports captain | Badminton state champ' },
  { id: 'u5', name: 'Rohan Mehta', initials: 'RM', hostel: 'Hostel 3', campus: 'IIT Bombay', rating: 4.6, reviews: 19, email: 'rohan@iitb.ac.in', college: 'IIT Bombay', bio: 'Math major | Calculator hoarder' },
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
    status: 'available', rating: 4.9, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'l2', ownerId: 'u2', title: 'Quechua 3-Person Waterproof Tent',
    category: 'camping', type: 'Rent',
    terms: '₹300/night · Max 5 nights · Clean before return · Hostel 10, Room 204',
    description: 'Decathlon Quechua tent, tested in Lonavala monsoon. Fits 3 people snugly. Includes rain fly and ground sheet.',
    status: 'available', rating: 4.8, image: 'https://images.unsplash.com/photo-1504280387968-077fae6d3092?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'l3', ownerId: 'u3', title: 'Arduino Mega 2560 Starter Kit',
    category: 'electronics', type: 'Rent + Sell',
    terms: 'Rent: ₹100/week · Buy: ₹2,800 (MRP ₹4,200) · All sensors included · Hostel 5 gate',
    description: 'Complete Arduino kit with 37 sensor modules, breadboard, jumper wires, LCD display, and tutorial booklet. Perfect for EE/CS course projects.',
    status: 'available', rating: 4.7, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'l4', ownerId: 'u4', title: 'Yonex Astrox 88D Badminton Racket',
    category: 'sports', type: 'Rent',
    terms: '₹150/session · Grip tape fresh · Bring your own shuttles · Sports complex lobby',
    description: 'Tournament-grade Yonex racket, recently restrung at 26lbs. Great for inter-hostel tournament practice.',
    status: 'rented', rating: 5.0, image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'l5', ownerId: 'u5', title: 'TI-84 Plus CE Graphing Calculator',
    category: 'electronics', type: 'Rent + Sell',
    terms: 'Rent: ₹50/day · Buy: ₹6,500 · Fresh batteries included · Hostel 3, Wing B',
    description: 'Color screen graphing calculator. Loaded with programs for calculus, stats, and linear algebra. Exam-approved model.',
    status: 'available', rating: 4.6, image: 'https://images.unsplash.com/photo-1574607383476-f517f260d30b?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'l6', ownerId: 'u1', title: 'JBL Charge 5 Bluetooth Speaker',
    category: 'audio', type: 'Rent',
    terms: '₹200/day · ₹500 deposit · Fully charged on pickup · Hostel 12 common room',
    description: 'Waterproof JBL speaker with 20hr battery life. Ideal for hostel parties, picnics, and outdoor jams.',
    status: 'available', rating: 4.9, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'l7', ownerId: 'u2', title: 'Molecular Biology of the Cell — Alberts (7th Ed)',
    category: 'books', type: 'Sell',
    terms: 'Selling at ₹800 (MRP ₹3,200) · Minor highlighting · Hostel 10 mess',
    description: 'Gold standard biology textbook. Clean pages with minimal margin notes. Perfect for biotech and life sciences students.',
    status: 'available', rating: 4.8, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'l8', ownerId: 'u3', title: 'Philips NeoPix Ultra 2+ Projector',
    category: 'electronics', type: 'Rent',
    terms: '₹400/night · HDMI cable included · 1080p · Return next morning by 10am · Hostel 5 room 312',
    description: 'Full HD projector for movie nights, presentations, and gaming. Bright enough for a dark dorm room. Comes with remote and power cable.',
    status: 'available', rating: 4.7, image: 'https://images.unsplash.com/photo-1588691512401-496660fb7f8a?auto=format&fit=crop&q=80&w=400',
  },
];

export const communities = [
  {
    id: 'c1', name: 'Campus Shutterbugs', category: 'Photography',
    bio: 'The official photography club of IIT Bombay. We do photo walks every weekend, host editing workshops, and share gear among members.',
    description: 'Student photography club — photo walks, editing workshops, and gear sharing. We shoot everything from street to astrophotography.',
    members: 156, activity: 'High',
    links: { whatsapp: '#', discord: '#', telegram: '#' },
    relatedCategories: ['cameras'], image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'c2', name: 'Mountain & Trail Trekkers', category: 'Outdoors',
    bio: 'Weekend treks, monsoon hikes, and camping trips around the Western Ghats. We organize carpools and gear pooling for every trip.',
    description: 'Weekend treks, monsoon hikes, and camping trips around the Western Ghats. Gear pooling and carpooling organized through the group.',
    members: 98, activity: 'High',
    links: { whatsapp: '#', telegram: '#' },
    relatedCategories: ['camping', 'sports'], image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'c3', name: 'Open Source & Robotics Guild', category: 'Tech',
    bio: 'Build robots, contribute to open-source, and share electronics kits. Weekly hack sessions every Saturday at the tinkering lab.',
    description: 'Build robots, contribute to open-source, and share electronics kits. Weekly hack sessions every Saturday at the tinkering lab.',
    members: 74, activity: 'Active',
    links: { discord: '#', telegram: '#' },
    relatedCategories: ['electronics', 'lab'], image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'c4', name: 'Campus Esports & LAN', category: 'Gaming',
    bio: 'Valorant, CS2, and Dota 2 scrims. Monthly LAN parties with projectors and borrowed speakers.',
    description: 'Valorant, CS2, and Dota 2 scrims. Monthly LAN parties with projectors and borrowed speakers. All skill levels welcome.',
    members: 243, activity: 'High',
    links: { discord: '#', whatsapp: '#' },
    relatedCategories: ['electronics', 'audio'], image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'c5', name: 'Indie Board Game Society', category: 'Recreation',
    bio: 'Catan, Codenames, Azul, and more. We meet every Friday at the student lounge. Bring snacks!',
    description: 'Catan, Codenames, Azul, and more. We meet every Friday at the student lounge. Bring snacks!',
    members: 42, activity: 'Active',
    links: { whatsapp: '#' },
    relatedCategories: [], image: 'https://images.unsplash.com/photo-1610890716171-6b1a3d92fbdb?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'c6', name: 'Marathon & Running Club', category: 'Fitness',
    bio: 'Morning runs at 6am, half-marathon training, and inter-college race team. All paces welcome.',
    description: 'Morning runs at 6am, half-marathon training, and inter-college race team. All paces welcome.',
    members: 112, activity: 'High',
    links: { whatsapp: '#', telegram: '#' },
    relatedCategories: ['sports'], image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=400',
  },
];

/* ── Community Posts ── */
export const communityPosts = [
  {
    id: 'p1', communityId: 'c1', authorId: 'u1',
    text: 'Just shot the sunset from Powai Lake with the Sony A6400. Golden hour was insane today! 🌅📷 Anyone up for a photo walk this Saturday?',
    image: null,
    likes: 24, commentCount: 5,
    comments: [
      { id: 'cm1', authorId: 'u2', text: 'Amazing shot! Count me in for Saturday.', time: '1h ago', likes: 3, replies: [
        { id: 'r1', authorId: 'u1', text: 'Sweet! Meet at H12 gate at 5pm?', time: '45m ago' },
      ]},
      { id: 'cm2', authorId: 'u3', text: 'Can I borrow a tripod for the walk?', time: '30m ago', likes: 1, replies: [] },
    ],
    time: '2h ago',
  },
  {
    id: 'p2', communityId: 'c2', authorId: 'u2',
    text: 'Rajmachi Fort trek this weekend — 8 spots left! ⛰️ We have 3 tents and 2 cooking stoves. DM if interested. Cost split: ₹600/person including food.',
    image: null,
    likes: 18, commentCount: 7,
    comments: [
      { id: 'cm3', authorId: 'u4', text: 'I\'m in! Can bring one more person?', time: '3h ago', likes: 2, replies: [
        { id: 'r2', authorId: 'u2', text: 'Sure, the more the merrier!', time: '2h ago' },
      ]},
      { id: 'cm4', authorId: 'u5', text: 'What\'s the difficulty level?', time: '1h ago', likes: 0, replies: [] },
    ],
    time: '4h ago',
  },
  {
    id: 'p3', communityId: 'c3', authorId: 'u3',
    text: 'Our ROS-based autonomous bot just won 2nd place at Inter-IIT Tech Meet! 🤖🏆 Huge shoutout to the entire team. Workshop on the architecture next week.',
    image: null,
    likes: 45, commentCount: 12,
    comments: [
      { id: 'cm5', authorId: 'u1', text: 'Congrats! Would love to attend the workshop.', time: '5h ago', likes: 4, replies: [] },
    ],
    time: '6h ago',
  },
  {
    id: 'p4', communityId: 'c4', authorId: 'u5',
    text: 'LAN party this Friday at Hostel 3 common room! 🎮 Bringing 2 projectors and the JBL speaker. Valorant tournament starts at 8pm. Prize pool: ₹2,000.',
    image: null,
    likes: 67, commentCount: 23,
    comments: [
      { id: 'cm6', authorId: 'u3', text: 'Let\'s gooo! Registering my squad', time: '1h ago', likes: 5, replies: [] },
      { id: 'cm7', authorId: 'u4', text: 'Can spectators come too?', time: '45m ago', likes: 1, replies: [
        { id: 'r3', authorId: 'u5', text: 'Absolutely! Everyone welcome', time: '30m ago' },
      ]},
    ],
    time: '8h ago',
  },
  {
    id: 'p5', communityId: 'c1', authorId: 'u2',
    text: 'Quick tip: If you\'re shooting in manual mode, try exposing for the highlights and recovering shadows in post. Works wonders with RAW files! 📸✨',
    image: null,
    likes: 31, commentCount: 4,
    comments: [
      { id: 'cm8', authorId: 'u1', text: 'Solid advice! I always overexpose by mistake lol', time: '2h ago', likes: 2, replies: [] },
    ],
    time: '1d ago',
  },
  {
    id: 'p6', communityId: 'c6', authorId: 'u4',
    text: '5K morning run tomorrow — meeting at Sports Complex gate at 5:45am. Pace will be around 6:00/km. All fitness levels welcome! 🏃‍♀️',
    image: null,
    likes: 15, commentCount: 3,
    comments: [
      { id: 'cm9', authorId: 'u2', text: 'I\'ll try to make it! Haven\'t run in weeks 😅', time: '3h ago', likes: 1, replies: [] },
    ],
    time: '10h ago',
  },
  {
    id: 'p7', communityId: 'c5', authorId: 'u5',
    text: 'New board game alert! 🎲 Just got Wingspan and Terraforming Mars. Friday game night will be epic. Snacks on me!',
    image: null,
    likes: 22, commentCount: 6,
    comments: [
      { id: 'cm10', authorId: 'u3', text: 'Terraforming Mars!! That\'s a 3-hour game minimum 😂', time: '5h ago', likes: 3, replies: [] },
    ],
    time: '12h ago',
  },
  {
    id: 'p8', communityId: 'c2', authorId: 'u4',
    text: 'Monsoon trek gear checklist for beginners:\n• Waterproof backpack cover\n• Quick-dry clothes (no cotton!)\n• Trekking sandals with grip\n• Poncho > Umbrella\n• Ziplock bags for electronics\n\nSave this post! 🌧️⛰️',
    image: null,
    likes: 38, commentCount: 9,
    comments: [
      { id: 'cm11', authorId: 'u1', text: 'Pinning this! Super helpful for first-timers', time: '1d ago', likes: 5, replies: [] },
    ],
    time: '1d ago',
  },
];

/* ── Community Events ── */
export const communityEvents = [
  {
    id: 'e1', communityId: 'c1', title: 'Golden Hour Photo Walk — Powai Lake',
    description: 'Meet at Hostel 12 gate. Bring your camera (DSLRs, mirrorless, even phones welcome). We\'ll walk along the lake and shoot the sunset.',
    date: '2026-09-14', time: '5:00 PM', location: 'Powai Lake Promenade',
    registrations: 18, maxCapacity: 30, organizer: 'u1',
  },
  {
    id: 'e2', communityId: 'c2', title: 'Rajmachi Fort Weekend Trek',
    description: '2-day trek to Rajmachi Fort via Lonavala. Includes camping, bonfire, and stargazing. ₹600/person covers transport and food.',
    date: '2026-09-20', time: '6:00 AM', location: 'Departure from Main Gate',
    registrations: 22, maxCapacity: 30, organizer: 'u2',
  },
  {
    id: 'e3', communityId: 'c3', title: 'ROS Workshop: Autonomous Navigation',
    description: 'Learn how we built our Inter-IIT winning robot. Hands-on session with ROS2, SLAM, and path planning. Bring your laptop.',
    date: '2026-09-16', time: '3:00 PM', location: 'Tinkering Lab, KReSIT',
    registrations: 35, maxCapacity: 50, organizer: 'u3',
  },
  {
    id: 'e4', communityId: 'c4', title: 'Valorant LAN Tournament',
    description: '5v5 tournament with ₹2,000 prize pool. Teams of 5 required. Spectators welcome. Projectors and snacks provided.',
    date: '2026-09-12', time: '8:00 PM', location: 'Hostel 3 Common Room',
    registrations: 40, maxCapacity: 50, organizer: 'u5',
  },
  {
    id: 'e5', communityId: 'c6', title: 'Inter-Hostel 10K Challenge',
    description: 'Annual 10K run around campus. Medals for top 3 finishers in each category. Registration includes a race bib and refreshments.',
    date: '2026-09-28', time: '5:30 AM', location: 'Sports Complex',
    registrations: 64, maxCapacity: 100, organizer: 'u4',
  },
  {
    id: 'e6', communityId: 'c1', title: 'Lightroom Editing Masterclass',
    description: 'From import to export — learn color grading, masking, and batch editing. Bring your laptop with Lightroom installed.',
    date: '2026-09-22', time: '4:00 PM', location: 'LHC Room 101',
    registrations: 12, maxCapacity: 40, organizer: 'u2',
  },
];

/* ── Notifications ── */
export const notifications = [
  { id: 'n1', type: 'like', text: 'Maya Sen liked your post in Campus Shutterbugs', time: '5m ago', read: false },
  { id: 'n2', type: 'comment', text: 'Devansh Roy commented on your photo walk post', time: '15m ago', read: false },
  { id: 'n3', type: 'event', text: 'Rajmachi Fort Trek is in 3 days — don\'t forget to pack!', time: '1h ago', read: false },
  { id: 'n4', type: 'join', text: 'Priya Sharma joined Campus Shutterbugs', time: '2h ago', read: true },
  { id: 'n5', type: 'listing', text: 'Someone is interested in your Sony A6400 listing', time: '3h ago', read: true },
  { id: 'n6', type: 'event', text: 'ROS Workshop registration is now open!', time: '5h ago', read: true },
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
  { q: 'How do I find my campus?', a: 'When you sign up, select your college from the list. BunkNBorrow auto-detects your campus based on your college email domain. All listings and communities are filtered to your campus by default.' },
  { q: 'How do I join a community?', a: 'Go to the Communities section, browse or search for a community, and click the "Join" button. You\'ll be added instantly and can see the community feed, events, and members.' },
  { q: 'How do I create an event?', a: 'Inside any community you\'ve joined, go to the Events tab and click "Create Event." Fill in the title, description, date, time, location, and capacity. Your event will be visible to all community members.' },
  { q: 'How do I register for an event?', a: 'Find the event in the Events tab of a community or on the main Events page. Click "Register" to confirm your spot. You\'ll receive a confirmation and the event will appear in your events list.' },
  { q: 'How do Google Forms work here?', a: 'Community admins can attach Google Form links to events for registration, feedback, or surveys. When you click the registration button, it may redirect you to a Google Form for additional details.' },
  { q: 'How do meetings work?', a: 'Communities can schedule recurring meetings visible in the Events tab. Meeting details include time, location (or virtual link), and agenda. RSVP to let organizers know you\'re coming.' },
  { q: 'How do ratings work?', a: 'After every gear exchange, both the lender and borrower rate each other on a 5-star scale. Your average rating builds your trust score visible on your profile. Higher ratings mean more trust from other students.' },
  { q: 'How do I report a dead group link?', a: 'On any community card, click the "Report dead link" button. We\'ll review the link and update it. You can also suggest the correct link to speed up the fix.' },
  { q: 'How do I find internships/placements?', a: 'Check the dedicated Opportunities section in relevant communities. Companies and seniors post internship openings, referrals, and placement prep resources. Filter by deadline, company, or role.' },
  { q: 'How do notifications work?', a: 'You get notified for likes on your posts, comments and replies, event reminders, new community posts, and listing inquiries. Tap the bell icon in the navbar to see all notifications.' },
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
