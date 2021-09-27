import styles from "./index.module.scss";

const FlightsBoard = ({ quotes, flightData }) => {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.tableDiv}>
        <table className={styles.board}>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Price</th>
              <th>Direct flight</th>
              <th>Departure</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((dest) => {
              let departureFromAirport = flightData.Places.find(
                (place) => dest.OutboundLeg.OriginId === place.PlaceId
              ).Name;

              let arriveToAirport = flightData.Places.find(
                (place) => dest.OutboundLeg.DestinationId === place.PlaceId
              ).Name;

              let departureDate = dest.OutboundLeg.DepartureDate.slice(0, 10);
              
              let direct = "";

              if (dest.Direct === true ? (direct = "Yes") : (direct = "No"));
                return (
                  <tr className={styles.flights} key={dest.QuoteId}>
                    <td className={styles.from}>{departureFromAirport}</td>
                    <td className={styles.to}>{arriveToAirport}</td>
                    <td className={styles.price}>From {dest.MinPrice} :-</td>
                    <td>{direct}</td>
                    <td>{departureDate}</td>
                  </tr>
                );
            })}
          </tbody>
        </table>
      </div>
      {/* <iframe
          src="https://widgets.skyscanner.net/widget-server/widgets/iframe?skyscannerWidget=FlightSearchWidget&associateId=ABBBCCC&locale=sv-SE&market=SE&currency=SEK&directFlights=true"
          title="widget"
        ></iframe> */}
    </div>
  );
};

export default FlightsBoard;
