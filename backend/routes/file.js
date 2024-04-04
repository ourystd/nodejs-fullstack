const fileController = require("../controllers/file");
const auth = require("../middleware/auth");

const router = require("express").Router();
const { upload } = require("../middleware/multer");

// router.post("/upload", auth, upload.single("file"), fileController.upload);
router
  .route("/")
  //   .all(auth)
  .post(auth, upload.single("file"), fileController.upload)
  .get(auth, fileController.getAll);

router
  .route("/:fileId")
  .get(auth, fileController.getSingleFile)
  .put(auth, fileController.updateFile)
  .delete(auth, fileController.deleteFile);

module.exports = router;
