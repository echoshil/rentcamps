from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import os
from dotenv import load_dotenv
from bson import ObjectId

load_dotenv()

app = FastAPI(title="Rental Camp API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
MONGODB_URL = os.getenv("MONGODB_URL")
MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME", "rental_camp")

client = AsyncIOMotorClient(MONGODB_URL)
db = client[MONGODB_DB_NAME]

# Collections
items_collection = db["items"]
bookings_collection = db["bookings"]
customers_collection = db["customers"]
analytics_collection = db["analytics"]

# Pydantic Models
class Item(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    name: str
    category: str
    description: Optional[str] = None
    price_per_day: float
    quantity: int
    available: int
    status: str = "available"  # available, maintenance, rented
    image_url: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

class Booking(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    customer_id: str
    customer_name: str
    item_id: str
    item_name: str
    start_date: str
    end_date: str
    quantity: int
    total_price: float
    status: str = "pending"  # pending, confirmed, active, completed, cancelled
    payment_status: str = "unpaid"  # unpaid, paid, partial
    created_at: Optional[datetime] = None

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

class Customer(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    name: str
    email: str
    phone: str
    address: Optional[str] = None
    total_bookings: int = 0
    total_spent: float = 0.0
    status: str = "active"  # active, inactive
    created_at: Optional[datetime] = None

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

# Helper function to convert MongoDB document to dict
def item_helper(item) -> dict:
    return {
        "_id": str(item["_id"]),
        "name": item["name"],
        "category": item["category"],
        "description": item.get("description", ""),
        "price_per_day": item["price_per_day"],
        "quantity": item["quantity"],
        "available": item["available"],
        "status": item["status"],
        "image_url": item.get("image_url", ""),
        "created_at": item.get("created_at"),
        "updated_at": item.get("updated_at"),
    }

def booking_helper(booking) -> dict:
    return {
        "_id": str(booking["_id"]),
        "customer_id": booking["customer_id"],
        "customer_name": booking["customer_name"],
        "item_id": booking["item_id"],
        "item_name": booking["item_name"],
        "start_date": booking["start_date"],
        "end_date": booking["end_date"],
        "quantity": booking["quantity"],
        "total_price": booking["total_price"],
        "status": booking["status"],
        "payment_status": booking["payment_status"],
        "created_at": booking.get("created_at"),
    }

def customer_helper(customer) -> dict:
    return {
        "_id": str(customer["_id"]),
        "name": customer["name"],
        "email": customer["email"],
        "phone": customer["phone"],
        "address": customer.get("address", ""),
        "total_bookings": customer.get("total_bookings", 0),
        "total_spent": customer.get("total_spent", 0.0),
        "status": customer["status"],
        "created_at": customer.get("created_at"),
    }

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Rental Camp API", "status": "running"}

# ITEMS ENDPOINTS
@app.get("/api/items")
async def get_items(
    search: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    sort_by: Optional[str] = Query("name"),
    sort_order: Optional[str] = Query("asc")
):
    query = {}
    
    # Search filter
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
            {"category": {"$regex": search, "$options": "i"}}
        ]
    
    # Category filter
    if category:
        query["category"] = category
    
    # Status filter
    if status:
        query["status"] = status
    
    # Price range filter
    if min_price is not None or max_price is not None:
        query["price_per_day"] = {}
        if min_price is not None:
            query["price_per_day"]["$gte"] = min_price
        if max_price is not None:
            query["price_per_day"]["$lte"] = max_price
    
    # Sorting
    sort_direction = 1 if sort_order == "asc" else -1
    
    items = []
    async for item in items_collection.find(query).sort(sort_by, sort_direction):
        items.append(item_helper(item))
    
    return {"items": items, "total": len(items)}

@app.get("/api/items/{item_id}")
async def get_item(item_id: str):
    item = await items_collection.find_one({"_id": ObjectId(item_id)})
    if item:
        return item_helper(item)
    raise HTTPException(status_code=404, detail="Item tidak ditemukan")

@app.post("/api/items")
async def create_item(item: Item):
    item_dict = item.dict(exclude={"id"})
    item_dict["created_at"] = datetime.now()
    item_dict["updated_at"] = datetime.now()
    item_dict["available"] = item_dict["quantity"]
    
    result = await items_collection.insert_one(item_dict)
    new_item = await items_collection.find_one({"_id": result.inserted_id})
    return item_helper(new_item)

@app.put("/api/items/{item_id}")
async def update_item(item_id: str, item: Item):
    item_dict = item.dict(exclude={"id"})
    item_dict["updated_at"] = datetime.now()
    
    result = await items_collection.update_one(
        {"_id": ObjectId(item_id)},
        {"$set": item_dict}
    )
    
    if result.modified_count:
        updated_item = await items_collection.find_one({"_id": ObjectId(item_id)})
        return item_helper(updated_item)
    
    raise HTTPException(status_code=404, detail="Item tidak ditemukan")

@app.delete("/api/items/{item_id}")
async def delete_item(item_id: str):
    result = await items_collection.delete_one({"_id": ObjectId(item_id)})
    if result.deleted_count:
        return {"message": "Item berhasil dihapus"}
    raise HTTPException(status_code=404, detail="Item tidak ditemukan")

# BOOKINGS ENDPOINTS
@app.get("/api/bookings")
async def get_bookings(
    status: Optional[str] = Query(None),
    customer_id: Optional[str] = Query(None),
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None)
):
    query = {}
    
    if status:
        query["status"] = status
    if customer_id:
        query["customer_id"] = customer_id
    if start_date:
        query["start_date"] = {"$gte": start_date}
    if end_date:
        query["end_date"] = {"$lte": end_date}
    
    bookings = []
    async for booking in bookings_collection.find(query).sort("created_at", -1):
        bookings.append(booking_helper(booking))
    
    return {"bookings": bookings, "total": len(bookings)}

@app.post("/api/bookings")
async def create_booking(booking: Booking):
    booking_dict = booking.dict(exclude={"id"})
    booking_dict["created_at"] = datetime.now()
    
    # Update item availability
    item = await items_collection.find_one({"_id": ObjectId(booking.item_id)})
    if item and item["available"] >= booking.quantity:
        await items_collection.update_one(
            {"_id": ObjectId(booking.item_id)},
            {"$inc": {"available": -booking.quantity}}
        )
        
        result = await bookings_collection.insert_one(booking_dict)
        new_booking = await bookings_collection.find_one({"_id": result.inserted_id})
        return booking_helper(new_booking)
    
    raise HTTPException(status_code=400, detail="Stok tidak mencukupi")

@app.put("/api/bookings/{booking_id}")
async def update_booking(booking_id: str, booking: Booking):
    booking_dict = booking.dict(exclude={"id"})
    
    result = await bookings_collection.update_one(
        {"_id": ObjectId(booking_id)},
        {"$set": booking_dict}
    )
    
    if result.modified_count:
        updated_booking = await bookings_collection.find_one({"_id": ObjectId(booking_id)})
        return booking_helper(updated_booking)
    
    raise HTTPException(status_code=404, detail="Booking tidak ditemukan")

# CUSTOMERS ENDPOINTS
@app.get("/api/customers")
async def get_customers(
    search: Optional[str] = Query(None),
    status: Optional[str] = Query(None)
):
    query = {}
    
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"email": {"$regex": search, "$options": "i"}},
            {"phone": {"$regex": search, "$options": "i"}}
        ]
    
    if status:
        query["status"] = status
    
    customers = []
    async for customer in customers_collection.find(query).sort("name", 1):
        customers.append(customer_helper(customer))
    
    return {"customers": customers, "total": len(customers)}

