from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
import urllib.parse


load_dotenv()

ida_db_user = urllib.parse.quote_plus(os.environ["IDA_DB_USER"])
ida_db_pass = urllib.parse.quote_plus(os.environ["IDA_DB_PASS"])
ida_db_name = urllib.parse.quote_plus(os.environ["IDA_DB_NAME"])
ida_db_host = urllib.parse.quote_plus(os.environ["IDA_DB_HOST"])
ida_db_port = urllib.parse.quote_plus(os.environ["IDA_DB_PORT"])

# MongoDB Configuration
MONGO_URI = "mongodb://" + ida_db_user + ":" + ida_db_pass + "@" + ida_db_host + ":" + ida_db_port + "/" + ida_db_name
DATABASE_NAME = ida_db_name
ITEMS_COLLECTION = "ida_items"
USERS_COLLECTION = "ida_users"
SCHOOLS_COLLECTION = "ida_schools"

client = AsyncIOMotorClient(MONGO_URI)
db = client[DATABASE_NAME]
items_collection = db[ITEMS_COLLECTION]
users_collection = db[USERS_COLLECTION]
schools_collection = db[SCHOOLS_COLLECTION]
