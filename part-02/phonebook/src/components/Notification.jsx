const Notification = ({message}) => {
    if (message === null) {
        console.log(message)
        return null
    }
    return (
        <div className= {`notification ${message.type}`}>
            {message.text}
        </div>
    )
}

export default Notification