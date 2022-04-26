const express = require("express");
const router = express.Router();
router.get("/Lessons", (req, res) => {
  req.client
    .db("webstore")
    .collection("lessons")
    .find()
    .toArray((error, result) => {
      if (error)
        return res
          .status(400)
          .send({ error_message: "Error while retrieving" });
      res.status(200).send(result);
    });
  // client.close();
});
router.post("/Lessons", (req, res) => {
  console.log(req.body);
  try {
    req.client
      .db("webstore")
      .collection("lessons")
      .insertOne(req.body, (error, result) => {
        if (error)
          return res
            .status(400)
            .send({ error_message: "Invalid Data or Something is missing" });
        res
          .status(200)
          .send({ success_message: "Order Inserted Successfully!!!!" });
      });
  } catch (error) {
    console.log("Error in Catch Block", error);
  }
});
router.put("/Lessons", (req, res) => {
  req.client
    .db("webstore")
    .collection("lessons")
    .updateOne(
      { _id: req.ObjectId(req.body._id) },
      {
        $set: {
          topic: req.body.topic,
          price: req.body.price,
          location: req.body.location,
          space: req.body.space,
          image: req.body.image,
        },
      },
      (error, result) => {
        if (error)
          res
            .status(400)
            .send({ error_message: "Invalid Data or Something is missing" });
        res
          .status(200)
          .send({ success_message: "Lesson Updated Successfully!!!!" });
      }
    );
});
module.exports = router;
