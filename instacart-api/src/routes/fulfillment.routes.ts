import { Router } from 'express';
import { FulfillmentController } from '../controllers/fulfillment.controller';

const router = Router();
const fulfillmentController = new FulfillmentController();

// Get all grocery items
router.get('/items', fulfillmentController.getAllItems);

// Get a single grocery item by ID
router.get('/items/:id', fulfillmentController.getItemById);

// Create a new order (following Instacart's API spec)
// This matches https://docs.instacart.com/connect/api/fulfillment/delivery/create_order
router.post('/delivery/orders', fulfillmentController.createOrder);

// Get order by ID
router.get('/delivery/orders/:id', fulfillmentController.getOrderById);

// Get all orders
router.get('/delivery/orders', fulfillmentController.getAllOrders);

export { router as fulfillmentRoutes };
