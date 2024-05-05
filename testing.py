from langchain_community.embeddings.fake import DeterministicFakeEmbedding
from langchain_community.document_loaders import DirectoryLoader
from langchain_chroma import Chroma

DOCUMENTS_PATH = "./documents"
import os

embeddings = DeterministicFakeEmbedding(size=10)

loader = DirectoryLoader(DOCUMENTS_PATH, glob="**/*.txt")

docsAll = loader.load()

ids = []
for doc in docsAll:
    ids.append(doc.metadata['source'].split('\\')[1])

print(ids)

db = Chroma.from_documents(docsAll, embeddings, ids=ids)
print("DB", db.get())

# for file in os.listdir(DOCUMENTS_PATH):
#     with open(os.path.join(DOCUMENTS_PATH, file)) as f:
#         query = f.read()
#         docs = db.similarity_search(query, k=2)
#         print("query: ", query)
#         print(docs[1].id)

