// Thumbnail
import smartQueue from "../assets/images/projects/thumbnail/smart-queue.png";
import heronest from "../assets/images/projects/thumbnail/heronest.png";
import library from "../assets/images/projects/thumbnail/library-management-system.png";
import pateros from "../assets/images/projects/thumbnail/pateros-catholic-school.png";
import bathOfPaws from "../assets/images/projects/thumbnail/bath-of-paws.png";
import tavApp from "../assets/images/projects/thumbnail/tav-app.png";

// Device View
import laptopSmartQueue from "../assets/images/projects/device-view/project-laptop-smart-queue.jpg";
import phoneSmartQueue from "../assets/images/projects/device-view/project-phone-smart-queue.jpg";
import laptopHeronest from "../assets/images/projects/device-view/project-laptop-heronest.jpg";
import laptopPateros from "../assets/images/projects/device-view/project-laptop-pcs.jpg";
import laptopBathOfPaws from "../assets/images/projects/device-view/project-laptop-bath-of-paws.jpg";
import laptopTavApp from "../assets/images/projects/device-view/project-laptop-tav.png";
import phone1TavApp from "../assets/images/projects/device-view/project-phone1-tav.jpg";
import phone2TavApp from "../assets/images/projects/device-view/project-phone2-tav.jpg";
import laptopHolaN from "../assets/images/projects/device-view/project-laptop-hola-n.png";

// import laptopLibrary from "../assets/images/projects/device-view/project-phone-smart-queue.jpg";

//Others;
import { GithubBlack } from "@/assets/icons/Icons";

export type ProjectDevice = "laptop" | "phone";

export interface Project {
  slug: string;
  name: string;
  app: string;
  description: string;
  technology: { name: string }[];
  keyFeatures: string[];
  year: number;
  devices: ProjectDevice[];
  image: string;
  laptopImage?: string;
  phoneImages?: string[];
  buttons: { label: string; icon: typeof GithubBlack; url: string }[];
}

