export interface UiText {
  nav: { home: string; blog: string; visitors: string; contact: string };
  profile: { bio: string };
  currently: {
    label: string;
    role: string;
    period: string;
    bio: string;
    previousRoles: string;
  };
  recentProjects: {
    label: string;
    searchPlaceholder: string;
    techFilter: string;
    yearFilter: string;
    noResults: string;
  };
  stack: { label: string };
  getInTouch: {
    label: string;
    connectTitle: string;
    connectIntro: string;
    emailLabel: string;
    locationLabel: string;
    locationValue: string;
    socialLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
    sendingButton: string;
    sentButton: string;
    toastIncompleteTitle: string;
    toastIncompleteDesc: string;
    toastInvalidTitle: string;
    toastInvalidDesc: string;
    toastSuccessTitle: string;
    toastSuccessDesc: string;
  };
  projectDetail: { backLink: string; technologies: string; keyFeatures: string };
  blogPage: { title: string; subtitle: string };
  blogListing: { searchPlaceholder: string; noResults: string };
  blogPost: { backLink: string; share: string; copyLink: string; copiedToast: string };
  visitors: { title: string; subtitle: string };
  visitorsMap: {
    eyebrow: string;
    title: string;
    lead: string;
    consentHeading: string;
    consentBodyStart: string;
    consentBodyEmphasis: string;
    consentBodyEnd: string;
    consentAccept: string;
    consentDecline: string;
    declinedNote: string;
    statVisitors: string;
    statLive: string;
    statCities: string;
    recentLabel: string;
    mapAriaLabel: string;
  };
  footer: { rights: string };
}

