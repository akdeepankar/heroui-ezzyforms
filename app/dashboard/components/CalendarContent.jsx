"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Chip,
} from "@heroui/react";
import { Icon } from "@iconify/react";

const CalendarContent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 3,
      title: "HERO UI",
      date: new Date(2025, 5, 2, 10, 0), // June 11, 2024, 10:00 AM
      endTime: new Date(2025, 5, 11, 3, 0), // June 11, 2024, 11:00 AM
      description: "Deadline for HERO UI Hackathon",
      location: "Conference Room A",
      attendees: ["John", "Sarah", "Mike"],
      color: "green"
    },
    {
      id: 1,
      title: "Team Meeting",
      date: new Date(2025, 5, 11, 10, 0), // June 11, 2024, 10:00 AM
      endTime: new Date(2025, 5, 11, 11, 0), // June 11, 2024, 11:00 AM
      description: "Weekly team sync meeting",
      location: "Conference Room A",
      attendees: ["John", "Sarah", "Mike"],
      color: "blue"
    },
    {
      id: 2,
      title: "Project Deadline",
      date: new Date(2025, 5, 20, 14, 0), // June 20, 2024, 2:00 PM
      endTime: new Date(2025, 5, 20, 15, 0), // June 20, 2024, 3:00 PM
      description: "Final project review and submission",
      location: "Main Office",
      attendees: ["Alex", "Emma", "David"],
      color: "red"
    }
  ]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    endTime: "",
    description: "",
    color: "indigo",
    location: "",
    attendees: []
  });

  // Get current month and year
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  // Generate days in month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  // Generate calendar grid
  const calendarDays = [];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Event handling functions
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) return;

    const [hours, minutes] = newEvent.time.split(':');
    const [endHours, endMinutes] = newEvent.endTime.split(':');
    const [year, month, day] = newEvent.date.split('-');

    const eventDate = new Date(year, month - 1, day, hours, minutes);
    const eventEndDate = new Date(year, month - 1, day, endHours, endMinutes);

    const event = {
      id: events.length + 1,
      title: newEvent.title,
      date: eventDate,
      endTime: eventEndDate,
      description: newEvent.description,
      color: newEvent.color,
      location: newEvent.location,
      attendees: newEvent.attendees
    };

    setEvents([...events, event]);
    setNewEvent({
      title: "",
      date: "",
      time: "",
      endTime: "",
      description: "",
      color: "indigo",
      location: "",
      attendees: []
    });
    setShowAddEventModal(false);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetailsModal(true);
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(event => 
      event.date.getDate() === date &&
      event.date.getMonth() === currentDate.getMonth() &&
      event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  // Add delete event handler
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      setShowEventDetailsModal(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Calendar Header */}
      <div className="mb-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-6 md:p-8 relative overflow-hidden border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
          <div className="mb-4 md:mb-0 flex items-center gap-3">
            <Icon
              className="text-indigo-400"
              icon="solar:calendar-mark-bold-duotone"
              width={28}
            />
            <h2 className="text-xl font-semibold text-gray-900">
              Calendar
            </h2>
          </div>
          <Button
            className="bg-white text-indigo-600 font-medium border border-gray-100"
            startContent={<Icon icon="solar:calendar-add-bold" width={18} />}
            variant="flat"
            onClick={() => setShowAddEventModal(true)}
          >
            Add Event
          </Button>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Column */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-md">
            <CardHeader className="border-b bg-white px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    isIconOnly
                    variant="light"
                    onClick={goToPreviousMonth}
                  >
                    <Icon icon="solar:alt-arrow-left-bold" width={20} />
                  </Button>
                  <h3 className="text-lg font-semibold">
                    {currentMonth} {currentYear}
                  </h3>
                  <Button
                    isIconOnly
                    variant="light"
                    onClick={goToNextMonth}
                  >
                    <Icon icon="solar:alt-arrow-right-bold" width={20} />
                  </Button>
                </div>
                <Button
                  variant="flat"
                  onClick={goToToday}
                >
                  Today
                </Button>
              </div>
            </CardHeader>
            <CardBody className="p-4">
              {/* Week Days Header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-gray-500 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  const dayEvents = day ? getEventsForDate(day) : [];
                  const isSelected = selectedDate &&
                    day === selectedDate.getDate() &&
                    currentDate.getMonth() === selectedDate.getMonth() &&
                    currentDate.getFullYear() === selectedDate.getFullYear();

                  return (
                    <div key={index} className="aspect-square p-2">
                      {day && (
                        <div className="h-full flex flex-col">
                          <button
                            type="button"
                            aria-label={`${currentMonth} ${day}, ${currentYear}`}
                            className={`w-full text-left hover:bg-gray-50 cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                              isSelected
                                ? "bg-indigo-50 text-indigo-600 font-medium"
                                : "text-gray-700"
                            }`}
                            onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                          >
                            <span className="text-sm">{day}</span>
                          </button>
                          {dayEvents.length > 0 && (
                            <div className="mt-1 space-y-1">
                              {dayEvents.slice(0, 2).map(event => (
                                <button
                                  key={event.id}
                                  type="button"
                                  aria-label={`${event.title} at ${event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                                  className={`w-full text-left text-xs px-1 py-0.5 rounded truncate bg-${event.color}-100 text-${event.color}-700 cursor-pointer hover:bg-${event.color}-200 transition-colors focus:outline-none focus:ring-2 focus:ring-${event.color}-500 focus:ring-offset-1`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEventClick(event);
                                  }}
                                >
                                  {event.title}
                                </button>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-xs text-gray-500">
                                  +{dayEvents.length - 2} more
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Events Column */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-md h-full">
            <CardHeader className="border-b bg-white px-6 py-4">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
            </CardHeader>
            <CardBody className="p-4">
              <div className="space-y-4">
                {events
                  .sort((a, b) => a.date - b.date)
                  .map(event => (
                    <button 
                      key={event.id} 
                      type="button"
                      className="w-full flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors text-left"
                      onClick={() => handleEventClick(event)}
                    >
                      <div className={`w-12 h-12 bg-${event.color}-100 rounded-lg flex items-center justify-center`}>
                        <Icon icon="solar:calendar-mark-bold" className={`text-${event.color}-600`} width={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-gray-500">
                          {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                          {event.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        {event.description && (
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        )}
                      </div>
                    </button>
                  ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Add Event Modal */}
      <Modal
        isOpen={showAddEventModal}
        onOpenChange={setShowAddEventModal}
        size="md"
      >
        <ModalContent>
          <ModalHeader className="border-b">Add New Event</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Event Title"
                placeholder="Enter event title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
                <Input
                  label="Start Time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                />
              </div>
              <Input
                label="End Time"
                type="time"
                value={newEvent.endTime}
                onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
              />
              <Input
                label="Location"
                placeholder="Enter event location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              />
              <Textarea
                label="Description"
                placeholder="Enter event description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={() => setShowAddEventModal(false)}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleAddEvent}>
              Add Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Event Details Modal */}
      <Modal
        isOpen={showEventDetailsModal}
        onOpenChange={setShowEventDetailsModal}
        size="md"
      >
        <ModalContent>
          <ModalHeader className="border-b">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 bg-${selectedEvent?.color}-100 rounded-lg flex items-center justify-center`}>
                <Icon icon="solar:calendar-mark-bold" className={`text-${selectedEvent?.color}-600`} width={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{selectedEvent?.title}</h3>
                <p className="text-sm text-gray-500">
                  {selectedEvent?.date.toLocaleDateString()} • {selectedEvent?.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {selectedEvent?.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              {selectedEvent?.location && (
                <div className="flex items-start gap-3">
                  <Icon icon="solar:map-point-bold" className="text-gray-400 mt-1" width={20} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Location</h4>
                    <p className="text-sm text-gray-600">{selectedEvent.location}</p>
                  </div>
                </div>
              )}
              {selectedEvent?.description && (
                <div className="flex items-start gap-3">
                  <Icon icon="solar:document-text-bold" className="text-gray-400 mt-1" width={20} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Description</h4>
                    <p className="text-sm text-gray-600">{selectedEvent.description}</p>
                  </div>
                </div>
              )}
              {selectedEvent?.attendees && selectedEvent.attendees.length > 0 && (
                <div className="flex items-start gap-3">
                  <Icon icon="solar:users-group-rounded-bold" className="text-gray-400 mt-1" width={20} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Attendees</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedEvent.attendees.map((attendee, index) => (
                        <Chip key={index} size="sm" variant="flat">
                          {attendee}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter className="flex justify-between">
            <Button
              color="danger"
              variant="flat"
              startContent={<Icon icon="solar:trash-bin-trash-bold" width={18} />}
              onClick={handleDeleteEvent}
            >
              Delete Event
            </Button>
            <div className="flex gap-2">
              <Button variant="flat" onClick={() => setShowEventDetailsModal(false)}>
                Close
              </Button>
              <Button color="primary" onClick={() => {
                setShowEventDetailsModal(false);
                setShowAddEventModal(true);
              }}>
                Edit Event
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CalendarContent; 