// Thumbnail
import smartQueue from "../assets/images/projects/thumbnail/smart-queue.png";
import heronest from "../assets/images/projects/thumbnail/heronest.png";
import library from "../assets/images/projects/thumbnail/library-management-system.png";
import pateros from "../assets/images/projects/thumbnail/pateros-catholic-school.png";
import bathOfPaws from "../assets/images/projects/thumbnail/bath-of-paws.png";

// Device View
import laptopSmartQueue from "../assets/images/projects/device-view/project-laptop-smart-queue.jpg";
import phoneSmartQueue from "../assets/images/projects/device-view/project-phone-smart-queue.jpg";
import laptopHeronest from "../assets/images/projects/device-view/project-laptop-heronest.jpg";
import laptopPateros from "../assets/images/projects/device-view/project-laptop-pcs.jpg";
import laptopBathOfPaws from "../assets/images/projects/device-view/project-laptop-bath-of-paws.jpg";
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
        label: "Github",
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
        label: "Github",
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
        label: "Github",
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
        label: "Github",
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
        label: "Github",
        icon: GithubBlack,
        url: "https://github.com/shamKirzon/bath-of-paws",
      },
    ],
  },
];
