import React, { useState, useCallback } from "react";
import Calendar from "./components/Calendar";
import RSVP from "./components/RSVP";
import SocialWall from "./components/SocialWall";
import Recommendation from "./components/Recommendation";

// Types
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

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

// Styles
const styles = {
  container: {
    maxWidth: "1800px",
    margin: "0 auto",
    padding: "2rem 1rem",
    fontFamily: "'Inter', sans-serif",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 800,
    textAlign: "center" as const,
    marginBottom: "2rem",
    letterSpacing: "-0.025em",
    background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
    WebkitBackgroundClip: "text",
    color: "transparent",
    position: "relative" as const,
    paddingBottom: "1rem",
    "&:after": {
      content: '""',
      position: "absolute" as const,
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "80px",
      height: "4px",
      background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
      borderRadius: "2px",
    }
  },
  grid: {
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: "1fr",
    "@media (min-width: 768px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (min-width: 1024px)": {
      gridTemplateColumns: "repeat(4, 1fr)",
    }
  },
  section: {
    base: {
      backgroundColor: "white",
      padding: "1.5rem",
      borderRadius: "0.75rem",
      border: "1px solid #e2e8f0",
      transition: "all 0.2s ease-out",
    },
    hover: {
      transform: "translateY(-4px)",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    }
  },
  sectionHeader: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#1e293b",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  sectionContent: {
    color: "#64748b",
    lineHeight: "1.6",
  },
  icon: {
    width: "24px",
    height: "24px",
    color: "#3b82f6",
  },
  tabContainer: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.5rem",
    borderBottom: "1px solid #e2e8f0",
  },
  tab: {
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontWeight: 500,
    color: "#64748b",
    transition: "all 0.2s",
  },
  activeTab: {
    color: "#3b82f6",
    borderBottom: "2px solid #3b82f6",
  },
  createEvent: {
    form: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1rem",
    },
    input: {
      padding: "0.75rem",
      border: "1px solid #e2e8f0",
      borderRadius: "0.375rem",
      width: "100%",
      fontSize: "0.875rem",
    },
    textarea: {
      padding: "0.75rem",
      border: "1px solid #e2e8f0",
      borderRadius: "0.375rem",
      width: "100%",
      minHeight: "100px",
      fontSize: "0.875rem",
    },
    select: {
      padding: "0.75rem",
      border: "1px solid #e2e8f0",
      borderRadius: "0.375rem",
      width: "100%",
      fontSize: "0.875rem",
    },
    radioGroup: {
      display: "flex",
      gap: "1rem",
      alignItems: "center",
    },
    buttonGroup: {
      display: "flex",
      gap: "0.5rem",
      marginTop: "1rem",
    },
    createButton: {
      padding: "0.75rem 1.5rem",
      backgroundColor: "#3b82f6",
      color: "white",
      borderRadius: "0.375rem",
      border: "none",
      cursor: "pointer",
      fontWeight: 500,
      transition: "background-color 0.2s",
      "&:hover": {
        backgroundColor: "#2563eb",
      },
    },
    draftButton: {
      padding: "0.75rem 1.5rem",
      backgroundColor: "#6b7280",
      color: "white",
      borderRadius: "0.375rem",
      border: "none",
      cursor: "pointer",
      fontWeight: 500,
      transition: "background-color 0.2s",
      "&:hover": {
        backgroundColor: "#4b5563",
      },
    },
    label: {
      fontSize: "0.875rem",
      fontWeight: 500,
      color: "#1e293b",
      marginBottom: "0.25rem",
    },
  },
};

