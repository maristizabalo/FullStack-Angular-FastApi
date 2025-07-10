from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import products
from app.core.config import settings

app = FastAPI(title=settings.app_name)

origins = [
    "http://localhost:4200",
]

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix="/products", tags=["Products"])
