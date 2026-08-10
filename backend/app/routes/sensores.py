from fastapi import APIRouter, Query
from app.database import db
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

COLLECTION_NAME = os.getenv("COLLECTION_NAME")


def serialize_document(doc):
    return {
        "_id": str(doc["_id"]),
        "ambiente": doc.get("ambiente"),
        "calidad_aire_raw": doc.get("calidad_aire_raw"),
        "color_rgb": doc.get("color_rgb"),
        "color_hex": doc.get("color_hex"),
        "fecha_registro": doc.get("fecha_registro"),
        "color_puro": doc.get("color_puro")
    }


@router.get("/datos")
def obtener_datos(
    limit: int = Query(default=100, ge=1, le=1000)
):
    collection = db[COLLECTION_NAME]

    documentos = list(
        collection
        .find()
        .sort("fecha_registro", -1)
        .limit(limit)
    )

    return [serialize_document(doc) for doc in documentos]