export const project: Project[] = [
  {
    slug: "hola-n",
    name: "Hola-N — Eau de Parfum",
    app: "Website App",
    description:
      "A landing page and product catalog showcasing a curated collection of perfumes sold by a small home-based reselling business. Visitors can browse fragrance listings, add items to a persistent cart, and revisit later with their selections intact.",
    technology: [
      { name: "TypeScript" },
      { name: "React" },
      { name: "Tailwind CSS" },
      { name: "Vercel" },
    ],
    keyFeatures: [
      "Curated perfume catalog with product details and pricing",
      "Add-to-cart functionality with local storage persistence",
      "Cart state survives page reloads and repeat visits",
      "Responsive landing page design for browsing on any device",
      "Deployed and publicly accessible via Vercel",
    ],
    year: 2026,
    devices: ["laptop"],
    image: laptopHolaN,
    laptopImage: laptopHolaN,
    buttons: [
      {
        label: "Visit Site",
        icon: GithubBlack,
        url: "https://hola-n.vercel.app/#top",
      },
    ],
  },

  {
    slug: "tav-restobar",
    name: "Tav — Restobar Management System",
    app: "Web & Mobile App",
    description:
      "A full-stack reservation and order management system built for Tavern Asia Resto Bar, Parañaque City. Moves operations from walk-in to a reservation-only model, with QR-based verification and real-time order tracking across web and mobile.",
    technology: [
      { name: "TypeScript" },
      { name: "Node.js" },
      { name: "PostgreSQL" },
      { name: "Supabase" },
      { name: "React Native" },
      { name: "React" },
      { name: "Expo" },
    ],
    keyFeatures: [
      "QR-based reservation and order verification for entry and cashier",
      "Real-time order and reservation status tracking via Supabase",
      "Role-based web dashboard for admin, cashier, and security staff",
      "Customer mobile app for reservations, menu browsing, and ordering",
      "PDF/Excel export for sales and reservation reports",
    ],
    year: 2025,
    devices: ["laptop", "phone"],
    image: tavApp,
    phoneImages: [phone1TavApp, phone2TavApp],
    laptopImage: laptopTavApp,
    buttons: [
      {
        label: "View Soarce - Web",
        icon: GithubBlack,
        url: "https://github.com/shamKirzon/tavern-website",
      },
      {
        label: "View Soarce - Mobile",
        icon: GithubBlack,
        url: "https://github.com/shamKirzon/tavern-mobile",
      },
    ],
  },

  {
    slug: "smart-queue",
    name: "Smart Queue",
    app: "Mobile App",
    description:
      "A real-time mobile queue management system for banks and service centers, built with cross-platform support and WebSocket integration for seamless status updates.",
    technology: [
      { name: "TypeScript" },
      { name: "Node.js" },
      { name: "Express" },
      { name: "PostgreSQL" },
      { name: "Expo" },
    ],
    keyFeatures: [
      "Real-time queue position updates over WebSocket",
      "Cross-platform mobile build with Expo",
      "Digital ticket issuing and status tracking",
      "Counter management for multiple service windows",
    ],
    year: 2025,
    devices: ["laptop", "phone"],
    image: smartQueue,
    phoneImages: [phoneSmartQueue],
    laptopImage: laptopSmartQueue,
    buttons: [
      {
        label: "View Soarce",
        icon: GithubBlack,
        url: "https://github.com/shamKirzon/smart-queue",
      },
    ],
  },
  {
    slug: "heronest",
    name: "Heronest",
    app: "Website App",
    description:
      "Developed a university theatre seat reservation system that allows users to view available seats, make reservations, and automatically generate digital tickets.",
    technology: [
      { name: "Typescript" },
      { name: "Svelte" },
      { name: "C#" },
      { name: ".NET" },
      { name: "Postgres" },
    ],
    keyFeatures: [
      "Interactive seat map with live availability",
      "Automatic digital ticket generation",
      "Reservation handling for university events",
      "Separate access levels for staff and students",
    ],
    year: 2024,
    devices: ["laptop"],
    image: heronest,
    laptopImage: laptopHeronest,
    buttons: [
      {
        label: "View Soarce",
        icon: GithubBlack,
        url: "https://github.com/shamKirzon/heronest-be",
      },
    ],
  },
  {
    slug: "pateros-catholic-school",
    name: "Pateros Catholic School",
    app: "Website App",
    description:
      "Enrollment system integrated with a school website, featuring a full admin dashboard for managing students, courses, and academic records.",
    technology: [
      { name: "TypeScript" },
      { name: "Svelte" },
      { name: "PHP" },
      { name: "PostgreSQL" },
    ],
    keyFeatures: [
      "Online student enrollment workflow",
      "Admin dashboard for students, courses, and records",
      "Academic record management per school year",
      "Public school website integrated with the system",
    ],
    year: 2024,
    devices: ["laptop"],
    image: pateros,
    laptopImage: laptopPateros,
    buttons: [
      {
        label: "View Soarce",
        icon: GithubBlack,
        url: "https://github.com/shamKirzon/enrollment-system-backend",
      },
    ],
  },
  {
    slug: "library-management-system",
    name: "Library Management System",
    app: "Desktop App",
    description:
      "A library management system that simplifies book tracking, borrower management, and due date monitoring.",
    technology: [
      { name: "Java" },
      { name: "Swing (UI)" },
      { name: "JDBC" },
      { name: "MySQL" },
    ],
    keyFeatures: [
      "Book cataloging and inventory tracking",
      "Borrower registration and borrowing history",
      "Due date monitoring with overdue flagging",
      "Desktop interface built with Java Swing",
    ],
    year: 2024,
    devices: ["laptop"],
    image: library,
    buttons: [
      {
        label: "View Soarce",
        icon: GithubBlack,
        url: "https://github.com/shamKirzon/library-management-system",
      },
    ],
  },
  {
    slug: "bath-of-paws",
    name: "Bath of Paws",
    app: "Website App",
    description:
      "A frontend pet website built using basic web development tools, focusing on layout, styling, and interactive elements to enhance user experience.",
    technology: [{ name: "JavaScript" }, { name: "HTML" }, { name: "CSS" }],
    keyFeatures: [
      "Responsive pet grooming service pages",
      "Service catalog with detailed listings",
      "Interactive booking and inquiry sections",
      "Custom hover states and scroll interactions",
    ],
    year: 2024,
    devices: ["laptop"],
    image: bathOfPaws,
    laptopImage: laptopBathOfPaws,
    buttons: [
      {
        label: "View Soarce",
        icon: GithubBlack,
        url: "https://github.com/shamKirzon/bath-of-paws",
      },
    ],
  },
];
