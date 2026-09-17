import { useEffect } from 'react'

const Notification = ({ notification, setNotification }) => {
  // automatically clear the notification
  useEffect(() => {
    // const timer = setTimeout(() => setNotification(null), 5000)
    // return () => clearTimeout(timer)
  }, [notification])

  if (notification === null) return null

  const notificationType = notification.type // success | 'error'

  return (
    <div className={`notification notification--${notificationType}`}>
      {notification.message}
    </div>
  )
}

export default Notification
