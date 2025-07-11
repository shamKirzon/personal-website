import kambing from "../assets/kambing.jpg";
import lorem from "../assets/images/lorem-itsum.jpg"

type Props = {
  name: string;
  position:
    | "Frontend Developer"
    | "Backend Developer"
    | "Junior Developer"
    | "Senior Developer";
  image: string;
  techStack: string[];
  description: { header: string; content: string }[];
  year: string;
};

export const work: Props[] = [
  {
    name: "Lorem Itsum",
    position: "Junior Developer",
    image: lorem,
    techStack: ["Typescript", "Node", "React", "Postgres"],
    description: [
      {
        header: " Lorem ipsum dolor sit amet consectetur.",
        content:
          " Tempore illo iusto pariatur distinctio ut vitae magni rem! Illum aut, ex consequatur dolorum itaque non suscipit illo ducimus qui tempore aliquid.",
      },
      {
        header: " Lorem ipsum dolor sit amet consectetur",
        content:
          " Tempore illo iusto pariatur distinctio ut vitae magni rem! Illum aut, ex consequatur dolorum itaque non suscipit illo ducimus qui tempore aliquid.",
      },
    ],
    year: "2021 - 2020",
  },
   {
    name: "Lorem Itsum",
    position: "Junior Developer",
    image: lorem,
    techStack: ["Typescript", "Node", "React", "Postgres"],
    description: [
      {
        header: " Lorem ipsum dolor sit amet consectetur.",
        content:
          " Tempore illo iusto pariatur distinctio ut vitae magni rem! Illum aut, ex consequatur dolorum itaque non suscipit illo ducimus qui tempore aliquid.",
      },
      {
        header: " Lorem ipsum dolor sit amet consectetur",
        content:
          " Tempore illo iusto pariatur distinctio ut vitae magni rem! Illum aut, ex consequatur dolorum itaque non suscipit illo ducimus qui tempore aliquid.",
      },
    ],
    year: "2021 - 2020",
  },
];
