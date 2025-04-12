import { v4 as uuidv4 } from 'uuid';
import { GroceryItem, OrderItem, DeliveryOrder, CreateOrderResponse } from '../models/grocery.model';

// Hardcoded grocery items
const groceryItems: GroceryItem[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    description: 'Fresh organic bananas, bunch of 5-7',
    price: 2.99,
    unit: 'bunch',
    image_url: 'https://images.instacart.com/image-server/394x394/filters:fill(FFF,true):format(jpg)/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_3b60b4a0-ffcd-4e9f-9c0d-9ff114e2cc0c.png',
    category: 'Produce',
    in_stock: true,
    quantity_available: 50
  },
  {
    id: '2',
    name: 'Organic Avocado',
    description: 'Ripe and ready to eat organic avocados',
    price: 1.99,
    unit: 'each',
    image_url: 'https://images.instacart.com/image-server/394x394/filters:fill(FFF,true):format(jpg)/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_a9b35a4c-a7c6-4e3d-b293-8623a439d13b.png',
    category: 'Produce',
    in_stock: true,
    quantity_available: 30
  },
  {
    id: '3',
    name: 'Whole Milk',
    description: 'Organic whole milk, 1 gallon',
    price: 4.49,
    unit: 'gallon',
    image_url: 'https://images.instacart.com/image-server/394x394/filters:fill(FFF,true):format(jpg)/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_15d39592-fc70-4b8e-be3b-d18aa003c4b1.png',
    category: 'Dairy',
    in_stock: true,
    quantity_available: 25
  },
  {
    id: '4',
    name: 'Large Brown Eggs',
    description: 'Organic free-range brown eggs, dozen',
    price: 5.99,
    unit: 'dozen',
    image_url: 'https://images.instacart.com/image-server/394x394/filters:fill(FFF,true):format(jpg)/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_45b69a8b-f0f1-4d9c-b970-58f7e1e62f30.png',
    category: 'Dairy',
    in_stock: true,
    quantity_available: 20
  },
  {
    id: '5',
    name: 'Organic Strawberries',
    description: 'Sweet and juicy organic strawberries, 16oz package',
    price: 4.99,
    unit: 'package',
    image_url: 'https://images.instacart.com/image-server/394x394/filters:fill(FFF,true):format(jpg)/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_b0e8d9c0-9507-4f39-b5c9-a4fcda526ac4.png',
    category: 'Produce',
    in_stock: true,
    quantity_available: 15
  },
  {
    id: '6',
    name: 'Organic Baby Spinach',
    description: 'Fresh organic baby spinach, 5oz package',
    price: 3.49,
    unit: 'package',
    image_url: 'https://images.instacart.com/image-server/394x394/filters:fill(FFF,true):format(jpg)/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_a612f70b-d0db-4410-9eb6-f2c5211a9d0d.png',
    category: 'Produce',
    in_stock: true,
    quantity_available: 18
  },
  {
    id: '7',
    name: 'Whole Wheat Bread',
    description: 'Organic whole wheat bread, 24oz loaf',
    price: 3.99,
    unit: 'loaf',
    image_url: 'https://images.instacart.com/image-server/394x394/filters:fill(FFF,true):format(jpg)/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_c5d3f715-6d80-4860-8550-9a118b4818fc.png',
    category: 'Bakery',
    in_stock: true,
    quantity_available: 22
  },
  {
    id: '8',
    name: 'Boneless Chicken Breast',
    description: 'Organic boneless, skinless chicken breast, 1.5lb package',
    price: 9.99,
    unit: 'package',
    image_url: 'https://images.instacart.com/image-server/394x394/filters:fill(FFF,true):format(jpg)/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_5b405355-a63c-47d2-a7c7-b9a4620bddc8.png',
    category: 'Meat',
    in_stock: true,
    quantity_available: 12
  },
  {
    id: '9',
    name: 'Atlantic Salmon Fillet',
    description: 'Fresh Atlantic salmon fillet, 1lb',
    price: 12.99,
    unit: 'pound',
    image_url: 'https://images.instacart.com/image-server/394x394/filters:fill(FFF,true):format(jpg)/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_0f1dd929-5fd3-4b25-9f76-de7a73c4eebd.png',
    category: 'Seafood',
    in_stock: true,
    quantity_available: 10
  },
  {
    id: '10',
    name: 'Organic Blueberries',
    description: 'Sweet organic blueberries, 6oz package',
    price: 4.49,
    unit: 'package',
    image_url: 'https://images.instacart.com/image-server/394x394/filters:fill(FFF,true):format(jpg)/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_e8c5204a-3d5a-4775-a2a3-f1ede8d6d601.png',
    category: 'Produce',
    in_stock: true,
    quantity_available: 14
  }
];

// In-memory store for orders
const orders: Map<string, DeliveryOrder> = new Map();

export class GroceryService {
  // Get all grocery items
  getAllItems(): GroceryItem[] {
    return groceryItems;
  }

  // Get a single grocery item by ID
  getItemById(id: string): GroceryItem | undefined {
    return groceryItems.find(item => item.id === id);
  }

  // Create a new order (following Instacart's API spec)
  createOrder(externalCustomerId: string, items: OrderItem[]): CreateOrderResponse {
    // Validate items exist
    for (const orderItem of items) {
      const item = this.getItemById(orderItem.item_id);
      if (!item) {
        throw new Error(`Item with ID ${orderItem.item_id} not found`);
      }
      if (!item.in_stock || item.quantity_available < orderItem.quantity) {
        throw new Error(`Item ${item.name} is not available in the requested quantity`);
      }
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum, orderItem) => {
      const item = this.getItemById(orderItem.item_id)!;
      return sum + (item.price * orderItem.quantity);
    }, 0);

    // Generate delivery time (1-2 hours from now)
    const now = new Date();
    const estimatedDeliveryTime = new Date(now.getTime() + (90 * 60 * 1000)); // 90 minutes from now

    // Create order
    const orderId = uuidv4();
    const deliveryId = uuidv4();
    
    const order: DeliveryOrder = {
      order_id: orderId,
      external_customer_id: externalCustomerId,
      delivery_id: deliveryId,
      items: items,
      status: 'pending',
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
      estimated_delivery_time: estimatedDeliveryTime.toISOString(),
      total_amount: parseFloat(totalAmount.toFixed(2)),
      currency: 'USD'
    };

    // Store order
    orders.set(orderId, order);

    return {
      order_id: orderId,
      delivery_id: deliveryId,
      status: 'pending',
      estimated_delivery_time: estimatedDeliveryTime.toISOString()
    };
  }

  // Get order by ID
  getOrderById(orderId: string): DeliveryOrder | undefined {
    return orders.get(orderId);
  }

  // Get all orders
  getAllOrders(): DeliveryOrder[] {
    return Array.from(orders.values());
  }
}
