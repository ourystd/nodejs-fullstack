const { FileModel, validateFile, serializeFile } = require("../models/file");

exports.upload = async (req, res) => {
  try {
    const { error } = validateFile(req.body);
    if (error) {
      console.log({ error });
      return res.status(400).send(error.details[0].message);
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
