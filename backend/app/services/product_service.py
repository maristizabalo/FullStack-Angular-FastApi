from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductOut

def create_product(db: Session, product_data: ProductCreate) -> ProductOut:
    new_product = Product(**product_data.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return ProductOut.from_orm(new_product)

def get_products(db: Session, category: Optional[str] = None) -> List[ProductOut]:
    query = db.query(Product)
    if category:
        query = query.filter(Product.category.ilike(category))
    return [ProductOut.from_orm(p) for p in query.all()]
