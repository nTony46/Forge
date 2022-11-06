from typing import Union
from fastapi import FastAPI, HTTPException
from forge import generate_branding_snippet, generate_branding_keywords

MAX_PROMPT_LENGTH = 16

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hey!"}


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


@app.get("/generate_snippet_and_keywords")
async def generate_snippet_and_keywords_api(prompt: str):
	validate_prompt_length(prompt)
	snippet = generate_branding_snippet(prompt)
	keywords = generate_branding_keywords(prompt)
	return {"snippet": snippet, "keywords": keywords}


def validate_prompt_length(prompt: str):
	if len(prompt) >= MAX_PROMPT_LENGTH:
		raise HTTPException(
			status_code=400, 
			detail=f"Prompt length is too long. Must be under {MAX_PROMPT_LENGTH} characters"
		)