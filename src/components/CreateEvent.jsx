import React, { useState } from 'react';
import "../index.css";

const CreateEvent = ({ onCancleCreate}) => {
  const [eventData, setEventData] = useState({
    name: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    category: '',
    bannerImage: ''
  });

  const isEventDataEmpty = Object.values(eventData).some(value => value === '');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/create/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: eventData.name,
          starttime: eventData.startTime,
          endtime: eventData.endTime,
          location: eventData.location,
          description: eventData.description,
          category: eventData.category,
          bannerImage: eventData.bannerImage
        })
      });
      if (!response.ok) {
        const errorMessage = await response.text(); 
        alert('Failed to Create Event: ' + errorMessage);
        return;
      }

      alert('Event Created Successfully !!');
      setEventData({
        name: '',
        startTime: '',
        endTime: '',
        location: '',
        description: '',
        category: '',
        bannerImage: ''
      });
      onCancleCreate();


    } catch (error) {
      console.error('Error Creating Event:', error);
    }
  };

  return (
    <div className="py-10 px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-48 mx-auto max-w-4xl bg-white shadow rounded">
        <h1 className="text-3xl font-light mb-8 text-center">Create New Event</h1>
        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="block text-sm font-medium text-gray-700 md:text-right md:px-6">Name :</label>
                <input
                    type="text"
                    name="name"
                    placeholder="eventname"
                    required
                    className="input input-bordered w-full"
                    value={eventData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="block text-sm font-medium text-gray-700 md:text-right md:px-6">Start Time :</label>
                <input
                    type="datetime-local"
                    name="startTime"
                    required
                    className="input input-bordered w-full md:w-1/3 col-span-2"
                    value={eventData.startTime}
                    onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="block text-sm font-medium text-gray-700 md:text-right md:px-6">End Time :</label>
                <input
                    type="datetime-local"
                    name="endTime"
                    required
                    className="input input-bordered w-full md:w-1/3 col-span-2"
                    value={eventData.endTime}
                    onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="block text-sm font-medium text-gray-700 md:text-right md:px-6">Location :</label>
                <select
                    name="location"
                    required
                    className="input input-bordered w-full max-w-1/3 col-span-2"
                    value={eventData.location}
                    onChange={handleChange}
                >
                    <option value="">Select Location</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Vadodara">Vadodara</option>
                    <option value="Gandhinagar">Gandhinagar</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="block text-sm font-medium text-gray-700 md:text-right md:px-6">Description :</label>
                <textarea
                    name="description"
                    required
                    className="input input-bordered w-full max-w-lg col-span-2 h-32 text-base leading-tight" // Adjusted height and other properties
                    placeholder="Enter a detailed description..."
                    value={eventData.description}
                    onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="block text-sm font-medium text-gray-700 md:text-right md:px-6">Category :</label>
                <select
                    name="category"
                    required
                    className="input input-bordered w-full max-w-1/3 col-span-2"
                    value={eventData.category}
                    onChange={handleChange}
                >
                    <option value="">Select Category</option>
                    <option value="Music">Music</option>
                    <option value="Business">Business</option>
                    <option value="Sports">Sports</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="block text-sm font-medium text-gray-700 md:text-right md:px-6">Banner Image URL :</label>
                <input
                    type="text"
                    name="bannerImage"
                    required
                    className="input input-bordered w-full max-w-lg col-span-2"
                    placeholder="Banner Image URL"
                    value={eventData.bannerImage}
                    onChange={handleChange}
                />
            </div>
          <div className="flex justify-center mt-6 space-x-4">
            <button type="submit" disabled={isEventDataEmpty} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">Submit</button>
            <button type="button" onClick={onCancleCreate} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">Cancel</button>
          </div>
        </form>
    </div>
  );
};

export default CreateEvent;
