import { Accolade, Award, Competency, ProfileStat, ServiceRole, Reference, PersonalAttribute } from './types';
import { Music, ShieldCheck, Car, BriefcaseMedical } from 'lucide-react';

// Source: assets/c.v
// Updated: 2026-02-11

export const CONTACT_DETAILS = {
  phone: "021 210 9665",
  email: "Grantshane411@gmail.com",
  location: "Paraparaumu, Wellington Region",
  linkedin: "" // Add if available
};

export const PROFILE_STATS: ProfileStat[] = [
  { label: 'NZDF Service', value: '30+ Years' },
  { label: 'Security Clearance', value: 'SECRET', highlight: true }, // Vetting held previously
  { label: 'Camp Security', value: 'Trentham' },
  { label: 'Operations', value: 'SOP-Driven' },
  { label: 'Availability', value: '24/7 Shift' },
  { label: 'Resilience', value: 'High' },
];

export const COMPETENCIES: Competency[] = [
  {
    id: '1',
    icon: 'shield', // Material Icon name
    title: 'Access Control & Perimeter Security',
    description: 'Military-grade protection of live installations. Expert in SOP-driven entry protocols, vehicle searches, and maintaining secure boundaries.'
  },
  {
    id: '2',
    icon: 'visibility',
    title: 'Surveillance & Monitoring',
    description: 'Proactive monitoring of CCTV, electronic alarm systems, and foot patrols. skilled in incident recognition and rapid documentation.'
  },
  {
    id: '3',
    icon: 'psychology',
    title: 'De-escalation & Incident Response',
    description: 'Proven ability to manage distressed or confrontational individuals. Calm under pressure, emotionally controlled, and decisive in emergencies.'
  },
  {
    id: '4',
    icon: 'local_police', // or 'security'
    title: 'VIP Protection & Transport',
    description: 'Specialized driver for senior officials. High standards of discretion, punctuality, and route planning for secure transport operations.'
  },
  {
    id: '5',
    icon: 'description',
    title: 'Secure Asset Handling',
    description: 'Trusted custody of keys, restricted information, and sensitive assets. Rigorous adherence to chain-of-custody and security vetting protocols.'
  },
  {
    id: '6',
    icon: 'gavel',
    title: 'Independent Authority',
    description: 'Comfortable operating unsupervised within delegated authority. Strong ethical standards and reliable decision-making in high-stress environments.'
  }
];

export const SERVICE_RECORD: ServiceRole[] = [
  {
    id: '1',
    role: 'Security Guard',
    translation: 'New Zealand Defence Force',
    location: 'Trentham Military Camp',
    years: '2012 – 2020',
    description: 'Protective security operations for a live NZDF military installation, operating under SOP-driven authority and unsupervised shift conditions.',
    tags: [
      'Provided 24/7 physical security for a live NZDF military installation.',
      'Operated as primary access-control authority at main entry points.',
      'Conducted foot and mobile patrols across restricted buildings and training areas.',
      'Monitored CCTV, alarms, and electronic access systems.',
      'Responded to after-hours incidents, alarms, and emergency call-outs.',
      'Managed visitor, contractor, and staff access in accordance with SOPs.',
      'Maintained secure custody of keys, sensitive information, and restricted areas.',
      'Performed reception security and front-counter duties requiring professional public engagement.',
      'Supported escalation procedures and emergency responses as required.'
    ]
  },
  {
    id: '2',
    role: 'Lance Corporal',
    translation: 'Royal New Zealand Army Logistic Regiment',
    location: 'Various Locations',
    years: '2004 – 2010',
    description: 'Defence logistics and VIP transport duties requiring discretion, procedural compliance, and operational reliability.',
    tags: [
      'Delivered logistical support operations within Defence environments.',
      'Assigned to VIP Support Driver duties.',
      'Secure transport of senior officials and dignitaries.',
      'High standards of discretion, punctuality, and presentation.',
      'Maintained and prepared NZDF VIP vehicle fleet.',
      'Operated under strict procedural and behavioural standards.',
      'Completed multiple Defence training courses through TRSC / WRSC.'
    ]
  },
  {
    id: '3',
    role: 'Territorial Force',
    translation: 'Royal New Zealand Infantry Regiment & Engineers',
    location: 'Various Locations',
    years: '1990 – 2004',
    description: 'Early Defence service across infantry, engineering, and supply units with exposure to controlled weapons, explosives, and field operations.',
    tags: [
      'Served across multiple operational and support units.',
      'Support Fire Machine Gun Platoon.',
      'Mortar and 84mm weapons systems.',
      'Reconnaissance Platoon.',
      'Assault Pioneers (2 Engineer Regiment).',
      'Field engineering & demolitions.',
      'NBC procedures.',
      'FIBUA / SIBUA.',
      'RHIB operations.',
      'Attached to Quartermaster Platoon, acting in supply and stores roles.'
    ]
  }
];

export const CITATIONS: Award[] = [
  {
    id: '1',
    title: 'NZ Certificate Level 4',
    year: 'Music',
    description: 'Southern Institute of Technology',
    icon: Music
  },
  {
    id: '2',
    title: 'NZDF Security Vetting',
    year: 'SECRET',
    description: 'Clearance level previously held and verified.',
    icon: ShieldCheck
  },
  {
    id: '3',
    title: 'Driver Licence',
    year: 'Class 1',
    description: 'Full Clean New Zealand Driver Licence.',
    icon: Car
  },
  {
    id: '4',
    title: 'First Aid Certified',
    year: 'Current',
    description: 'Maintained throughout security tenure.',
    icon: BriefcaseMedical
  }
];

export const REFERENCES: Reference[] = [
  {
    name: "Antonio Mercuri",
    role: "Tutor — Southern Institute of Technology",
    contact: "027 418 5486 | Antonio.mercuri@sit.ac.nz"
  },
  {
    name: "Rick Henderson",
    role: "Band Master — 7th Battalion",
    contact: "027 239 0884 | Rick@rhgc.co.nz"
  }
];
export const PERSONAL_ATTRIBUTES: PersonalAttribute[] = [
  { title: "Calm Under Pressure", subtitle: "Emotionally Controlled" },
  { title: "Discipline", subtitle: "Reliable & Punctual" },
  { title: "Integrity", subtitle: "High Ethical Standards" },
  { title: "Resilience", subtitle: "Physically Capable" },
  { title: "Communication", subtitle: "Respectful & Clear" },
  { title: "Authority", subtitle: "Independent Operations" }
];

// SVG Data URIs for backgrounds (Softened)
export const DIGITAL_CAMO_URI = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%232c3035' fill-opacity='0.15'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

export const CONCRETE_TEXTURE_URI = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E";

export const ACCOLADES: Accolade[] = [
  { id: 'territorial', title: 'Territorial Force', src: '/accolades/territorial.webp' },
  { id: 'ccci', title: 'CCCI Coin', src: '/accolades/ccci.webp' },
  { id: 'chief', title: 'Chief of Army Coin', src: '/accolades/chief.webp' },
  { id: 'ngati', title: 'Ngāti Tūmatauenga', src: '/accolades/ngati.webp' },
  { id: 'elizabeth', title: 'Elizabeth Medal', src: '/accolades/elizabeth.webp' },
] as const;