import { twMerge } from "tailwind-merge";

import { GoogleOAuth } from "./google.oauth";
import { AppleOAuth } from "./apple.oauth";

export function OAuthProviders({ className }: { className?: string }) {
  return (
    <div className={twMerge(className, "flex gap-2")}>
      <GoogleOAuth />
      <AppleOAuth />
    </div>
  );
}
