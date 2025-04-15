const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire state building",
    description: "One of the most famous sky scraperts dsdksdsdksdsldslkd",
    location: {
      lag: 40.7484445,
      lng: -73.9884946,
    },
    address: "20 W 34th St., New York, NY 10001, United States",
    creator: "u1",
  },
];

const getPlaceById = (req, res, next) => {
  const place_id = req.params.pid;

  const place = DUMMY_PLACES.find((p) => {
    return p.id === place_id;
  });

  if (!place) {
    throw new HttpError("Could not find a place for the provided id.", 404);
  }

  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const user_id = req.params.uid;

  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === user_id;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a places for the provided user id.", 404)
    );
  }

  res.json({ places });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlaceById = (req, res, next) => {
  const { title, description } = req.body;

  const place_id = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === place_id) };

  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === place_id);

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const place_id = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== place_id);

  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;
