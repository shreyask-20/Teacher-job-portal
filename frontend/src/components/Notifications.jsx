
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setNotifications, removeReadNotification } from '../store/NotificationSlice';
import getNotificationIcon from './NotificationIcon';
import { FaBell, FaCheckCircle, FaBriefcase, FaSchool } from 'react-icons/fa';

import { NotificationBaseURL } from '../services/NotificationService';
import { useNavigate } from 'react-router-dom';

function Notification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.list);
  const userId =  localStorage.getItem("userId") || "67f4bb5f543b97f34da61235" ;

  useEffect(() => {
    const fetchAllNotifications = async () => {
      try {
        
        const res = await axios.get(`${NotificationBaseURL}/${userId}`);
        dispatch(setNotifications(res.data));

        
        // console.log(res.data);
        
      } catch (err) {
        console.error('Failed to fetch all notifications', err);
      }
    };
    fetchAllNotifications();
  }, [dispatch]);

 
    const handleNotificationClick = async (id, isRead) => {
      if (!isRead) {
        try {
          await axios.put(`${NotificationBaseURL}/read/${id}`);
          dispatch(removeReadNotification(id));
          
        } catch (err) {
          console.error('Failed to mark as read', err);
        }
      }
      navigate('/applications');
    };

   


 
 

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Notifications</h1>
      {notifications.length > 0 ? (
        notifications.map(notification => (
          <div
            key={notification._id}
            onClick={() => handleNotificationClick(notification._id, notification.isRead)}
            className={`p-4 mb-2 border rounded-md cursor-pointer transition ${
              notification.isRead ? 'bg-gray-100' : 'bg-white shadow-md'
            }`}
          >
            <div className="mt-1">{getNotificationIcon(notification.type)}</div>
            <div className="flex-1">
               <p className="font-medium text-lg">{notification.title}</p>

               {/* ✅ Institution name */}
               <p className="text-sm text-indigo-700 flex items-center mb-1">
                 <FaSchool className="mr-1" />
                 {notification.institution}
              

               </p>

               <p className="text-sm text-gray-700">{notification.message}</p>
               <p className="text-xs text-gray-400 mt-1">
                 {new Date(notification.createdAt).toLocaleString()}
               </p>
             </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No notifications found.</p>
      )}
    </div>
  );
}

export default Notification;
