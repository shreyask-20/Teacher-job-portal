import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell, FaUser, FaSearch, FaBriefcase, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  
  const notifications = [
    {
      id: 1,
      type: 'new_job',
      title: 'New Job Alert',
      message: 'New Senior Developer position at TechCorp',
      icon: <FaBriefcase className="h-5 w-5 text-blue-500" />,
      time: '5m ago'
    },
    {
      id: 2,
      type: 'profile',
      title: 'Complete Your Profile',
      message: 'Add your work experience to improve profile strength',
      icon: <FaExclamationCircle className="h-5 w-5 text-yellow-500" />,
      time: '1h ago'
    },
    {
      id: 3,
      type: 'application',
      title: 'Application Update',
      message: 'You have been shortlisted for Frontend Developer position',
      icon: <FaCheckCircle className="h-5 w-5 text-green-500" />,
      time: '2h ago'
    }
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="bg-primary text-white px-3 py-1 rounded-l-md text-xl font-bold">Job</span>
                <span className="bg-gray-900 text-white px-3 py-1 rounded-r-md text-xl font-bold">Grids</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-primary">
                Home
              </Link>
              <Link to="/profile" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                Profile
              </Link>
              <Link to="/jobs" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                Job Search
              </Link>
              <Link to="/applications" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                Applications
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <FaBell className="h-6 w-6 text-gray-500 hover:text-gray-900 cursor-pointer" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            {notification.icon}
                          </div>
                          <div className="ml-3 w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {notification.message}
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <button className="text-sm text-primary hover:text-secondary w-full text-center">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button 
              onClick={() => navigate('/profile')}
              className="h-8 w-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
            >
              <FaUser className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;