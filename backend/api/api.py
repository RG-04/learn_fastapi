import os
from langchain_community.embeddings.fake import DeterministicFakeEmbedding
from langchain_community.document_loaders import DirectoryLoader
from langchain_chroma import Chroma

DOCUMENT_PATH = 'D:/Rishit/repos/learn_fastapi/documents'

def get_all_docs():
    docs = []
    for file in os.listdir(DOCUMENT_PATH):
        with open(os.path.join(DOCUMENT_PATH, file)) as f:
            docs.append({'id': f.split('.')[0], 'content': f.read()})
    return {'docs': docs, 'status_code': '200'}

def get_doc(req):
    for file in os.listdir(DOCUMENT_PATH):
        if file == req['id'] + '.txt':
            with open(os.path.join(DOCUMENT_PATH, file)) as f:
                return {'doc': f.read(), 'status_code': '200'}
    return {'message': 'Document not found', 'status_code': '405'}

def delete_doc(req):
    for file in os.listdir(DOCUMENT_PATH):
        if file == req['id'] + '.txt':
            os.remove(os.path.join(DOCUMENT_PATH, file))
            return {'message': 'Document deleted successfully', 'status_code': '200'}
    return {'message': 'Document not found', 'status_code': '405'}

def add_doc(req):
    for file in os.listdir(DOCUMENT_PATH):
        if file == req['id'] + '.txt':
            return {'message': 'Document already exists', 'status_code': '405'}
        
    with open(os.path.join(DOCUMENT_PATH, req['id'] + '.txt'), 'w') as f:
        f.write(req['content'])
    return {'message': 'Document added successfully', 'status_code': '200'}

def get_similar_doc(req):
    embeddings = DeterministicFakeEmbedding(size=10)
    loader = DirectoryLoader(DOCUMENT_PATH, glob="**/*.txt")

    docsAll = loader.load()

    db = Chroma.from_documents(docsAll, embeddings)

    query_id = req['id']

    if not query_id + '.txt' in os.listdir(DOCUMENT_PATH):
        return {'message': 'Document not found', 'status_code': '405'}
    
    with open(os.path.join(DOCUMENT_PATH, query_id + '.txt')) as f:
        query = f.read()

    docs = db.similarity_search(query, k=2)

    if len(docs) < 2:
        print(len(docs), 'docs')
        print(len(docsAll), 'docsAll')
        return {'message': 'No similar documents found', 'status_code': '405'}

    return {'docs': docs[1].page_content, 'status_code': '200'}
