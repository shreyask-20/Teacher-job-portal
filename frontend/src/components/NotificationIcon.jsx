import { FaBell, FaCheckCircle, FaBriefcase, FaSchool } from 'react-icons/fa';
const getNotificationIcon = (type) => {
  switch (type) {
    case 'job-posted':
      return <FaBriefcase className="text-blue-600 text-xl" />;
    case 'application-submitted':
      return <FaCheckCircle className="text-green-600 text-xl" />;
    case 'status-update':
      return <FaBell className="text-yellow-500 text-xl" />;
    default:
      return <FaBell className="text-gray-500 text-xl" />;
  }
};


export default getNotificationIcon;