import React from "react";

const Sidebar = () => {
    const toggleSidebar = () => {
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.toggle("active");
    };

    return (
        <>
            <button id="sidebar-Toggle" onClick={toggleSidebar}>
                <i className="fa fa-bars"></i>
            </button>
            <div className="sidebar">
                {/* SEARCH & MAIN */}
                <div className="navigation">
                    <ul>
                        <li>
                            <a href="/">
                                <button>
                                    <i className="fa-solid fa-house"></i>
                                    MAIN
                                </button>
                            </a>
                        </li>
                        <li>
                            <a href="/library">
                                <button>
                                    <i className="fa-solid fa-list"></i>
                                    LIBRARY
                                </button>
                            </a>
                        </li>
                    </ul>
                </div>
                <hr />

                {/* LIBRARY */}
                <div className="library_sidebar">
                    <div>
                        <ul>
                            <li>
                                <a href="/create_new">
                                    <button>
                                        <i className="fa-solid fa-upload"></i>
                                        UPLOAD
                                    </button>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
