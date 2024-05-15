import React, { useState, useEffect } from 'react';
import UpdateEvent from './UpdateEvent';
import CreateEvent from './CreateEvent';
import "../index.css";
import AboutUs from './AboutUs';
import Event from './Event';

const locations = [
  { value: '', label: 'All' },
  { value: 'Ahmedabad', label: 'Ahmedabad' },
  { value: 'Gandhinagar', label: 'Gandhinagar' },
  { value: 'Vadodara', label: 'Vadodara' },
];

const categories = [
  { value: '', label: 'All' },
  { value: 'Music', label: 'Music' },
  { value: 'Business', label: 'Business' },
  { value: 'Sports', label: 'Sports' },
];

const EventGuide = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [createEvent, setCreateEvent] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [selectedEvent, createEvent,locationFilter, categoryFilter, dateFilter]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/data`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Failed to Fetch Data: ' + response.status);
      }
      const filterDate = dateFilter ? new Date(dateFilter).setHours(0, 0, 0, 0) : null;
      setEvents(data.filter(event => {
        const eventStartDate = new Date(event.start_time).setHours(0,0,0,0);
        const eventEndDate = new Date(event.end_time).setHours(0,0,0,0);
        console.log(eventStartDate);
        console.log(eventEndDate);
        console.log(filterDate);
        console.log(filterDate >= eventStartDate);
        console.log(filterDate <= eventEndDate);
        return (!locationFilter || event.location === locationFilter) &&
               (!categoryFilter || event.category === categoryFilter) &&
               (!dateFilter || (filterDate >= eventStartDate && filterDate <= eventEndDate));
      }));
    } catch (error) {
      console.error('Error Fetching Events:', error);
      setError(error.message);
    }
  };

  const handleCreateClick = (event) => {
    setCreateEvent(true)
  };

  const handleUpdateClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCancelCreate = () => {
    setCreateEvent(false)
  };

  const handleCancelUpdate = () => {
    setSelectedEvent(null);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await fetch(`http://localhost:8000/api/events/delete/${eventId}`, {
      method: 'DELETE',
    });

      alert('Event Deleted successfully !!');
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleLocationChange = (event) => {
    setLocationFilter(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleDateChange = (event) => {
    setDateFilter(event.target.value);
  };

  const formatDateTime = (dateTimeStr) => {
    return dateTimeStr.replace('T', ' ').replace('Z', '');
  };

  return (
    <div className="p-5">
      {error && <p className="text-red-500">{error}</p>}
      {selectedEvent ? (
        <UpdateEvent eventData={selectedEvent} onCancelUpdate={() => setSelectedEvent(null)} />
      ) : createEvent ? (
        <CreateEvent onCancleCreate={() => setCreateEvent(false)} />
      ) : (
        <div>
            <div className="text-center mb-4">
                <h1 className="text-3xl font-light mb-2 transition duration-500 ease-in-out hover:text-blue-500 cursor-pointer">Current Events</h1>
                <button className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={() => setCreateEvent(true)}>
                Create New Event
                </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md mb-6 mx-auto max-w-3xl w-2/3">
                <h2 className="text-xl font-semibold mb-3">Filter by:</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="locationFilter" className="block text-sm font-medium text-gray-700">Location</label>
                      <select id="locationFilter" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
                          {locations.map(location => <option key={location.value} value={location.value}>{location.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700">Category</label>
                      <select id="categoryFilter" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                          {categories.map(category => <option key={category.value} value={category.value}>{category.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700">Date</label>
                      <input id="dateFilter" type="date" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" value={dateFilter} onChange={e => setDateFilter(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map(event => (
                <Event
                  key={event.id}
                  event={event}
                  onEdit={handleUpdateClick}
                  onDelete={handleDeleteEvent}
                />
               ))}
            </div>

            <AboutUs/>
        </div>
        
      )}
    </div>

  )


};

export default EventGuide;
