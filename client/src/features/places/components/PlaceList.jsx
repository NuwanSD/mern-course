import "./PlaceList.css";
import Card from "../../../app/shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";

export default function PlaceList({ places }) {
  if (places.length === 0)
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Mybe create one?</h2>
          <button>Share place</button>
        </Card>
      </div>
    );

  return (
    <ul className="place-list">
      {places.map((place) => (
        <PlaceItem key={place.id} place={place} />
      ))}
    </ul>
  );
}
