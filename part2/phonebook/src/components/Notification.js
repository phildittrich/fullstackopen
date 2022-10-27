const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    background: 'lightgrey'
  }

  if(!message.success) {
    notificationStyle.color = 'red'
  }

  if (!message.text) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message.text}
    </div>
  )
}

export default Notification