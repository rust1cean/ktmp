"use client";

import { MapPin, Phone, UsersRound, Box, Mailbox } from "lucide-react";

import { capitalizeFirstLetter } from "@/shared/format-string";
import { Badge } from "@/shared/shadcn/shadcn-ui/badge";
import { useTranslations } from "next-intl";

export type PostBadgesProps = {
  category?: string;
  address?: string;
  phone?: string;
  minAge?: string | number;
  maxAge?: string | number;
  postcode?: string | number;
};

export function PostBadges({
  category,
  minAge,
  maxAge,
  address,
  phone,
  postcode,
}: PostBadgesProps) {
  return (
    <div className="flex flex-wrap gap-1">
      <CategoryBadge category={category} />
      <AgeBoundariesBadge minAge={minAge} maxAge={maxAge} />
      <AddressBadge address={address} />
      <PhoneBadge phone={phone} />
      <PostalCodeBadge postcode={postcode} />
    </div>
  );
}

export function AddressBadge({ address }: { address?: string }) {
  const t = useTranslations("Base");
  if (address) {
    return (
      <Badge
        className="max-w-full select-all border text-red-800/80 dark:text-red-400/80 border-red-800/30 dark:border-red-400/40"
        variant="outline"
      >
        <MapPin className="min-w-fit" />
        <span className="truncate">
          {t("address")}: {address}
        </span>
      </Badge>
    );
  }
}

export function PhoneBadge({ phone }: { phone?: string }) {
  const t = useTranslations("Base");

  return (
    <Badge
      className="max-w-full select-all border text-green-800/80 dark:text-green-400/80 border-green-800/30 dark:border-green-400/40"
      variant="outline"
    >
      <Phone className="min-w-fit" />
      <span className="truncate">
        {t("phone")}: {phone}
      </span>
    </Badge>
  );
}

export type AgeBoundariesBadgeProps = {
  minAge?: string | number;
  maxAge?: string | number;
};

export function AgeBoundariesBadge({
  minAge,
  maxAge,
}: AgeBoundariesBadgeProps) {
  const t = useTranslations("Base");
  if (minAge != null || maxAge != null) {
    const AgeBoundaries = () => {
      if (minAge != null && maxAge != null)
        return `${t("age")}: ${minAge}-${maxAge}`;
      if (minAge != null && maxAge == null) return `${t("from")} ${minAge}`;
      if (minAge == null && maxAge != null) return `${t("to")} ${maxAge}`;
    };

    return (
      <Badge
        className="max-w-full select-all border text-violet-800/80 dark:text-violet-400/80 border-violet-800/30 dark:border-violet-400/40"
        variant="outline"
      >
        <UsersRound className="min-w-fit" />
        <span className="truncate">
          <AgeBoundaries />
        </span>
      </Badge>
    );
  }
}

export function CategoryBadge({ category }: { category?: string }) {
  const t = useTranslations("Base");
  if (category) {
    return (
      <Badge
        className="max-w-full select-all border text-sky-800/80 dark:text-sky-400/80 border-sky-800/30 dark:border-sky-400/40"
        variant="outline"
      >
        <Box className="min-w-fit" />
        <span className="truncate">
          {t("category")}: {capitalizeFirstLetter(category)}
        </span>
      </Badge>
    );
  }
}

export function PostalCodeBadge({ postcode }: { postcode?: string | number }) {
  const t = useTranslations("Base");
  if (postcode) {
    return (
      <Badge
        className="max-w-full select-all border text-blue-800/80 dark:text-blue-400/80 border-blue-800/30 dark:border-blue-400/40"
        variant="outline"
      >
        <Mailbox className="min-w-fit" />
        <span className="truncate">
          {t("zip_code")}: {postcode}
        </span>
      </Badge>
    );
  }
}
