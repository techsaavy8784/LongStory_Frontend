import { Like } from "./product";
import { MethodsInterface } from "@/components/mybag/payment/payment";
export type Address = {
  id?: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;

  is_default?: boolean;
  is_deleted?: boolean;
  created_at?: Date;
  modified_at?: Date;

  user_id?: number;
};

export type Payment = {
  id?: number;
  method?: keyof MethodsInterface;
  provider: string;
  name?: string;
  date?: string;
  cvc?: string;
  status?: string;

  is_default?: boolean;
  is_deleted?: boolean;
  created_at?: Date;
  modified_at?: Date;

  user_id?: number;
};

export type UserLike = {
  id: number;
  username: string;
  email: string;
  avatar_url: string;
};

export type Follow = {
  id: number;
  followee_id: number;
  follower_id: number;
  is_accepted: boolean;

  is_active?: boolean;
  is_deleted?: boolean;
  created_at?: Date;
  modified_at?: Date;
};

export type User = {
  id: number;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  country?: string;
  avatar_url?: string;
  order_count: number;
  total_spent: number;
  auth_status: number;
  approved_status: string;
  is_approved: string;
  mail_verified: string;
  id_verified: string;
  is_online: boolean;
  is_vip: boolean;
  is_private: boolean;
  approved_at: Date;
  birthday?: string;

  is_deleted?: boolean;
  created_at?: Date;
  modified_at?: Date;

  addresses: Address[];
  likes: Like[];
  followers: Follow[];
  followees: Follow[];
};
