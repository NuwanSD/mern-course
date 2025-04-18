const fs = require("fs");

const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Place = require("../models/place");
const User = require("../models/user");
const mongoose = require("mongoose");
const place = require("../models/place");

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

  const { title, description, address, creator } = req.body;

  const createdPlace = new Place({
    title,
    description,
    address,
    location: {
      lag: 40.7484445,
      lng: -73.9884946,
    },
    image: req.file.path,
    creator,
  });

  let user;

  try {
    user = await User.findById(creator);
  } catch (error) {
    const err = new HttpError("Creating place failed, please try again", 500);
    return next(err);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  try {
    const currentSession = await mongoose.startSession();
    currentSession.startTransaction();
    await createdPlace.save({ session: currentSession });

    user.places.push(createdPlace);
    await user.save({ session: currentSession });
    await currentSession.commitTransaction();
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

  let place;

  try {
    place = await Place.findById(place_id).populate("creator");
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not find a place for this id.",
      500
    );
    return next(err);
  }

  if (!place) {
    return next(new HttpError("Could not find place for this id", 404));
  }

  const imagePath = place.image;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await place.deleteOne({ session });
    place.creator.places.pull(place);
    await place.creator.save({ session });

    await session.commitTransaction();
  } catch (error) {
    return next(new HttpError("Deleting place failed, try again", 500));
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;
