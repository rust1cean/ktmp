import { EmailForm } from "@/features/auth-modal/forms";
import { requestToChangePasswordByEmailFx } from "@/entities/auth";
import { Tab } from "@/features/auth-modal/tabs";

export type SignInTabProps = {
  onSuccess: (msg: string) => void;
  onFail: (reason: string) => void;
};

export function ForgotPasswordTab({ onSuccess, onFail }: SignInTabProps) {
  const handleSubmit = async ({ email }: { email: string }) => {
    const error = await requestToChangePasswordByEmailFx({ email });

    if (error) {
      onFail(error.message);
    } else {
      onSuccess("We’ve sent a password reset email to your email address");
    }
  };

  return (
    <Tab
      name="forgotPassword"
      title="Password recovery"
      description="Enter the email address associated with your account, and we'll send you a link to reset your password"
    >
      <EmailForm onSubmit={handleSubmit} />
    </Tab>
  );
}
