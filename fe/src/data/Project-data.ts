import smartQueue from "../assets/images/projects/thumbnail/smart-queue.png";
import heronest from "../assets/images/projects/thumbnail/heronest.png";
import library from "../assets/images/projects/thumbnail/library-management-system.png";
import pateros from "../assets/images/projects/thumbnail/pateros-catholic-school.png";
import bathOfPaws from "../assets/images/projects/thumbnail/bath-of-paws.png";
import tavApp from "../assets/images/projects/thumbnail/tav-app.png";

import laptopSmartQueue from "../assets/images/projects/device-view/project-laptop-smart-queue.jpg";
import phoneSmartQueue from "../assets/images/projects/device-view/project-phone-smart-queue.jpg";
import laptopHeronest from "../assets/images/projects/device-view/project-laptop-heronest.jpg";
import laptopPateros from "../assets/images/projects/device-view/project-laptop-pcs.jpg";
import laptopBathOfPaws from "../assets/images/projects/device-view/project-laptop-bath-of-paws.jpg";
import laptopTavApp from "../assets/images/projects/device-view/project-laptop-tav.png";
import phone1TavApp from "../assets/images/projects/device-view/project-phone1-tav.jpg";
import phone2TavApp from "../assets/images/projects/device-view/project-phone2-tav.jpg";
import laptopHolaN from "../assets/images/projects/device-view/project-laptop-hola-n.png";

import { GithubBlack } from "@/assets/icons/Icons";

export type ProjectDevice = "laptop" | "phone";

export interface LocalizedText {
  en: string;
  fil: string;
}

export interface Project {
  slug: string;
  name: string;
  app: LocalizedText;
  description: LocalizedText;
  technology: { name: string }[];
  keyFeatures: { en: string[]; fil: string[] };
  year: number;
  devices: ProjectDevice[];
  image: string;
  laptopImage?: string;
  phoneImages?: string[];
  buttons: { label: LocalizedText; icon: typeof GithubBlack; url: string }[];
}

