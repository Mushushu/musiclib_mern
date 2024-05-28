const express = require("express");

// CONTROLLER
const MainController = require("./controllers/MainController");

// CREATING ROUTER VAR
const router = express.Router();

// ROUTES
router.get("/", MainController.renderMainPage);
router.get("/library", MainController.renderLibraryPage);
router.get("/create_new", MainController.renderCreateNewPage);
router.get("/medias/:id", MainController.viewMediaPage);

// TO SAVE DATA IN THE FOLDER
const multer = require("multer");

// MIDLEWARE TO RENAME && STORE FILES
const storage = multer.diskStorage({
    // WHERE TO STORE && NAME
    destination: function (req, file, cb) {
        cb(null, "data/medias"); // cb - callback
    },
    filename: function (req, file, cb) {
        // FILE NAME
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
    },
});

// TO PASS FILES TO OUR MODEL
const singleUpload = multer({ storage: storage }).fields([
    { name: "media_cover" },
    { name: "media_file" },
]);

// upload DATA from HTML FORM to the MONGO
// on the submit button click
router.post("/submit_media", singleUpload, MainController.submitMedia);

module.exports = router;
