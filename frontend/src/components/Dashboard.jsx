import { FaBriefcase, FaBookmark, FaRegClock, FaUser, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Dashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  // Sample job listings data
  const allJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      salary: '$80k - $100k',
      type: 'Full Time',
      location: 'San Francisco, CA',
    },
    {
      id: 2,
      title: 'Backend Engineer',
      company: 'DataSys',
      salary: '$90k - $120k',
      type: 'Full Time',
      location: 'New York, NY',
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'WebSolutions',
      salary: '$70k - $95k',
      type: 'Full Time',
      location: 'Remote',
    },
  ];

  // Filter jobs based on search criteria
  const filteredJobs = allJobs.filter(job => {
    const matchesTitle = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = job.location.toLowerCase().includes(searchLocation.toLowerCase());
    
    return (!searchTerm || matchesTitle) && (!searchLocation || matchesLocation);
  });

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // You can add additional search logic here if needed
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                <FaUser className="h-8 w-8 text-gray-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">John Doe</h2>
                <p className="text-gray-500">Software Developer</p>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center text-gray-500">
                <FaMapMarkerAlt className="w-5 h-5 mr-2" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center text-gray-500">
                <FaEnvelope className="w-5 h-5 mr-2" />
                <span>john.doe@example.com</span>
              </div>
              <div className="flex items-center text-gray-500">
                <FaPhone className="w-5 h-5 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Profile Completion</span>
                <span className="text-primary font-semibold">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-primary rounded-full h-2" style={{ width: '85%' }}></div>
              </div>
              <button 
                onClick={() => navigate('/profile')}
                className="w-full mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors">
                Complete Profile
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold mb-3">Profile Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-primary">28</div>
                  <div className="text-sm text-gray-500">Applications</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-gray-500">Saved Jobs</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Job Search Bar */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button 
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary transition-colors">
                Search
              </button>
            </form>
          </div>

          {/* Recent Job Listings */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Recent Job Listings</h2>
            </div>
            <div className="divide-y">
              {filteredJobs.map((job) => (
                <div key={job.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-4">
                      <div className="h-12 w-12 rounded bg-gray-200 flex items-center justify-center">
                        <FaBriefcase className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="text-gray-500">{job.company}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center">
                            <FaRegClock className="mr-1" /> {job.type}
                          </span>
                          <span>{job.salary}</span>
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-primary hover:text-secondary">
                      <FaBookmark className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;