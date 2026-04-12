const Notification = ({message}) => {
    
    const messageValue = message.messageValue
    const messageType = message.messageType

    return messageValue ? <div className={messageType}>{messageValue}</div> : null

}

const handleMessage = ({setMessage, mText, mType, timeout}) => {
    console.log('messageValue', mText)
    setMessage( {messageValue:mText, messageType:mType} )
    setTimeout(() => setMessage({messageValue:null, messageType:null}), timeout)
}
  

export default { Notification, handleMessage }