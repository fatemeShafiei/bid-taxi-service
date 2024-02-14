module.exports = function(app) {
  require("../route/client.route")(app);
  require("../route/ride.route")(app);
  require("../route/fleet.route")(app);
  require("../route/bid.route")(app);

}