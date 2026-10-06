import { ServiceCategory, WorkerProfile, JobPost, Booking, User } from '../types';

export const INITIAL_CATEGORIES: ServiceCategory[] = [
  {
    id: 'cat-1',
    slug: 'plumbing',
    name: 'Plumbing',
    description: 'Pipe leaks, faucet repair, drain unclogging and boiler service',
    iconName: 'Wrench',
    workerCount: 28,
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat-2',
    slug: 'electrical',
    name: 'Electrical',
    description: 'Wiring, fixtures, fuse box upgrades, and emergency outages',
    iconName: 'Lightning',
    workerCount: 22,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat-3',
    slug: 'cleaning',
    name: 'Home Cleaning',
    description: 'Deep cleaning, post-renovation, windows, and sanitization',
    iconName: 'Sparkle',
    workerCount: 35,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat-4',
    slug: 'painting',
    name: 'Painting',
    description: 'Interior, exterior, trim refinishing, and dry wall patching',
    iconName: 'PaintBrush',
    workerCount: 19,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat-5',
    slug: 'assembly',
    name: 'Furniture Assembly',
    description: 'Flat-pack furniture, IKEA assemblies, shelving, and mounting',
    iconName: 'Hammer',
    workerCount: 16,
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat-6',
    slug: 'appliance',
    name: 'Appliance Repair',
    description: 'Washing machines, dishwashers, refrigerators, and ovens',
    iconName: 'Gear',
    workerCount: 14,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_WORKERS: WorkerProfile[] = [
  {
    id: 'worker-1',
    userId: 'user-worker-1',
    fullName: 'Marcus Vance',
    headline: 'Certified Master Plumber & Heating Specialist',
    category: 'Plumbing',
    specialties: ['Pipe Leaks', 'Water Heaters', 'Drain Snaking', 'Bathroom Remodels'],
    hourlyRate: 45,
    rating: 4.92,
    reviewCount: 46,
    completedJobsCount: 128,
    experienceYears: 12,
    location: 'Centrs',
    district: 'Centrs & Vecrīga',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80',
    bio: 'Licensed master plumber serving Rīga for over a decade. Known for clean job sites, upfront itemized estimates, and fast emergency response across Centrs, Vecrīga, and Āgenskalns.',
    isVerified: true,
    verificationStatus: 'verified',
    availableToday: true,
    workingHours: 'Mon - Sat: 08:00 - 19:00',
    services: [
      {
        id: 's-101',
        name: 'Emergency Pipe Leak Detection & Repair',
        description: 'Rapid diagnostic inspection, pipe replacement or clamp repair with pressure testing.',
        price: 75,
        priceType: 'fixed',
        estimatedDuration: '1 - 2 hours'
      },
      {
        id: 's-102',
        name: 'Faucet & Sink Installation',
        description: 'Complete removal of old fixture and precision installation with leak inspection.',
        price: 55,
        priceType: 'fixed',
        estimatedDuration: '1 hour'
      },
      {
        id: 's-103',
        name: 'Main Drain Cleaning & Snaking',
        description: 'Mechanical clearing of heavy blockages with high torque equipment.',
        price: 85,
        priceType: 'fixed',
        estimatedDuration: '1 - 2 hours'
      }
    ],
    portfolioImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&q=80'
    ],
    reviews: [
      {
        id: 'rev-1',
        customerId: 'cust-1',
        customerName: 'Sarah Lindqvist',
        customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        qualityRating: 5,
        punctualityRating: 5,
        communicationRating: 5,
        comment: 'Marcus arrived in Centrs within 35 minutes when the kitchen pipe started spraying. Repaired cleanly and charged exactly what was quoted in Euros.',
        serviceName: 'Emergency Pipe Leak Detection',
        date: '3 days ago'
      },
      {
        id: 'rev-2',
        customerId: 'cust-2',
        customerName: 'Arturs Bērziņš',
        customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        qualityRating: 5,
        punctualityRating: 5,
        communicationRating: 5,
        comment: 'Very professional, polite, and left the bathroom cleaner than it was before. Excellent master pro in Riga.',
        serviceName: 'Faucet & Sink Installation',
        date: '1 week ago'
      }
    ]
  },
  {
    id: 'worker-2',
    userId: 'user-worker-2',
    fullName: 'Elena Rostova',
    headline: 'Certified Electrician & Smart Home Technician',
    category: 'Electrical',
    specialties: ['Panel Upgrades', 'Short Circuit Diagnostics', 'EV Chargers', 'Lighting Design'],
    hourlyRate: 50,
    rating: 4.96,
    reviewCount: 38,
    completedJobsCount: 94,
    experienceYears: 8,
    location: 'Teika',
    district: 'Teika & Purvciems',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    bio: 'Fully certified electrical engineer based in Teika. Specializing in domestic safety inspections, fuse panel modernization, and lighting across Riga.',
    isVerified: true,
    verificationStatus: 'verified',
    availableToday: true,
    workingHours: 'Mon - Fri: 08:30 - 18:00',
    services: [
      {
        id: 's-201',
        name: 'Electrical Diagnostics & Breaker Tripping',
        description: 'Locate parasitic loads, neutral faults, or bad breakers.',
        price: 70,
        priceType: 'fixed',
        estimatedDuration: '1 - 2 hours'
      },
      {
        id: 's-202',
        name: 'Ceiling Fan & Chandelier Installation',
        description: 'Mounting, electrical box reinforcement, and dimming switch setup.',
        price: 55,
        priceType: 'fixed',
        estimatedDuration: '1.5 hours'
      }
    ],
    portfolioImages: [
      'https://images.unsplash.com/photo-1558441719-8b4e0c81d56b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
    ],
    reviews: [
      {
        id: 'rev-3',
        customerId: 'cust-3',
        customerName: 'Jānis Kalniņš',
        customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        qualityRating: 5,
        punctualityRating: 5,
        communicationRating: 5,
        comment: 'Elena discovered a burnt wire in our distribution panel in Teika. Extremely competent and safety-focused.',
        serviceName: 'Electrical Diagnostics',
        date: '5 days ago'
      }
    ]
  },
  {
    id: 'worker-3',
    userId: 'user-worker-3',
    fullName: 'David Chen',
    headline: 'Eco-Friendly Residential & Deep Cleaning Pro',
    category: 'Cleaning',
    specialties: ['Move-Out Cleans', 'Post-Construction', 'Window Polishing', 'Allergen Removal'],
    hourlyRate: 32,
    rating: 4.82,
    reviewCount: 52,
    completedJobsCount: 160,
    experienceYears: 6,
    location: 'Āgenskalns',
    district: 'Āgenskalns & Torņakalns',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    bio: 'Dedicated cleaning pro serving Pārdaugava, Āgenskalns and Centrs. Non-toxic eco-supplies for full move-in/move-out cleans.',
    isVerified: true,
    verificationStatus: 'verified',
    availableToday: false,
    workingHours: 'Mon - Sun: 09:00 - 20:00',
    services: [
      {
        id: 's-301',
        name: '2-Bedroom Apartment Deep Clean',
        description: 'Full kitchen degrease, bathroom scaling removal, baseboards and interior windows.',
        price: 120,
        priceType: 'fixed',
        estimatedDuration: '4 hours'
      }
    ],
    portfolioImages: [
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80'
    ],
    reviews: []
  },
  {
    id: 'worker-4',
    userId: 'user-worker-4',
    fullName: 'Sarah Jenkins',
    headline: 'Architectural Finish & Interior Wall Painter',
    category: 'Painting',
    specialties: ['Accent Walls', 'Trim & Baseboards', 'Plaster Restoration', 'Cabinet Refinishing'],
    hourlyRate: 38,
    rating: 4.88,
    reviewCount: 31,
    completedJobsCount: 75,
    experienceYears: 7,
    location: 'Mežaparks',
    district: 'Mežaparks & Sarkandaugava',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
    bio: 'Precision interior painter in Mežaparks and northern Riga. Smooth surface preparation, zero paint drips guarantee.',
    isVerified: true,
    verificationStatus: 'verified',
    availableToday: true,
    workingHours: 'Mon - Fri: 08:00 - 17:00',
    services: [
      {
        id: 's-401',
        name: 'Single Room Painting (Up to 20 sqm)',
        description: 'Includes wall prep, caulking, two coats of premium paint.',
        price: 175,
        priceType: 'fixed',
        estimatedDuration: '1 day'
      }
    ],
    portfolioImages: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80'
    ],
    reviews: []
  },
  {
    id: 'worker-5',
    userId: 'user-worker-5',
    fullName: 'Thomas Miller',
    headline: 'Precision Furniture Assembly & Custom Mounting',
    category: 'Furniture Assembly',
    specialties: ['IKEA Furniture', 'TV Wall Mounts', 'Shelving Units', 'Wardrobes'],
    hourlyRate: 35,
    rating: 4.79,
    reviewCount: 29,
    completedJobsCount: 88,
    experienceYears: 5,
    location: 'Imanta',
    district: 'Imanta & Zolitūde',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80',
    bio: 'Meticulous furniture assembler serving Imanta, Zolitūde and all Riga districts. Professional laser alignment and anchors.',
    isVerified: true,
    verificationStatus: 'verified',
    availableToday: true,
    workingHours: 'Mon - Sun: 08:00 - 21:00',
    services: [
      {
        id: 's-501',
        name: 'Large Wardrobe Assembly (PAX / 3-Door)',
        description: 'Complete frame assembly, door alignment, interior drawers and shelving.',
        price: 75,
        priceType: 'fixed',
        estimatedDuration: '2 - 3 hours'
      }
    ],
    portfolioImages: [],
    reviews: []
  },
  {
    id: 'worker-6',
    userId: 'user-worker-6',
    fullName: 'Carlos Gomez',
    headline: 'Plumbing & Emergency Drainage Tech',
    category: 'Plumbing',
    specialties: ['Boilers', 'Clogged Toilets', 'Water Meters'],
    hourlyRate: 38,
    rating: 4.5,
    reviewCount: 6,
    completedJobsCount: 14,
    experienceYears: 3,
    location: 'Pļavnieki',
    district: 'Pļavnieki & Purvciems',
    avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80',
    bio: 'Independent technician located in Pļavnieki applying for verified badge on Local Service Finder platform.',
    isVerified: false,
    verificationStatus: 'pending',
    availableToday: false,
    workingHours: 'Mon - Fri: 09:00 - 18:00',
    services: [
      {
        id: 's-601',
        name: 'Unclog Drain',
        description: 'Standard bathroom drain clearing.',
        price: 45,
        priceType: 'fixed',
        estimatedDuration: '1 hour'
      }
    ],
    portfolioImages: [],
    reviews: []
  }
];

