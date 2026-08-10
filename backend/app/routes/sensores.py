from datetime import datetime, timezone
import os

from fastapi import APIRouter, Query, HTTPException
from app.database import db
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

COLLECTION_NAME = os.getenv("COLLECTION_NAME")
MAX_LIMIT = 500


def serialize_document(doc):
    return {
        "_id": str(doc["_id"]),
        "ambiente": doc.get("ambiente"),
        "calidad_aire_raw": doc.get("calidad_aire_raw"),
        "color_rgb": doc.get("color_rgb"),
        "color_hex": doc.get("color_hex"),
        "fecha_registro": doc.get("fecha_registro"),
        "color_puro": doc.get("color_puro"),
    }


def local_date_to_utc(date_text: str, end_of_day: bool = False) -> datetime:
    """Convierte una fecha de Colombia a UTC para consultar MongoDB."""
    try:
        from zoneinfo import ZoneInfo

        local_tz = ZoneInfo("America/Bogota")
        local_date = datetime.strptime(date_text, "%Y-%m-%d").date()
        if end_of_day:
            local_dt = datetime.combine(local_date, datetime.max.time()).replace(tzinfo=local_tz)
        else:
            local_dt = datetime.combine(local_date, datetime.min.time()).replace(tzinfo=local_tz)
        return local_dt.astimezone(timezone.utc).replace(tzinfo=None)
    except ValueError:
        raise HTTPException(status_code=400, detail="Las fechas deben tener formato YYYY-MM-DD")


@router.get("/datos")
def obtener_datos(
    limit: int = Query(default=100, ge=1, le=MAX_LIMIT),
    desde: str | None = Query(default=None),
    hasta: str | None = Query(default=None),
    estado: str | None = Query(default=None),
):
    """
    Devuelve registros de la colección sin exigir que sean recientes.

    - Dashboard/gráficas: consulta los registros disponibles y limita la cantidad.
    - Historial: puede filtrar explícitamente por desde/hasta y estado.
    - Nunca permite más de 500 documentos por petición.
    """
    collection = db[COLLECTION_NAME]
    query = {}

    # No se aplica ningún filtro temporal por defecto.
    # Los registros pueden ser antiguos; solo se filtran por fecha cuando
    # el usuario lo solicita explícitamente mediante desde/hasta.
    if desde or hasta:
        fecha_query = {}
        if desde:
            fecha_query["$gte"] = local_date_to_utc(desde)
        if hasta:
            fecha_query["$lte"] = local_date_to_utc(hasta, end_of_day=True)
        query["fecha_registro"] = fecha_query

    if estado and estado.lower() != "todos":
        estado_normalizado = estado.strip().lower()
        equivalencias = {
            "verde": ["verde", "green"],
            "amarillo": ["amarillo", "yellow"],
            "maduro": ["maduro", "ripe"],
            "muy maduro": ["muy maduro", "muy_maduro", "very ripe"],
        }
        valores = equivalencias.get(estado_normalizado)
        if not valores:
            raise HTTPException(status_code=400, detail="Estado de banano no válido")
        query["color_puro"] = {"$in": valores}

    documentos = list(
        collection
        .find(query)
        .sort("fecha_registro", -1)
        .limit(limit)
    )

    return [serialize_document(doc) for doc in documentos]
