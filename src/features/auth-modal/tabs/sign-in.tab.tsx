import { Button } from "@/shared/shadcn-ui/button";
import { Separator } from "@/shared/shadcn-ui/separator";
import { SignInForm, type SignInFormData } from "@/features/auth-modal/forms";
import { OAuthProviders } from "@/features/auth-modal/tabs/oauth-providers";
import { signInFx } from "@/entities/auth";
import { Tab } from "@/features/auth-modal/tabs";

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
  const handleSignIn = async (credentials: SignInFormData) => {
    const { error } = await signInFx(credentials);

    if (error) onFail(error.message);
    else onSuccess("Authorization was successful");
  };

  return (
    <Tab
      name="signIn"
      title="Authentication"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    >
      <SignInForm onSubmit={handleSignIn} />
      <div className="flex justify-between">
        <OAuthProviders />
        <Button variant="ghost" onClick={onForgotPassword}>
          Forgot password
        </Button>
      </div>
      <Separator />
      <Button variant="secondary" onClick={onCreateAccount}>
        Sign up
      </Button>
    </Tab>
  );
}
