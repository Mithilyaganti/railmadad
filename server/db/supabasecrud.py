import os
from supabase import create_client, Client
from dotenv import load_dotenv
load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

try:
    supabase: Client = create_client(url, key)
except Exception as e:
    print(f"Error connecting to Supabase: {e}")
    supabase = None

# Supabase crud

def get_all(table: str):
    return supabase.table(table).select("*").execute()

def get_by_id(table: str, id: int):
    return supabase.table(table).select("*").eq("id", id).execute()

def get_by_column(table: str, column: str, value: str):
    response = supabase.table(table).select("*").eq(column, value).execute()
    return response.data[0] if response.data else None

def create(table: str, data: dict):
    return supabase.table(table).insert(data).execute()

def update(table: str, id: int, data: dict):
    return supabase.table(table).update(data).eq("id", id).execute()

def delete(table: str, id: int):
    return supabase.table(table).delete().eq("id", id).execute()