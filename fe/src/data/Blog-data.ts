import profile from "@/assets/images/profile.jpg";
import egovphHackathon_1 from "@/assets/images/blogs/egovph-hackathon-2026_1.jpg";
import egovphHackathon_2 from "@/assets/images/blogs/egovph-hackathon-2026_2.jpg";
import egovphHackathon_3 from "@/assets/images/blogs/egovph-hackathon-2026_3.jpg";
import egovphHackathon_4 from "@/assets/images/blogs/egovph-hackathon-2026_4.jpg";
import egovphHackathon_5 from "@/assets/images/blogs/egovph-hackathon-2026_5.jpg";
import egovphHackathon_6 from "@/assets/images/blogs/egovph-hackathon-2026_6.jpg";
import egovphHackathon_7 from "@/assets/images/blogs/egovph-hackathon-2026_7.jpg";

import infotechOlympics1 from "@/assets/images/blogs/infotech-olympics_1.jpg";
import infotechOlympics2 from "@/assets/images/blogs/infotech-olympics_2.jpg";

export type BlogContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: { title: string; text: string }[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  images: string[];
  date: string;
  isoDate: string;
  readingTime: string;
  tags: string[];
  content: BlogContentBlock[];
}

export const blogAuthor = {
  name: "Shammy Kierson Suyat",
  avatar: profile,
};

const paragraphs = (...text: string[]): BlogContentBlock[] =>
  text.map((paragraph) => ({ type: "paragraph", text: paragraph }));

export const blogPosts: BlogPost[] = [
  {
    slug: "infotech-olympics-2024-csharp-hackathon",
    title: "My First Hackathon: Surviving C# with Notepad and No IntelliSense",
    excerpt:
      "How a half-serious hackathon entry turned into my first real taste of competitive programming — armed with nothing but Notepad and a shaky grasp of hashing.",
    images: [infotechOlympics2, infotechOlympics1],
    date: "Oct 22, 2024",
    isoDate: "2024-10-22",
    readingTime: "6 min",
    tags: ["C#", "Hackathon"],
    content: paragraphs(
      "InfoTech Olympics 2024 wasn't something we planned for seriously. Our programming professor mentioned, almost in passing, that if a group from our class joined the hackathon under the C# category, it would automatically cover our main activity requirement for the subject. That was really the whole pitch. Four of us decided to go for it, and since the hackathon only allowed pairs, we split into two teams. Ours was called HandsOnSecured — a name that, in hindsight, said more about our motivation than our skill level.",
      "While some of the other teams came in wanting to actually win, our goal was a lot simpler: get a record of participation and lock in that requirement. I had some prior exposure to C#, so I figured I'd be fine. I wasn't. The problems assumed a much deeper foundation than I had, especially around vectors and HashMap or Dictionary, topics I hadn't properly studied yet.",
      "There were five items total, and I was only confident about two of them. No AI assistance, no IntelliSense, no autocomplete — just Notepad on a school-provided PC, staring at a blank file and whatever I could recall from memory. It was a stripped-down way to code, and it made every gap in my understanding obvious in real time.",
      "We didn't make it through, but that was never really the point for us. It was my first hackathon, my first time coding under real time pressure without any of the tooling I'd gotten used to, and honestly, a pretty fun experience despite the rough edges.",
    ),
  },
  {
    slug: "egovph-hackathon-2026",
    title: "eGovPH Hackathon 2026: Running on No Sleep and Free Breakfast",
    excerpt:
      "How a favor for a senior-high friend turned into a full overnight build session at one of the Philippines' biggest government-tech hackathons.",
    images: [
      egovphHackathon_1,
      egovphHackathon_2,
      egovphHackathon_3,
      egovphHackathon_4,
      egovphHackathon_5,
      egovphHackathon_6,
      egovphHackathon_7,
    ],
    date: "Jul 21, 2026",
    isoDate: "2026-07-21",
    readingTime: "10 min",
    tags: ["Hackathon", "Typescript", "React"],
    content: paragraphs(
      "eGovPH is the official mobile app of the Philippine government, made by the DICT. It brings together national and local government services in one place — digital IDs, PhilHealth, Pag-IBIG, LTO, and more — so people don't have to use so many different systems. The eGovPH Hackathon 2026 was built around that same goal. I joined almost by accident. A friend from senior high school needed a teammate, and I said yes right away. This is one of the biggest hackathons in the Philippines, so I knew it would be a good experience no matter what happened. We also had good memories together from senior high, so it felt more special than just a regular competition.",
      "For our team name, we used the nickname of our favorite programming teacher from senior high. We asked for permission first, and our teacher was happy to support us. We also registered early, and that turned out to be important. So many people signed up that the organizers had to split the event into Part 1 and Part 2. Because we registered early, we got into Part 1.",
      "The event started at 9am. We were excited but didn't really know what to expect. We just wanted to help and share what we knew as developers. During the event, we saw Sir Bryl Lim, someone we really look up to in programming, and we got a photo with him. After registration, there was a free breakfast for everyone, and it was really good — different from what I usually eat in the morning. After that, there was a short program where the speakers introduced themselves and explained more about the eGovPH app and its features. They also showed us the APIs we would use for the hackathon.",
      "After the program, we went home to start working on our proposal, which needed to be ready early the next morning. So we stayed up all night at my teammate's house to finish the system. On the second day, we came back with almost no sleep, and I think everyone else was the same. That was also the day they announced the top 10 winners. We didn't win, but we were happy for the teams who did. I hope their projects can really help the Philippines and solve real problems that Filipinos face every day.",
    ),
  },
];
