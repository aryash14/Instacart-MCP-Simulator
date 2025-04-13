"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fulfillmentRoutes = void 0;
const express_1 = require("express");
const fulfillment_controller_1 = require("../controllers/fulfillment.controller");
const router = (0, express_1.Router)();
exports.fulfillmentRoutes = router;
const fulfillmentController = new fulfillment_controller_1.FulfillmentController();
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
