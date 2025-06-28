import { useUnit } from "effector-react";

import { Separator } from "@/shared/shadcn/shadcn-ui/separator";
import { Button } from "@/shared/shadcn/shadcn-ui/button";
import { SignUpForm, type SignUpFormData } from "@/features/auth-modal/forms";
import { OAuthProviders } from "@/features/auth-modal/tabs/oauth-providers";
import { signUpFx } from "@/entities/auth";
import { MIN_PASSWORD_LENGTH } from "@/features/auth-modal/fields";
import { Tab } from "@/features/auth-modal/tabs";
import { userCreated } from "@/entities/auth";

export type SignUpTabProps = {
  onSuccess: (msg: string) => void;
  onFail: (reason: string) => void;
  onSignInToExistingAccount: () => void;
};

export function SignUpTab({
  onSuccess,
  onFail,
  onSignInToExistingAccount,
}: SignUpTabProps) {
  const onUserCreated = useUnit(userCreated);

  const handleSignUp = async (credentials: SignUpFormData) => {
    const { user, error } = await signUpFx(credentials);

    if (error) {
      onFail(error.message);
    } else if (user) {
      onSuccess("Registration completed");
      onUserCreated(user);
    }
  };

  return (
    <Tab
      name="signUp"
      title="Registration"
      description={`Your password must contain a minimum of ${MIN_PASSWORD_LENGTH} characters, including uppercase and lowercase letters, numbers, and special characters`}
    >
      <SignUpForm onSubmit={handleSignUp} />
      <OAuthProviders className="mx-auto" />
      <Separator />
      <Button
        className="w-full"
        variant="secondary"
        onClick={onSignInToExistingAccount}
      >
        Log in
      </Button>
    </Tab>
  );
}
