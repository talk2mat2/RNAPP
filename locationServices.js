export const getUserlocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        props.getUserLocation(position);
        // successHandler(position);
      },
      (error) => errorHandler(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  } else {
    console.log("Not Available");
  }
};