export const uiText: Record<"en" | "fil", UiText> = {
  en: {
    nav: {
      home: "Home",
      blog: "Blog",
      visitors: "Visitors",
      contact: "Contact",
    },
    profile: {
      bio: "Software developer specializing in full-stack development and agentic AI application architecture. I care about the details that make a product feel right.",
    },
    currently: {
      label: "Currently",
      role: "Computer Science Student",
      period: "2023 - Present",
      bio: "Building full-stack web applications with React, Node.js and PostgreSQL, while growing a specialization in agentic AI application architecture.",
      previousRoles: "Previous roles",
    },
    recentProjects: {
      label: "Recent Projects",
      searchPlaceholder: "Filter or search projects...",
      techFilter: "Tech",
      yearFilter: "Year",
      noResults: "No projects match these filters.",
    },
    stack: {
      label: "Stack",
    },
    getInTouch: {
      label: "Get In Touch",
      connectTitle: "Let's Connect",
      connectIntro:
        "I'm always open to discussing new projects and opportunities. Feel free to send me a message!",
      emailLabel: "Email",
      locationLabel: "Location",
      locationValue: "Taguig City, Philippines",
      socialLabel: "Connect with me on social media",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      messagePlaceholder: "Your Message",
      sendButton: "Send Message",
      sendingButton: "Sending...",
      sentButton: "Sent!",
      toastIncompleteTitle: "Incomplete Input",
      toastIncompleteDesc: "Please fill out all fields and try again.",
      toastInvalidTitle: "Invalid Input",
      toastInvalidDesc: "Please enter a valid email and try again.",
      toastSuccessTitle: "Thanks",
      toastSuccessDesc: "I appreciate you taking the time to contact me",
    },
    projectDetail: {
      backLink: "Back to projects",
      technologies: "Technologies",
      keyFeatures: "Key Features",
    },
    blogPage: {
      title: "Blog",
      subtitle:
        "Thoughts on full-stack development, agentic AI, and things I learn along the way.",
    },
    blogListing: {
      searchPlaceholder: "Search posts...",
      noResults: "No posts match your filters.",
    },
    blogPost: {
      backLink: "Back to blog",
      share: "Share",
      copyLink: "Copy Link",
      copiedToast: "Link copied to clipboard",
    },
    visitors: {
      title: "Coming soon",
      subtitle: "This page isn't ready yet.",
    },
    visitorsMap: {
      eyebrow: "Visitors",
      title: "Where you're all from",
      lead: "A live view of where visitors are connecting from. No sign-in — pulled quietly from edge location data the moment you arrive.",
      consentHeading: "Mind sharing where you're visiting from?",
      consentBodyStart:
        "I'd love to show a live map of where visitors drop in from. If you're okay with it, I'll grab just your ",
      consentBodyEmphasis: "city and country",
      consentBodyEnd:
        " — nothing else. No names, no accounts, no tracking, and it's only ever used to light up this map on my personal site.",
      consentAccept: "Sure, add me to the map",
      consentDecline: "No thanks",
      declinedNote: "No problem — here's where everyone else is.",
      statVisitors: "visitors mapped",
      statLive: "here right now",
      statCities: "cities",
      recentLabel: "Recent arrivals",
      mapAriaLabel:
        "Dotted map of the Philippines showing where visitors are connecting from. Recent locations are listed below.",
    },
    footer: {
      rights: "All rights reserved",
    },
  },
  fil: {
    nav: {
      home: "Home",
      blog: "Blog",
      visitors: "Mga Bisita",
      contact: "Makipag-ugnayan",
    },
    profile: {
      bio: "Software developer na dalubhasa sa full-stack development at agentic AI application architecture. Mahalaga sa akin ang mga detalyeng nagpapaganda sa karanasan ng user.",
    },
    currently: {
      label: "Kasalukuyan",
      role: "Estudyante ng Computer Science",
      period: "2023 - Kasalukuyan",
      bio: "Gumagawa ng full-stack web applications gamit ang React, Node.js, at PostgreSQL, habang lumalalim ang kaalaman ko sa agentic AI application architecture.",
      previousRoles: "Mga Nakaraang Karanasan",
    },
    recentProjects: {
      label: "Mga Kamakailang Proyekto",
      searchPlaceholder: "Maghanap o mag-filter ng proyekto...",
      techFilter: "Tech",
      yearFilter: "Taon",
      noResults: "Walang proyektong tumugma sa mga filter na ito.",
    },
    stack: {
      label: "Stack",
    },
    getInTouch: {
      label: "Makipag-ugnayan",
      connectTitle: "Mag-usap Tayo",
      connectIntro:
        "Bukas ako palagi sa mga bagong proyekto at oportunidad. Huwag mag-atubiling magpadala ng mensahe!",
      emailLabel: "Email",
      locationLabel: "Lokasyon",
      locationValue: "Taguig City, Philippines",
      socialLabel: "Sundan mo ako sa social media",
      namePlaceholder: "Iyong Pangalan",
      emailPlaceholder: "Iyong Email",
      messagePlaceholder: "Iyong Mensahe",
      sendButton: "Ipadala ang Mensahe",
      sendingButton: "Ipinapadala...",
      sentButton: "Naipadala na!",
      toastIncompleteTitle: "Kulang na Impormasyon",
      toastIncompleteDesc: "Pakikumpleto ang lahat ng patlang at subukan ulit.",
      toastInvalidTitle: "Maling Impormasyon",
      toastInvalidDesc: "Maglagay ng wastong email at subukan ulit.",
      toastSuccessTitle: "Salamat",
      toastSuccessDesc: "Salamat sa oras mo para makipag-ugnayan sa akin",
    },
    projectDetail: {
      backLink: "Bumalik sa mga proyekto",
      technologies: "Mga Teknolohiya",
      keyFeatures: "Mga Pangunahing Tampok",
    },
    blogPage: {
      title: "Blog",
      subtitle:
        "Mga kaisipan tungkol sa full-stack development, agentic AI, at mga bagay na natututunan ko sa daan.",
    },
    blogListing: {
      searchPlaceholder: "Maghanap ng mga post...",
      noResults: "Walang post na tumugma sa iyong mga filter.",
    },
    blogPost: {
      backLink: "Bumalik sa blog",
      share: "Ibahagi",
      copyLink: "Kopyahin ang Link",
      copiedToast: "Na-kopya ang link",
    },
    visitors: {
      title: "Malapit na",
      subtitle: "Hindi pa handa ang pahinang ito.",
    },
    visitorsMap: {
      eyebrow: "Mga Bisita",
      title: "Kung Saan Kayo Galing",
      lead: "Live na tanawin kung saan nagmumula ang mga bumibisita. Walang sign-in — tahimik lang na kinukuha mula sa edge location data pagdating mo.",
      consentHeading: "Puwede bang malaman kung saan ka bumibisita?",
      consentBodyStart:
        "Gusto kong magpakita ng live na mapa kung saan galing ang mga bisita. Kung okay lang sa iyo, kukunin ko lang ang iyong ",
      consentBodyEmphasis: "lungsod at bansa",
      consentBodyEnd:
        " — wala nang iba. Walang pangalan, walang account, walang tracking, at ginagamit lang ito para buhayin ang mapang ito sa personal kong site.",
      consentAccept: "Sige, isama mo ako sa mapa",
      consentDecline: "Huwag na lang",
      declinedNote: "Walang problema — narito kung saan galing ang iba.",
      statVisitors: "bisitang naitala",
      statLive: "nandito ngayon",
      statCities: "lungsod",
      recentLabel: "Mga Kararating",
      mapAriaLabel:
        "Tuldok-tuldok na mapa ng Pilipinas na nagpapakita kung saan nagmumula ang mga bisita. Nakalista sa ibaba ang mga kamakailang lokasyon.",
    },
    footer: {
      rights: "Nakalaan ang lahat ng karapatan",
    },
  },
};
