const { FileModel, validateFile, serializeFile } = require("../models/file");
const fs = require("fs");
const readline = require("readline");
const SpellChecker = require("simple-spellchecker").getDictionarySync("en-GB");
const stringSimilarity = require("string-similarity");
const sharp = require("sharp");
const Joi = require("joi");

const spellCheck = async (path) => {
  const readInterface = readline.createInterface({
    input: fs.createReadStream(path),
    output: process.stdout,
    console: false,
  });

  let text = "";

  for await (const line of readInterface) {
    const correctedLine = line
      .split(" ")
      .map((word) => {
        if (word && !SpellChecker.spellCheck(word)) {
          const suggestions = SpellChecker.getSuggestions(word);

          console.log({ word, suggestions });

          const matches = stringSimilarity.findBestMatch(
            word,
            suggestions.length > 0 ? suggestions : [word]
          );

          return matches.bestMatch.target;
        } else return word;
      })
      .join(" ");

    text += correctedLine + "\n";
  }

  fs.writeFile(path, text, (err, res) => {
    if (err) console.log("error", err);
  });
};

const processImage = async (path) => {
  try {
    const imgInstnace = sharp(path);
    const metadata = await imgInstnace.metadata();
    console.log({ metadata });

    const newPath = path.split(".")[0] + "-img.jpeg";
    imgInstnace
      .resize({
        width: 350,
        fit: sharp.fit.contain,
      })
      .toFormat("jpeg", { mozjpeg: true })
      .blur(1)
      // .composite([{ input: "uploads/logo.png", gravity: "center" }])
      .toFile(newPath);

    return newPath;
  } catch (error) {
    console.log(
      `An error occurred during processing the uploaded image: ${error}`
    );
  }
};

exports.upload = async (req, res) => {
  try {
    const { error } = validateFile(req.body);
    if (error) {
      console.log({ error });
      return res.status(400).json({ message: error.details[0].message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (req.file.mimetype === "text/plain") {
      spellCheck(req.file.path);
    }

    if (req.file.mimetype.match(/^image/)) {
      await processImage(req.file.path);
    }

    const { name, description } = req.body;
    let path = req.file.path;

    console.log({ file: req.file });

    const file = await FileModel.create({
      name,
      description,
      createdBy: req.user.user_id,
      createdAt: Date.now(),
      path: "/" + path,
    });

    res.status(200).json(serializeFile(file, { exclude: ["createdBy"] }));
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};

exports.getAll = async (req, res) => {
  try {
    const { user_id } = req.user;

    const filters = {
      ...(user_id && { createdBy: user_id }),
      ...(req.query.name && { name: /req.query.name/ }),
      ...(req.query.description && { description: /req.query.description/ }),
      ...(req.query.createdAt && { createdAt: req.query.createdAt }),
    };

    console.log({ filters });

    const allFiles = await FileModel.find(filters);
    // res.status(404).json({ message: "No files found" });
    res.status(200).json(allFiles.map(serializeFile));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const validateGetFileParams = (params) => {
  const schema = Joi.object({
    fileId: Joi.string().uuid().required(),
  });
  return schema.validate(params);
};

exports.getSingleFile = async (req, res) => {
  try {
    /* const { error } = validateGetFileParams(req.params);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } */
    const { fileId } = req.params;
    const ownerID = req.user?.user_id;

    console.log({ fileId, ownerID });

    if (!fileId) {
      return res
        .status(404)
        .json({ message: "The requested file does not exist 1" });
    }

    if (!ownerID) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const file = await FileModel.findOne({
      _id: fileId,
      createdBy: ownerID,
    });

    if (!file) {
      return res
        .status(404)
        .json({ message: "The requested file does not exist 2" });
    }

    res.status(200).json(serializeFile(file));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

exports.updateFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "File's name and description are required" });
    }

    await FileModel.validate({ name, description }, ["name", "description"]);
    const file = await FileModel.findOne({ _id: fileId });

    if (!file) {
      return res
        .status(404)
        .json({ message: "The requested file does not exist" });
    }

    const updatedFile = await FileModel.updateOne(
      {
        _id: fileId,
      },
      {
        $set: {
          name,
          description,
        },
      },
      { upsert: true }
    );

    res.status(200).json(serializeFile(updatedFile));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await FileModel.findOne({
      _id: fileId,
    });

    if (!file) {
      return res
        .status(404)
        .json({ message: "The requested file does not exist" });
    }

    await FileModel.deleteOne({
      _id: fileId,
    });

    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};