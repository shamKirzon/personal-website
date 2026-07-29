export interface LocalizedText {
  en: string;
  fil: string;
}

export interface TechStackGroup {
  category: LocalizedText;
  items: { title: string }[];
}

export const myTechStack: TechStackGroup[] = [
  {
    category: { en: "Frontend", fil: "Frontend" },
    items: [
      { title: "JavaScript" },
      { title: "TypeScript" },
      { title: "React JS" },
      { title: "React Native" },
      { title: "Tailwind" },
      { title: "Shadcn" },
    ],
  },
  {
    category: { en: "Backend", fil: "Backend" },
    items: [
      { title: "Node" },
      { title: "Express" },
      { title: "Python" },
      { title: "Socket IO" },
      { title: "MongoDB" },
      { title: "Postgres" },
    ],
  },
  {
    category: { en: "DevOps & Tools", fil: "DevOps at Mga Kasangkapan" },
    items: [{ title: "GitHub" }, { title: "Vercel" }, { title: "Firebase" }],
  },
];
