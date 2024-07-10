import mongoose from "mongoose";
import Branch from "./Branch";
import Category from "./Category";

const AssetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  issuedDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: false
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }],
  branches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  }]
});

const Asset = mongoose.models.Asset || mongoose.model('Asset', AssetSchema)

export default Asset;