@app.post("/api/customers")
async def create_customer(customer: Customer):
    customer_dict = customer.dict(exclude={"id"})
    customer_dict["created_at"] = datetime.now()
    
    result = await customers_collection.insert_one(customer_dict)
    new_customer = await customers_collection.find_one({"_id": result.inserted_id})
    return customer_helper(new_customer)

@app.put("/api/customers/{customer_id}")
async def update_customer(customer_id: str, customer: Customer):
    customer_dict = customer.dict(exclude={"id"})
    
    result = await customers_collection.update_one(
        {"_id": ObjectId(customer_id)},
        {"$set": customer_dict}
    )
    
    if result.modified_count:
        updated_customer = await customers_collection.find_one({"_id": ObjectId(customer_id)})
        return customer_helper(updated_customer)
    
    raise HTTPException(status_code=404, detail="Customer tidak ditemukan")

# ANALYTICS ENDPOINTS
@app.get("/api/analytics/dashboard")
async def get_dashboard_analytics():
    # Total Revenue
    pipeline_revenue = [
        {"$match": {"payment_status": "paid"}},
        {"$group": {"_id": None, "total": {"$sum": "$total_price"}}}
    ]
    revenue_result = await bookings_collection.aggregate(pipeline_revenue).to_list(1)
    total_revenue = revenue_result[0]["total"] if revenue_result else 0
    
    # Active Bookings
    active_bookings = await bookings_collection.count_documents({"status": "active"})
    
    # Total Equipment
    total_items = await items_collection.count_documents({})
    
    # Total Customers
    total_customers = await customers_collection.count_documents({})
    
    # Equipment Status
    available_items = await items_collection.count_documents({"status": "available"})
    rented_items = await items_collection.count_documents({"status": "rented"})
    maintenance_items = await items_collection.count_documents({"status": "maintenance"})
    
    # Booking Status Distribution
    booking_statuses = {}
    async for status_doc in bookings_collection.aggregate([
        {"$group": {"_id": "$status", "count": {"$sum": 1}}}
    ]):
        booking_statuses[status_doc["_id"]] = status_doc["count"]
    
    # Recent Bookings
    recent_bookings = []
    async for booking in bookings_collection.find().sort("created_at", -1).limit(5):
        recent_bookings.append(booking_helper(booking))
    
    # Popular Equipment
    popular_equipment = []
    async for item in bookings_collection.aggregate([
        {"$group": {"_id": "$item_id", "item_name": {"$first": "$item_name"}, "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 5}
    ]):
        popular_equipment.append({
            "item_id": item["_id"],
            "item_name": item["item_name"],
            "booking_count": item["count"]
        })
    
    return {
        "stats": {
            "total_revenue": total_revenue,
            "active_bookings": active_bookings,
            "total_items": total_items,
            "total_customers": total_customers
        },
        "equipment_status": {
            "available": available_items,
            "rented": rented_items,
            "maintenance": maintenance_items
        },
        "booking_statuses": booking_statuses,
        "recent_bookings": recent_bookings,
        "popular_equipment": popular_equipment
    }

@app.get("/api/analytics/revenue")
async def get_revenue_analytics():
    # Monthly revenue for last 6 months
    pipeline = [
        {"$match": {"payment_status": "paid"}},
        {"$group": {
            "_id": {
                "year": {"$year": "$created_at"},
                "month": {"$month": "$created_at"}
            },
            "revenue": {"$sum": "$total_price"},
            "count": {"$sum": 1}
        }},
        {"$sort": {"_id.year": -1, "_id.month": -1}},
        {"$limit": 6}
    ]
    
    revenue_data = []
    async for data in bookings_collection.aggregate(pipeline):
        month_names = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
        month_name = month_names[data["_id"]["month"] - 1]
        revenue_data.append({
            "month": month_name,
            "revenue": data["revenue"],
            "bookings": data["count"]
        })
    
    return {"revenue_data": list(reversed(revenue_data))}

@app.get("/api/categories")
async def get_categories():
    categories = await items_collection.distinct("category")
    return {"categories": categories}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
