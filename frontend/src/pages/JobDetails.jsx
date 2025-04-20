import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { Card, Button, Table, Row, Col } from 'react-bootstrap';
import './JobDetails.css';
import qrImage from '../assets/scan.jpeg';


const JobDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { job } = location.state;
  const handleApply = () => {
    navigate('/teacher-application', {
      state: { jobId: job._id },
    });

  };

  return (
    <div className="job-details-container">
      <Row>
        <Col md={8}>
          <Card className="p-4 shadow-sm border-0 rounded-4">
            <h3 className="fw-bold text-primary mb-4">{job.title}</h3>

            <Table striped bordered hover responsive>
              <tbody>
                <tr><th>Location</th><td>{job?.location || "Not Mentioned"}</td></tr>
                <tr><th>Category</th><td>{job?.category || "Not Mentioned"}</td></tr>
                <tr><th>Grade</th><td>{job?.grade || "Not Mentioned"}</td></tr>
                <tr><th>Subject</th><td>{job?.subject || "Not Mentioned"}</td></tr>
                <tr><th>Experience</th><td>{job?.experience || "0"} years</td></tr>
                <tr><th>Salary</th><td>{job?.salary || "Negotiable"}</td></tr>
                <tr><th>Qualification</th><td>{job?.qualification || "Not Specified"}</td></tr>
                <tr><th>Accommodation</th><td>{job?.accommodation || "Not Provided"}</td></tr>
                <tr><th>Interview Date</th><td>{job?.interviewDate || "Will be Informed"}</td></tr>
                <tr><th>Contact</th><td>{job?.contact || "Not Provided"}</td></tr>
                <tr><th>Description</th><td>{job?.description || "No Description"}</td></tr>
              </tbody>
            </Table>

             <div className="button-group">
               <Button variant="primary" className="apply-btn" onClick={handleApply}>
        Apply
      </Button>
              <Button variant="secondary" href="/">Back</Button>
            </div>
             </Card>
        </Col>

        <Col md={4}>
          <div className="share-section">
            <div className="share-box">
              <p>Share with your Friends</p>
              <div className="social-icons">
                <i className="bi bi-twitter"></i>
                <i className="bi bi-facebook"></i>
                <i className="bi bi-whatsapp"></i>
                <i className="bi bi-telegram"></i>
              </div>
            </div>

            <div className="qr-box mt-4">
              <p>Scan QR</p>
              <img src={qrImage} alt="QR Code" className="qr-img" />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default JobDetails;
