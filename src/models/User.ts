/*
 * This collection have User information
 *
 * CollectionName: - users
 */
import Mongoose from "mongoose"

const schema = new Mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: String,
    dob: { type: Date },
    phoneNumber: String,
    address: { type: Object },
    gender: { type: String, enum: ['female', 'male'], default: 'male' },
    role: { type: String, enum: ['Admin', 'User'], default: 'User' },
    profilePicture: {
      type: Array,
      default: ['img/user_profile.png']
    },
    occupation: String,
    marriageStatus: String,
    status: { type: String, default: true },
    isActive: { type: Boolean, default: false },
    language: { type: String, default: 'en' },
    lastLogin: { type: Date },
    passwordToken: { type: String, default: '' },
    emailVerified: { type: Boolean, default: true },
  },
  // this is for hide _v key form collection
  { timestamps: true, versionKey: false } 
  // it create two timestamp field createAt and updateAt
)

export default Mongoose.model("User", schema)