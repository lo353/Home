const express = require("express");
const router = express.Router();
router.get("Orders", (req, res) => {
  req.client
    .db("webstore")
    .collection("orders")
    .find()
    .toArray((error, result) => {
      if (error) console.log("Error while retrieving", error);
      res.status(200).send(result);
    });
});
router.post("Orders", (req, res) => {
  console.log("request is ...", req.body);
  req.client
    .db("webstore")
    .collection("orders")
    .insertOne(req.body, (error, result) => {
      if (error)
        return res
          .status(400)
          .send({ error_message: "Invalid Data or Something is missing" });
      res
        .status(200)
        .send({ success_message: "Order Inserted Successfully!!!!" });
    });
});
module.exports = router;
