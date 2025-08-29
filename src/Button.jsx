function Button(props) {
    return (
        <button className="Button" onClick={props.onClick}>{props.content}</button>
    );
}

export default Button;
