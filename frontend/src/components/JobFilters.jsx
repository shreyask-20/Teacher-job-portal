import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const JobFilters = ({ filters, setFilters, onSearch, onReset }) => {
  return (
    <Form className="p-2 border rounded shadow-sm bg-light w-100">
      <Row className="align-items-end g-3">
        <Col md={3}>
          <Form.Group controlId="searchTitle">
            <Form.Label>Search Jobs</Form.Label>
            <Form.Select
              value={filters.title}
              onChange={(e) => setFilters({ ...filters, title: e.target.value })}
            >
              <option value="">Select Job Title</option>
              <option value="Science Teacher">Science Teacher</option>
              <option value="Math Teacher">Math Teacher</option>
              <option value="English Teacher">English Teacher</option>
              <option value="History Teacher">History Teacher</option>
              <option value="Geography Teacher">Geography Teacher</option>
              <option value="Computer Teacher">Computer Teacher</option>
              <option value="Physical Education Teacher">Physical Education Teacher</option>
              <option value="Arts Teacher">Arts Teacher</option>
              <option value="Music Teacher">Music Teacher</option>
              <option value="Kindergarten Teacher">Kindergarten Teacher</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="searchLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="City, State or Zip"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">All</option>
              <option>Science</option>
              <option>Math</option>
              <option>Physical Education</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group controlId="gradeLevel">
            <Form.Label>Grade Level</Form.Label>
            <Form.Select
              value={filters.grade}
              onChange={(e) => setFilters({ ...filters, grade: e.target.value })}
            >
              <option value="">All</option>
              <option>Primary</option>
              <option>Secondary</option>
              <option>Higher Secondary</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group controlId="jobType">
            <Form.Label>Job Type</Form.Label>
            <Form.Select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">All</option>
              <option>Full Time</option>
              <option>Part Time</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Buttons - Right Side */}
        <Col md={12} className="d-flex justify-content-end">
          <Button variant="primary" onClick={onSearch} className="me-2">
            Search
          </Button>
          <Button variant="secondary" onClick={onReset}>
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default JobFilters;