export const project: Project[] = [
  {
    slug: "hola-n",
    name: "Hola-N — Eau de Parfum",
    app: { en: "Website App", fil: "Aplikasyong Web" },
    description: {
      en: "A landing page and product catalog showcasing a curated collection of perfumes sold by a small home-based reselling business. Visitors can browse fragrance listings, add items to a persistent cart, and revisit later with their selections intact.",
      fil: "Isang landing page at product catalog na nagpapakita ng mga napiling pabango na ibinebenta ng isang maliit na home-based na negosyo. Maaaring mag-browse ang mga bisita ng listahan ng mga pabango, magdagdag ng item sa cart, at bumalik anumang oras nang buo pa rin ang kanilang mga napili.",
    },
    technology: [
      { name: "TypeScript" },
      { name: "React" },
      { name: "Tailwind CSS" },
      { name: "Vercel" },
    ],
    keyFeatures: {
      en: [
        "Curated perfume catalog with product details and pricing",
        "Add-to-cart functionality with local storage persistence",
        "Cart state survives page reloads and repeat visits",
        "Responsive landing page design for browsing on any device",
        "Deployed and publicly accessible via Vercel",
      ],
      fil: [
        "Listahan ng mga napiling pabango na may detalye at presyo",
        "Add-to-cart na gamit ang local storage para hindi mawala ang laman ng cart",
        "Nananatili ang laman ng cart kahit mag-reload o bumalik sa site",
        "Responsive na disenyo para magamit sa anumang device",
        "Naka-deploy at bukas sa publiko gamit ang Vercel",
      ],
    },
    year: 2026,
    devices: ["laptop"],
    image: laptopHolaN,
    laptopImage: laptopHolaN,
    buttons: [
      {
        label: { en: "Visit Site", fil: "Bisitahin ang Site" },
        icon: GithubBlack,
        url: "https://hola-n.vercel.app/#top",
      },
    ],
  },

  {
    slug: "tav-restobar",
    name: "Tav — Restobar Management System",
    app: { en: "Web & Mobile App", fil: "Web at Mobile na Aplikasyon" },
    description: {
      en: "A full-stack reservation and order management system built for Tavern Asia Resto Bar, Parañaque City. Moves operations from walk-in to a reservation-only model, with QR-based verification and real-time order tracking across web and mobile.",
      fil: "Isang full-stack na sistema ng reservation at order management na ginawa para sa Tavern Asia Resto Bar sa Parañaque City. Inilipat nito ang operasyon mula sa walk-in patungo sa reservation-only na modelo, may QR-based na verification at real-time na order tracking sa web at mobile.",
    },
    technology: [
      { name: "TypeScript" },
      { name: "Node.js" },
      { name: "PostgreSQL" },
      { name: "Supabase" },
      { name: "React Native" },
      { name: "React" },
      { name: "Expo" },
    ],
    keyFeatures: {
      en: [
        "QR-based reservation and order verification for entry and cashier",
        "Real-time order and reservation status tracking via Supabase",
        "Role-based web dashboard for admin, cashier, and security staff",
        "Customer mobile app for reservations, menu browsing, and ordering",
        "PDF/Excel export for sales and reservation reports",
      ],
      fil: [
        "QR-based na verification para sa reservation at order sa entrance at cashier",
        "Real-time na pagsubaybay sa order at reservation gamit ang Supabase",
        "Web dashboard na naka-ayon sa role para sa admin, cashier, at security staff",
        "Mobile app ng customer para sa reservation, pagtingin ng menu, at pag-order",
        "PDF/Excel export para sa mga ulat ng benta at reservation",
      ],
    },
    year: 2025,
    devices: ["laptop", "phone"],
    image: tavApp,
    phoneImages: [phone1TavApp, phone2TavApp],
    laptopImage: laptopTavApp,
    buttons: [
      {
        label: { en: "View Soarce - Web", fil: "Tingnan ang Source - Web" },
        icon: GithubBlack,
        url: "https://github.com/shamKirzon/tavern-website",
      },
      {
        label: { en: "View Soarce - Mobile", fil: "Tingnan ang Source - Mobile" },
        icon: GithubBlack,
        url: "https://github.com/shamKirzon/tavern-mobile",
      },
    ],
  },

  {
    slug: "smart-queue",
    name: "Smart Queue",
    app: { en: "Mobile App", fil: "Aplikasyong Mobile" },
    description: {
      en: "A real-time mobile queue management system for banks and service centers, built with cross-platform support and WebSocket integration for seamless status updates.",
      fil: "Isang real-time na mobile queue management system para sa mga bangko at service center, gawa gamit ang cross-platform support at WebSocket integration para sa maayos na pag-update ng status.",
    },
    technology: [
      { name: "TypeScript" },
      { name: "Node.js" },
      { name: "Express" },
      { name: "PostgreSQL" },
      { name: "Expo" },
    ],
    keyFeatures: {
      en: [
        "Real-time queue position updates over WebSocket",
        "Cross-platform mobile build with Expo",
        "Digital ticket issuing and status tracking",
        "Counter management for multiple service windows",
      ],
      fil: [
        "Real-time na update ng posisyon sa pila gamit ang WebSocket",
        "Cross-platform na mobile build gamit ang Expo",
        "Pag-isyu ng digital ticket at pagsubaybay ng status",
        "Pamamahala ng counter para sa maraming service window",
      ],
    },
    year: 2025,
    devices: ["laptop", "phone"],
    image: smartQueue,
    phoneImages: [phoneSmartQueue],
    laptopImage: laptopSmartQueue,
    buttons: [
      {
        label: { en: "View Soarce", fil: "Tingnan ang Source" },
        icon: GithubBlack,
        url: "https://github.com/shamKirzon/smart-queue",
      },
    ],
  },
  {
    slug: "heronest",
    name: "Heronest",
    app: { en: "Website App", fil: "Aplikasyong Web" },
    description: {
      en: "Developed a university theatre seat reservation system that allows users to view available seats, make reservations, and automatically generate digital tickets.",
      fil: "Gumawa ng sistema ng seat reservation para sa theatre ng unibersidad na nagbibigay-daan sa mga user na tingnan ang mga bakanteng upuan, mag-reserve, at awtomatikong makakuha ng digital ticket.",
    },
    technology: [
      { name: "Typescript" },
      { name: "Svelte" },
      { name: "C#" },
      { name: ".NET" },
      { name: "Postgres" },
    ],
    keyFeatures: {
      en: [
        "Interactive seat map with live availability",
        "Automatic digital ticket generation",
        "Reservation handling for university events",
        "Separate access levels for staff and students",
      ],
      fil: [
        "Interactive na seat map na may live na availability",
        "Awtomatikong paggawa ng digital ticket",
        "Pamamahala ng reservation para sa mga event ng unibersidad",
        "Hiwalay na access level para sa staff at estudyante",
      ],
    },
    year: 2024,
    devices: ["laptop"],
    image: heronest,
    laptopImage: laptopHeronest,
    buttons: [
      {
        label: { en: "View Soarce", fil: "Tingnan ang Source" },
        icon: GithubBlack,
        url: "https://github.com/shamKirzon/heronest-be",
      },
    ],
  },
  {
    slug: "pateros-catholic-school",
    name: "Pateros Catholic School",
    app: { en: "Website App", fil: "Aplikasyong Web" },
    description: {
      en: "Enrollment system integrated with a school website, featuring a full admin dashboard for managing students, courses, and academic records.",
      fil: "Sistema ng enrollment na kaugnay ng website ng paaralan, may kumpletong admin dashboard para sa pamamahala ng mga estudyante, kurso, at academic record.",
    },
    technology: [
      { name: "TypeScript" },
      { name: "Svelte" },
      { name: "PHP" },
      { name: "PostgreSQL" },
    ],
    keyFeatures: {
      en: [
        "Online student enrollment workflow",
        "Admin dashboard for students, courses, and records",
        "Academic record management per school year",
        "Public school website integrated with the system",
      ],
      fil: [
        "Online na proseso ng pag-enroll ng estudyante",
        "Admin dashboard para sa mga estudyante, kurso, at record",
        "Pamamahala ng academic record kada school year",
        "Pampublikong website ng paaralan na kaugnay ng sistema",
      ],
    },
    year: 2024,
    devices: ["laptop"],
    image: pateros,
    laptopImage: laptopPateros,
    buttons: [
      {
        label: { en: "View Soarce", fil: "Tingnan ang Source" },
        icon: GithubBlack,
        url: "https://github.com/shamKirzon/enrollment-system-backend",
      },
    ],
  },
  {
    slug: "library-management-system",
    name: "Library Management System",
    app: { en: "Desktop App", fil: "Aplikasyong Desktop" },
    description: {
      en: "A library management system that simplifies book tracking, borrower management, and due date monitoring.",
      fil: "Isang library management system na nagpapadali sa pagsubaybay ng libro, pamamahala ng borrower, at pagbantay sa due date.",
    },
    technology: [
      { name: "Java" },
      { name: "Swing (UI)" },
      { name: "JDBC" },
      { name: "MySQL" },
    ],
    keyFeatures: {
      en: [
        "Book cataloging and inventory tracking",
        "Borrower registration and borrowing history",
        "Due date monitoring with overdue flagging",
        "Desktop interface built with Java Swing",
      ],
      fil: [
        "Pag-catalog ng libro at pagsubaybay ng imbentaryo",
        "Pagpaparehistro ng borrower at history ng paghiram",
        "Pagbantay ng due date na may overdue flagging",
        "Desktop interface na ginawa gamit ang Java Swing",
      ],
    },
    year: 2024,
    devices: ["laptop"],
    image: library,
    buttons: [
      {
        label: { en: "View Soarce", fil: "Tingnan ang Source" },
        icon: GithubBlack,
        url: "https://github.com/shamKirzon/library-management-system",
      },
    ],
  },
  {
    slug: "bath-of-paws",
    name: "Bath of Paws",
    app: { en: "Website App", fil: "Aplikasyong Web" },
    description: {
      en: "A frontend pet website built using basic web development tools, focusing on layout, styling, and interactive elements to enhance user experience.",
      fil: "Isang frontend na website para sa alagang hayop, gawa gamit ang mga pangunahing web development tool, nakatuon sa layout, styling, at interactive na elemento para mapahusay ang karanasan ng user.",
    },
    technology: [{ name: "JavaScript" }, { name: "HTML" }, { name: "CSS" }],
    keyFeatures: {
      en: [
        "Responsive pet grooming service pages",
        "Service catalog with detailed listings",
        "Interactive booking and inquiry sections",
        "Custom hover states and scroll interactions",
      ],
      fil: [
        "Responsive na mga pahina ng serbisyo sa pet grooming",
        "Katalogo ng serbisyo na may detalyadong listahan",
        "Interactive na seksyon para sa booking at inquiry",
        "Custom na hover state at scroll interaction",
      ],
    },
    year: 2024,
    devices: ["laptop"],
    image: bathOfPaws,
    laptopImage: laptopBathOfPaws,
    buttons: [
      {
        label: { en: "View Soarce", fil: "Tingnan ang Source" },
        icon: GithubBlack,
        url: "https://github.com/shamKirzon/bath-of-paws",
      },
    ],
  },
];
