import Link from "next/link";

import { Logo as LogoSvg } from "./logo";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={className}>
      <LogoSvg className="h-6" />
    </Link>
  );
}
