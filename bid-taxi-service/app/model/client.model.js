const { Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        email: String,
        phone: String,
        rides: [{
          type: Schema.Types.ObjectId,
          ref: 'ride'
        }]
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Client = mongoose.model("client", schema); 
    exports.Client = Client;
    return Client;
  };
  