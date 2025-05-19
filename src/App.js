import React, { useState, useEffect, useRef } from 'react';
import {
  Search, Calendar, Image, Film, Paperclip, User, Settings, Plus, X,
  Edit, Trash2, ChevronLeft, ChevronRight, Tag, Lock, Globe, Users
} from 'lucide-react';

// Firebase config placeholder
const firebaseConfig = {
  // Your Firebase config would go here if used
};

// Category definitions
const CATEGORIES = [
  { id: 'personal', name: 'Personal', color: 'bg-blue-500' },
  { id: 'work', name: 'Work', color: 'bg-green-500' },
  { id: 'education', name: 'Education', color: 'bg-yellow-500' },
  { id: 'travel', name: 'Travel', color: 'bg-purple-500' },
  { id: 'health', name: 'Health', color: 'bg-red-500' },
];

// Event data
const MOCK_EVENTS = [
  {
    id: '1',
    title: 'First Day at New Job',
    description: 'Started my new position as a software developer',
    date: '2025-01-15',
    category: 'work',
    media: ['/api/placeholder/200/150'],
    privacy: 'public',
  },
  {
    id: '2',
    title: 'Family Vacation',
    description: 'Two weeks in Italy exploring Rome and Florence',
    date: '2025-03-10',
    category: 'travel',
    media: ['/api/placeholder/200/150', '/api/placeholder/200/150'],
    privacy: 'friends',
  },
  {
    id: '3',
    title: 'Completed Online Course',
    description: 'Finished the advanced React development certification',
    date: '2025-04-22',
    category: 'education',
    media: [],
    privacy: 'public',
  },
  {
    id: '4',
    title: 'Doctor Appointment',
    description: 'Annual physical checkup',
    date: '2025-05-05',
    category: 'health',
    media: [],
    privacy: 'private',
  },
  {
    id: '5',
    title: 'Birthday Celebration',
    description: 'My 30th birthday party with friends and family',
    date: '2025-05-17',
    category: 'personal',
    media: ['/api/placeholder/200/150'],
    privacy: 'friends',
  },
  {
    id: '6',
    title: 'Project Deadline',
    description: 'Completed the major client project ahead of schedule',
    date: '2025-06-30',
    category: 'work',
    media: [],
    privacy: 'public',
  },
];

// Your full timeline component
export default function App() {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [filteredEvents, setFilteredEvents] = useState(MOCK_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const timelineRef = useRef(null);

  useEffect(() => {
    let filtered = [...events];
    if (search) {
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(e => selectedCategories.includes(e.category));
    }
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    setFilteredEvents(filtered);
  }, [events, search, selectedCategories]);

  const scrollLeft = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const getCategoryColor = (categoryId) => {
    const category = CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.color : 'bg-gray-500';
  };

  const getPrivacyIcon = (privacy) => {
    switch (privacy) {
      case 'private': return <Lock size={16} />;
      case 'friends': return <Users size={16} />;
      case 'public': return <Globe size={16} />;
      default: return <Globe size={16} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Timeline</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
      </header>

      <div className="bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center space-x-4">
          <span className="text-gray-700 font-medium">Filter:</span>
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategories(prev =>
                  prev.includes(category.id)
                    ? prev.filter(id => id !== category.id)
                    : [...prev, category.id]
                );
              }}
              className={`px-3 py-1 rounded-full flex items-center space-x-2 ${selectedCategories.includes(category.id)
                ? `${category.color} text-white`
                : 'bg-gray-200 text-gray-700'
                }`}
            >
              <Tag size={16} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 flex flex-col overflow-hidden p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Your Timeline</h2>
          <div className="flex space-x-2">
            <button onClick={scrollLeft} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <ChevronLeft size={20} />
            </button>
            <button onClick={scrollRight} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <div ref={timelineRef} className="absolute inset-0 overflow-x-auto whitespace-nowrap pb-4">
            <div className="inline-block h-full min-w-full">
              <div className="flex items-stretch h-full">
                {filteredEvents.map(event => (
                  <div key={event.id} className="relative w-80 flex-shrink-0 p-2 h-full">
                    <div className="absolute left-1/2 top-10 bottom-0 w-0.5 bg-gray-300"></div>
                    <div className="relative mb-2 flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full ${getCategoryColor(event.category)} z-10`}></div>
                      <div className="text-sm font-medium mt-1">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                    <div className="relative bg-white rounded-lg shadow-md p-4 mt-4 cursor-pointer hover:shadow-lg transition">
                      <div className="absolute -top-1 right-4">
                        <div className={`px-2 py-0.5 rounded-full text-xs text-white ${getCategoryColor(event.category)}`}>
                          {CATEGORIES.find(cat => cat.id === event.category)?.name}
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 text-gray-500">
                        {getPrivacyIcon(event.privacy)}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 pr-6">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                      {event.media?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {event.media.map((url, i) => (
                            <img
                              key={i}
                              src={url}
                              alt={`Media for ${event.title}`}
                              className="w-20 h-20 object-cover rounded"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
