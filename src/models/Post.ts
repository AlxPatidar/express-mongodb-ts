import Mongoose from "mongoose"

var Schema = Mongoose.Schema

// create a schema
var postSchema = new Schema(
  {
    title: { type: String, default: "" },
    userId: { type: Schema.ObjectId, ref: "User" },
    body: { type: String, default: "" },
    postImages: {
      type: Array,
      default: []
    },
    likes: {
      type: Array,
      default: []
    },
    status: { type: Boolean, default: true },
    isActive: { type: Boolean, default: false },
  },
  {
    // Automatically include createdAt and updatedAt field
    timestamps: true,
    versionKey: false
  }
)

export default Mongoose.model("Post", postSchema)