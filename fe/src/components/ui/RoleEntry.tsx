import type { PreviousRole } from "@/data/PreviousRoles-data";

const RoleEntry = ({
  title,
  period,
  organization,
  location,
  description,
  tech,
}: PreviousRole) => (
  <li className="relative">
    <span
      aria-hidden
      className="absolute -left-[26px] top-2.5 h-[7px] w-[7px] rounded-full border border-[var(--line-strong)] bg-[var(--page-bg)]"
    />

    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <h3 className="text-[22px] font-bold leading-tight tracking-tight text-[var(--ink)]">
          {title}
        </h3>
        <p className="mt-1 text-[15px] text-[var(--ink-mid)]">{period}</p>
      </div>

      <div className="flex shrink-0 flex-col gap-0.5 sm:items-end">
        <div className="flex items-center gap-2">
          <span className="text-[16px] font-semibold text-[var(--ink)]">
            {organization}
          </span>
        </div>
        <span className="text-[15px] text-[var(--ink-mid)]">{location}</span>
      </div>
    </div>

    <p className="mt-3 max-w-[560px] text-[15px] leading-relaxed text-[var(--ink-mid)]">
      {description}
    </p>

    {tech.length > 0 && (
      <div className="mt-3 flex items-center gap-2.5">
        {tech.map(({ Icon, alt }) => (
          <Icon key={alt} title={alt} size={18} className="text-[var(--ink)]" />
        ))}
      </div>
    )}
  </li>
);

export default RoleEntry;
