from langchain_community.embeddings.fake import DeterministicFakeEmbedding
from langchain_community.document_loaders import DirectoryLoader
from langchain_chroma import Chroma

DOCUMENTS_PATH = "./documents"
import os

embeddings = DeterministicFakeEmbedding(size=10)

loader = DirectoryLoader(DOCUMENTS_PATH, glob="**/*.txt")

docsAll = loader.load()

db = Chroma.from_documents(docsAll, embeddings)

query = "What did the president say about Ketanji Brown Jackson"
docs = db.similarity_search(query, k=1)
print(docs[0].page_content)

for file in os.listdir(DOCUMENTS_PATH):
    with open(os.path.join(DOCUMENTS_PATH, file)) as f:
        print(f)
        # query = f.read()
        # docs = db.similarity_search(query, k=1)
        # print("query: ", query)
        # print(docs[0].page_content)

