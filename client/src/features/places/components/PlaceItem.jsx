import "./PlaceItem.css";
import Card from "../../../app/shared/components/UIElements/Card";
import Button from "../../../app/shared/components/FormElements/Button";

export default function PlaceItem({ place }) {
  return (
    <li className="place-item">
      <Card className="place-item__content">
        <div className="place-item__image">
          <img src={place.image} alt={place.title} />
        </div>
        <div className="place-item__info">
          <h2>{place.title}</h2>
          <h3>{place.address}</h3>
          <p>{place.description}</p>
        </div>
        <div className="place-item__actions">
          <Button inverse>View on map</Button>
          <Button to={`/places/${place.id}`}>Edit</Button>
          <Button danger>Delete</Button>
        </div>
      </Card>
    </li>
  );
}
