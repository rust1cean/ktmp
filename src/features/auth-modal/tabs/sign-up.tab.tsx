import { useUnit } from "effector-react";

import { Separator } from "@/shared/shadcn/shadcn-ui/separator";
import { Button } from "@/shared/shadcn/shadcn-ui/button";
import { SignUpForm, type SignUpFormData } from "@/features/auth-modal/forms";
import { OAuthProviders } from "@/features/auth-modal/tabs/oauth-providers";
import { signUpFx } from "@/entities/auth";
import { MIN_PASSWORD_LENGTH } from "@/features/auth-modal/fields";
import { Tab } from "@/features/auth-modal/tabs";
import { userCreated } from "@/entities/auth";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Base");

  const onUserCreated = useUnit(userCreated);

  const handleSignUp = async (credentials: SignUpFormData) => {
    const { user, error } = await signUpFx(credentials);

    if (error) {
      onFail(error.message);
    } else if (user) {
      onSuccess("registration_completed");
      onUserCreated(user);
    }
  };

  return (
    <Tab
      name="signUp"
      title={t("registration_title")}
      description={t("registration_description", {
        minPasswordLength: MIN_PASSWORD_LENGTH,
      })}
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
