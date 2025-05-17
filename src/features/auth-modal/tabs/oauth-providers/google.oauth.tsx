import { FaGoogle } from "react-icons/fa";

import { PendingButton } from "@/shared/shadcn-ui/button";
import { signInWithOAuthFx } from "@/entities/auth";

export function GoogleOAuth() {
  const handleSignIn = async () => {
    await signInWithOAuthFx("google");
  };

  return (
    <PendingButton
      variant="secondary"
      icon={<FaGoogle />}
      onClick={handleSignIn}
    />
  );
}
