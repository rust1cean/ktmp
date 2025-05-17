"use client";

import { MapPin, Phone, UsersRound, Box } from "lucide-react";

import { capitalizeFirstLetter } from "@/shared/format-string";
import { Badge } from "@/shared/shadcn-ui/badge";

export type PostBadgesProps = {
  category?: string;
  address?: string;
  phone?: string;
  minAge?: string | number;
  maxAge?: string | number;
};

export function PostBadges({
  category,
  minAge,
  maxAge,
  address,
  phone,
}: PostBadgesProps) {
  return (
    <div className="flex flex-wrap gap-1">
      <CategoryBadge category={category} />
      <AgeBoundariesBadge minAge={minAge} maxAge={maxAge} />
      <AddressBadge address={address} />
      <PhoneBadge phone={phone} />
    </div>
  );
}

export function AddressBadge({ address }: { address?: string }) {
  if (address) {
    return (
      <Badge
        className="max-w-full select-all border text-red-800/80 dark:text-red-400/80 border-red-800/30 dark:border-red-400/40"
        variant="outline"
      >
        <MapPin className="min-w-fit" />
        <span className="truncate">{address}</span>
      </Badge>
    );
  }
}

export function PhoneBadge({ phone }: { phone?: string }) {
  return (
    <Badge
      className="max-w-full select-all border text-green-800/80 dark:text-green-400/80 border-green-800/30 dark:border-green-400/40"
      variant="outline"
    >
      <Phone className="min-w-fit" />
      <span className="truncate">Phone: {phone}</span>
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
  if (minAge != null || maxAge != null) {
    const AgeBoundaries = () => {
      if (minAge != null && maxAge != null) return `Age: ${minAge}-${maxAge}`;
      if (minAge != null && maxAge == null) return `From ${minAge}`;
      if (minAge == null && maxAge != null) return `To ${maxAge}`;
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
  if (category) {
    return (
      <Badge
        className="max-w-full select-all border text-sky-800/80 dark:text-sky-400/80 border-sky-800/30 dark:border-sky-400/40"
        variant="outline"
      >
        <Box className="min-w-fit" />
        <span className="truncate">{capitalizeFirstLetter(category)}</span>
      </Badge>
    );
  }
}
