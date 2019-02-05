import React from "react";

class GeoLocation extends React.PureComponent {
  static defaultProps = {
    onLocationUpdate: () => {}
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.getGeoLocationData();
  }

  getGeoLocationData() {
    const { onLocationUpdate } = this.props;
    navigator.geolocation.getCurrentPosition(
      position => {
        onLocationUpdate(position);
      },
      error => {
        onLocationUpdate(undefined, error);
      }
    );
  }

  componentDidMount() {
    this.getGeoLocationData();
  }

  render() {
    return null;
  }
}

export default GeoLocation;
