import { useParams } from "react-router-dom";
import "./PlaceForm.css";

import Input from "../../../app/shared/components/FormElements/Input";
import Button from "../../../app/shared/components/FormElements/Button";
import Card from "../../../app/shared/components/UIElements/Card";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../app/shared/util/validators";
import { useForm } from "../../../app/shared/hooks/form-hook";
import { useEffect, useState } from "react";

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

export default function UpdatePlace() {
  const [isLoading, setIsLoading] = useState(true);

  const { place_id } = useParams();

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

  const identifiedPlace = places.find((p) => p.id === place_id);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
      setIsLoading(false);
    }
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
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
  );
}
