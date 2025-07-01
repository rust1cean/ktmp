import { OtpCodeForm, type OtpCodeFormData } from "@/features/auth-modal/forms";
import { confirmEmailFx, resendOtpFx } from "@/entities/auth";
import { Tab } from "@/features/auth-modal/tabs";
import { useTranslations } from "next-intl";

export type ConfirmEmailTabProps = {
  email: string;
  onSuccess: (msg: string) => void;
  onFail: (reason: string) => void;
};

export function ConfirmEmailTab({
  email,
  onSuccess,
  onFail,
}: ConfirmEmailTabProps) {
  const t = useTranslations("Base");

  const handleSubmit = async ({ otpCode }: OtpCodeFormData) => {
    const { error } = await confirmEmailFx({ email, token: otpCode });

    if (error) onFail(error.message);
    else onSuccess(t("email_confirmed"));
  };

  const handleResend = async () => {
    const error = await resendOtpFx({ email });

    if (error) onFail(error.message);
  };

  return (
    <Tab
      name="confirmEmail"
      title={t("verify_your_email")}
      description={t("we_send_otp_code")}
    >
      <OtpCodeForm onSubmit={handleSubmit} onResend={handleResend} />
    </Tab>
  );
}
