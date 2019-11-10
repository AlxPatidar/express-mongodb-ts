var mongoose = require('mongoose')
var Schema = mongoose.Schema

// create a schema
var commentSchema = new Schema({
  commnet: { type: String, default: '' },
  userId: { type: Schema.ObjectId, ref: 'Users' },
  postId: { type: Schema.ObjectId, ref: 'Posts' },
  commentImages: {
    type: Array,
    default: []
  },
  likes: {
    type: Array,
    default: []
  },
  status: { type: Boolean, default: true },
  isActive: { type: Boolean, default: false },
}, {
  // Automatically include createdAt and updatedAt field
  timestamps: true
})

var Comment = mongoose.model('Comment', commentSchema)

export default Comment