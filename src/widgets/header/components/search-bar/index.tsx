import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Filter, Search } from "lucide-react";

import { Form } from "@/shared/shadcn/shadcn-ui/form";
import { FormField } from "@/shared/shadcn/shadcn-ui/form-field";
import { Button } from "@/shared/shadcn/shadcn-ui/button";
import { Input } from "@/shared/shadcn/shadcn-ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from "@/shared/shadcn/shadcn-ui/dropdown-menu";
import { POST_CATEGORIES, type PostCategory } from "@/shared/data/post/api";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export const searchBarFormSchema = z.object({
  query: z.string().min(3),
  category: z.enum(POST_CATEGORIES).optional(),
  ageFrom: z.number().optional(),
});

export type SearchBarFilters = z.infer<typeof searchBarFormSchema>;

export type SearchBarProps = {
  onSubmit: (formData: SearchBarFilters) => Promise<void>;
  searchFilters?: SearchBarFilters;
  className?: string;
};

export function SearchBar({
  onSubmit,
  searchFilters,
  className,
}: SearchBarProps) {
  const t = useTranslations("Base");
  const searchBarForm = useForm<SearchBarFilters>({
    resolver: zodResolver(searchBarFormSchema),
  });

  useEffect(() => {
    if (searchFilters?.query != null)
      searchBarForm.setValue("query", searchFilters.query);

    if (searchFilters?.ageFrom != null)
      searchBarForm.setValue("ageFrom", searchFilters.ageFrom);

    if (searchFilters?.category != null)
      searchBarForm.setValue("category", searchFilters.category);
  }, [
    searchBarForm,
    searchFilters?.ageFrom,
    searchFilters?.category,
    searchFilters?.query,
  ]);

  const ageFrom = searchBarForm.watch("ageFrom");
  const category = searchBarForm.watch("category");

  return (
    <Form {...searchBarForm}>
      <form
        className={twMerge(className, "flex items-center gap-2")}
        onSubmit={searchBarForm.handleSubmit(onSubmit)}
      >
        <DropdownMenu>
          <FiltersTrigger />
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => searchBarForm.reset()}>
              {t("reset")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <SelectAge
              placeholder={
                ageFrom != null ? `${t("age_from")}: ${ageFrom}` : null
              }
              onSelect={(ageFrom) => {
                searchBarForm.setValue("ageFrom", ageFrom, {
                  shouldDirty: true,
                });
              }}
            />
            <SelectCategory
              placeholder={
                category && `${t("category")}: ${category.replaceAll("_", " ")}`
              }
              onSelect={(category) =>
                searchBarForm.setValue("category", category, {
                  shouldDirty: true,
                })
              }
            />
          </DropdownMenuContent>
        </DropdownMenu>
        <FormField
          name="query"
          className="w-full"
          showMessage={false}
          render={({ field }) => (
            <Input
              className="text-center bg-background"
              type="text"
              aria-label={t("search")}
              placeholder={t("search")}
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          )}
        />
        <Button type="submit" variant="outline">
          <Search />
        </Button>
      </form>
    </Form>
  );
}

const FiltersTrigger = () => {
  return (
    <DropdownMenuTrigger asChild>
      <Button variant="outline">
        <Filter />
      </Button>
    </DropdownMenuTrigger>
  );
};

function SelectAge({
  placeholder,
  onSelect,
}: {
  placeholder?: string | number | null;
  onSelect: (ageFrom: number) => void;
}) {
  const t = useTranslations("Base");

  const ageFromVariants = [
    { label: `${t("from")} 3`, value: "3" },
    { label: `${t("from")} 6`, value: "6" },
    { label: `${t("from")} 12`, value: "12" },
    { label: `${t("from")} 14`, value: "14" },
  ];

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        {placeholder ?? t("select_age")}
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {ageFromVariants.map(({ label, value }) => (
            <DropdownMenuItem
              key={value}
              onSelect={() => onSelect(Number(value))}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

function SelectCategory({
  placeholder,
  onSelect,
}: {
  placeholder?: string | number | null;
  onSelect: (category: PostCategory) => void;
}) {
  const t = useTranslations("Base");
  const c = useTranslations("PostCategories");

  const Categories = () =>
    POST_CATEGORIES.map(
      (category) =>
        category !== "none" && (
          <DropdownMenuItem key={category} onSelect={() => onSelect(category)}>
            {c(category)}
          </DropdownMenuItem>
        )
    );

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        {placeholder ?? t("category")}
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <Categories />
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
