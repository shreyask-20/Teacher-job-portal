import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/jobs" });

export const fetchJobs = () => API.get("/");
export const addJob = (jobData) => API.post("/", jobData);

import { useDispatch } from 'react-redux';
import { setNotifications , addUnreadNotification,
  
 } from '../store/NotificationSlice';




//whenever job is added then call these function
export const fetchNotifications = async () => {


  const userId = localStorage.getItem("userId") || "67f4bb5f543b97f34da61235" ;
    const dispatch = useDispatch()
    try {
      //here add userId
      const res = await axios.get(`${NotificationBaseURL}/${userId}`);
      dispatch(setNotifications(res.data));
    } catch (err) {
      console.error('Failed to fetch all notifications', err);
    }
  
    try {
      //here add userId
      const res = await axios.get(`${NotificationBaseURL}/unread/${userId}`);
      res.data.forEach((notification) => {
        dispatch(addUnreadNotification(notification));
      });
    } catch (err) {
      console.error('Error fetching unread notifications', err);
    }
  };

