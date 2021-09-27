import styles from "./index.module.scss";

const SearchFlightsBoard = ({ searchResult, flightData }) => {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.test}>
        <table className={styles.searchTable}>
          <tbody>
            {searchResult.map((dest) => {
              let from = flightData.Places.find(
                (place) => dest.OutboundLeg.OriginId === place.PlaceId
              ).Name;

              let to = flightData.Places.find(
                (place) => dest.OutboundLeg.DestinationId === place.PlaceId
              ).Name;

              let departureDate = dest.OutboundLeg.DepartureDate.slice(0, 10);

              return (
                <tr className={styles.flights} key={dest.QuoteId}>
                  <td className={styles.from}>{from}</td>
                  <td className={styles.to}>{to}</td>
                  <td className={styles.price}>From {dest.MinPrice} :-</td>
                  <td>{departureDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchFlightsBoard;
