import { useNavigate, useParams } from "react-router-dom";
import "./PlaceForm.css";

import Input from "../../../app/shared/components/FormElements/Input";
import Button from "../../../app/shared/components/FormElements/Button";
import Card from "../../../app/shared/components/UIElements/Card";
import ErrorModal from "../../../app/shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../app/shared/components/UIElements/LoadingSpinner";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../app/shared/util/validators";
import { useForm } from "../../../app/shared/hooks/form-hook";
import { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../../app/shared/hooks/http-hook";
import { AuthContext } from "../../../app/shared/context/auth-context";

export default function UpdatePlace() {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();

  const { place_id } = useParams();

  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
    },
    true
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${place_id}`
        );

        setLoadedPlaces(responseData.place);

        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };

    fetchPlace();
  }, [sendRequest, place_id, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:5000/api/places/${place_id}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      navigate(`/${auth.user_id}/places`);
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlaces && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />

      {!isLoading && loadedPlaces && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
          />
          <Input
            id="description"
            element="textarea"
            type="text"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description"
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </div>
  );
}
