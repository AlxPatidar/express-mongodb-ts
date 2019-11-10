import Mongoose from "mongoose"

// create a schema
var todoSchema = new Mongoose.Schema(
  {
    userId: { type: Mongoose.Schema.ObjectId, ref: "User" },
    task: { type: String, default: "" },
    completed: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
  },
  {
    // Automatically include createdAt and updatedAt field
    timestamps: true,
    versionKey: false
  }
)

export default Mongoose.model("Todo", todoSchema)