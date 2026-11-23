import { cn } from "@/lib/utils";

export default function Container({ className, ...props }) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl px-[clamp(0.75rem,4vw,1.5rem)]",
        className
      )}
      {...props}
    />
  );
}
