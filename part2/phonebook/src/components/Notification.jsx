const Notification = ({message}) => {
    
    const messageValue = message.messageValue
    const messageType = message.messageType

    return messageValue ? <div className={messageType}>{messageValue}</div> : null

}

export default Notification