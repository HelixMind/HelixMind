import { cn } from "@/lib/utils.js";

export default function Logo({ className }) {
  return (
    <>
      <span className={cn("text-[1.2rem] font-medium", className)}>HelixMind</span>
    </>
  );
}
