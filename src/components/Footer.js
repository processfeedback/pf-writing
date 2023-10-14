import React from "react";
import { FaFacebook, FaYoutube, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {

    return (
        <footer className="flex flex-col items-center justify-center text-sm h-[10vh] no-scrollbar bg-primary">
            <div className={`w-full no-scrollbar`}>
                <div className="flex justify-center items-center">
                    <a
                        href="https://www.facebook.com/processfeedback"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaFacebook
                            className="w-8 text-footerIcon hover:text-footerIconHover dark:text-footerIconDark dark:hover:text-[var(--link-hover)] "
                            size={18}
                        />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/process-feedback"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaLinkedin
                            className="w-8 text-footerIcon hover:text-footerIconHover dark:text-footerIconDark dark:hover:text-[var(--link-hover)] "
                            size={18}
                        />
                    </a>
                    <a
                        href="https://twitter.com/processfeedback"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaTwitter
                            className="w-8 text-footerIcon hover:text-footerIconHover dark:text-footerIconDark dark:hover:text-[var(--link-hover)] "
                            size={18}
                        />
                    </a>
                    <a
                        href="https://www.youtube.com/@ProcessFeedback"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaYoutube
                            className="w-8 text-footerIcon hover:text-footerIconHover dark:text-footerIconDark dark:hover:text-[var(--link-hover)] "
                            size={18}
                        />
                    </a>
                </div>
            </div>
            <div>
                <p className="text-[0.5rem] md:text-xs text-primaryText">
                    Copyright &copy; 2023, Process Feedback, LLC. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}

export default React.memo(Footer);
