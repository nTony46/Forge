from typing import Union
from fastapi import FastAPI, HTTPException
from forge import generate_branding_snippet, generate_branding_keywords
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

MAX_PROMPT_LENGTH = 32

app = FastAPI()
handler = Mangum(app)

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"]
)

@app.get("/")
async def read_root():
    return {"message": "Hey!"}
	

@app.get("/generate_snippet_and_keywords")
async def generate_snippet_and_keywords_api(prompt: str):
	validate_prompt_length(prompt)
	snippet = generate_branding_snippet(prompt)
	keywords = generate_branding_keywords(prompt)
	return {"snippet": snippet, "keywords": keywords}


@app.get("/generate_snippet")
async def generate_snippet_api(prompt: str):
	validate_prompt_length(prompt)
	snippet = generate_branding_snippet(prompt)
	return {"snippet": snippet, "keywords": None}


@app.get("/generate_keywords")
async def generate_keywords_api(prompt: str):
	validate_prompt_length(prompt)
	keywords = generate_branding_keywords(prompt)
	return {"snippet": None, "keywords": keywords}
	

def validate_prompt_length(prompt: str):
	if len(prompt) > MAX_PROMPT_LENGTH:
		raise HTTPException(
			status_code=400, 
			detail=f"Prompt length is too long. Must be less than or equal to {MAX_PROMPT_LENGTH} characters"
		)