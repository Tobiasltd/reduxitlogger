import React, { useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLogs } from "../../actions/logActions";
import { searchLogs } from "../../actions/logActions";

const SearchBar = ({ searchLogs, getLogs }) => {
  const text = useRef("");

  const onChange = (e) => {
    searchLogs(text.current.value);
  };

  const onClick = () => {
    getLogs();
  };

  return (
    <nav style={{ marginBottom: "30px" }} className="blue">
      <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <input
              id="search"
              type="search"
              placeholder="Search Logs..."
              ref={text}
              onChange={onChange}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i onClick={onClick} className="material-icons">
              close
            </i>
          </div>
        </form>
      </div>
    </nav>
  );
};

SearchBar.propTypes = {
  searchLogs: PropTypes.func.isRequired,
  getLogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.log,
});

export default connect(mapStateToProps, { getLogs, searchLogs })(SearchBar);
