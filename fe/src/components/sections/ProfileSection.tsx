import myProfile from "@/assets/images/profile.jpg";

const ProfileSection = () => (
  <section className="mx-auto max-w-[760px] px-5 sm:px-10 pt-8">
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
      <img
        src={myProfile}
        alt="Shammy Kierson Suyat"
        className="h-[105px] w-[105px] shrink-0 self-stretch rounded-2xl object-cover sm:h-auto"
      />

      <div className="min-w-0">
        <h1 className="mb-1.5 text-[24px] font-semibold leading-tight tracking-tight text-[var(--ink)]">
          Shammy Kierson Suyat
        </h1>

        <p className="mb-3 text-[16px] leading-relaxed text-[var(--ink-mid)]">
          Software developer specializing in full-stack development and agentic
          AI application architecture. I care about the details that make a
          product feel right.
        </p>

        <p className="flex items-center gap-2 text-[16px] text-[var(--ink-soft)]">
          <svg
            aria-hidden
            viewBox="0 0 30 20"
            className="h-[13px] w-[19.5px] shrink-0 rounded-[2px]"
          >
            <rect width="30" height="10" fill="#0038A8" />
            <rect y="10" width="30" height="10" fill="#CE1126" />
            <polygon points="0,0 0,20 17,10" fill="#FFFFFF" />
            <circle cx="8" cy="10" r="3.2" fill="#FCD116" />
            <circle cx="3" cy="3" r="1.1" fill="#FCD116" />
            <circle cx="3" cy="17" r="1.1" fill="#FCD116" />
            <circle cx="14.5" cy="10" r="1.1" fill="#FCD116" />
          </svg>
          Taguig City, Philippines
        </p>
      </div>
    </div>
  </section>
);

export default ProfileSection;
