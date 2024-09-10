import { UserLike } from "./user";
export type Category = {
  id: number | null;
  name: string;
  description?: string;

  created_at?: Date;
  modified_at?: Date;
  is_active?: boolean;
};

export type Metadata = {
  id: number;
  field?: string;
  value?: string;
  index: number;

  created_at?: Date;
  modified_at?: Date;
  is_active?: boolean;

  variant_id: number;
};

export type Media = {
  id: number;
  url: string;
  index: number;

  created_at?: Date;
  modified_at?: Date;
  is_active?: boolean;

  variant_id: number;
};

export type Inventory = {
  variant_id: number;
  price?: number;
  currency?: string;
  quantity?: number;

  is_active?: boolean;
};

export type Variant = {
  id: number;
  product_id: number;
  index: number;

  metadata: Metadata[];
  media: Media[];
  inventory: Inventory;

  created_at?: Date;
  modified_at?: Date;
  is_active?: boolean;
};

export type ProductLike = {
  id: number;
  name: string;
  variants: Variant[];
};

export type ProductOrder = {
  id: number;
  name: string;
  category: Category;
  variants: Variant[];
};

export type Like = {
  user: UserLike;
  product: ProductLike;
};

export type Product = {
  id: number;
  category_id: number;
  name: string;
  description?: string;
  source_url?: string;
  price?: number;
  currency?: string;

  created_at?: Date;
  modified_at?: Date;
  published_at?: Date;
  is_active?: boolean;
  is_published?: boolean;

  variants: Variant[];
  likes: Like[];
};
