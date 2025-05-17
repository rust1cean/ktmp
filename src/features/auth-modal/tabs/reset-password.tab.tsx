import { NewPasswordForm } from "@/features/auth-modal/forms";
import { updatePasswordFx } from "@/entities/auth";
import { Tab } from "@/features/auth-modal/tabs";

export type ResetPasswordTabProps = {
  onSuccess: (msg: string) => void;
  onFail: (reason: string) => void;
};

export function ResetPasswordTab({ onSuccess, onFail }: ResetPasswordTabProps) {
  const handleSubmit = async ({ password }: { password: string }) => {
    const error = await updatePasswordFx({ password });

    if (error) onFail(error.message);
    else onSuccess("Password changed");
  };

  return (
    <Tab
      name="resetPassword"
      title="Reset password"
      description="Please enter a new password for your account. Make sure it's strong and secure"
    >
      <NewPasswordForm onSubmit={handleSubmit} />
    </Tab>
  );
}
