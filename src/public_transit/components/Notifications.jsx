import React, { useState, useEffect } from "react";
import notificationsData from "./notifications.json"; // Direct import

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(notificationsData.notifications || notificationsData);
  }, []);

  return (
    <ul className="notifications-list" style={{ maxHeight: "200px", overflowY: "scroll" }}>
      {notifications.length > 0 ? (
        notifications.map((notif, index) => (
          <li key={notif.id || index}>{notif.message}</li>
        ))
      ) : (
        <li>No notifications available</li>
      )}
    </ul>
  );
};

export default Notifications;
