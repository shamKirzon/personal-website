import { SiDotnet } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { Database } from "lucide-react";
import type { IconType } from "react-icons";

export interface LocalizedText {
  en: string;
  fil: string;
}

export interface PreviousRole {
  title: LocalizedText;
  period: LocalizedText;
  organization: string;
  location: string;
  description: LocalizedText;
  tech: { Icon: IconType; alt: string }[];
}

export const previousRoles: PreviousRole[] = [
  {
    title: {
      en: "ICT - Computer Programming",
      fil: "ICT - Computer Programming",
    },
    period: { en: "2021 - 2023", fil: "2021 - 2023" },
    organization: 'Benigno "Ninoy" Aquino Highschool',
    location: "Taguig City",
    description: {
      en: "Completed the ICT – Computer Programming strand, building the foundations in programming logic, and databases that led into a Computer Science degree.",
      fil: "Natapos ang ICT – Computer Programming strand, kung saan naitayo ang pundasyon sa programming logic at databases na naging daan patungo sa kursong Computer Science.",
    },
    tech: [
      { Icon: Database, alt: "SQL" },
      { Icon: SiDotnet, alt: "VB.NET" },
      { Icon: FaJava, alt: "Java" },
    ],
  },
];
