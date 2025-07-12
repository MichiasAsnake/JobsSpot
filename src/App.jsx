import SearchBar from "./components/SearchBar";
import JobListing from "./components/JobListing";
import JobDetail from "./components/JobDetail";
import { CircularProgress, Box } from "@mui/material";
/*import RecentSearches from './components/RecentSearches'*/
import React from "react";

function App() {
  const [jobsData, setData] = React.useState([]);
  const [detail, setDetail] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [selected, setSelected] = React.useState(false);
  const [welcome, setWelcome] = React.useState(true);
  const [displayR, setDisplayR] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [isVisible, setisVisible] = React.useState(false);

  const handleClick = (index) => {
    setSelectedIndex(index);
    setDetail(!detail);
    setSelected(!selected);
  };

  function FetchAPI(what, where) {
    setIsLoading(true);
    setWelcome(false);

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "453d029873msh6627099e77649d9p11ec34jsnd769fd724a31",
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    };

    fetch(
      `https://jsearch.p.rapidapi.com/search?query=${what}%20in%20${where}&num_pages=3`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setIsLoading(false);
      });
  }

  const jobsDetails = jobsData.map((x, index) => {
    return (
      <div className="stationaryContainer">
        <JobDetail
          title={x.job_title}
          company={x.employer_name}
          city={x.job_city}
          country={x.job_country}
          employmentType={x.job_employment_type}
          description={x.job_description}
          site={x.job_publisher}
          link={x.job_apply_link}
          image={x.employer_logo}
          qualifications={
            x.job_highlights.Qualifications && (
              <li>{x.job_highlights.Qualifications}</li>
            )
          }
          benefits={
            x.job_highlights.Benefits && <li>{x.job_highlights.Benefits}</li>
          }
        />
      </div>
    );
  });

  /*{displayR ? <RecentSearches/> : ''}*/

  function Loaded(loaded) {
    {
      loaded ? "" : setWelcome(!welcome);
    }
  }

  /*function ShowDisplay(recent){
  {recent ? setDisplayR(!displayR) : ''}
}*/

  return (
    <div>
      <header
        style={{
          fontFamily: "Yorkten NorMed",
          padding: "10px 0 10px 15px",
          backgroundColor: "#ffff",
          color: "#003a9b",
        }}
      >
        <h1>JobsSpot</h1>
      </header>
      <div>
        <SearchBar
          FetchAPI={FetchAPI}
          Loaded={Loaded}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          /*Recent={ShowDisplay}*/
        />

        <div className="feedContainer">
          <div className="scrollContainer">
            {welcome ? (
              <h1
                className="welcome-message"
                style={{
                  width: "50vw",
                  display: "flex",
                  justifyContent: "center",
                  margin: "50px 80px",
                  color: "#2d2d2d",
                  fontFamily: "Yorkten NorMed",
                  textAlign: "center",
                }}
              >
                Search for a job to get started!
              </h1>
            ) : (
              ""
            )}

            {isLoading ? (
              <div
                className="loading-container"
                style={{ margin: "50px 100px" }}
              >
                <CircularProgress
                  size={60}
                  thickness={4}
                  sx={{
                    color: "#2557a7",
                    "& .MuiCircularProgress-circle": {
                      strokeLinecap: "round",
                    },
                  }}
                />
                <div className="loading-text">Searching for jobs...</div>
              </div>
            ) : (
              jobsData.map((x, index) => (
                <div className="jobDetailsContainer">
                  <JobListing
                    title={x.job_title}
                    company={x.employer_name}
                    city={x.job_city}
                    state={x.job_state}
                    employmentType={x.job_employment_type}
                    description={x.job_description}
                    timestamp={x.job_posted_at_timestamp}
                    benefits={
                      x.job_highlights.Benefits && (
                        <li>{x.job_highlights.Benefits}</li>
                      )
                    }
                    qualifications={<li>{x.job_highlights.Qualifications}</li>}
                    payment={x.job_min_salary ? x.job_min_salary : null}
                    key={x.job_offer_expiration_timestamp}
                    onClick={() => handleClick(index)}
                    style={
                      selected && index === selectedIndex
                        ? { border: "solid #2557a7 2px" }
                        : {}
                    }
                  />
                  <div>
                    {detail && index === selectedIndex && jobsDetails[index]}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(App);
