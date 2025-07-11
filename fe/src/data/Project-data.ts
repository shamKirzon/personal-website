import smartQueue from "../assets/images/projects/smart-queue.png";
import heronest from "../assets/images/projects/heronest.png";
import library from "../assets/images/projects/library-management-system.png";
import pateros from "../assets/images/projects/pateros-catholic-school.png";
import bathOfPaws from "../assets/images/projects/bath-of-paws.png";

type Props = {
  name: string;
  app: "Mobile App" | "Website App" | "Desktop App";
  description: string;
  technology: { name: string }[];
  image: string;
};

export const project: Props[] = [
  {
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
    image: smartQueue,
  },
  {
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
    image: heronest,
  },
  {
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
    image: pateros,
  },
   {
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
    image: library,
  },
  {
    name: "Bath of Paws",
    app: "Website App",
    description:
      "A frontend pet website built using basic web development tools, focusing on layout, styling, and interactive elements to enhance user experience.",
    technology: [
      { name: "JavaScript" },
      { name: "HTML" },
      { name: "CSS" },
    ],
    image: bathOfPaws,
  },
 
];
