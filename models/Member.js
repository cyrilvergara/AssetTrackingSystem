import mongoose from "mongoose"

const MemberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const Member = mongoose.models.Member || mongoose.model('Member', MemberSchema)

export default Member