const Notification = ({ message }) => {
    return message === null ? null : <div className="error">{message}</div>
}

export default Notification