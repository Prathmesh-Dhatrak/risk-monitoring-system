module.exports = (mongoose : any) => {
  var schema = mongoose.Schema(
    {
      kitId: Number,
      title: String,
      description: String,
      isActive: Boolean,
      feeds: [{}],
    },
    { timestamps: true }
  );

  schema.method("toJSON", function (this:any) {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const MonitorKit = mongoose.model("monitorKit", schema);
  return MonitorKit;
};
