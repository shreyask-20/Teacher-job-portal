import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from 'react-bootstrap';

const JobCard = ({ job }) => {
   const navigate = useNavigate();
  return (
    <Card className="mb-4 shadow-sm border-0 rounded-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="fw-bold text-primary mb-0">{job.title}</h5>
          <Badge bg="info" className="text-uppercase">{job.type}</Badge>
        </div>
        <p className="text-muted mb-1"><strong>Location:</strong> {job.location}</p>
        <p className="text-muted mb-1"><strong>Category:</strong> {job.category} | <strong>Grade:</strong> {job.grade}</p>
        <p className="text-muted mb-1"><strong>Subject:</strong> {job.subject}</p>
        <p className="text-muted mb-1"><strong>Experience Required:</strong> {job.experience} years</p>
        <p className="text-muted mb-2"><strong>Salary:</strong> {job.salary}</p>
        <p className="mb-3 text-dark">{job.description}</p>
        <div className="d-flex justify-content-end">
          <Button 
            variant="outline-primary" 
            className="rounded-pill px-4"
            onClick={() => navigate('/job-details', { state: { job } })}
          >
            Apply
          </Button>
        </div>
      </Card.Body>
      <Card.Footer className="bg-light text-muted text-end small">Posted on: {job.date}</Card.Footer>
    </Card>
  );
};

export default JobCard;
