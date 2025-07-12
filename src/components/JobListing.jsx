import React from "react";

import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

function JobListing(props) {
  function calculateDaysFromToday(timestamp) {
    const currentTimestamp = Date.now();
    const givenTimestamp = timestamp * 1000;
    const difference = currentTimestamp - givenTimestamp;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return "posted today";
    }
    return `posted ${days} day${days > 1 ? "s" : ""} ago`;
  }

  return (
    <div>
      <div className="jobListingContainer" onClick={props.onClick}>
        <div className="jobListing" style={props.style}>
          {calculateDaysFromToday(props.timestamp) === "posted today" && (
            <div
              style={{
                marginBottom: "-8px",
                marginTop: "5px",
                color: "#9c3060",
              }}
            >
              new
            </div>
          )}
          <h2
            style={{
              marginTop: "10px",
              marginBottom: "4px",
              fontFamily: "Yorkten NorMed",
            }}
          >
            {props.title}
          </h2>
          <div className="jobDescriptionStyle">{props.company}</div>
          <div className="jobDescriptionStyle">
            {props.city} • {props.state}
          </div>
          <div className="jobTypeContainer">
            <div className="jobType" style={{ alignContent: "center" }}>
              <BusinessCenterIcon
                style={{ fontSize: "17px", padding: "2px 0 2px 2px" }}
              />
              {props.employmentType}
            </div>
            {props.payment && <div className="jobType">${props.payment}</div>}
          </div>
          <ul>
            <div className="jobDescriptionStyleC">{props.benefits}</div>
          </ul>

          <div style={{ color: "#868686", paddingBottom: "8px" }}>
            {calculateDaysFromToday(props.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(JobListing);
