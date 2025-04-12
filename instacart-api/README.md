# Instacart Fulfillment API

This is a simulated Instacart Fulfillment API that provides hardcoded grocery items and implements the order creation endpoint according to the [Instacart API documentation](https://docs.instacart.com/connect/api/fulfillment/delivery/create_order).

## Setup

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start the server
npm start

# For development with auto-reload
npm run dev
```

## API Endpoints

### Grocery Items

- `GET /api/fulfillment/items` - Get all grocery items
- `GET /api/fulfillment/items/:id` - Get a single grocery item by ID

### Orders (Instacart Fulfillment API)

- `POST /api/fulfillment/delivery/orders` - Create a new order
- `GET /api/fulfillment/delivery/orders/:id` - Get order by ID
- `GET /api/fulfillment/delivery/orders` - Get all orders

## Example Request for Creating an Order

```json
POST /api/fulfillment/delivery/orders
Content-Type: application/json

{
  "external_customer_id": "customer123",
  "items": [
    {
      "item_id": "1",
      "quantity": 2
    },
    {
      "item_id": "3",
      "quantity": 1
    }
  ]
}
```

## Example Response

```json
{
  "order_id": "550e8400-e29b-41d4-a716-446655440000",
  "delivery_id": "550e8400-e29b-41d4-a716-446655440001",
  "status": "pending",
  "estimated_delivery_time": "2025-04-12T17:31:31.000Z"
}
```
