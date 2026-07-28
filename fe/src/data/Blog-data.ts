import profile from "@/assets/images/profile.jpg";
import smartQueue from "@/assets/images/projects/smart-queue.png";
import heronest from "@/assets/images/projects/heronest.png";
import pateros from "@/assets/images/projects/pateros-catholic-school.png";
import library from "@/assets/images/projects/library-management-system.png";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  /** Display date, e.g. "Mar 24, 2026". */
  date: string;
  /** Machine-readable date for the <time> element. */
  isoDate: string;
  readingTime: string;
  tags: string[];
  content: string[];
}

export const blogAuthor = {
  name: "Shammy Kierson Suyat",
  avatar: profile,
};

// Placeholder posts — replace the copy with real writing when you have it.
export const blogPosts: BlogPost[] = [
  {
    slug: "real-time-queues-with-websockets",
    title: "Building a Real-Time Queue System with WebSockets",
    excerpt:
      "How I kept queue positions in sync across dozens of devices without hammering the server with polling requests.",
    cover: smartQueue,
    date: "Mar 24, 2026",
    isoDate: "2026-03-24",
    readingTime: "6 min",
    tags: ["WebSockets", "Node.js", "TypeScript"],
    content: [
      "Polling was the obvious first approach, and it worked right up until the second service counter opened. Every client asking the server for its position once a second turned into a flood of near-identical requests, and the numbers still lagged behind reality.",
      "Switching to WebSockets inverted the problem. Instead of clients asking what changed, the server announces it once and every connected device updates at the same moment. The tricky part was not the connection itself but deciding what counts as a meaningful change worth broadcasting.",
      "The rule I settled on: broadcast when a ticket is served, cancelled, or created, and nothing else. Position numbers are derived on the client from the queue array rather than sent individually, which cut message size dramatically.",
      "Reconnection is the piece most tutorials skip. Mobile clients drop constantly, so the client refetches the full queue state on every reconnect and treats the socket purely as an invalidation signal.",
    ],
  },
  {
    slug: "seat-reservations-without-double-booking",
    title: "Designing a Seat Reservation Flow That Doesn't Double-Book",
    excerpt:
      "Two people tapping the same seat at the same instant is the whole problem. Here's how the database solves it for you.",
    cover: heronest,
    date: "Feb 11, 2026",
    isoDate: "2026-02-11",
    readingTime: "5 min",
    tags: ["PostgreSQL", "Svelte", "Backend"],
    content: [
      "Checking whether a seat is free and then writing the reservation are two separate operations, and anything can happen between them. That gap is where double-bookings live.",
      "Application-level locks felt like the intuitive fix, but they only hold within a single process. The moment the app runs on more than one instance, the guarantee evaporates.",
      "A unique constraint on the seat and event columns pushes the check into the database, where it is genuinely atomic. The second insert fails, and the API turns that failure into a friendly message rather than a stack trace.",
      "Holding a seat during checkout needed a different tool: a short-lived reservation row with an expiry timestamp, cleaned up by a scheduled job.",
    ],
  },
  {
    slug: "shipping-a-school-enrollment-system",
    title: "What I Learned Shipping a School Enrollment System",
    excerpt:
      "Real users, real deadlines, and a data model that had to survive contact with an actual registrar's office.",
    cover: pateros,
    date: "Jan 08, 2026",
    isoDate: "2026-01-08",
    readingTime: "7 min",
    tags: ["PHP", "PostgreSQL", "Full-Stack"],
    content: [
      "The schema I designed in week one did not survive week three. Students transfer, repeat years, and change strands, and none of that fits a single flat student record.",
      "Separating the person from the enrollment record fixed most of it. A student exists once; an enrollment ties that student to a school year, a section, and a status.",
      "The admin dashboard taught me more about UX than any article had. Registrars work in bulk, so per-row buttons were useless. They needed filters, multi-select, and a single confirm.",
      "If I rebuilt it today I would start from the reports the school actually needs and work backwards into the schema.",
    ],
  },
  {
    slug: "getting-started-with-agentic-ai-architecture",
    title: "Getting Started with Agentic AI Application Architecture",
    excerpt:
      "Notes from wiring a language model into a real product — tool boundaries, failure modes, and keeping costs sane.",
    cover: library,
    date: "Dec 02, 2025",
    isoDate: "2025-12-02",
    readingTime: "8 min",
    tags: ["AI", "Architecture", "TypeScript"],
    content: [
      "An agent is only as good as the tools you hand it. Broad, vaguely-described tools produce vague behaviour, so each one should do a single thing with an unambiguous name.",
      "Validate every tool argument as if it came from an untrusted client, because functionally it did. A schema check at the boundary turns a confusing model mistake into a clear, recoverable error.",
      "Cost control came down to trimming context. Most turns do not need the full history, and summarising older messages kept responses fast without losing the thread.",
      "The most useful habit was logging every tool call with its arguments and result. When behaviour looks strange, the transcript almost always explains why.",
    ],
  },
];
