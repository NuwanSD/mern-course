import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../../app/shared/hooks/http-hook";
import ErrorModal from "../../../app/shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../app/shared/components/UIElements/LoadingSpinner";

import { useEffect, useState } from "react";

export default function UserPlaces() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();

  const { user_id } = useParams();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${user_id}`
        );
        setLoadedPlaces(responseData.places);
      } catch (error) {}
    };

    fetchPlaces();
  }, [sendRequest, user_id]);

  const placeDeleteHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList places={loadedPlaces} onDeletePlace={placeDeleteHandler} />
      )}
    </div>
  );
}
