import smartQueue from "../assets/images/projects/smart-queue.png";
import heronest from "../assets/images/projects/heronest.png";
import library from "../assets/images/projects/library-management-system.png";
import pateros from "../assets/images/projects/pateros-catholic-school.png";
import bathOfPaws from "../assets/images/projects/bath-of-paws.png";
import { GithubBlack } from "@/assets/icons/Icons";

export const project = [
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
    year: 2025,
    image: smartQueue,
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
    year: 2024,
    image: heronest,
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
    year: 2024,
    image: pateros,
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
    year: 2024,
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
    year: 2024,
    image: bathOfPaws,
    buttons: [
      {
        label: "Github",
        icon: GithubBlack,
        url: "https://github.com/shamKirzon/bath-of-paws",
      },
    ],
  },
];
