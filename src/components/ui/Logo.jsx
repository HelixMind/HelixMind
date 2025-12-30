import { cn } from "@/lib/utils.js";

export default function Logo({ className, label = 'HelixMind' }) {
  return (
    <>
      <span className={cn("text-[1.2rem] font-medium truncate shrink-0 transition-all ease-out duration-150", className)}>{label}</span>
    </>
  );
}
