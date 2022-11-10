interface FormProps {
	prompt: string;
	snippet: string;
	keywords: string[];
	onBack: any;
}

const Results: React.FC<FormProps> = (props) => {

	const keywordsElement = [];
	for (let i = 0; i < props.keywords.length; i++){
		const element = <div key={i}>#{props.keywords[i]}</div>
		keywordsElement.push(element);
	}


	return(
	<>
		<div>
			Here are your results:
			<div>
				<b>Prompt</b>
			</div>
			<div>{props.prompt}</div>

			<div>
				<b>Snippet</b>
			</div>
			<div>{props.snippet}</div>

			<div>
				<b>Keywords</b>
			</div>
			<div>{keywordsElement}</div>

		</div>
		<button onClick={props.onBack}>Back</button>
	</>
	);
}

export default Results;