export const INITIAL_JOB_POSTS: JobPost[] = [
  {
    id: 'job-1',
    customerId: 'cust-101',
    customerName: 'Alex Carter',
    customerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    title: 'Emergency: Burst pipe under kitchen sink flooding cabinet',
    category: 'Plumbing',
    district: 'Centrs',
    budgetMin: 70,
    budgetMax: 130,
    urgency: 'urgent',
    description: 'The cold water intake pipe below the dual sink ruptured 20 minutes ago on Dzirnavu iela. Main valve is shut off, need emergency repair today to restore water for our family.',
    images: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80'
    ],
    createdAt: '2 hours ago',
    status: 'open',
    proposals: [
      {
        id: 'prop-1',
        jobId: 'job-1',
        workerId: 'worker-1',
        workerName: 'Marcus Vance',
        workerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
        workerCategory: 'Plumbing',
        workerRating: 4.92,
        workerCompletedJobs: 128,
        proposedPrice: 95,
        estimatedTime: 'Can arrive in 35 mins',
        message: 'Hello Alex, I am in Centrs right now on Brīvības iela with PEX tubing and brass fittings. Can fix this within an hour.',
        createdAt: '1 hour ago',
        status: 'pending'
      }
    ]
  },
  {
    id: 'job-2',
    customerId: 'cust-102',
    customerName: 'Maya Lin',
    customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    title: 'Need 2 ceiling fans installed and 3 smart dimmer switches fitted',
    category: 'Electrical',
    district: 'Teika',
    budgetMin: 80,
    budgetMax: 140,
    urgency: 'this_week',
    description: 'We purchased 2 ceiling fans with light kits for apartment in Teika. Need professional assembly, secure junction box mounting and switch wiring.',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
    ],
    createdAt: '5 hours ago',
    status: 'open',
    proposals: [
      {
        id: 'prop-2',
        jobId: 'job-2',
        workerId: 'worker-2',
        workerName: 'Elena Rostova',
        workerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        workerCategory: 'Electrical',
        workerRating: 4.96,
        workerCompletedJobs: 94,
        proposedPrice: 110,
        estimatedTime: 'Available Thursday morning',
        message: 'Hi Maya, I am based right here in Teika. I carry heavy duty junction braces and am happy to install both fans and switches.',
        createdAt: '3 hours ago',
        status: 'pending'
      }
    ]
  },
  {
    id: 'job-3',
    customerId: 'cust-103',
    customerName: 'Robert Vance',
    customerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    title: 'Move-in deep cleaning for empty 3-room apartment',
    category: 'Cleaning',
    district: 'Āgenskalns',
    budgetMin: 100,
    budgetMax: 180,
    urgency: 'flexible',
    description: 'Moving into an 85 sqm flat on Kalnciema iela next weekend. Needs thorough bathroom descaling, oven degreasing, and window frames cleaned.',
    images: [],
    createdAt: '1 day ago',
    status: 'open',
    proposals: []
  },
  {
    id: 'job-4',
    customerId: 'cust-104',
    customerName: 'Dina Krūmiņa',
    customerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    title: 'Assemble 3-door IKEA PAX wardrobe with interior drawers',
    category: 'Furniture Assembly',
    district: 'Imanta',
    budgetMin: 65,
    budgetMax: 100,
    urgency: 'this_week',
    description: 'Flat packs are delivered in our apartment in Imanta. Need an experienced hand to build the frame, attach hinged mirror doors, and install soft-close drawers.',
    images: [],
    createdAt: '1 day ago',
    status: 'open',
    proposals: []
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b-901',
    workerId: 'worker-1',
    workerName: 'Marcus Vance',
    workerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    workerCategory: 'Plumbing',
    customerId: 'cust-current',
    customerName: 'Alex Carter',
    serviceName: 'Emergency Pipe Leak Detection & Repair',
    date: 'Tomorrow, Oct 7',
    timeSlot: '10:00 - 12:00',
    address: 'Dzirnavu iela 67, Apt 3B, Centrs, Rīga',
    notes: 'Please check the water pressure valve as well.',
    estimatedPrice: 75,
    status: 'confirmed',
    createdAt: 'Today',
    hasReview: false
  },
  {
    id: 'b-902',
    workerId: 'worker-2',
    workerName: 'Elena Rostova',
    workerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    workerCategory: 'Electrical',
    customerId: 'cust-current',
    customerName: 'Alex Carter',
    serviceName: 'Ceiling Fan & Chandelier Installation',
    date: 'Last week, Sep 28',
    timeSlot: '14:00 - 16:00',
    address: 'Dzirnavu iela 67, Apt 3B, Centrs, Rīga',
    notes: 'Living room ceiling lighting setup.',
    estimatedPrice: 55,
    status: 'completed',
    createdAt: '1 week ago',
    hasReview: false
  }
];

export const CURRENT_USER_PROFILES: Record<string, User> = {
  guest: {
    id: 'user-guest',
    name: 'Guest Visitor',
    email: 'guest@example.com',
    role: 'guest',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
  },
  customer: {
    id: 'cust-current',
    name: 'Alex Carter',
    email: 'alex.carter@home.lv',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    phone: '+371 20 123 456',
    address: 'Dzirnavu iela 67, Apt 3B, Centrs, Rīga'
  },
  worker: {
    id: 'worker-1',
    name: 'Marcus Vance',
    email: 'marcus.vance@proplumber.lv',
    role: 'worker',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    phone: '+371 29 888 777',
    address: 'Brīvības iela 112, Centrs, Rīga'
  },
  admin: {
    id: 'user-admin',
    name: 'Eren Ozkan (Team MORPH)',
    email: 'eren.ozkan@localservicefinder.lv',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  }
};
