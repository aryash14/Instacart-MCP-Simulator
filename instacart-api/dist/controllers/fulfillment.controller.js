"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FulfillmentController = void 0;
const grocery_service_1 = require("../services/grocery.service");
const groceryService = new grocery_service_1.GroceryService();
class FulfillmentController {
    // Get all grocery items
    getAllItems(req, res) {
        try {
            const items = groceryService.getAllItems();
            res.status(200).json({ items });
        }
        catch (error) {
            console.error('Error getting items:', error);
            res.status(500).json({ error: 'Failed to retrieve grocery items' });
        }
    }
    // Get a single grocery item by ID
    getItemById(req, res) {
        try {
            const { id } = req.params;
            const item = groceryService.getItemById(id);
            if (!item) {
                res.status(404).json({ error: `Item with ID ${id} not found` });
                return;
            }
            res.status(200).json({ item });
        }
        catch (error) {
            console.error('Error getting item:', error);
            res.status(500).json({ error: 'Failed to retrieve grocery item' });
        }
    }
    // Create a new order (following Instacart's API spec)
    createOrder(req, res) {
        try {
            // Validate request body according to Instacart API spec
            // https://docs.instacart.com/connect/api/fulfillment/delivery/create_order
            const { external_customer_id, items } = req.body;
            if (!external_customer_id) {
                res.status(400).json({ error: 'external_customer_id is required' });
                return;
            }
            if (!items || !Array.isArray(items) || items.length === 0) {
                res.status(400).json({ error: 'items array is required and cannot be empty' });
                return;
            }
            // Validate each item has item_id and quantity
            const validItems = [];
            for (const item of items) {
                if (!item.item_id || typeof item.quantity !== 'number' || item.quantity <= 0) {
                    res.status(400).json({
                        error: 'Each item must have a valid item_id and a positive quantity'
                    });
                    return;
                }
                validItems.push({
                    item_id: item.item_id,
                    quantity: item.quantity
                });
            }
            // Create the order
            const orderResponse = groceryService.createOrder(external_customer_id, validItems);
            // Return the response in the format specified by Instacart API
            res.status(201).json(orderResponse);
        }
        catch (error) {
            console.error('Error creating order:', error);
            if (error.message && error.message.includes('not found')) {
                res.status(404).json({ error: error.message });
            }
            else if (error.message && error.message.includes('not available')) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Failed to create order' });
            }
        }
    }
    // Get order by ID
    getOrderById(req, res) {
        try {
            const { id } = req.params;
            const order = groceryService.getOrderById(id);
            if (!order) {
                res.status(404).json({ error: `Order with ID ${id} not found` });
                return;
            }
            res.status(200).json(order);
        }
        catch (error) {
            console.error('Error getting order:', error);
            res.status(500).json({ error: 'Failed to retrieve order' });
        }
    }
    // Get all orders
    getAllOrders(req, res) {
        try {
            const orders = groceryService.getAllOrders();
            res.status(200).json({ orders });
        }
        catch (error) {
            console.error('Error getting orders:', error);
            res.status(500).json({ error: 'Failed to retrieve orders' });
        }
    }
}
exports.FulfillmentController = FulfillmentController;
