import React, { useState } from "react";
import { 
  format, startOfWeek, addDays, startOfMonth, endOfMonth, 
  isSameMonth, isSameDay, addWeeks, subWeeks, addMonths, subMonths 
} from "date-fns";

interface Event {
  id: number | string;
  name: string;
  date: string;
  title: string;
  time: string;
  location: string;
  description: string;
  category: string;
  privacy: string;
  recurring: boolean;
  coHosts: string[];
}

interface CalendarProps {
  events: Event[];
}

const categoryColors: { [key: string]: string } = {
  Technology: "#3b82f6", // blue-500
  Business: "#10b981",   // green-500
  Finance: "#f59e0b",    // yellow-500
};

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week">("month");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [rsvpEvents, setRsvpEvents] = useState<Set<number | string>>(new Set());

  // Navigation
  const navigateNext = () => setSelectedDate(view === "month" ? addMonths(selectedDate, 1) : addWeeks(selectedDate, 1));
  const navigatePrev = () => setSelectedDate(view === "month" ? subMonths(selectedDate, 1) : subWeeks(selectedDate, 1));

  // Filter events based on search and category
  const filteredEvents = events.filter(event => 
    (!search || event.name.toLowerCase().includes(search.toLowerCase())) &&
    (!filterCategory || event.category === filterCategory)
  );

  const startWeek = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const startMonth = startOfMonth(selectedDate);

  const handleRSVP = (eventId: number | string) => {
    setRsvpEvents(prev => {
      const newSet = new Set(prev);
      newSet.has(eventId) ? newSet.delete(eventId) : newSet.add(eventId);
      return newSet;
    });
  };

  // Styles
  const styles = {
    container: {
      padding: "24px",
      backgroundColor: "#f3f4f6",
      borderRadius: "12px",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    },
    header: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "16px"
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px"
    },
    viewButton: {
      padding: "8px 16px",
      borderRadius: "8px",
      marginLeft: "8px"
    },
    activeViewButton: {
      backgroundColor: "#3b82f6",
      color: "white"
    },
    inactiveViewButton: {
      backgroundColor: "#e5e7eb"
    },
    navControls: {
      display: "flex",
      alignItems: "center"
    },
    navButton: {
      padding: "4px 12px",
      backgroundColor: "#e5e7eb",
      borderRadius: "8px"
    },
    dateDisplay: {
      margin: "0 16px",
      fontWeight: "600"
    },
    filterContainer: {
      display: "flex",
      gap: "16px",
      marginBottom: "16px"
    },
    searchInput: {
      padding: "8px",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      width: "100%"
    },
    categorySelect: {
      padding: "8px",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      width: "200px"
    },
    calendarGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "4px"
    },
    dayHeader: {
      textAlign: "center" as const,
      fontWeight: "600"
    },
    dayCell: {
      padding: "12px",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      minHeight: "100px"
    },
    currentMonthCell: {
      backgroundColor: "white"
    },
    otherMonthCell: {
      backgroundColor: "#e5e7eb"
    },
    dayNumber: {
      fontSize: "14px",
      marginBottom: "8px"
    },
    eventItem: {
      fontSize: "12px",
      marginTop: "4px",
      padding: "4px",
      borderRadius: "8px",
      color: "white",
      cursor: "pointer",
      position: "relative" as const
    },
    rsvpButton: {
      marginLeft: "4px",
      fontSize: "12px",
      padding: "2px 4px",
      backgroundColor: "black",
      borderRadius: "4px",
      color: "white"
    },
    eventDetails: {
      position: "absolute" as const,
      backgroundColor: "white",
      color: "black",
      padding: "8px",
      borderRadius: "4px",
      zIndex: 10,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      display: "none",
      top: "100%",
      left: 0,
      "&:hover": {
        display: "block"
      }
    }
  };

  const getDaysToRender = () => {
    if (view === "week") {
      return Array.from({ length: 7 }).map((_, i) => addDays(startWeek, i));
    }
    const firstDayOfMonthWeek = startOfWeek(startMonth, { weekStartsOn: 0 });
    return Array.from({ length: 42 }).map((_, i) => addDays(firstDayOfMonthWeek, i));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📅 Event Calendar</h2>

      <div style={styles.buttonGroup}>
        <div>
          <button 
            style={{ ...styles.viewButton, ...(view === "month" ? styles.activeViewButton : styles.inactiveViewButton) }} 
            onClick={() => setView("month")}
          >
            Monthly
          </button>
          <button 
            style={{ ...styles.viewButton, ...(view === "week" ? styles.activeViewButton : styles.inactiveViewButton) }} 
            onClick={() => setView("week")}
          >
            Weekly
          </button>
        </div>
        <div style={styles.navControls}>
          <button style={styles.navButton} onClick={navigatePrev}>⏮</button>
          <span style={styles.dateDisplay}>{format(selectedDate, view === "month" ? "MMMM yyyy" : "MMMM d, yyyy")}</span>
          <button style={styles.navButton} onClick={navigateNext}>⏭</button>
        </div>
      </div>

      <div style={styles.filterContainer}>
        <input 
          type="text" 
          placeholder="🔍 Search events..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          style={styles.searchInput} 
        />
        <select 
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value)} 
          style={styles.categorySelect}
        >
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
          <option value="Finance">Finance</option>
        </select>
      </div>

      <div style={styles.calendarGrid}>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} style={styles.dayHeader}>{format(addDays(startWeek, i), "EEE")}</div>
        ))}

        {getDaysToRender().map((day, i) => {
          const isCurrentMonth = isSameMonth(day, selectedDate);
          const eventsOnDay = filteredEvents.filter(event => 
            isSameDay(new Date(event.date), day)
          );

          return (
            <div 
              key={i} 
              style={{
                ...styles.dayCell,
                ...(isCurrentMonth ? styles.currentMonthCell : styles.otherMonthCell)
              }}
            >
              <p style={styles.dayNumber}>{format(day, "d")}</p>

              {eventsOnDay.map(event => (
                <div 
                  key={event.id} 
                  style={{
                    ...styles.eventItem,
                    backgroundColor: categoryColors[event.category] || "#6b7280"
                  }}
                >
                  {event.name} {event.time && `(${event.time})`}
                  {rsvpEvents.has(event.id) && " ✅"}
                  <button 
                    onClick={() => handleRSVP(event.id)} 
                    style={styles.rsvpButton}
                  >
                    RSVP
                  </button>
                  <div style={styles.eventDetails}>
                    <p>{event.location}</p>
                    <p>{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;