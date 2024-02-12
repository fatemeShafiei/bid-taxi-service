module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        email: String,
        phone: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Fleet = mongoose.model("fleet", schema);
    return Fleet;
  };
  