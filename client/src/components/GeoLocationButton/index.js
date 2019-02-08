import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { ReactComponent as LocationIcon } from "../../icons/location.svg";
import Button from "../Button";
import styles from "./geo-location-button.module.css";

class GeoLocationButton extends React.Component {
  state = {
    busy: false
  };

  handleGeoButtonClick = () => {
    if (this.state.busy) return;

    this.setState({
      busy: true
    });

    navigator.geolocation.getCurrentPosition(
      position => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.props.onChange(coords);
        this.setState({
          busy: false
        });
      },
      error => {
        this.setState({
          busy: false
        });
        this.props.onError(error);
      }
    );
  };

  render() {
    let buttonClassNames = classNames(styles["geo-button"], {
      [styles.busy]: this.state.busy
    });

    return (
      <Button
        circular
        className={buttonClassNames}
        onClick={this.handleGeoButtonClick}
      >
        <LocationIcon />
      </Button>
    );
  }
}

export default connect(null)(GeoLocationButton);
