export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      deprecated_profile_avatar: {
        Row: {
          format: Database["public"]["Enums"]["image_type"] | null;
          path: string;
          profile_id: string;
          size: number;
          updated_at: string;
        };
        Insert: {
          format?: Database["public"]["Enums"]["image_type"] | null;
          path: string;
          profile_id: string;
          size: number;
          updated_at?: string;
        };
        Update: {
          format?: Database["public"]["Enums"]["image_type"] | null;
          path?: string;
          profile_id?: string;
          size?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profile_avatar_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: true;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profile_avatar_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: true;
            referencedRelation: "user_profile_view";
            referencedColumns: ["id"];
          }
        ];
      };
      post: {
        Row: {
          address: string | null;
          author: string;
          category: Database["public"]["Enums"]["categories"];
          description: string;
          draft: boolean;
          id: string;
          max_age: number;
          min_age: number;
          phone: string;
          postcode: number | null;
          price: number | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          address?: string | null;
          author: string;
          category?: Database["public"]["Enums"]["categories"];
          description?: string;
          draft?: boolean;
          id: string;
          max_age?: number;
          min_age?: number;
          phone: string;
          postcode?: number | null;
          price?: number | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          address?: string | null;
          author?: string;
          category?: Database["public"]["Enums"]["categories"];
          description?: string;
          draft?: boolean;
          id?: string;
          max_age?: number;
          min_age?: number;
          phone?: string;
          postcode?: number | null;
          price?: number | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "post_author_fkey";
            columns: ["author"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_author_fkey";
            columns: ["author"];
            isOneToOne: false;
            referencedRelation: "user_profile_view";
            referencedColumns: ["id"];
          }
        ];
      };
      post_favorite: {
        Row: {
          id: string;
          post_id: string;
          profile_id: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          profile_id: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          profile_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "post_favorite_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_favorite_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_favorite_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_favorite_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "user_profile_view";
            referencedColumns: ["id"];
          }
        ];
      };
      post_geocode: {
        Row: {
          latitude: number | null;
          longitude: number | null;
          post_id: string;
        };
        Insert: {
          latitude?: number | null;
          longitude?: number | null;
          post_id?: string;
        };
        Update: {
          latitude?: number | null;
          longitude?: number | null;
          post_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "post_geocode_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: true;
            referencedRelation: "post";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_geocode_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: true;
            referencedRelation: "post_view";
            referencedColumns: ["id"];
          }
        ];
      };
      post_image: {
        Row: {
          extension: Database["public"]["Enums"]["image_type"] | null;
          id: string;
          path: string;
          post_id: string;
          size: number;
          updated_at: string;
        };
        Insert: {
          extension?: Database["public"]["Enums"]["image_type"] | null;
          id?: string;
          path: string;
          post_id: string;
          size: number;
          updated_at?: string;
        };
        Update: {
          extension?: Database["public"]["Enums"]["image_type"] | null;
          id?: string;
          path?: string;
          post_id?: string;
          size?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "post_image_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_image_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "post_view";
            referencedColumns: ["id"];
          }
        ];
      };
      profile: {
        Row: {
          city: string | null;
          created_at: string;
          id: string;
          name: string;
          role: Database["public"]["Enums"]["roles"];
        };
        Insert: {
          city?: string | null;
          created_at?: string;
          id: string;
          name: string;
          role?: Database["public"]["Enums"]["roles"];
        };
        Update: {
          city?: string | null;
          created_at?: string;
          id?: string;
          name?: string;
          role?: Database["public"]["Enums"]["roles"];
        };
        Relationships: [];
      };
      profile_avatar: {
        Row: {
          created_at: string;
          id: string;
          image_path: string;
          profile_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          image_path: string;
          profile_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          image_path?: string;
          profile_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profile_avatar_profile_id_fkey1";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profile_avatar_profile_id_fkey1";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "user_profile_view";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      post_view: {
        Row: {
          address: string | null;
          author: string | null;
          author_name: string | null;
          avatar_path: string | null;
          category: Database["public"]["Enums"]["categories"] | null;
          description: string | null;
          draft: boolean | null;
          id: string | null;
          image_path: string | null;
          is_author: boolean | null;
          is_favorited: boolean | null;
          max_age: number | null;
          min_age: number | null;
          phone: string | null;
          postcode: number | null;
          price: number | null;
          title: string | null;
          updated_at: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "post_author_fkey";
            columns: ["author"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_author_fkey";
            columns: ["author"];
            isOneToOne: false;
            referencedRelation: "user_profile_view";
            referencedColumns: ["id"];
          }
        ];
      };
      user_profile_view: {
        Row: {
          id: string | null;
          image_path: string | null;
          name: string | null;
          role: Database["public"]["Enums"]["roles"] | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      cleanup_unlinked_post_images: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      cleanup_unlinked_profile_avatars: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
    };
    Enums: {
      categories:
        | "programming"
        | "sport"
        | "math"
        | "informatics"
        | "art"
        | "design"
        | "architecture"
        | "social_science"
        | "biology"
        | "ecology"
        | "chemistry"
        | "history"
        | "none";
      image_type: "png" | "jpeg" | "jpg";
      roles: "user" | "author";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {
      categories: [
        "programming",
        "sport",
        "math",
        "informatics",
        "art",
        "design",
        "architecture",
        "social_science",
        "biology",
        "ecology",
        "chemistry",
        "history",
        "none",
      ],
      image_type: ["png", "jpeg", "jpg"],
      roles: ["user", "author"],
    },
  },
} as const;
