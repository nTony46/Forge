import React from "react";
import Form from "./form"
import Results from "./results"

const Forge: React.FC = () => {
	const CHAR_LIMIT = 32
	// Have to use two seperate endpoints because one endpoint with both combined doesn't work.
	const ENDPOINT1: string = 
		"https://dvcar1wqr3.execute-api.us-west-2.amazonaws.com/prod/generate_snippet";
	const ENDPOINT2: string = 
		"https://dvcar1wqr3.execute-api.us-west-2.amazonaws.com/prod/generate_keywords";
	const [prompt, setPrompt] = React.useState('');
	const [snippet, setSnippet] = React.useState('');
	const [keywords, setKeywords] = React.useState([]);
	const [hasResultSnippet, setHasResultSnippet] = React.useState(false);
	const [hasResultKeywords, setHasResultKeywords] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const onSubmit = () => {
		console.log("Submitting: " + prompt);
		setIsLoading(true);
		fetch(`${ENDPOINT1}?prompt=${prompt}`)
		.then((res)=> res.json())
		.then(onResult1);
		fetch(`${ENDPOINT2}?prompt=${prompt}`)
		.then((res)=> res.json())
		.then(onResult2);
	};

	const onResult1 = (data: any) => {
		setSnippet(data.snippet)
		setHasResultSnippet(true)
	};

	const onResult2 = (data: any) => {
		setKeywords(data.keywords)
		setHasResultKeywords(true)
	};

	const onReset = () => {
		setPrompt("")
		setHasResultSnippet(false)
		setHasResultKeywords(false)
		setIsLoading(false);
	}


	let displayedElement = null

	if (hasResultSnippet && hasResultKeywords){
		displayedElement = <Results snippet={snippet} keywords={keywords} onBack={onReset} prompt={prompt}/>;
	} else {
		displayedElement = (
			<Form 
				prompt={prompt} 
				setPrompt={setPrompt} 
				onSubmit={onSubmit} 
				charLimit={CHAR_LIMIT} 
				isLoading={isLoading}
			/>
		) 
	}

	return (
		<>
			<h1>Forge</h1>
			{displayedElement}
		</>
	);
};

export default Forge;