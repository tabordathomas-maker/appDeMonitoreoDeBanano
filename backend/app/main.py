from fastapi import FastAPI
from app.routes.sensores import router as sensores_router

app = FastAPI(
    title="Dashboard Sensores API",
    version="1.0.0"
)

app.include_router(
    sensores_router,
    prefix="/api"
)


@app.get("/")
def root():
    return {"mensaje": "API funcionando"}