import React, { useEffect, useState } from "react";
import config from "../config";
import { Link } from "react-router-dom";

const LibraryPage = () => {
    const [medias, setMediaData] = useState([]);
    // const [title, setTitle] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch(`${config.apiUrl}/library`, {
            method: "GET",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
                // return console.log(response);
            })
            .then((data) => {
                // setMediaData(data);

                setMediaData(data.medias);
                // setTitle(data.title);
                // console.log(data.medias);
                // console.log(data.title);
            })
            .catch((error) => {
                console.log("ERROR: ", error);
            });

        // DOCUMENT TITLE after fetching
        document.title = "Coursework • LIBRARY";
    }, []);

    // TO HANDLE SEARCH
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredMedias = medias.filter(
        (media) =>
            media.name.toLowerCase().includes(searchTerm) ||
            media.author.toLowerCase().includes(searchTerm)
    );

    return (
        <>
            <div className="pageContent">
                <div className="searchBackground">
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        id="search"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <hr />
                <p>LIBRARY</p>
                <div className="songsSearchMenu">
                    {filteredMedias.length ? (
                        filteredMedias.map((media) => (
                            <Link key={media._id} className="card" to={`/medias/${media._id}`}>
                                <img
                                    // src={media.coverUrl}
                                    src={media.coverUrl}
                                    alt="album_cover"
                                    className="albumCover"
                                />
                                <div className="songName">{media.name}</div>
                                <div className="songAuthor">{media.author}</div>
                            </Link>
                        ))
                    ) : (
                        <p>NOT FOUND</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default LibraryPage;
