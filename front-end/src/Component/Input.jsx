export default function Input(props){
    return(
        <>
            <input 
            type={props.type} 
            name={props.name}
            value={props.value}
            onChange = {props.onChange}
            className={props.className} 
            placeholder={props.placeholder}
            id={props.id}
            /> 
        </>
    )
}