interface FormProps {
	prompt: string;
	setPrompt: any;
	onSubmit: any;
	isLoading: boolean;
	charLimit: number;
}

const Form: React.FC<FormProps> = (props) => {
	const isPromptValid = props.prompt.length <= props.charLimit
	const updatePromptValue = (text: string) => {
		if (text.length <= props.charLimit) {
			props.setPrompt(text)
		}
	}

	return (
	<>
		<p>
			Enter the subject of your brand and I can make a copy and keywords for you!
		</p>
		<input 
			type="text" 
			placeholder="watches"
			value= {props.prompt}
			onChange={(e) => updatePromptValue(e.currentTarget.value)}
		></input>
		<div>{props.prompt.length}/{props.charLimit}</div>
		<button onClick={props.onSubmit} disabled={props.isLoading || !isPromptValid}>Submit</button>
	</>
	);
}

export default Form;