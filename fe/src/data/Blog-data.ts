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

export interface LocalizedText {
  en: string;
  fil: string;
}

export interface BlogPost {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  images: string[];
  date: LocalizedText;
  isoDate: string;
  readingTime: LocalizedText;
  tags: string[];
  content: { en: BlogContentBlock[]; fil: BlogContentBlock[] };
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
    title: {
      en: "My First Hackathon: Surviving C# with Notepad and No IntelliSense",
      fil: "Ang Una Kong Hackathon: Nakaligtas sa C# gamit ang Notepad at Walang IntelliSense",
    },
    excerpt: {
      en: "How a half-serious hackathon entry turned into my first real taste of competitive programming — armed with nothing but Notepad and a shaky grasp of hashing.",
      fil: "Kung paano naging una kong tunay na karanasan sa competitive programming ang isang hindi masyadong seryosong sali sa hackathon — Notepad lang ang armas at magulo pa ang alam ko sa hashing.",
    },
    images: [infotechOlympics2, infotechOlympics1],
    date: { en: "Oct 22, 2024", fil: "Okt 22, 2024" },
    isoDate: "2024-10-22",
    readingTime: { en: "6 min", fil: "6 minuto" },
    tags: ["C#", "Hackathon"],
    content: {
      en: paragraphs(
        "InfoTech Olympics 2024 wasn't something we planned for seriously. Our programming professor mentioned, almost in passing, that if a group from our class joined the hackathon under the C# category, it would automatically cover our main activity requirement for the subject. That was really the whole pitch. Four of us decided to go for it, and since the hackathon only allowed pairs, we split into two teams. Ours was called HandsOnSecured — a name that, in hindsight, said more about our motivation than our skill level.",
        "While some of the other teams came in wanting to actually win, our goal was a lot simpler: get a record of participation and lock in that requirement. I had some prior exposure to C#, so I figured I'd be fine. I wasn't. The problems assumed a much deeper foundation than I had, especially around vectors and HashMap or Dictionary, topics I hadn't properly studied yet.",
        "There were five items total, and I was only confident about two of them. No AI assistance, no IntelliSense, no autocomplete — just Notepad on a school-provided PC, staring at a blank file and whatever I could recall from memory. It was a stripped-down way to code, and it made every gap in my understanding obvious in real time.",
        "We didn't make it through, but that was never really the point for us. It was my first hackathon, my first time coding under real time pressure without any of the tooling I'd gotten used to, and honestly, a pretty fun experience despite the rough edges.",
      ),
      fil: paragraphs(
        "Hindi namin masyadong pinaghandaan ang InfoTech Olympics 2024. Nabanggit lang ng aming propesor sa programming, halos padaan lang, na kung may grupo mula sa klase namin na sasali sa hackathon sa ilalim ng C# category, awtomatiko nitong papalitan ang pangunahing activity requirement namin sa subject. Iyon lang talaga ang dahilan. Apat kami ang nagdesisyong sumali, at dahil pares lang ang pinapayagan sa hackathon, naghati kami sa dalawang koponan. Ang sa amin ay tinawag na HandsOnSecured — isang pangalan na, sa pagbabalik-tanaw, mas nagsasabi ng aming motibasyon kaysa sa aming kakayahan.",
        "Habang ang ibang koponan ay sumali talaga para manalo, mas simple ang layunin namin: makakuha ng record ng partisipasyon at matapos ang requirement. May kaunti akong karanasan sa C#, kaya akala ko okay lang ako. Hindi pala. Mas malalim ang pundasyong kailangan ng mga problema kaysa sa alam ko, lalo na sa vectors at HashMap o Dictionary, mga paksang hindi ko pa naaral nang maayos.",
        "Limang item lahat, at dalawa lang ang may kumpiyansa ako. Walang tulong ng AI, walang IntelliSense, walang autocomplete — Notepad lang sa PC na bigay ng paaralan, nakatitig sa blangkong file at kung ano lang ang matandaan ko. Napakahubad na paraan ng pag-code, at doon lumabas nang malinaw ang bawat kakulangan sa pang-unawa ko.",
        "Hindi kami nakapasok, pero hindi naman talaga iyon ang punto para sa amin. Una ko itong hackathon, unang beses kong nag-code sa ilalim ng tunay na pressure ng oras nang walang anumang tool na nakasanayan ko, at sa totoo lang, masaya pa rin ang karanasan kahit magulo.",
      ),
    },
  },
  {
    slug: "egovph-hackathon-2026",
    title: {
      en: "eGovPH Hackathon 2026: Running on No Sleep and Free Breakfast",
      fil: "eGovPH Hackathon 2026: Puyat at Libreng Almusal ang Panggatong",
    },
    excerpt: {
      en: "How a favor for a senior-high friend turned into a full overnight build session at one of the Philippines' biggest government-tech hackathons.",
      fil: "Kung paano naging magdamagang paggawa ng sistema ang isang pabor sa kaibigan noong senior high, sa isa sa pinakamalaking government-tech hackathon sa Pilipinas.",
    },
    images: [
      egovphHackathon_1,
      egovphHackathon_2,
      egovphHackathon_3,
      egovphHackathon_4,
      egovphHackathon_5,
      egovphHackathon_6,
      egovphHackathon_7,
    ],
    date: { en: "Jul 21, 2026", fil: "Hul 21, 2026" },
    isoDate: "2026-07-21",
    readingTime: { en: "10 min", fil: "10 minuto" },
    tags: ["Hackathon", "Typescript", "React"],
    content: {
      en: paragraphs(
        "eGovPH is the official mobile app of the Philippine government, made by the DICT. It brings together national and local government services in one place — digital IDs, PhilHealth, Pag-IBIG, LTO, and more — so people don't have to use so many different systems. The eGovPH Hackathon 2026 was built around that same goal. I joined almost by accident. A friend from senior high school needed a teammate, and I said yes right away. This is one of the biggest hackathons in the Philippines, so I knew it would be a good experience no matter what happened. We also had good memories together from senior high, so it felt more special than just a regular competition.",
        "For our team name, we used the nickname of our favorite programming teacher from senior high. We asked for permission first, and our teacher was happy to support us. We also registered early, and that turned out to be important. So many people signed up that the organizers had to split the event into Part 1 and Part 2. Because we registered early, we got into Part 1.",
        "The event started at 9am. We were excited but didn't really know what to expect. We just wanted to help and share what we knew as developers. During the event, we saw Sir Bryl Lim, someone we really look up to in programming, and we got a photo with him. After registration, there was a free breakfast for everyone, and it was really good — different from what I usually eat in the morning. After that, there was a short program where the speakers introduced themselves and explained more about the eGovPH app and its features. They also showed us the APIs we would use for the hackathon.",
        "After the program, we went home to start working on our proposal, which needed to be ready early the next morning. So we stayed up all night at my teammate's house to finish the system. On the second day, we came back with almost no sleep, and I think everyone else was the same. That was also the day they announced the top 10 winners. We didn't win, but we were happy for the teams who did. I hope their projects can really help the Philippines and solve real problems that Filipinos face every day.",
      ),
      fil: paragraphs(
        "Ang eGovPH ay ang opisyal na mobile app ng pamahalaan ng Pilipinas, ginawa ng DICT. Pinagsasama nito ang mga serbisyo ng pambansa at lokal na pamahalaan sa iisang lugar — digital ID, PhilHealth, Pag-IBIG, LTO, at marami pa — para hindi na kailangang gumamit ng napakaraming magkakaibang sistema. Ganito rin ang layunin ng eGovPH Hackathon 2026. Halos aksidente lang ang pagsali ko. May kaibigan ako noong senior high na naghahanap ng kakampi, at agad akong pumayag. Isa ito sa pinakamalaking hackathon sa Pilipinas, kaya alam kong magandang karanasan ito anuman ang mangyari. Marami rin kaming magagandang alaala noong senior high, kaya mas naging espesyal ito kaysa sa ordinaryong paligsahan.",
        "Para sa pangalan ng aming koponan, ginamit namin ang palayaw ng paborito naming guro sa programming noong senior high. Nagpaalam muna kami, at masaya siyang sumuporta sa amin. Maaga rin kaming nagparehistro, at naging mahalaga pala iyon. Napakaraming sumali kaya kinailangang hatiin ng mga organizer ang event sa Part 1 at Part 2. Dahil maaga kaming nagparehistro, napasama kami sa Part 1.",
        "Nagsimula ang event ng 9am. Excited kami pero hindi talaga namin alam ang aasahan. Gusto lang naming tumulong at ibahagi ang alam namin bilang mga developer. Sa event, nakita namin si Sir Bryl Lim, isang taong tinitingala namin sa programming, at nakapagpakuha kami ng litrato kasama siya. Pagkatapos ng registration, may libreng almusal para sa lahat, at napakasarap — iba sa nakasanayan kong kainin sa umaga. Pagkatapos noon, may maikling programa kung saan nagpakilala ang mga speaker at ipinaliwanag pa ang tungkol sa eGovPH app at mga tampok nito. Ipinakita rin nila sa amin ang mga API na gagamitin namin sa hackathon.",
        "Pagkatapos ng programa, umuwi kami para simulan ang aming proposal, na kailangang handa nang maaga kinabukasan. Kaya nagpuyat kami buong gabi sa bahay ng kakampi ko para tapusin ang sistema. Sa ikalawang araw, bumalik kami na halos walang tulog, at sa tingin ko ganoon din ang lahat. Iyon din ang araw na inanunsyo ang top 10 na nanalo. Hindi kami nanalo, pero masaya kami para sa mga koponang nagwagi. Sana ay makatulong talaga ang kanilang mga proyekto sa Pilipinas at malutas ang tunay na problemang hinaharap ng mga Pilipino araw-araw.",
      ),
    },
  },
];
