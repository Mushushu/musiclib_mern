import React, { useState } from "react";
import config from "../config";

// TO USE NAVIGATION
import { useNavigate } from "react-router-dom";

const CreateMediaPage = () => {
    const [formData, setFormData] = useState({
        media_name: "",
        media_author: "",
        media_description: "",
        media_playlist: "",
        media_date: "",
        media_file: null,
        media_cover: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });

        try {
            const response = await fetch(`${config.apiUrl}/submit_media`, {
                method: "POST",
                body: formDataToSend,
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();

            console.log("Response from server:", data);

            // Handle success or navigate to another page
            const uploadStatus = "Upload Successful!";
            navigate(`/upload-status/${uploadStatus}`); // Redirect with status
        } catch (error) {
            console.error("Error submitting media:", error);
            // CONTINUE
            navigate("/upload-status/Error");
        }
    };

    document.title = `Coursework • UPLOAD`;

    return (
        <div className="pageContent">
            <div className="form_background">
                {/* UPLOAD FORM */}
                <form
                    onSubmit={handleSubmit}
                    // action="/submit_media"
                    // method="POST"
                    className="createNew_form"
                    enctype="multipart/form-data"
                    id="form_create_new"
                >
                    <label htmlFor="name">Name:</label>
                    <br />
                    <input
                        type="text"
                        id="media_name"
                        name="media_name"
                        required
                        className="formTextField"
                        autoComplete="off"
                        onChange={handleChange}
                    />
                    <br />
                    <br />

                    <label htmlFor="author">Author:</label>
                    <br />
                    <input
                        type="text"
                        id="media_author"
                        name="media_author"
                        required
                        className="formTextField"
                        autoComplete="off"
                        onChange={handleChange}
                    />
                    <br />
                    <br />

                    <label htmlFor="description">Description:</label>
                    <br />
                    <textarea
                        id="media_description"
                        name="media_description"
                        rows="4"
                        cols="50"
                        className="formTextField"
                        onChange={handleChange}
                    ></textarea>
                    <br />
                    <br />

                    <label htmlFor="coverUrl">Upload Cover:</label>
                    <br />
                    <input
                        type="file"
                        id="media_cover"
                        name="media_cover"
                        required
                        className="formTextField"
                        onChange={handleChange}
                    />
                    <br />
                    <br />

                    <label htmlFor="mediaUrl">Upload Song:</label>
                    <br />
                    <input
                        type="file"
                        id="media_file"
                        name="media_file"
                        required
                        className="formTextField"
                        onChange={handleChange}
                    />
                    <br />
                    <br />

                    <label htmlFor="date">Date:</label>
                    <br />
                    <input
                        type="date"
                        id="media_date"
                        name="media_date"
                        required
                        className="formTextField"
                        onChange={handleChange}
                    />
                    <br />
                    <br />

                    <label htmlFor="playlist">Playlist:</label>
                    <br />
                    <select
                        id="media_playlist"
                        name="media_playlist"
                        className="formTextField"
                        onChange={handleChange}
                    >
                        <option value="">None</option>
                        <option value="popular">Popular</option>
                        <option value="old_style">Old Style</option>
                    </select>
                    <br />
                    <br />

                    <input type="submit" value="UPLOAD" className="submit_button" />
                </form>
            </div>
        </div>
    );
};

export default CreateMediaPage;
