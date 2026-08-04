import { cn } from "@/lib/utils";

export type SkillCardProps = {
  name: string;
  detail: string;
  className?: string;
};

export function SkillCard({ name, detail, className }: SkillCardProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-xl px-5 py-4 transition-colors hover:border-accent-violet/60",
        className
      )}
    >
      <p className="font-mono text-sm text-foreground">{name}</p>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}
