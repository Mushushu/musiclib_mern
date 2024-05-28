import React from "react";
import { useParams } from "react-router-dom";

const UploadStatus = () => {
    // TO GET PARAMETR FROM URL
    const { Status } = useParams();

    document.title = `${Status}`;

    return (
        <>
            <div className="pageContent">
                <div className="centered-flex">
                    <div className="infoText">
                        <h1>{Status}</h1>
                        {/* <h2>{error}</h2> */}
                    </div>
                    <a href="/">
                        <button className="infoButton">
                            {/* <i className="fa-solid fa-house"></i> */}
                            CLOSE
                        </button>
                    </a>
                </div>
            </div>
        </>
    );
};

export default UploadStatus;
