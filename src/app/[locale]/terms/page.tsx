"use client";

import { useTranslations } from "next-intl";

// TODO: add terms

export default function ProfilePage() {
  const t = useTranslations("TermsPage");

  return (
    <article className="mx-auto max-w-180 p-8 md:p-12 flex flex-col items-center gap-4 rounded-md bg-muted">
      <h1 className="text-2xl">{t("title")}</h1>
      <p className="text-justify">{t("terms_and_conditions")}</p>
    </article>
  );
}
