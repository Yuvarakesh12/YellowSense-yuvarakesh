import React, { useState, useEffect } from 'react';
import JobCard from '../Jobcard/JobCard';
import './bookmarks.css'; // Ensure this CSS file exists

const Bookmarks = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    try {
      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
      setBookmarkedJobs(savedBookmarks);
    } catch (error) {
      console.error("Failed to load bookmarked jobs:", error);
      setBookmarkedJobs([]);
    }
  }, []);

  const handleRemoveFromBookmarks = (job) => {
    const updatedBookmarks = bookmarkedJobs.filter(bookmarkedJob => bookmarkedJob.id !== job.id);
    setBookmarkedJobs(updatedBookmarks);
    localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="bookmarks-container">
      <nav className="nav-container">
        <img
          className="logo"
          src="https://res.cloudinary.com/ds5ooz2ve/image/upload/v1726058487/unnamed_lfeczo.png"
          alt="Logo"
        />
        <h1 className="heading">LOKAL JOBS</h1>
      </nav>
      <div className="bookmarks-list">
        {bookmarkedJobs.length > 0 ? (
          bookmarkedJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onRemoveFromBookmarks={handleRemoveFromBookmarks}
              isBookmarked={true}
            />
          ))
        ) : (
         <div className="error-container">
            <img src="https://img.freepik.com/premium-vector/no-data-illustration-concept_108061-573.jpg?w=740" className="nodata"/>
            </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
