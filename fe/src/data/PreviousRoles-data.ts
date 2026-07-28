import javascript from "@/assets/icons/javascript.png";
import python from "@/assets/icons/python.png";
import git from "@/assets/icons/git.png";

export interface PreviousRole {
  title: string;
  period: string;
  organization: string;
  location: string;
  description: string;
  tech: { src: string; alt: string }[];
}

export const previousRoles: PreviousRole[] = [
  {
    title: "ICT - Computer Programming",
    period: "2021 - 2023",
    organization: 'Benigno "Ninoy" Aquino Highschool',
    location: "Taguig City",
    description:
      "Completed the ICT – Computer Programming strand, building the foundations in programming logic, web development, and databases that led into a Computer Science degree.",
    tech: [
      { src: javascript, alt: "JavaScript" },
      { src: python, alt: "Python" },
      { src: git, alt: "Git" },
    ],
  },
];
