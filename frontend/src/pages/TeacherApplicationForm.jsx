import React, { useState } from 'react';
import './TeacherApplicationForm.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNotifications , addUnreadNotification,
  
 } from '../store/NotificationSlice';

 import axios from 'axios';

 import { NotificationBaseURL } from '../services/NotificationService';


const TeacherApplicationForm = () => {

  const dispatch = useDispatch();
  const userId =  localStorage.getItem("userId") || "67f4bb5f543b97f34da61235" ;
 

  const location = useLocation();
const jobId = location.state?.jobId;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    subject: '',
    educationLevel: '',
    educationDetails: '',
    experience: '',
    certification: '',
    resume: null,
    agree: false,
    
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };



  //for fetching recent notifications
  const fetchNotifications = async () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
  
    // Append all fields
    for (const key in formData) {
      if (key === 'resume' && formData[key]) {
        formDataToSend.append(key, formData[key]); // file
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }
  
    // Explicitly ensure jobId and status are appended
    formDataToSend.append("jobId", jobId);
    formDataToSend.append("status", "submitted");

  

    //Here get logged in userid from local storage or redux store right now temporary id is added
    
    formDataToSend.append("userId", userId);
  
    try {
      const response = await fetch("http://localhost:5000/api/teacherApplications", {
        method: "POST",
        body: formDataToSend,
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("Application submitted successfully!");
        fetchNotifications();
      

        console.log(data);
      } else {
        const error = await response.json();
        alert("Error submitting application: " + error.message);
      }
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("An error occurred while submitting the application.");
    }

    //for fetching notifications    
  



  };
  
  return (
    <div className="form-container">
      <h4 className="form-title">Teacher Application Form</h4>
      <p className="form-subtitle">Fill out the form below to apply for a teaching position.</p>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="firstName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="phone" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="gender" className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select your gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="subject" className="mb-3">
          <Form.Label>Subject</Form.Label>
          <Form.Select name="subject" value={formData.subject} onChange={handleChange}>
            <option value="">Select the subject you want to teach</option>
            <option>Mathematics</option>
            <option>Science</option>
            <option>English</option>
            <option>Social Studies</option>
            <option>Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="educationLevel" className="mb-3">
          <Form.Label>Education Level</Form.Label>
          <Form.Select name="educationLevel" value={formData.educationLevel} onChange={handleChange}>
            <option value="">Select your highest education level</option>
            <option>Bachelor's</option>
            <option>Master's</option>
            <option>PhD</option>
            <option>Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="educationDetails" className="mb-3">
          <Form.Label>Education Details</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter details of your education"
            name="educationDetails"
            value={formData.educationDetails}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="experience" className="mb-3">
          <Form.Label>Teaching Experience</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter details of your teaching experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Teaching Certification</Form.Label>
          <div>
            <Form.Check
              inline
              label="Yes"
              type="radio"
              name="certification"
              value="Yes"
              checked={formData.certification === 'Yes'}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="No"
              type="radio"
              name="certification"
              value="No"
              checked={formData.certification === 'No'}
              onChange={handleChange}
            />
          </div>
        </Form.Group>

        <Form.Group controlId="resume" className="mb-3 file-upload-box">
          <Form.Label>Upload Your Resume</Form.Label>
          <Form.Control
            type="file"
            name="resume"
            onChange={handleChange}
          />
        </Form.Group>
         <Form.Group controlId="resume" className="mb-3 file-upload-box">
          <Form.Label>Upload Your Documents</Form.Label>
          <Form.Control
            type="file"
            name="resume"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="By submitting this form, I agree to the terms and conditions of employment."
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Application
        </Button>
      </Form>
    </div>
  );
};

export default TeacherApplicationForm;
