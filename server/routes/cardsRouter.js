const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const _ = require("lodash");
const {
  Card,
  validateCard,
  generateBizNumber,
} = require("../models/cardModels");
const chalk = require("chalk");

router.post("/", auth, async (req, res) => {
  if (req.user && req.user.biz) {
    const { error } = validateCard(req.body);
    if (error) {
      console.log(chalk.redBright(error.details[0].message));
      return res.status(400).send(error.details[0].message);
    }
    try {
      let card = new Card({
        bizName: req.body.bizName,
        bizDescription: req.body.bizDescription,
        bizAddress: req.body.bizAddress,
        bizPhone: req.body.bizPhone,
        bizImage: req.body.bizImage
          ? req.body.bizImage
          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        bizNumber: await generateBizNumber(Card),
        user_id: req.user._id,
      });

      card = await card.save();
      return res.send(card);
    } catch (error) {
      return res.status(401).send("An error occurred The card was not saved");
    }
  }
  return res.status(403).send("You are not authorized to create cards");
});

router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    return res.send(cards);
  } catch (error) {
    console.log(chalk.redBright(error));
    return res.status(500).send(`Oops... An Error occurred: ${error}`);
  }
});

router.get("/my-cards", auth, async (req, res) => {
  if (req.user) {
    try {
      const cards = await Card.find({ user_id: req.user._id });
      return res.send(cards);
    } catch (error) {
      return res.send("You have no cards in the database");
    }
  }
  return res
    .status(403)
    .send("You are not authorized to see cards in this page");
});

router.get("/:id", auth, async (req, res) => {
  try {
    const card = await Card.findOne({
      _id: req.params.id,
      user_id: req.user._id,
    });
    if (!card)
      return res.status(404).send("The card with the given ID was not found.");
    return res.send(card);
  } catch (error) {
    return res.status(401).send(`An Error occurred: ${error}`);
  }
});

router.delete("/:id", auth, async (req, res) => {
  if (req.user && req.user.biz) {
    try {
      const card = await Card.findOneAndRemove({
        _id: req.params.id,
        user_id: req.user._id,
      });
      if (!card) {
        console.log(
          chalk.redBright("The card with the given ID was not found.")
        );
        return res
          .status(404)
          .send("The card with the given ID was not found.");
      }
      return res.send(card);
    } catch (error) {
      res.status(401).send(`An Error occurred: ${error}`);
    }
  }
  return res.status(403).send("You are not authorized to delete cards");
});

router.put("/:id", auth, async (req, res) => {
  if (req.user && req.user.biz) {
    const { error } = validateCard(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
      let card = await Card.findOneAndUpdate(
        { _id: req.params.id, user_id: req.user._id },
        req.body
      );
      if (!card)
        return res
          .status(404)
          .send("The card with the given ID was not found.");

      card = await Card.findOne({ _id: req.params.id, user_id: req.user._id });
      return res.send(card);
    } catch (error) {
      return res.status(401).send(`Oops an error  occurred: ${error}`);
    }
  }
  return res.status(403).send("You are not authorized to edit this card");
});

router.patch("/:id", auth, async (req, res) => {
  if (req.user) {
    try {
      let card = req.body;
      card = await Card.findOneAndUpdate(
        { _id: req.params.id },
        { likes: card.likes }
      );
      return res.send(card);
    } catch (error) {
      console.log(chalk.redBright(error));
      res.status(400).send(`Oops... an error occurred: ${error}`);
    }
  }
  return res
    .status(403)
    .send("You are not authorized to change this card like status");
});

module.exports = router;
