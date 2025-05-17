import { FaApple } from "react-icons/fa";

import { PendingButton } from "@/shared/shadcn-ui/button";

export function AppleOAuth() {
  return (
    <PendingButton
      variant="secondary"
      icon={<FaApple />}
      onClick={console.log}
    />
  );
}
