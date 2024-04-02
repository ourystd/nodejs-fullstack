const mongoose = require("mongoose");
const Joi = require("joi");

const fileSchema = mongoose.Schema({
  name: { type: String, required: [true, "Uploaded file must have a name"] },
  description: {
    type: String,
    required: [true, "Uploaded file must have a description"],
  },
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const FileModel = mongoose.model("file", fileSchema);

const validateFile = (file) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });
  return schema.validate(file);
};

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

const serializeFile = (file, { exclude = [], include = [] } = {}) => {
  let fileData = {
    id: file._id,
    name: file.name,
    path: BASE_URL + file.path,
    description: file.description,
    createdAt: file.createdAt,
    createdBy: file.createdBy,
  };

  if (exclude.length > 0) {
    for (const field of exclude) {
      delete fileData[field];
    }
  }
  if (include.length > 0) {
    const includeFields = include.reduce((obj, field) => {
      obj[field] = 1;
      return obj;
    });

    fileData = Object.assign(fileData, includeFields);
  }

  return fileData;
};

module.exports = {
  FileModel,
  validateFile,
  serializeFile,
};
