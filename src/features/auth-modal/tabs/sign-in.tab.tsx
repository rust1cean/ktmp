import { Button } from "@/shared/shadcn/shadcn-ui/button";
import { Separator } from "@/shared/shadcn/shadcn-ui/separator";
import { SignInForm, type SignInFormData } from "@/features/auth-modal/forms";
import { OAuthProviders } from "@/features/auth-modal/tabs/oauth-providers";
import { signInFx } from "@/entities/auth";
import { Tab } from "@/features/auth-modal/tabs";
import { useTranslations } from "next-intl";

export type SignInTabProps = {
  onSuccess: (msg: string) => void;
  onFail: (reason: string) => void;
  onForgotPassword: () => void;
  onCreateAccount: () => void;
};

export function SignInTab({
  onSuccess,
  onFail,
  onForgotPassword,
  onCreateAccount,
}: SignInTabProps) {
  const t = useTranslations("Base");

  const handleSignIn = async (credentials: SignInFormData) => {
    const { error } = await signInFx(credentials);

    if (error) onFail(error.message);
    else onSuccess(t("authentication_successful"));
  };

  return (
    <Tab
      name="signIn"
      title={t("authentication_title")}
      description={t("authentication_description")}
    >
      <SignInForm onSubmit={handleSignIn} />
      <div className="flex justify-between">
        <OAuthProviders />
        <Button variant="ghost" onClick={onForgotPassword}>
          {t("forgot_password")}
        </Button>
      </div>
      <Separator />
      <Button variant="secondary" onClick={onCreateAccount}>
        {t("sign_up")}
      </Button>
    </Tab>
  );
}
