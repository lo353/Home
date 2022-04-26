const LessonRoutes = require("./LessonRoutes/LessonRoutes");
const OrderRoutes = require("./OrderRoutes/OrdersRoutes");

module.exports = (app) => {
  app.use("/lessons", LessonRoutes);
  app.use("/orders", OrderRoutes);
};
