"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useUnit } from "effector-react";
import { HeartIcon } from "lucide-react";

import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { Button } from "@/shared/shadcn/shadcn-ui/button";
import {
  SearchBar,
  type SearchBarFilters,
} from "@/widgets/header/components/search-bar";
import { AuthModal } from "@/features/auth-modal";
import { Logo } from "@/widgets/header/components/logo";
import { ModeSwitcher } from "@/widgets/header/components/mode-switcher";
import { Menu } from "@/widgets/header/components/menu";
import { searchPostsCleared } from "@/entities/post/store";
import { $myProfile } from "@/entities/profile/store";

export type HeaderProps = {
  onNotifyUser: (msg: string) => void;
};

export function Header({ onNotifyUser }: HeaderProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return isMobile ? (
    <HeaderMobile onNotifyUser={onNotifyUser} />
  ) : (
    <HeaderDesktop onNotifyUser={onNotifyUser} />
  );
}

export function HeaderMobile({ onNotifyUser }: HeaderProps) {
  let { query } = useParams<{ query: string | undefined }>();
  query = query ? decodeURIComponent(query) : "";
  const router = useRouter();
  const profile = useUnit($myProfile);

  const handleSubmit = async ({ query }: SearchBarFilters) => {
    searchPostsCleared();
    router.push(`/search/${query}`);
  };

  return (
    <header className="w-full px-[3vw] py-4 sticky top-0 z-50 flex flex-col gap-4 border-b backdrop-blur-lg bg-muted/80">
      <div className="w-full flex justify-between">
        <Logo />
        <nav className="flex items-center justify-end gap-2">
          <ModeSwitcher />
          <Favorites />
          <Menu profile={profile} onNotifyUser={onNotifyUser} />
        </nav>
      </div>
      <SearchBar onSubmit={handleSubmit} searchFilters={{ query }} />
      <AuthModal onNotifyUser={onNotifyUser} />
    </header>
  );
}

export function HeaderDesktop({ onNotifyUser }: HeaderProps) {
  let { query } = useParams<{ query: string | undefined }>();
  query = query ? decodeURIComponent(query) : "";
  const router = useRouter();
  const profile = useUnit($myProfile);

  const handleSubmit = async ({ query }: SearchBarFilters) => {
    searchPostsCleared();
    router.push(`/search/${query}`);
  };

  return (
    <header className="sticky top-0 z-50 px-[3vw] lg:px-[10vw] 2xl:px-[25vw] w-full h-16 grid grid-cols-3 items-center border-b backdrop-blur-lg bg-muted/80">
      <Logo />
      <SearchBar onSubmit={handleSubmit} searchFilters={{ query }} />
      <nav className="flex items-center justify-end gap-2">
        <ModeSwitcher />
        <Favorites />
        <Menu profile={profile} onNotifyUser={onNotifyUser} />
      </nav>
      <AuthModal onNotifyUser={onNotifyUser} />
    </header>
  );
}

function Favorites() {
  return (
    <Link href="/favorites">
      <Button variant="outline">
        <HeartIcon />
      </Button>
    </Link>
  );
}
