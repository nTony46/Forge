interface FormProps {
	prompt: string;
	snippet: string;
	keywords: string[];
	onBack: any;
}

const Results: React.FC<FormProps> = (props) => {
	const keywordsElement = [];
	for (let i = 0; i < props.keywords.length; i++){
		const element = 
		<div key={i} 
			className="bg-gradient-to-r from-orange-600 to-orange-500 
						bg-opacity-75 rounded-md text-zinc-100 text-sm px-1.5 py-1">#{props.keywords[i]}</div>
		keywordsElement.push(element);
	}

	const keywordsElementsHolder = 
		<div className="flex flex-wrap gap-2">
			{keywordsElement}
		</div>

	const resultSection = (label: string, body: any) => {	
		return (
			<div className="bg-zinc-700 p-4 my-3.5 rounded-md">
				<div className="text-neutral-200 font-bold mb-2">
					{label}
				</div>
				<div>{body}</div>
			</div>
		);
	}

	return(
	<>
		<div className='mb-4'>
			{resultSection('Prompt', <div className="text-2xl font-bold">{props.prompt}</div>)}
			{resultSection('Branding Snippet', <div>{props.snippet}</div>)}
			{resultSection('Keywords', keywordsElementsHolder)}
		</div>
		<button 
			onClick={props.onBack}
			className="bg-gradient-to-r from-red-600 to-orange-400 w-full rounded-md p-2 text-lg disabled:opacity-50"
		>
			Back
		</button>
	</>
	);
}

export default Results;