import { NewPasswordForm } from "@/features/auth-modal/forms";
import { updatePasswordFx } from "@/entities/auth";
import { Tab } from "@/features/auth-modal/tabs";
import { useTranslations } from "next-intl";

export type ResetPasswordTabProps = {
  onSuccess: (msg: string) => void;
  onFail: (reason: string) => void;
};

export function ResetPasswordTab({ onSuccess, onFail }: ResetPasswordTabProps) {
  const t = useTranslations("Base");

  const handleSubmit = async ({ password }: { password: string }) => {
    const error = await updatePasswordFx({ password });

    if (error) onFail(error.message);
    else onSuccess(t("password_updated"));
  };

  return (
    <Tab
      name="resetPassword"
      title={t("reset_password")}
      description={t("please_enter_new_password")}
    >
      <NewPasswordForm onSubmit={handleSubmit} />
    </Tab>
  );
}
