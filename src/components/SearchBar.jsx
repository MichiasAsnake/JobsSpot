import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Icon, CircularProgress } from "@mui/material";

function SearchBar(props) {
  const [what, setWhat] = React.useState("");
  const [where, setWhere] = React.useState("");
  const [loaded, setLoaded] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  /*const[recent,setRecent] = React.useState(false)*/

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!what.trim() || !where.trim()) {
      return; // Don't search if fields are empty
    }

    setIsSearching(true);
    setWhat("");
    setWhere("");
    setLoaded(!loaded);
    event.target.reset();

    props.FetchAPI(what, where);
    props.Loaded(loaded);
  };

  // Reset searching state when parent loading state changes
  React.useEffect(() => {
    if (!props.isLoading && isSearching) {
      setIsSearching(false);
    }
  }, [props.isLoading, isSearching]);

  const search = {
    what: props.what,
    where: props.where,
    key: Date.now(),
  };

  localStorage.setItem("search", JSON.stringify(search));

  const recent = JSON.parse(localStorage.getItem("search"));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="searchContainer"
        >
          <div>
            <input
              type="text"
              id="what"
              name="what"
              value={props.what}
              className="searchBar"
              placeholder="What"
              onChange={(event) => setWhat(event.target.value)}
              disabled={isSearching}
            />
            <input
              type="text"
              id="where"
              name="where"
              value={props.where}
              className="searchBar"
              placeholder="Where"
              onChange={(event) => setWhere(event.target.value)}
              disabled={isSearching}
            />
            <button
              type="submit"
              className="findJobsButton"
              disabled={isSearching || !what.trim() || !where.trim()}
              style={{
                opacity: isSearching || !what.trim() || !where.trim() ? 0.6 : 1,
                cursor:
                  isSearching || !what.trim() || !where.trim()
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {isSearching ? (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <CircularProgress size={16} sx={{ color: "white" }} />
                  Searching...
                </div>
              ) : (
                "Find Jobs"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default React.memo(SearchBar);
