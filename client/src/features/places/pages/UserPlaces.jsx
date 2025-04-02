import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

const places = [
  {
    id: "p1",
    title: "Empire state building",
    description: "One of the most famous sky scraperts dsdksdsdksdsldslkd",
    image: "https://picsum.photos/id/237/200/300",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lag: 40.7484445,
      lng: -73.9884946,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire state building",
    description: "One of the most famous sky scraperts dsdksdsdksdsldslkd",
    image: "https://picsum.photos/id/237/200/300",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lag: 40.7484445,
      lng: -73.9884946,
    },
    creator: "u2",
  },
];

export default function UserPlaces() {
  const { user_id } = useParams();

  const loadedPlaces = places.filter((place) => place.creator === user_id);

  return <PlaceList places={loadedPlaces} />;
}
