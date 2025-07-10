
# Backend E-commercecon FastAPI

Este es un proyecto de API REST construido con FastAPI y SQLite para gestionar productos de un ecommerce segun  prueba para Imagine Apps.

## Funcionalidades

- Agregar nuevos productos
- Listar todos los productos
- Filtrar productos por categoría
- Base de datos SQLite con SQLAlchemy
- Validación de datos usando Pydantic (v2)
- Arquitectura limpia con servicios y esquemas

## Instalación

1. Clona el repositorio:

```
git clone https://github.com/maristizabalo/FullStack-Angular-FastApi.git
cd FullStack-Angular-FastApi
```

2. Crea y activa un entorno virtual:

**Linux/macOS:**
```
python3 -m venv env
source env/bin/activate
```

**Windows:**
```
python -m venv env
env\Scripts\activate
```

3. Instala las dependencias:

```
pip install -r requirements.txt
```

4. Crea y llena la base de datos:

```
python create_db.py
```

5. Ejecuta el servidor de desarrollo:

```
uvicorn app.main:app --reload
```

Abre [http://localhost:8000/docs](http://localhost:8000/docs) para ver la documentación Swagger UI.

## Estructura del Proyecto

```
backend/
│
├── app/
│   ├── main.py
│   ├── api/
│   │   └── products.py
│   ├── core/
│   │   ├── config.py
│   │   └── database.py
│   ├── models/
│   │   └── product.py
│   ├── schemas/
│   │   └── product.py
│   ├── services/
│   │   └── product_service.py
│
├── create_db.py
├── requirements.txt
└── store.db
```

## Notas

- Proyecto ejecutado con python 3.12.7.

## Autor

**Maicol Jacobo Aristizabal Obando**  
_Desarrollador Full Stack_
