export type Json = string | number | boolean | null | {[key: string]: Json | undefined} | Json[]

export type Database = {
  expenses: {
    Tables: {
      activity: {
        Row: {
          action_type: string
          created_at: string | null
          expense_id: string | null
          group_id: string | null
          id: string
          metadata: Json | null
          settlement_id: string | null
          user_id: string
        }
        Insert: {
          action_type: string
          created_at?: string | null
          expense_id?: string | null
          group_id?: string | null
          id?: string
          metadata?: Json | null
          settlement_id?: string | null
          user_id: string
        }
        Update: {
          action_type?: string
          created_at?: string | null
          expense_id?: string | null
          group_id?: string | null
          id?: string
          metadata?: Json | null
          settlement_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'activity_expense_id_fkey'
            columns: ['expense_id']
            isOneToOne: false
            referencedRelation: 'expenses'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'activity_group_id_fkey'
            columns: ['group_id']
            isOneToOne: false
            referencedRelation: 'groups'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'activity_settlement_id_fkey'
            columns: ['settlement_id']
            isOneToOne: false
            referencedRelation: 'settlements'
            referencedColumns: ['id']
          },
        ]
      }
      expense_payers: {
        Row: {
          amount: number
          expense_id: string
          friend_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          amount: number
          expense_id: string
          friend_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          expense_id?: string
          friend_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'expense_payers_expense_id_fkey'
            columns: ['expense_id']
            isOneToOne: false
            referencedRelation: 'expenses'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'expense_payers_friend_id_fkey'
            columns: ['friend_id']
            isOneToOne: false
            referencedRelation: 'friends'
            referencedColumns: ['id']
          },
        ]
      }
      expense_splits: {
        Row: {
          amount: number
          expense_id: string
          friend_id: string | null
          id: string
          percentage: number | null
          split_type: string
          user_id: string | null
        }
        Insert: {
          amount: number
          expense_id: string
          friend_id?: string | null
          id?: string
          percentage?: number | null
          split_type: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          expense_id?: string
          friend_id?: string | null
          id?: string
          percentage?: number | null
          split_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'expense_splits_expense_id_fkey'
            columns: ['expense_id']
            isOneToOne: false
            referencedRelation: 'expenses'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'expense_splits_friend_id_fkey'
            columns: ['friend_id']
            isOneToOne: false
            referencedRelation: 'friends'
            referencedColumns: ['id']
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          category: string | null
          created_at: string | null
          created_by: string
          currency: string | null
          description: string
          group_id: string | null
          id: string
          receipt_url: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          category?: string | null
          created_at?: string | null
          created_by: string
          currency?: string | null
          description: string
          group_id?: string | null
          id?: string
          receipt_url?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string | null
          created_by?: string
          currency?: string | null
          description?: string
          group_id?: string | null
          id?: string
          receipt_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'expenses_group_id_fkey'
            columns: ['group_id']
            isOneToOne: false
            referencedRelation: 'groups'
            referencedColumns: ['id']
          },
        ]
      }
      friends: {
        Row: {
          created_at: string | null
          friend_email: string | null
          friend_name: string
          friend_phone: string | null
          friend_user_id: string | null
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          friend_email?: string | null
          friend_name: string
          friend_phone?: string | null
          friend_user_id?: string | null
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          friend_email?: string | null
          friend_name?: string
          friend_phone?: string | null
          friend_user_id?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      group_members: {
        Row: {
          group_id: string
          id: string
          joined_at: string | null
          nickname: string | null
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string | null
          nickname?: string | null
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string | null
          nickname?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'group_members_group_id_fkey'
            columns: ['group_id']
            isOneToOne: false
            referencedRelation: 'groups'
            referencedColumns: ['id']
          },
        ]
      }
      groups: {
        Row: {
          created_at: string | null
          created_by: string
          currency: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          currency?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          currency?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      invitations: {
        Row: {
          id: string
          inviter_id: string
          invited_name: string
          invited_email: string | null
          invited_phone: string | null
          code: string
          status: string
          created_at: string | null
        }
        Insert: {
          id?: string
          inviter_id: string
          invited_name: string
          invited_email?: string | null
          invited_phone?: string | null
          code: string
          status?: string
          created_at?: string | null
        }
        Update: {
          id?: string
          inviter_id?: string
          invited_name?: string
          invited_email?: string | null
          invited_phone?: string | null
          code?: string
          status?: string
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'invitations_inviter_id_fkey'
            columns: ['inviter_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      settlements: {
        Row: {
          amount: number
          currency: string | null
          from_user_id: string
          group_id: string | null
          id: string
          note: string | null
          settled_at: string | null
          to_friend_id: string | null
          to_user_id: string | null
        }
        Insert: {
          amount: number
          currency?: string | null
          from_user_id: string
          group_id?: string | null
          id?: string
          note?: string | null
          settled_at?: string | null
          to_friend_id?: string | null
          to_user_id?: string | null
        }
        Update: {
          amount?: number
          currency?: string | null
          from_user_id?: string
          group_id?: string | null
          id?: string
          note?: string | null
          settled_at?: string | null
          to_friend_id?: string | null
          to_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'settlements_group_id_fkey'
            columns: ['group_id']
            isOneToOne: false
            referencedRelation: 'groups'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'settlements_to_friend_id_fkey'
            columns: ['to_friend_id']
            isOneToOne: false
            referencedRelation: 'friends'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      gtrgm_compress: {
        Args: {
          '': unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          '': unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          '': unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          '': unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          '': unknown
        }
        Returns: unknown
      }
      set_limit: {
        Args: {
          '': number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          '': string
        }
        Returns: string[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  snails: {
    Tables: {
      chat_messages: {
        Row: {
          citation_title: string | null
          citation_url: string | null
          created_at: string | null
          id: string
          is_user: boolean
          message: string
          snail_id: string
        }
        Insert: {
          citation_title?: string | null
          citation_url?: string | null
          created_at?: string | null
          id?: string
          is_user?: boolean
          message: string
          snail_id: string
        }
        Update: {
          citation_title?: string | null
          citation_url?: string | null
          created_at?: string | null
          id?: string
          is_user?: boolean
          message?: string
          snail_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'chat_messages_snail_id_fkey'
            columns: ['snail_id']
            isOneToOne: false
            referencedRelation: 'snails'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'fk_snail'
            columns: ['snail_id']
            isOneToOne: false
            referencedRelation: 'snails'
            referencedColumns: ['id']
          },
        ]
      }
      classes: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          phylum_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          phylum_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          phylum_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'classes_phylum_id_fkey'
            columns: ['phylum_id']
            isOneToOne: false
            referencedRelation: 'phylums'
            referencedColumns: ['id']
          },
        ]
      }
      expert_chat_messages: {
        Row: {
          citation_title: string | null
          citation_url: string | null
          created_at: string | null
          id: string
          is_user: boolean
          message: string
        }
        Insert: {
          citation_title?: string | null
          citation_url?: string | null
          created_at?: string | null
          id?: string
          is_user?: boolean
          message: string
        }
        Update: {
          citation_title?: string | null
          citation_url?: string | null
          created_at?: string | null
          id?: string
          is_user?: boolean
          message?: string
        }
        Relationships: []
      }
      families: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          order_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          order_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          order_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'families_order_id_fkey'
            columns: ['order_id']
            isOneToOne: false
            referencedRelation: 'orders'
            referencedColumns: ['id']
          },
        ]
      }
      genera: {
        Row: {
          created_at: string | null
          description: string | null
          family_id: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          family_id: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          family_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'genera_family_id_fkey'
            columns: ['family_id']
            isOneToOne: false
            referencedRelation: 'families'
            referencedColumns: ['id']
          },
        ]
      }
      kingdoms: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      onboarding: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          selected_goals: string[] | null
          selected_sources: string[] | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          selected_goals?: string[] | null
          selected_sources?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          selected_goals?: string[] | null
          selected_sources?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          class_id: string
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          class_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          class_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'orders_class_id_fkey'
            columns: ['class_id']
            isOneToOne: false
            referencedRelation: 'classes'
            referencedColumns: ['id']
          },
        ]
      }
      phylums: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          kingdom_id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          kingdom_id: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          kingdom_id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'phylums_kingdom_id_fkey'
            columns: ['kingdom_id']
            isOneToOne: false
            referencedRelation: 'kingdoms'
            referencedColumns: ['id']
          },
        ]
      }
      snails: {
        Row: {
          appearance: string | null
          care_feeding: string | null
          care_housing: string | null
          care_reproduction: string | null
          care_transport: string | null
          class: string | null
          common_name: string
          created_at: string
          description: string | null
          diet: string | null
          distribution_coordinates: Json | null
          distribution_countries: string[] | null
          distribution_regions: string[] | null
          ecology_food: string | null
          ecology_habitat: string | null
          ecology_life_cycle: string | null
          ecology_status: string | null
          family: string | null
          fun_facts: Json | null
          genus: string | null
          habitat: string | null
          id: string
          identification_tips: string | null
          image_url: string | null
          is_favorite: boolean | null
          kingdom: string | null
          order_name: string | null
          phylum: string | null
          scientific_name: string | null
          species: string | null
          status: string | null
          subclass: string | null
          superfamily: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          appearance?: string | null
          care_feeding?: string | null
          care_housing?: string | null
          care_reproduction?: string | null
          care_transport?: string | null
          class?: string | null
          common_name: string
          created_at?: string
          description?: string | null
          diet?: string | null
          distribution_coordinates?: Json | null
          distribution_countries?: string[] | null
          distribution_regions?: string[] | null
          ecology_food?: string | null
          ecology_habitat?: string | null
          ecology_life_cycle?: string | null
          ecology_status?: string | null
          family?: string | null
          fun_facts?: Json | null
          genus?: string | null
          habitat?: string | null
          id?: string
          identification_tips?: string | null
          image_url?: string | null
          is_favorite?: boolean | null
          kingdom?: string | null
          order_name?: string | null
          phylum?: string | null
          scientific_name?: string | null
          species?: string | null
          status?: string | null
          subclass?: string | null
          superfamily?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          appearance?: string | null
          care_feeding?: string | null
          care_housing?: string | null
          care_reproduction?: string | null
          care_transport?: string | null
          class?: string | null
          common_name?: string
          created_at?: string
          description?: string | null
          diet?: string | null
          distribution_coordinates?: Json | null
          distribution_countries?: string[] | null
          distribution_regions?: string[] | null
          ecology_food?: string | null
          ecology_habitat?: string | null
          ecology_life_cycle?: string | null
          ecology_status?: string | null
          family?: string | null
          fun_facts?: Json | null
          genus?: string | null
          habitat?: string | null
          id?: string
          identification_tips?: string | null
          image_url?: string | null
          is_favorite?: boolean | null
          kingdom?: string | null
          order_name?: string | null
          phylum?: string | null
          scientific_name?: string | null
          species?: string | null
          status?: string | null
          subclass?: string | null
          superfamily?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      species: {
        Row: {
          additional_data: Json | null
          alternative_names: string[] | null
          common_name: string
          created_at: string | null
          genus_id: string
          id: string
          image_urls: string[] | null
          popularity_score: number | null
          primary_image_url: string | null
          scientific_name: string
          taxon_key: number | null
          updated_at: string | null
        }
        Insert: {
          additional_data?: Json | null
          alternative_names?: string[] | null
          common_name: string
          created_at?: string | null
          genus_id: string
          id?: string
          image_urls?: string[] | null
          popularity_score?: number | null
          primary_image_url?: string | null
          scientific_name: string
          taxon_key?: number | null
          updated_at?: string | null
        }
        Update: {
          additional_data?: Json | null
          alternative_names?: string[] | null
          common_name?: string
          created_at?: string | null
          genus_id?: string
          id?: string
          image_urls?: string[] | null
          popularity_score?: number | null
          primary_image_url?: string | null
          scientific_name?: string
          taxon_key?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'species_genus_id_fkey'
            columns: ['genus_id']
            isOneToOne: false
            referencedRelation: 'genera'
            referencedColumns: ['id']
          },
        ]
      }
      species_characteristics: {
        Row: {
          characteristic_name: string
          characteristic_type: string
          characteristic_value: string
          created_at: string | null
          id: string
          species_id: string
        }
        Insert: {
          characteristic_name: string
          characteristic_type: string
          characteristic_value: string
          created_at?: string | null
          id?: string
          species_id: string
        }
        Update: {
          characteristic_name?: string
          characteristic_type?: string
          characteristic_value?: string
          created_at?: string | null
          id?: string
          species_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'species_characteristics_species_id_fkey'
            columns: ['species_id']
            isOneToOne: false
            referencedRelation: 'species'
            referencedColumns: ['id']
          },
        ]
      }
      species_relationships: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          relationship_type: string
          species_a_id: string
          species_b_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          relationship_type: string
          species_a_id: string
          species_b_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          relationship_type?: string
          species_a_id?: string
          species_b_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'species_relationships_species_a_id_fkey'
            columns: ['species_a_id']
            isOneToOne: false
            referencedRelation: 'species'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'species_relationships_species_b_id_fkey'
            columns: ['species_b_id']
            isOneToOne: false
            referencedRelation: 'species'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_popularity: {
        Args: {
          species_uuid: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | {schema: keyof Database},
  EnumName extends PublicEnumNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends {schema: keyof Database}
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | {schema: keyof Database},
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {schema: keyof Database}
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never
