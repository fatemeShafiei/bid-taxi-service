const { Schema } = require("mongoose");

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      bidAmount: Number,
      fleetId: {
        type: Schema.Types.ObjectId,
        ref: 'fleet'
      }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Bid = mongoose.model("bid", schema);
  return Bid;
};
