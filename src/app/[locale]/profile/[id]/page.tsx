"use client";

import z from "zod";
import { useParams } from "next/navigation";
import { useUnit } from "effector-react";
import { Pen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

import {
  becomeAuthorFx,
  getProfileFx,
  Profile,
  updateNameFx,
} from "@/entities/profile";
import { Loader } from "@/shared/shadcn/shadcn-ui/loader";
import { userDraftsCleared, userPostsCleared } from "@/entities/post/store";
import { capitalizeFirstLetter } from "@/shared/format-string";
import { $myId } from "@/entities/auth";
import { $isAuthor } from "@/entities/profile";
import { PendingButton } from "@/shared/shadcn/shadcn-ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/shadcn/shadcn-ui/popover";
import { InputField } from "@/shared/shadcn/shadcn-components/form-fields";
import { useTranslations } from "next-intl";

export default function ProfilePage() {
  const t = useTranslations("ProfilePage");
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
        <User
          profile={profile}
          myId={myId}
          isMyProfile={isMyProfile}
          onNameUpdate={(name) => setProfile({ ...profile!, name })}
        />
        <Tabs defaultValue="posts">
          {isAuthorIsMe && (
            <TabsList className="w-full h-fit">
              <TabsTrigger className="p-2 text-md font-regular" value="posts">
                {t("my_posts")}
              </TabsTrigger>
              <TabsTrigger className="p-2 text-md font-regular" value="drafts">
                {t("my_drafts")}
              </TabsTrigger>
            </TabsList>
          )}
          <TabsContent value="posts">
            <PostFeed
              title={capitalizeFirstLetter(profile ? t("active_posts") : "")}
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
                title={capitalizeFirstLetter(profile ? t("drafts") : "")}
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

export const nameSchema = z.object({
  name: z.string().regex(/^(\w)+$/),
});

export type NameFormData = z.infer<typeof nameSchema>;

function User({
  profile,
  myId,
  isMyProfile,
  onNameUpdate,
}: {
  profile: Profile | null;
  isMyProfile: boolean;
  myId: string | null | undefined;
  onNameUpdate: (name: string) => void;
}) {
  const t = useTranslations("ProfilePage");

  const nameForm = useForm<NameFormData>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: "" },
  });

  const username = capitalizeFirstLetter(profile?.name ?? "");
  const isUser = profile?.role === "user";
  const isAuthor = profile?.role === "author";

  const handleNameUpdate = async ({ name }: NameFormData) => {
    if (myId) {
      await updateNameFx({ name, profileId: myId });
      onNameUpdate(name);
    }
  };

  return (
    <div className="w-full p-4 flex flex-col sm:flex-row items-center gap-4 rounded-3xl border bg-muted">
      <Avatar className="relative size-36 object-cover text-4xl flex items-center justify-center border-2">
        {profile ? (
          <>
            <AvatarImage
              src={profile.avatarUrl}
              alt="Avatar"
              className="object-cover"
            />
            <AvatarFallback>{username.at(0)}</AvatarFallback>
          </>
        ) : (
          <Loader />
        )}
      </Avatar>
      <div className="flex gap-4">
        <Popover>
          <PopoverTrigger className="flex items-center sm:items-baseline gap-2">
            <span className="text-2xl leading-none">{username}</span>
            {isAuthor && <span className="text-xl">({t("author")})</span>}
          </PopoverTrigger>
          <PopoverContent>
            {isMyProfile && (
              <FormProvider {...nameForm}>
                <form
                  className="flex flex-col gap-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <InputField
                    label={t("edit_name")}
                    name="name"
                    type="text"
                    showMessage={false}
                    control={nameForm.control}
                  />
                  <PendingButton
                    text={t("update")}
                    onClick={nameForm.handleSubmit(handleNameUpdate)}
                  />
                </form>
              </FormProvider>
            )}
          </PopoverContent>
        </Popover>
        {isUser && isMyProfile && myId && (
          <PendingButton
            size="sm"
            variant="outline"
            icon={<Pen />}
            text={t("become_author")}
            onClick={() => becomeAuthorFx({ profileId: myId })}
          />
        )}
      </div>
    </div>
  );
}
