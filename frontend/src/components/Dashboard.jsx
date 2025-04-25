import { FaBriefcase, FaBookmark, FaRegClock, FaUser, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [stats, setStats] = useState({ applications: 0, savedJobs: 0 });
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      const userRes = await axios.get(`http://localhost:5000/api/auth/profile/${userId}`);
      setUser(userRes.data);

      // Calculate profile completion
      const fields = ['name', 'email', 'profession', 'location', 'phone', 'resumeUrl'];
      const filledFields = fields.filter(field => userRes.data[field]);
      setProfileCompletion((filledFields.length / fields.length) * 100);

      // Fetch profile stats
      const statsRes = await axios.get(`http://localhost:5000/api/applications/stats/${userId}`);
      setStats(statsRes.data);
    };

    const fetchJobs = async () => {
      const jobsRes = await axios.get("http://localhost:5000/api/jobs");
      setJobs(jobsRes.data);
    };

    fetchUserData();
    fetchJobs();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchRes = await axios.get("http://localhost:5000/api/jobs/search", {
      params: { title: searchTerm, location: searchLocation },
    });
    setJobs(searchRes.data);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                {user.profilePicUrl ? (
                  <img src={user.profilePicUrl} alt="Profile" className="h-16 w-16 rounded-full" />
                ) : (
                  <FaUser className="h-8 w-8 text-gray-500" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.name || "N/A"}</h2>
                <p className="text-gray-500">{user.profession || "N/A"}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center text-gray-500">
                <FaMapMarkerAlt className="w-5 h-5 mr-2" />
                <span>{user.location || "N/A"}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <FaEnvelope className="w-5 h-5 mr-2" />
                <span>{user.email || "N/A"}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <FaPhone className="w-5 h-5 mr-2" />
                <span>{user.phone || "N/A"}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Profile Completion</span>
                <span className="text-primary font-semibold">{Math.round(profileCompletion)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-primary rounded-full h-2" style={{ width: `${profileCompletion}%` }}></div>
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
                  <div className="text-2xl font-bold text-primary">{stats.applications}</div>
                  <div className="text-sm text-gray-500">Applications</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{stats.savedJobs}</div>
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
              {jobs.map((job) => (
                <div key={job._id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-4">
                      <div className="h-12 w-12 rounded bg-gray-200 flex items-center justify-center">
                        <FaBriefcase className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="text-gray-500">{job.location}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center">
                            <FaRegClock className="mr-1" /> {job.type}
                          </span>
                          <span>{job.salary}</span>
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