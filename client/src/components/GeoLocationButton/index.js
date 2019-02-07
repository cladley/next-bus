import React from "react";
import { connect } from "react-redux";
import { ReactComponent as LocationIcon } from "../../icons/location.svg";
import Button from "../Button";
import { getGeoLocation } from "../../actions";
import styles from "./geo-location-button.module.css";

class GeoLocationButton extends React.Component {
  handleGeoButtonClick = () => {
    this.props.dispatch(
      getGeoLocation(position => {
        console.log("DONE");
        this.props.onChange(position);
      })
    );
  };

  render() {
    return (
      <Button
        circular
        className={styles["geo-button"]}
        onClick={this.handleGeoButtonClick}
      >
        <LocationIcon />
      </Button>
    );
  }
}

export default connect(null)(GeoLocationButton);
