import React from 'react';
import eventImage from '../assets/event.jpg';
const Event = ({ event, onEdit, onDelete }) => {
    const formatDateTime = (dateTimeStr) => {
        return dateTimeStr.replace('T', ' ').replace('Z', '');
    };

    return (
        <div className="border rounded overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
            <img className="w-full h-48 object-cover" src={eventImage} alt={event.banner_image_url} />
            <div className="px-6 py-4">
                <h5 className="text-lg font-bold">{event.name}</h5>
                <div className='mt-2 mb-2'>
                    <span className="bg-red-400 text-white text-xs px-3 py-1 rounded-full mr-2">{event.category}</span>
                    <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{event.location}</span>
                </div>
                <p className="text-sm text-gray-600">{event.description}</p>
                <div className="mt-2">
                    <div className="flex items-center text-sm text-gray-600">
                        <i className="fas fa-hourglass-start text-blue-500 mr-2"></i>
                        Start Time: {formatDateTime(event.start_time)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <i className="fas fa-hourglass-end text-red-500 mr-2"></i>
                        End Time: {formatDateTime(event.end_time)}
                    </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-4 rounded" onClick={() => onEdit(event)}>Edit</button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mr-4 rounded" onClick={() => onDelete(event.id)}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Event;
