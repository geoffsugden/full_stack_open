const Notification = ({messageValue}) => {
    
    return messageValue ? <div className="message">{messageValue}</div> : null 

}

export default Notification