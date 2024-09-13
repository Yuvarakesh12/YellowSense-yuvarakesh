import React, { useState, useEffect, useCallback, useMemo } from 'react';
import JobCard from '../Jobcard/JobCard';
import './index.css';
import { FaBookmark } from "react-icons/fa";
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSalaryRange, setSelectedSalaryRange] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false); 
  const [showLoader, setShowLoader] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
    setBookmarkedJobs(savedBookmarks);
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setShowLoader(true);
      setError(null);
      try {
        const url = `https://testapi.getlokalapp.com/common/jobs?page=${page}`;
        const options = { method: 'GET' };
        const res = await fetch(url, options);
        if (res.ok) {
          const data = await res.json();
          const updatedData = data.results.map(each => ({
            id: each.id,
            title: each.title || '',
            jobLocation: each.job_location_slug || '',
            salaryMax: each.salary_max || 0,
            salaryMin: each.salary_min || 0,
            phoneData: each.whatsapp_no || '',
            content: each.content || '',
            jobCategory: each.job_category || '',
            companyName: each.company_name || '',
            jobRole: each.job_role || '',
            img: (each.creatives && each.creatives[0] && each.creatives[0].thumb_url) || '',
          }));
          setJobs(prevJobs => [...prevJobs, ...updatedData]);
          setHasMore(data.results.length > 0);
        } else {
          throw new Error('Failed to fetch jobs');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
          setShowLoader(false);
        }, 1500);
      }
    };
    fetchJobs();
  }, [page]);

  const handleAddToBookmarks = useCallback((job) => {
    const updatedBookmarks = [...bookmarkedJobs, job];
    setBookmarkedJobs(updatedBookmarks);
    localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
  }, [bookmarkedJobs]);

  const handleRemoveFromBookmarks = useCallback((job) => {
    const updatedBookmarks = bookmarkedJobs.filter(bookmarkedJob => bookmarkedJob.id !== job.id);
    setBookmarkedJobs(updatedBookmarks);
    localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
  }, [bookmarkedJobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const title = job.title || '';
      const jobLocation = job.jobLocation || '';

      const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            jobLocation.toLowerCase().includes(searchQuery.toLowerCase());

      const salary = (job.salaryMax + job.salaryMin) / 2;
      let matchesSalaryRange = true;

      switch (selectedSalaryRange) {
        case "0-30k":
          matchesSalaryRange = salary <= 30000;
          break;
        case "30k-60k":
          matchesSalaryRange = salary > 30000 && salary <= 60000;
          break;
        case "60k-90k":
          matchesSalaryRange = salary > 60000 && salary <= 90000;
          break;
        case "90k-120k":
          matchesSalaryRange = salary > 90000 && salary <= 120000;
          break;
        case "120k+":
          matchesSalaryRange = salary > 120000;
          break;
        default:
          matchesSalaryRange = true;
      }

      const matchesJobType = selectedJobTypes.length === 0 || selectedJobTypes.includes(job.jobCategory);

      return matchesSearch && matchesSalaryRange && matchesJobType;
    });
  }, [jobs, searchQuery, selectedSalaryRange, selectedJobTypes]);

  return (
    <div className="main-container">
       <nav className="nav-container">
      <div className="nav-left">
        <img
          className="logo"
          src="https://res.cloudinary.com/ds5ooz2ve/image/upload/v1726058487/unnamed_lfeczo.png"
          alt="Logo"
        />
        <h1 className="heading">LOKAL JOBS</h1>
      </div>
      
    </nav>
      <div className="primary-container">
        <div className="sub-container-1">
         
          <div className="job-list">
            <input
              type="search"
              placeholder="Search Jobs..."
              className="input"
              aria-label="Search Jobs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div  className="load-more-button">
            <button className="load"
           
            onClick={() => setPage(prevPage => prevPage + 1)}
            disabled={loading || !hasMore} 
          >
            Load More
          </button>
            </div>
             
            {showLoader && loading ? (
              <div className="loader-wrapper">
                <div className="custom-loader"></div>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  onAddToBookmarks={handleAddToBookmarks}
                  onRemoveFromBookmarks={handleRemoveFromBookmarks}
                  isBookmarked={bookmarkedJobs.some(bookmarkedJob => bookmarkedJob.id === job.id)}
                />
              ))
            )}
          </div>
        </div>
        <div className="sub-container-2">
          <div className="filter-header">
            <button 
              type="button" 
              className="clear-button" 
              onClick={() => {
                setSearchQuery("");
                setSelectedSalaryRange("");
                setSelectedJobTypes([]);
              }}
            >
              Clear
            </button>
          </div>
          <form className="filter-form">
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="jobType"
                  value="full-time"
                  onChange={(e) => setSelectedJobTypes(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(type => type !== e.target.value))}
                />
                Full-Time
              </label>
              <label>
                <input
                  type="checkbox"
                  name="jobType"
                  value="part-time"
                  onChange={(e) => setSelectedJobTypes(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(type => type !== e.target.value))}
                />
                Part-Time
              </label>
              <label>
                <input
                  type="checkbox"
                  name="jobType"
                  value="contract"
                  onChange={(e) => setSelectedJobTypes(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(type => type !== e.target.value))}
                />
                Contract
              </label>
              <label>
                <input
                  type="checkbox"
                  name="jobType"
                  value="internship"
                  onChange={(e) => setSelectedJobTypes(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(type => type !== e.target.value))}
                />
                Internship
              </label>
            </div>
            <div className="radio-group">
              <span>Salary Range:</span>
              <label>
                <input
                  type="radio"
                  name="salaryRange"
                  value="0-30k"
                  checked={selectedSalaryRange === "0-30k"}
                  onChange={(e) => setSelectedSalaryRange(e.target.value)}
                />
                $0 - $30,000
              </label>
              <label>
                <input
                  type="radio"
                  name="salaryRange"
                  value="30k-60k"
                  checked={selectedSalaryRange === "30k-60k"}
                  onChange={(e) => setSelectedSalaryRange(e.target.value)}
                />
                $30,000 - $60,000
              </label>
              <label>
                <input
                  type="radio"
                  name="salaryRange"
                  value="60k-90k"
                  checked={selectedSalaryRange === "60k-90k"}
                  onChange={(e) => setSelectedSalaryRange(e.target.value)}
                />
                $60,000 - $90,000
              </label>
              <label>
                <input
                  type="radio"
                  name="salaryRange"
                  value="90k-120k"
                  checked={selectedSalaryRange === "90k-120k"}
                  onChange={(e) => setSelectedSalaryRange(e.target.value)}
                />
                $90,000 - $120,000
              </label>
              <label>
                <input
                  type="radio"
                  name="salaryRange"
                  value="120k+"
                  checked={selectedSalaryRange === "120k+"}
                  onChange={(e) => setSelectedSalaryRange(e.target.value)}
                />
                $120,000+
              </label>
            </div>
            <div className="dropdown-group">
              <label htmlFor="sortBy">Sort By:</label>
              <select
                id="sortBy"
                onChange={(e) => {}}
              >
                <option value="date">Date Posted</option>
                <option value="salary">Salary</option>
                <option value="relevance">Relevance</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
