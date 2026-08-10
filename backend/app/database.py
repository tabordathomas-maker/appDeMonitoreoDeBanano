from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")

client = MongoClient(
    MONGO_URI,
    serverSelectionTimeoutMS=5000,
    connectTimeoutMS=5000,
    socketTimeoutMS=10000,
)

db = client[DATABASE_NAME]
coleccion = db[COLLECTION_NAME]

def verificar_mongodb():
    try:
        client.admin.command("ping")
        return True
    except Exception as e:
        print(f"Error conectando a MongoDB: {e}")
        return False
