import Link from "next/link";

import { Logo as Svg } from "./logo";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={className}>
      <Svg className="h-6" />
    </Link>
  );
}
