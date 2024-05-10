import moment from "moment";
export const TimeOnSite = () => {
  const formattedTimeSite = moment.utc(JSON.parse(localStorage.getItem("timeOnSite"))).format("HH:mm:ss");
  return <p>{formattedTimeSite}</p>;
};
