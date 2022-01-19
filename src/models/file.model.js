const mongoose = require('mongoose');
const uuid = require('uuid');
const { toJSON, paginate } = require('./plugins');

const fileSchema = mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    // user: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
    publicKey: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: uuid.v4,
    },
    privateKey: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: uuid.v4,
    },
    downloadCounter: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
fileSchema.plugin(toJSON);
fileSchema.plugin(paginate);

const File = mongoose.model('File', fileSchema);

module.exports = File;
