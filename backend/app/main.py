from fastapi import FastAPI
from app.api import products
from app.core.config import settings

app = FastAPI(title=settings.app_name)

app.include_router(products.router, prefix="/products", tags=["Products"])
