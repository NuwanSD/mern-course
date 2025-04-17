const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Place = require("../models/place");

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

const getPlaceById = async (req, res, next) => {
  const place_id = req.params.pid;

  let place;

  try {
    place = await Place.findById(place_id);
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not find a place",
      500
    );
    return next(err); //this will prevent the execution of other statement after this
  }

  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const user_id = req.params.uid;

  let places;
  try {
    places = await Place.find({ creator: user_id });
  } catch (error) {
    const err = new HttpError(
      "Fetching places failed, please try again later",
      500
    );
    return next(err);
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a places for the provided user id.", 404)
    );
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://fastly.picsum.photos/id/1049/200/200.jpg?hmac=9458e0GuMIU0518gk-YBqEGna1AnYjhDQGPEXFp-J04",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { title, description } = req.body;

  const place_id = req.params.pid;

  let place;

  try {
    place = await Place.findById(place_id);
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not update place",
      500
    );
    return next(err);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not update place",
      500
    );
    return next(err);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const place_id = req.params.pid;

  try {
    await Place.findByIdAndDelete(place_id);
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not find a place to delete.",
      500
    );
    return next(err);
  }

  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;
