from app.core.database import Base, engine, SessionLocal
from app.models.product import Product

def init_db():
    Base.metadata.create_all(bind=engine)

    sample_products = [
        {"name": "Camisa", "price": 30000, "category": "Technology"},
        {"name": "Pantalon", "price": 80000, "category": "Technology"},
        {"name": "Zapatos", "price": 250000, "category": "Stationery"},
    ]

    db = SessionLocal()
    for data in sample_products:
        product = Product(**data)
        db.add(product)
    db.commit()
    db.close()

if __name__ == "__main__":
    init_db()
    print("Base de datos creada exitosamente")
