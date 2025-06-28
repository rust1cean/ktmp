import { Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function Loader({ className }: { className?: string }) {
  return <Loader2 className={twMerge(className, "animate-spin")} />;
}
