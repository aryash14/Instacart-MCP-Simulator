# server.py
from pkgutil import iter_modules
from mcp.server.fastmcp import FastMCP
from typing import List, Dict
from schema import OrderItem
from client import (
    load_items,
    create_order,
    get_order,
    get_all_orders
)

# Create MCP server
mcp = FastMCP("Demo")

@mcp.tool()
def get_grocerry_list() -> List[Dict]:
    """Get all grocery items"""
    return load_items()["items"]
    
# @mcp.tool()
# def check_grocery_availability(item_name: str) -> str:
#     """Check if a specific grocery item is available"""
#     grocery_items = load_items()["items"]
#     for x in grocery_items:
#         if x["name"] == item_name:
#             return f"{item_name} is available"
#     return f"{item_name} is not available"

@mcp.tool()
def order_groceries(user_input: List[OrderItem]) -> str:
    """Order specific groceries by name and quantity"""
    # grocery_items = load_items()["items"]
    # order_list = []
    # for item in items:
    #     for grocery in grocery_items:
    #         if grocery["name"] == item.item_name:
    #             order_list.append({"item_id": grocery["id"], "quantity": item.quantity})
    items = [item.model_dump() for item in user_input]
    result = create_order(
        external_customer_id="default_customer",
        items=items
    )
    if "error" in result:
        return result["error"]
    return f"Order created. Order ID: {result['order_id']}"

@mcp.tool()
def check_order_status(order_id: str) -> Dict:
    """Get order by ID"""
    result = get_order(order_id)
    if "error" in result:
        return result["error"]
    return result
