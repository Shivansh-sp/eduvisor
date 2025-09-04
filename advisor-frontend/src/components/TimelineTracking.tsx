import React, { useState } from 'react';
import { Calendar, Clock, Bell, CheckCircle, AlertCircle, BookOpen, GraduationCap, FileText } from 'lucide-react';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'exam' | 'deadline' | 'event' | 'reminder';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

const TimelineTracking: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  const events: TimelineEvent[] = [
    {
      id: '1',
      title: 'JEE Main Registration',
      description: 'Registration deadline for JEE Main 2024',
      date: '2024-01-15',
      type: 'deadline',
      priority: 'high',
      completed: false
    },
    {
      id: '2',
      title: 'NEET Application',
      description: 'NEET 2024 application submission',
      date: '2024-02-20',
      type: 'deadline',
      priority: 'high',
      completed: false
    },
    {
      id: '3',
      title: 'College Application Review',
      description: 'Review and finalize college applications',
      date: '2024-03-10',
      type: 'reminder',
      priority: 'medium',
      completed: true
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'exam': return <GraduationCap className="h-5 w-5" />;
      case 'deadline': return <AlertCircle className="h-5 w-5" />;
      case 'event': return <Calendar className="h-5 w-5" />;
      case 'reminder': return <Bell className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getEventColor = (type: string, priority: string) => {
    if (priority === 'high') return 'border-red-200 bg-red-50';
    if (priority === 'medium') return 'border-yellow-200 bg-yellow-50';
    return 'border-green-200 bg-green-50';
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'completed') return event.completed;
    if (filter === 'upcoming') return !event.completed;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Timeline Tracking</h1>
        <p className="text-gray-600">
          Stay updated with important admission dates, exam schedules, and deadlines. Never miss a crucial date!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline Events */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Timeline</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filter === 'all' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('upcoming')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filter === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filter === 'completed' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className={`p-4 rounded-lg border-2 ${getEventColor(event.type, event.priority)} cursor-pointer hover:shadow-md transition-shadow`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                        {event.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          event.priority === 'high' ? 'bg-red-100 text-red-700' :
                          event.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {event.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Events</span>
                <span className="font-semibold">{events.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Completed</span>
                <span className="font-semibold text-green-600">
                  {events.filter(e => e.completed).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Upcoming</span>
                <span className="font-semibold text-blue-600">
                  {events.filter(e => !e.completed).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">High Priority</span>
                <span className="font-semibold text-red-600">
                  {events.filter(e => e.priority === 'high').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3 mb-4">
              {getEventIcon(selectedEvent.type)}
              <h3 className="text-xl font-semibold text-gray-900">{selectedEvent.title}</h3>
            </div>
            
            <p className="text-gray-600 mb-4">{selectedEvent.description}</p>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <span>Date: {new Date(selectedEvent.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="mr-2">Priority:</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedEvent.priority === 'high' ? 'bg-red-100 text-red-700' :
                  selectedEvent.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {selectedEvent.priority}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <span className="mr-2">Status:</span>
                <span className={selectedEvent.completed ? 'text-green-600' : 'text-orange-600'}>
                  {selectedEvent.completed ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedEvent(null)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
              {!selectedEvent.completed && (
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineTracking;
