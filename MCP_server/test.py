import requests
from typing import List, Dict

# Helper functions
def load_items() -> List[Dict]:
    response = requests.get("http://localhost:3000/api/fulfillment/items")
    return response.json()

if __name__ == "__main__":
    print(load_items()["items"])