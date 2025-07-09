from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import SessionLocal
from app.schemas.product import ProductCreate, ProductOut
from app.services.product_service import create_product, get_products

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=ProductOut)
def add_product(product: ProductCreate, db: Session = Depends(get_db)):
    return create_product(db, product)

@router.get("/", response_model=List[ProductOut])
def list_products(category: Optional[str] = Query(None), db: Session = Depends(get_db)):
    return get_products(db, category)
