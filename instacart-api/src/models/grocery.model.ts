export interface GroceryItem {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image_url: string;
  category: string;
  in_stock: boolean;
  quantity_available: number;
}

export interface OrderItem {
  item_id: string;
  quantity: number;
}

export interface DeliveryOrder {
  order_id: string;
  external_customer_id: string;
  delivery_id: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
  estimated_delivery_time: string;
  total_amount: number;
  currency: string;
}

export interface CreateOrderResponse {
  order_id: string;
  delivery_id: string;
  status: string;
  estimated_delivery_time: string;
}
