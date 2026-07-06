const Notification = ({ message }) => {
  return (
    <div className={message.msgType}>
      <p>{message.msg}</p>
    </div>
  )
}

export default Notification