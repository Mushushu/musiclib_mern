import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../config";

// to convert data
import moment from "moment";

const MediaDetailsPage = () => {
    const { id } = useParams();
    const [media, setMedia] = useState(null);

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await fetch(`${config.apiUrl}/medias/${id}`, { method: "GET" });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setMedia(data);

                // SET DOCUMENT NAME
                document.title = `Coursework • ${data.name}`;
            } catch (error) {
                console.error("ERROR:", error);
            }
        };

        fetchMedia();
    }, [id]);

    if (!media) {
        return <div>NOT FOUND</div>;
    }

    const formattedDate = moment(media.date).format("DD.MM.YYYY");

    // RENDER COMPONENT
    return (
        <>
            <div className="pageContent">
                <div className="view_video">
                    <video controls>
                        <source src={media.mediaUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <hr />
                <div className="view_background">
                    <div className="songDescription">
                        <div className="cover_image_background">
                            <img
                                src={media.coverUrl}
                                alt={media.name}
                                className="view_cover_image"
                            />
                        </div>
                        <ul>
                            <li>
                                <p>Title:</p>
                                <h1>{media.name}</h1>
                            </li>
                            <li>
                                <p>Author:</p>
                                <h2>{media.author}</h2>
                            </li>
                            <li>
                                <p>Release date:</p>
                                <h2>{formattedDate}</h2>
                            </li>
                        </ul>
                    </div>
                    <hr />
                    <div className="aboutSong">
                        <p>ABOUT:</p>
                        <p>{media.description}</p>
                    </div>
                    <br />
                </div>
            </div>

            {/* <div className="pageContent">
                <div className="view_background">
                    <div className="songDescription">
                        <div className="cover_image_background">
                            <img
                                src={media.coverUrl}
                                alt={media.name}
                                className="view_cover_image"
                            />
                        </div>
                        <ul>
                            <li>
                                <p>Title:</p>
                                <h1>{media.name}</h1>
                            </li>
                            <li>
                                <p>Author:</p>
                                <h2>{media.author}</h2>
                            </li>
                            <li>
                                <p>Release date:</p>
                                <h2>{formattedDate}</h2>
                            </li>
                        </ul>
                    </div>
                    <hr />
                    <div className="aboutSong">
                        <p>ABOUT:</p>
                        <p>{media.description}</p>
                    </div>
                    
                    <div className="view_video">
                        <video controls>
                            <source src={media.mediaUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <hr />
                </div>
            </div> */}
        </>
    );
};

export default MediaDetailsPage;
