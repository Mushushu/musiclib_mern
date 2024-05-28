import React, { useEffect, useState } from "react";
import config from "../config";
import { Link } from "react-router-dom";

const MainPage = () => {
    const [latestSongs, setLatestSongs] = useState([]);
    const [mixSongs, setMixSongs] = useState([]);

    useEffect(() => {
        const fetchMainPageData = async () => {
            try {
                const response = await fetch(`${config.apiUrl}/`, { method: "GET" });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                // CHANGE LATER
                let data = await response.json();
                return data;

                // setLatestSongs(data.byDate);
                // setMixSongs(data.byPlaylist);
            } catch (error) {
                console.error("Error fetching main page data: \n", error);
                return null;
            }
        };

        const fetchData = async () => {
            const data = await fetchMainPageData();
            if (data) {
                setLatestSongs(data.byDate || []);
                setMixSongs(data.byPlaylist || []);
            }
            // console.log(data.byDate);
        };
        fetchData();
        // fetchMainPageData();
    }, []);

    return (
        <>
            <div className="pageContent">
                <p>Latest</p>
                <div className="sliderContainer">
                    <button className="seeMoreButton">
                        <Link to="/library">
                            SEE MORE <i className="fa-solid fa-chevron-down"></i>
                        </Link>
                    </button>
                    <div className="sliderWraper" data-songs-list>
                        {latestSongs.map((media) => (
                            <Link key={media._id} className="card" to={`/medias/${media._id}`}>
                                <img
                                    src={media.coverUrl}
                                    alt="album_cover"
                                    className="albumCover"
                                    data-song-image
                                />
                                <div className="songName" data-song-name>
                                    {media.name}
                                </div>
                                <div className="songAuthor" data-song-author>
                                    {media.author}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <br />

                <p>Mixes</p>
                <div className="sliderContainer">
                    <button className="seeMoreButton">
                        <Link to="/library">
                            SEE MORE <i className="fa-solid fa-chevron-down"></i>
                        </Link>
                    </button>
                    <div className="sliderWraper" data-songs-list>
                        {mixSongs.map((media) => (
                            <Link key={media._id} className="card" to={`/medias/${media._id}`}>
                                <img
                                    src={media.coverUrl}
                                    alt="album_cover"
                                    className="albumCover"
                                    data-song-image
                                />
                                <div className="songName" data-song-name>
                                    {media.name}
                                </div>
                                <div className="songAuthor" data-song-author>
                                    {media.author}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainPage;
