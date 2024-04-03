const { FileModel, validateFile, serializeFile } = require("../models/file");
const fs = require("fs");
const readline = require("readline");
const SpellChecker = require("simple-spellchecker").getDictionarySync("en-GB");
const stringSimilarity = require("string-similarity");

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

    res.status(200).json({
      message: "File uploaded successfully",
      data: serializeFile(file),
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};