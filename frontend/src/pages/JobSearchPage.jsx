import React, { useState, useEffect } from "react";
import JobFilters from "../components/JobFilters";
import JobCard from "../components/JobCard";
import { fetchJobs } from "../services/jobService";
import { Container } from "react-bootstrap";

const JobSearchPage = () => {
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    category: "",
    grade: "",
    type: "",
  });

  // Dummy job data
  const dummyJobs = [
    {
      _id: "1",
      title: "Math Teacher",
      location: "New York",
      category: "Math",
      grade: "High School",
      type: "Full-Time",
      salary: "50000",
      description: "Looking for an experienced Math teacher.",
      experience: 3,
    },
    {
      _id: "2",
      title: "Science Teacher",
      location: "California",
      category: "Science",
      grade: "Middle School",
      type: "Part-Time",
      salary: "30000",
      description: "Looking for a part-time Science teacher.",
      experience: 2,
    },
    {
      _id: "3",
      title: "English Teacher",
      location: "Texas",
      category: "English",
      grade: "Elementary School",
      type: "Full-Time",
      salary: "40000",
      description: "Looking for an English teacher for elementary school.",
      experience: 1,
    },
    {
      _id: "4",
      title: "History Teacher",
      location: "Florida",
      category: "History",
      grade: "High School",
      type: "Full-Time",
      salary: "45000",
      description: "Looking for a History teacher with 5 years of experience.",
      experience: 5,
    },
  ];

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetchJobs(); // Fetch jobs from the backend
        setJobs(response.data); // Set jobs from backend
        setFilteredJobs(response.data); // Initialize filteredJobs with backend data
      } catch (err) {
        console.error("Error fetching jobs from backend. Using dummy data:", err);
        setJobs(dummyJobs); // Fallback to dummy data
        setFilteredJobs(dummyJobs); // Initialize filteredJobs with dummy data
      }
    };
    getJobs();
  }, []);

  const handleSearch = () => {
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        job.location.toLowerCase().includes(filters.location.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  const handleReset = () => {
    setFilters({ title: "", location: "", category: "", grade: "", type: "" });
    setFilteredJobs(jobs);
  };

  return (
    <Container>
      <JobFilters
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
        onReset={handleReset}
      />
      {filteredJobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </Container>
  );
};

export default JobSearchPage;