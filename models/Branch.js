import mongoose from "mongoose"

const BranchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const Branch = mongoose.models.Branch || mongoose.model('Branch', BranchSchema)

export default Branch