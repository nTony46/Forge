interface FormProps {
	prompt: string;
	setPrompt: any;
	onSubmit: any;
	isLoading: boolean;
	charLimit: number;
}

const Form: React.FC<FormProps> = (props) => {
	const isPromptValid = props.prompt.length <= props.charLimit && props.prompt.length != 0
	const promptAtLimit = props.prompt.length == props.charLimit
	const updatePromptValue = (text: string) => {
		if (text.length <= props.charLimit) {
			props.setPrompt(text)
		}
	}

	let statusColor = "text-slate-500";
	let statusText = "";
	if (promptAtLimit){
		statusColor = "text-red-400"
		statusText = `Input must be less than or equal to ${props.charLimit} characters.`
	}

	return (
	<>
		<div className="mb-6 text-neutral-300">
			<p> Enter an item of your brand and I can generate a copy and keywords for you! </p>
		</div>
		
		<input 
			// Text Box Input
			className="p-2 w-full rounded-md outline outline-offset-0 outline-2 focus:outline-red-400 focus:outline text-slate-700"
			type="text" 
			placeholder="luxury watches"
			value= {props.prompt}
			onChange={(e) => updatePromptValue(e.currentTarget.value)}
		></input>

		<div className= {statusColor + " flex justify-between my-2 text-sm mb-6"}>
			<div>{statusText}</div>
			<div>
				{props.prompt.length}/{props.charLimit}
			</div>
		</div>
		
		<button 
			className="bg-gradient-to-r from-red-600 to-orange-400 w-full rounded-md p-2 text-lg disabled:opacity-50"
			onClick={props.onSubmit} 
			disabled={props.isLoading || !isPromptValid}
		>
			Submit
		</button>
	</>
	);
}

export default Form;