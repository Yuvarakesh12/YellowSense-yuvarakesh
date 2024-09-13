import React from 'react';
import PropTypes from 'prop-types';
import { FaLocationDot, FaRupeeSign, FaPhone } from 'react-icons/fa6';
import './jobCard.css';

const JobCard = ({ job, onAddToBookmarks, onRemoveFromBookmarks, isBookmarked }) => {
  const { id, title, salaryMax, salaryMin, jobLocation, phoneData, img } = job;

  return (
    <div className="job-card">
      <img src={img} alt={title} className="image" />
      <div className="job-info">
        <p className="job-title">{title}</p>
        <p className="job-location">
          <FaLocationDot className="icon" aria-label="Location" />
          {jobLocation}
        </p>
        <p className="job-salary">
          <FaRupeeSign className="icon" aria-label="Salary" />
          {salaryMin} - {salaryMax}
        </p>
        <p className="job-phone">
          <FaPhone className="icon" aria-label="Phone" />
          {phoneData}
        </p>
      </div>
      <div className="job-actions">
        {onAddToBookmarks && !isBookmarked && (
          <button
            className="add-button"
            onClick={() => onAddToBookmarks(job)}
            aria-label={`Add ${title} to Bookmarks`}
          >
            Add
          </button>
        )}
        {onRemoveFromBookmarks && isBookmarked && (
          <button
            className="add-button"
            onClick={() => onRemoveFromBookmarks(job)}
            aria-label={`Remove ${title} from Bookmarks`}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    salaryMax: PropTypes.number.isRequired,
    salaryMin: PropTypes.number.isRequired,
    jobLocation: PropTypes.string.isRequired,
    phoneData: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
  onAddToBookmarks: PropTypes.func,
  onRemoveFromBookmarks: PropTypes.func,
  isBookmarked: PropTypes.bool,
};

export default JobCard;
