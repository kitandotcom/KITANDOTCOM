import { cn } from "@/lib/utils";

export type CaseCardProps = {
  title: string;
  role: string;
  description: string;
  tags: string[];
  href?: string;
  className?: string;
};

export function CaseCard({
  title,
  role,
  description,
  tags,
  href,
  className,
}: CaseCardProps) {
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      {...(href
        ? { href, target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={cn(
        "glass-panel group relative flex flex-col gap-4 rounded-2xl p-6 transition-transform duration-500",
        "hover:-translate-y-1",
        className
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-2xl text-foreground">{title}</h3>
        {href && (
          <span className="text-xs text-muted-foreground transition-colors group-hover:text-accent-teal">
            View ↗
          </span>
        )}
      </div>
      <p className="text-xs tracking-wide text-accent-gold uppercase">
        {role}
      </p>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </Wrapper>
  );
}
