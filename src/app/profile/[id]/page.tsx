"use client";

import { useParams } from "next/navigation";
import { useUnit } from "effector-react";
import { Pen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { PostFeed } from "@/widgets/post-feed";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/shadcn/shadcn-ui/avatar";
import {
  EditPostModal,
  openPostCreator,
  openPostEditor,
} from "@/features/post-editor-modal";
import { openPostDetailsModal } from "@/widgets/post-details-modal";

import {
  $userDrafts,
  $userPosts,
  getUserDraftsFx,
  getUserPostsFx,
} from "@/entities/post";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/shadcn/shadcn-ui/tabs";

import { becomeAuthorFx, getProfileFx, Profile } from "@/entities/profile";
import { Loader } from "@/shared/shadcn/shadcn-ui/loader";
import { userDraftsCleared, userPostsCleared } from "@/entities/post/store";
import { capitalizeFirstLetter } from "@/shared/format-string";
import { $myId } from "@/entities/auth";
import { $isAuthor } from "@/entities/profile";
import { PendingButton } from "@/shared/shadcn/shadcn-ui/button";

export default function ProfilePage() {
  const { id: profileId } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);

  const [clearPosts, clearDrafts] = useUnit([
    userPostsCleared,
    userDraftsCleared,
  ]);

  const [onOpenPostCreator, onOpenPostEditor] = useUnit([
    openPostCreator,
    openPostEditor,
  ]);

  const [myId, isAuthor] = useUnit([$myId, $isAuthor]);

  const isMyProfile = useMemo(() => profileId === myId, [profileId, myId]);
  const isAuthorIsMe = useMemo(
    () => isMyProfile && isAuthor,
    [isMyProfile, isAuthor]
  );

  useEffect(() => {
    clearPosts();
    clearDrafts();

    getProfileFx({ profileId }).then(setProfile);
  }, [clearDrafts, clearPosts, isAuthor, isMyProfile, myId, profileId]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <User profile={profile} myId={myId} isMyProfile={isMyProfile} />
        <Tabs defaultValue="posts">
          {isAuthorIsMe && (
            <TabsList className="w-full h-fit">
              <TabsTrigger className="p-2 text-md font-regular" value="posts">
                My posts
              </TabsTrigger>
              <TabsTrigger className="p-2 text-md font-regular" value="drafts">
                My drafts
              </TabsTrigger>
            </TabsList>
          )}
          <TabsContent value="posts">
            <PostFeed
              title={capitalizeFirstLetter(
                profile ? `${profile.name}'s posts` : ""
              )}
              $posts={$userPosts}
              onRequestPosts={({ offset }) =>
                getUserPostsFx({ authorId: profileId, offset })
              }
              onOpenPostDetails={openPostDetailsModal}
              onOpenPostCreator={onOpenPostCreator}
              onOpenPostEditor={onOpenPostEditor}
              showAddPostButton={isAuthorIsMe}
              showFavoriteButtons={isMyProfile === false}
              showEditButtons={isAuthorIsMe}
              showDeleteButtons={isAuthorIsMe}
              showToggleDraftButton={isAuthorIsMe}
            />
          </TabsContent>
          {isAuthorIsMe && (
            <TabsContent value="drafts">
              <PostFeed
                title={capitalizeFirstLetter(
                  profile ? `${profile.name}'s drafts` : ""
                )}
                $posts={$userDrafts}
                isDraft={true}
                onRequestPosts={({ offset }) =>
                  getUserDraftsFx({ authorId: profileId, offset })
                }
                onOpenPostDetails={openPostDetailsModal}
                onOpenPostCreator={onOpenPostCreator}
                onOpenPostEditor={onOpenPostEditor}
                showFavoriteButtons={false}
                showEditButtons={true}
                showDeleteButtons={true}
                showToggleDraftButton={isAuthorIsMe}
              />
            </TabsContent>
          )}
        </Tabs>
      </div>
      <EditPostModal getUserId={() => myId} />
    </>
  );
}

function User({
  profile,
  myId,
  isMyProfile,
}: {
  profile: Profile | null;
  isMyProfile: boolean;
  myId: string | null | undefined;
}) {
  const textName = capitalizeFirstLetter(profile?.name ?? "");
  const isUser = profile?.role === "user";
  const isAuthor = profile?.role === "author";

  return (
    <div className="w-full p-4 flex flex-col sm:flex-row items-center gap-4 rounded-3xl border bg-muted">
      <Avatar className="size-42 object-cover text-4xl flex items-center justify-center border-2">
        {profile ? (
          <>
            <AvatarImage
              src={profile.avatarUrl}
              alt="Avatar"
              className="object-cover"
            />
            <AvatarFallback>{textName.at(0)}</AvatarFallback>
          </>
        ) : (
          <Loader />
        )}
      </Avatar>
      <div className="flex items-center sm:items-baseline gap-2">
        <span className="text-2xl leading-none">{textName}</span>
        {isAuthor && <span className="text-xl">(author)</span>}
        {isUser && isMyProfile && myId && (
          <PendingButton
            size="sm"
            variant="outline"
            icon={<Pen />}
            text="Become author"
            onClick={() => becomeAuthorFx({ profileId: myId })}
          />
        )}
      </div>
    </div>
  );
}
