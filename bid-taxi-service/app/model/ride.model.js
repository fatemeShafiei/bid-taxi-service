const { Schema } = require("mongoose");

module.exports = mongoose => {

  var bidSchema = mongoose.Schema(
    {
      bidAmount: Number,
      state: {type: String, require: true, default: 'pending'},
      fleetId: {
        type: Schema.Types.ObjectId,
        ref: 'fleet'
      }
    }
  );

  bidSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  var rideSchema = mongoose.Schema(
    {
      pickupLocation: {type: String, require: true},
      dropoffLocation: {type: String, require: true},
      proposedPrice: {type: Number, require: true},
      state: {type: String, require: true, default: 'open'},
      clientId: {
        type: Schema.Types.ObjectId,
        ref: 'client'
      },
      bids: [bidSchema]
    },
    { timestamps: true }
  );

  rideSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Ride = mongoose.model("ride", rideSchema);
  return Ride;
};
