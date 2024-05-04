from typing import Annotated

from fastapi import FastAPI, Query
from backend.api import api
from pydantic import BaseModel

app = FastAPI()


class Doc(BaseModel):
    id: str
    content: str

@app.get("/docs/")
async def read_docs():
    return api.get_all_docs()

@app.get("/docs/{doc_id}")
async def read_doc(doc_id: str):
    return api.get_doc({'id': doc_id})

@app.delete("/docs/{doc_id}")
async def delete_doc(doc_id: str):
    return api.delete_doc({'id': doc_id})

@app.post("/docs/")
async def add_doc(doc: Doc):
    return api.add_doc({'id': doc.id, 'content': doc.content})

@app.get("/docs/{doc_id}/similar/")
async def get_similar_doc(doc_id: str):
    return api.get_similar_doc({'id': doc_id})

# Path: backend/api/api.py