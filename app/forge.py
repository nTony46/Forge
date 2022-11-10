import os
import openai
import argparse
import re
from dotenv import load_dotenv

MAX_LENGTH_USER_INPUT = 16

def main():
	# Capturing user input
	parser = argparse.ArgumentParser()
	parser.add_argument("--input", "-i", type=str, required=True)
	args = parser.parse_args()
	user_input = args.input

	print(f"User input: {user_input}")
	if validate_prompt_length(user_input):
		branding_result = generate_branding_snippet(user_input)
		keywords_result = generate_branding_keywords(user_input)
		print(f"GENERATED BRANDING: {branding_result}")
		print(f"GENERATED KEYWORDS: {keywords_result}")
		print()
	else:
		raise ValueError(f"Please enter an input with length less than {MAX_LENGTH_USER_INPUT}")


def validate_prompt_length(prompt: str):
	return len(prompt) <= MAX_LENGTH_USER_INPUT


def generate_branding_snippet(subject: str):
	# Load your API key from an environment variable or secret management service
	load_dotenv()
	openai.api_key = os.getenv("OPENAI_API_KEY")

	enriched_prompt = f"Generate a long upbeat branding snippet for a {subject} brand:"
	print("PROMPT:", enriched_prompt)

	response = openai.Completion.create(
		model="text-davinci-002", prompt=enriched_prompt, temperature=0.7, max_tokens=64
	)
	
	# Get the generated text
	branding = response["choices"][0]["text"]
	branding = branding.strip()
	# Add ... if text does not end in a complete sentence
	if branding[-1] not in ("!", "?", "."):
		branding += ' ...'
	return branding


def generate_branding_keywords(subject: str):
	# Load your API key from an environment variable or secret management service
	load_dotenv()
	openai.api_key = os.getenv("OPENAI_API_KEY")

	enriched_prompt = f"Generate popular keywords for {subject} "

	response = openai.Completion.create(
		model="text-davinci-002", prompt=enriched_prompt, temperature=0.7, max_tokens=32
	)
	
	# Get the generated text
	keywords = response["choices"][0]["text"]
	# Turn string into a list. Strip white space and make all words lowercase
	keywords_arr = re.split(",|\n|;|-", keywords)
	keywords_arr = [word.lower().strip().replace(' ', '-') for word in keywords_arr if len(word) > 0]
	keywords_arr = [re.sub(r'\d.-', '', word) for word in keywords_arr]
	return keywords_arr


if __name__ == '__main__':
	main()