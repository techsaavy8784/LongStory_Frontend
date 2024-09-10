import { Address, Payment } from "./user";
import { ProductOrder } from "./product";

export type OrderItem = {
  id?: number;
  quantity: number;
  created_at?: string;
  modified_at?: string;

  order_detail_id?: number;
  product: ProductOrder;
};

export type OrderDetail = {
  id?: number;
  order_status: string;
  created_at?: string;
  modified_at?: string;

  shipping_address: Address;
  billing_address: Address;
  payment: Payment;

  user_id: number;
  order_items: OrderItem[];
};
