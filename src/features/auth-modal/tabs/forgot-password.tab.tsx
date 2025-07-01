import { EmailForm } from "@/features/auth-modal/forms";
import { requestToChangePasswordByEmailFx } from "@/entities/auth";
import { Tab } from "@/features/auth-modal/tabs";
import { useTranslations } from "next-intl";

export type SignInTabProps = {
  onSuccess: (msg: string) => void;
  onFail: (reason: string) => void;
};

export function ForgotPasswordTab({ onSuccess, onFail }: SignInTabProps) {
  const t = useTranslations("Base");

  const handleSubmit = async ({ email }: { email: string }) => {
    const error = await requestToChangePasswordByEmailFx({ email });

    if (error) {
      onFail(error.message);
    } else {
      onSuccess(t("we_send_password_reset"));
    }
  };

  return (
    <Tab
      name="forgotPassword"
      title={t("password_recovery")}
      description={t("enter_email_address")}
    >
      <EmailForm onSubmit={handleSubmit} />
    </Tab>
  );
}