// Components
const Section: React.FC<SectionProps> = ({ 
  title, 
  icon, 
  children, 
  isHovered, 
  onMouseEnter, 
  onMouseLeave 
}) => (
  <div
    style={{
      ...styles.section.base,
      ...(isHovered ? styles.section.hover : {})
    }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div style={styles.sectionHeader}>
      {icon}
      {title}
    </div>
    <div style={styles.sectionContent}>
      {children}
    </div>
  </div>
);

const CreatePlanSection: React.FC<{
  events: Event[];
  onCreateEvent: (event: Event) => void;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ events, onCreateEvent, isHovered, onMouseEnter, onMouseLeave }) => {
  const [activeTab, setActiveTab] = useState<"create" | "calendar">("create");

  const handleCreateEvent = (newEvent: Event) => {
    onCreateEvent(newEvent);
    setActiveTab("calendar"); // Switch to calendar view after creating event
  };

  return (
    <div
      style={{
        ...styles.section.base,
        ...(isHovered ? styles.section.hover : {}),
        minHeight: "400px",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div style={styles.sectionHeader}>
        <svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m-6 0H6" />
        </svg>
        Create & Plan
      </div>
      <div style={styles.sectionContent}>
        <div style={styles.tabContainer}>
          <div
            style={{
              ...styles.tab,
              ...(activeTab === "create" ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab("create")}
          >
            Create Event
          </div>
          <div
            style={{
              ...styles.tab,
              ...(activeTab === "calendar" ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab("calendar")}
          >
            Calendar View
          </div>
        </div>
        {activeTab === "create" ? (
          <form style={styles.createEvent.form} onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const newEvent: Event = {
              id: Date.now(),
              name: formData.get("name") as string,
              date: formData.get("date") as string,
              title: formData.get("name") as string,
              time: formData.get("time") as string,
              location: formData.get("location") as string,
              description: formData.get("description") as string,
              category: formData.get("category") as string, // Fixed: Ensure category is correctly captured
              privacy: formData.get("privacy") as string,
              recurring: formData.get("recurring") === "yes",
              coHosts: (formData.get("coHosts") as string)?.split(",").map(email => email.trim()) || [],
            };
            console.log("New Event:", newEvent); // Debug: Log the new event to verify category
            handleCreateEvent(newEvent);
          }}>
            <div>
              <label style={styles.createEvent.label}>Event Title</label>
              <input
                type="text"
                name="name"
                placeholder="Please fill in the field..."
                style={styles.createEvent.input}
                required
              />
            </div>
            <div>
              <label style={styles.createEvent.label}>Date</label>
              <input
                type="date"
                name="date"
                style={styles.createEvent.input}
                required
              />
            </div>
            <div>
              <label style={styles.createEvent.label}>Time</label>
              <input
                type="time"
                name="time"
                style={styles.createEvent.input}
              />
            </div>
            <div>
              <label style={styles.createEvent.label}>Location</label>
              <input
                type="text"
                name="location"
                style={styles.createEvent.input}
              />
            </div>
            <div>
              <label style={styles.createEvent.label}>Event Description</label>
              <textarea
                name="description"
                style={styles.createEvent.textarea}
              />
            </div>
            <div>
              <label style={styles.createEvent.label}>Category</label>
              <select name="category" style={styles.createEvent.select}>
                <option value="Business">Business</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            <div>
              <label style={styles.createEvent.label}>General</label>
              <div style={styles.createEvent.radioGroup}>
                <label>
                  <input type="radio" name="privacy" value="Public" defaultChecked />
                  Public
                </label>
                <label>
                  <input type="radio" name="privacy" value="Private" />
                  Private
                </label>
              </div>
            </div>
            <div>
              <label style={styles.createEvent.label}>Recurring</label>
              <select name="recurring" style={styles.createEvent.select}>
                <option value="no">None</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div>
              <label style={styles.createEvent.label}>Co-Hosts (comma-separated emails)</label>
              <input
                type="text"
                name="coHosts"
                style={styles.createEvent.input}
              />
            </div>
            <div style={styles.createEvent.buttonGroup}>
              <button type="submit" style={styles.createEvent.createButton}>
                Create Event
              </button>
              <button type="button" style={styles.createEvent.draftButton}>
                Save Draft
              </button>
            </div>
          </form>
        ) : (
          <Calendar events={events} />
        )}
      </div>
    </div>
  );
};

// Main Component
export default function Page() {
  const [events, setEvents] = useState<Event[]>([]);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [rsvpEvents, setRsvpEvents] = useState<Set<number | string>>(new Set());

  const handleCreateEvent = useCallback((newEvent: Event) => {
    setEvents((prevEvents) => [...prevEvents, { 
      ...newEvent,
      id: Date.now(),
      title: newEvent.name,
      category: newEvent.category, // Use the category from the form, no default override
      privacy: newEvent.privacy || "Public",
      recurring: newEvent.recurring || false,
      coHosts: newEvent.coHosts || []
    }]);
  }, []);

  const handleRSVP = useCallback((eventId: number | string) => {
    setRsvpEvents(prev => {
      const newSet = new Set(prev);
      newSet.has(eventId) ? newSet.delete(eventId) : newSet.add(eventId);
      return newSet;
    });
  }, []);

  const getIcon = (path: string) => (
    <svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
    </svg>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Community Events Hub</h1>

      <div style={styles.grid}>
        <CreatePlanSection
          events={events}
          onCreateEvent={handleCreateEvent}
          isHovered={hoveredSection === 'create'}
          onMouseEnter={() => setHoveredSection('create')}
          onMouseLeave={() => setHoveredSection(null)}
        />

        <Section
          title="Community Feed"
          icon={getIcon("M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z")}
          isHovered={hoveredSection === 'social'}
          onMouseEnter={() => setHoveredSection('social')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <SocialWall />
        </Section>

        <Section
          title="Manage Events"
          icon={getIcon("M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2 2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2")}
          isHovered={hoveredSection === 'manage'}
          onMouseEnter={() => setHoveredSection('manage')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <RSVP 
            events={events}
            handleRSVP={handleRSVP}
            rsvpEvents={Array.from(rsvpEvents)}
          />
        </Section>

        <Section
          title="Recommendations"
          icon={getIcon("M19 9l-7 7-7-7")}
          isHovered={hoveredSection === 'recommend'}
          onMouseEnter={() => setHoveredSection('recommend')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <Recommendation events={events} />
        </Section>
      </div>
    </div>
  );
}