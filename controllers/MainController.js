const MainController = {};

const Media = require("../models/mediaModel");

// PAGES RENDER

// MAIN
MainController.renderMainPage = async (req, res) => {
    try {
        // FIND & SORT data
        // IN REVERSE ORDER (date: -1)
        const byDate = await Media.find({}).sort({ date: -1 }).limit(5);
        const byDateMediasObjects = byDate.map((media) => media.toObject());

        // ALPHABETIC (playlist: 1)
        const byPlaylist = await Media.find({}).sort({ playlist: 1 }).limit(5);
        const byPlaylistMediaObjects = byPlaylist.map((media) => media.toObject());

        res.json({
            byDate: byDateMediasObjects,
            byPlaylist: byPlaylistMediaObjects,
        });

        console.log("date: ", byDate);
        console.log("playlist: ", byPlaylistMediaObjects);
    } catch (error) {
        // console.error("ERROR:", error);
        console.log("ERROR:\n", error);
        // res.status(500).json({ error: "INTERNAL SERVER ERROR OCCURED" });
        res.status(500).json({ error: error.message });
    }
};

// LIBRARY
MainController.renderLibraryPage = async (req, res) => {
    try {
        // find({}) all the data in MONGODB
        const medias = await Media.find({});
        const mediasObjects = medias.map((media) => media.toObject());
        // SEND DATA TO THE REACT
        res.json({
            medias: mediasObjects,
            title: "LIBRARY",
        });
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(500).json({ error: error.message });
    }
};

// CREATE NEW
MainController.renderCreateNewPage = async (req, res) => {
    res.render("create_new", {
        layout: false,
        title: "CREATE NEW",
    });
};

// TO WORK WITH DATA FORMATS
const moment = require("moment");

// POST METHOD FOR SUBMITTING MUSIC
MainController.submitMedia = async (req, res) => {
    try {
        const { media_name, media_author, media_description, media_playlist, media_date } =
            req.body;
        const { media_cover, media_file } = req.files;

        // CONVERT DATE
        const formattedDate = moment(media_date).format("YYYY-MM-DD");

        // CONVERT PATH
        const fixedCoverUrl = media_cover[0].path.replace(/\\/g, "/");
        const fixedMediaUrl = media_file[0].path.replace(/\\/g, "/");

        // CREATE NEW DATA SCHEMA
        const newMedia = new Media({
            name: media_name,
            description: media_description,
            author: media_author,
            mediaUrl: fixedMediaUrl,
            coverUrl: fixedCoverUrl,
            date: formattedDate,
            playlist: media_playlist,
        });

        // SAVE DATA TO DATABASE
        const savedMedia = await newMedia.save();

        console.log("Successfully added to database:", savedMedia);
        // RENDER SUCCESS PAGE
        res.json({
            title: "Success",
            message: "Successfully added to database",
        });
    } catch (error) {
        console.error("An error occurred while adding an element:", error);
        res.status(500).json({ error: "An error occurred while adding an element" });
    }
};

MainController.viewMediaPage = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ error: "not found" });
        } else {
            console.log("media: ", media);
            console.log("req.param.id ", req.params.id);
        }

        res.status(200).json(media.toObject());
    } catch (error) {
        console.error("ERROR: ", error);
        res.status(500).json({ error: "INTERNAL SERVER ERROR OCCURED" });
    }
};

module.exports = MainController;
