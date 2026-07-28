import { SiDotnet } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { Database } from "lucide-react";
import type { IconType } from "react-icons";

export interface PreviousRole {
  title: string;
  period: string;
  organization: string;
  location: string;
  description: string;
  tech: { Icon: IconType; alt: string }[];
}

export const previousRoles: PreviousRole[] = [
  {
    title: "ICT - Computer Programming",
    period: "2021 - 2023",
    organization: 'Benigno "Ninoy" Aquino Highschool',
    location: "Taguig City",
    description:
      "Completed the ICT – Computer Programming strand, building the foundations in programming logic, and databases that led into a Computer Science degree.",
    tech: [
      { Icon: Database, alt: "SQL" },
      { Icon: SiDotnet, alt: "VB.NET" },
      { Icon: FaJava, alt: "Java" },
    ],
  },
];
