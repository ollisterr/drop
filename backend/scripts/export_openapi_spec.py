import json
import os

import requests
from dotenv import load_dotenv

load_dotenv()

WRITE_LOCATION = "../data/api-spec.json"
PORT = int(os.getenv("PORT", 8000))
HOST = os.getenv("HOST", "0.0.0.0")

OPENAPI_URL = f"http://{HOST}:{PORT}/api/openapi.json"

print(f"Fetching openapi spec from {OPENAPI_URL}")

s = requests.Session()
data = {"username": "admin", "password": "admin"}
url = f"http://{HOST}:{PORT}/login"
r = s.post(url, data=data)
r = requests.get(OPENAPI_URL, cookies=s.cookies)
openapi_json = json.loads(r.content)
openapi_json_pretty = str.encode(json.dumps(openapi_json, indent=4, sort_keys=True))

print(f"Writing OpenAPI spec to {WRITE_LOCATION}")
with open(WRITE_LOCATION, "wb") as f:
    f.write(openapi_json_pretty)

print("Done")
