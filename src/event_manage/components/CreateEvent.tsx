import React, { useState } from "react";

export default function CreateEvent({ onCreateEvent }: { onCreateEvent: (event: any) => void }) {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName || !eventDate) return alert("Event Name and Date are required!");

    const newEvent = {
      id: Date.now().toString(),
      name: eventName,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
      description: eventDescription,
    };

    onCreateEvent(newEvent);
    setEventName("");
    setEventDate("");
    setEventTime("");
    setEventLocation("");
    setEventDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Event Name"
        className="w-full p-2 border rounded"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        required
      />
      <input
        type="date"
        className="w-full p-2 border rounded"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        required
      />
      <input
        type="time"
        className="w-full p-2 border rounded"
        value={eventTime}
        onChange={(e) => setEventTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        className="w-full p-2 border rounded"
        value={eventLocation}
        onChange={(e) => setEventLocation(e.target.value)}
      />
      <textarea
        placeholder="Event Description"
        className="w-full p-2 border rounded"
        value={eventDescription}
        onChange={(e) => setEventDescription(e.target.value)}
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
      >
        Create Event
      </button>
    </form>
  );
}