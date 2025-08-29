import React, { useState } from "react";

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
}

interface RSVPProps {
  events: Event[];
}

const RSVP: React.FC<RSVPProps> = ({ events }) => {
  const [rsvpEvents, setRsvpEvents] = useState<Event[]>([]);

  // Handle RSVP action
  const handleRSVP = (event: Event) => {
    if (!rsvpEvents.some((rsvpEvent) => rsvpEvent.id === event.id)) {
      setRsvpEvents([...rsvpEvents, event]);
    }
  };

  // Styles object
  const styles = {
    container: {
      padding: "24px",
      backgroundColor: "#f3f4f6",
      borderRadius: "8px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    },
    header: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "16px"
    },
    section: {
      marginBottom: "24px",
      padding: "16px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
    },
    sectionHeader: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "8px"
    },
    emptyText: {
      color: "#6b7280"
    },
    eventList: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "12px"
    },
    eventItem: {
      display: "flex",
      justifyContent: "space-between",
      padding: "12px",
      border: "1px solid #e5e7eb",
      borderRadius: "8px"
    },
    eventInfo: {
      display: "flex",
      flexDirection: "column" as const
    },
    eventName: {
      fontWeight: "600"
    },
    eventDetails: {
      fontSize: "14px",
      color: "#6b7280"
    },
    rsvpButton: {
      padding: "4px 12px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    },
    activeButton: {
      backgroundColor: "#3b82f6",
      color: "white"
    },
    disabledButton: {
      backgroundColor: "#e5e7eb",
      color: "#6b7280",
      cursor: "not-allowed"
    },
    rsvpEventItem: {
      padding: "12px",
      border: "1px solid #e5e7eb",
      borderRadius: "8px"
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📅 RSVP to an Event</h2>

      {/* Available Events List */}
      <div style={styles.section}>
        <h3 style={styles.sectionHeader}>🎟 Available Events</h3>
        {events.length === 0 ? (
          <p style={styles.emptyText}>No events available.</p>
        ) : (
          <ul style={styles.eventList}>
            {events.map((event) => (
              <li key={event.id} style={styles.eventItem}>
                <div style={styles.eventInfo}>
                  <p style={styles.eventName}>{event.name}</p>
                  <p style={styles.eventDetails}>{event.date} - {event.location}</p>
                </div>
                <button
                  onClick={() => handleRSVP(event)}
                  disabled={rsvpEvents.some((rsvpEvent) => rsvpEvent.id === event.id)}
                  style={{
                    ...styles.rsvpButton,
                    ...(rsvpEvents.some((rsvpEvent) => rsvpEvent.id === event.id)
                      ? styles.disabledButton
                      : styles.activeButton)
                  }}
                >
                  {rsvpEvents.some((rsvpEvent) => rsvpEvent.id === event.id) ? "RSVP'd" : "RSVP"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* RSVP Confirmation List */}
      <div style={styles.section}>
        <h3 style={styles.sectionHeader}>✅ Your RSVP Events</h3>
        {rsvpEvents.length === 0 ? (
          <p style={styles.emptyText}>You haven't RSVP'd to any events yet.</p>
        ) : (
          <ul style={styles.eventList}>
            {rsvpEvents.map((event) => (
              <li key={event.id} style={styles.rsvpEventItem}>
                <p style={styles.eventName}>{event.name}</p>
                <p style={styles.eventDetails}>{event.date} - {event.location}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RSVP;