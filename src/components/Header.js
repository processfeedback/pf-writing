import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import logo from '../assets/images/logo.png';
import Modal from 'react-modal';

function JumboTronMain(props) {
  return (
    <div className=" p-8 py-8 bg-background dark:bg-jumbotronDark rounded-3xl shadow-xl my-8">
      {props.children}
    </div>
  );
}

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isHelpOpen}
        onRequestClose={() => setIsHelpOpen(false)}
        className="modal overlay-hidden "
        // overlayClassName="fixed inset-0  md:p-10 lg-p-10 bg-white bg-opacity-80 backdrop-blur-md bg-opacity-0 z-50"
        overlayClassName="fixed inset-0 md:p-10 lg-p-10 backdrop-blur-sm  z-50"
      >
                <div className="modal-content h-[57vh]  margin-10 bg-primary dark:bg-newDark rounded-lg overflow-y-auto margin-10 text-secondaryText">
          <div className="flex justify-between items-center ">
            <p className=" pl-10 mt-3 text-2xl ">Help</p>
            <hr />
            <button
              onClick={() => setIsHelpOpen(false)}
              className="mt-3 pr-5 hover:text-red-900 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="h-[40%]">
            <div className="flex items-center justify-center">
              <div className="flex flex-col" style={{ width: "90%" }}>
                {/* add content for help page here */}
                <JumboTronMain>
                  <p className="text-secondary dark:text-textHeadingDark text-xl">
                    How to use the editor?
                  </p>
                  <div className="text-justify" style={{ width: "100%" }}>
                    <p className="mt-3">
                      Step 1: Type/write in the editor here.
                    </p>
                  </div>
                  <br />
                  <div className="text-justify" style={{ width: "100%" }}>
                    <p className="mt-3">
                      Step 2: Once done, click on the Download button to download the process data ZIP file.
                    </p>
                  </div>
                  <br />
                  <div className="text-justify" style={{ width: "100%" }}>
                    <p className="mt-3">
                      Step 3: Upload the process data file at<u><a href="https://www.processfeedback.org/report/" target="_blank">www.processfeedback.org/report/</a></u> to view your Effort Visualization Report.
                    </p>
                  </div>
                  <br />
                </JumboTronMain>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isAboutOpen}
        onRequestClose={() => setIsAboutOpen(false)}
        className="modal overlay-hidden "
                // overlayClassName="fixed inset-0  md:p-10 lg-p-10 bg-white bg-opacity-80 backdrop-blur-md bg-opacity-0 z-50"
        overlayClassName="fixed inset-0 md:p-10 lg-p-10 backdrop-blur-sm  z-50"
      >
              <div className="modal-content h-[62vh]  margin-10 bg-primary dark:bg-newDark rounded-lg overflow-y-auto margin-10 text-primaryText">
          <div className="flex justify-between items-center ">
            <p className=" pl-10 mt-3 text-2xl ">About</p>
            <hr />
            <button
              onClick={() => setIsAboutOpen(false)}
              className="mt-3 pr-5 hover:text-red-900 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="h-[40%]">
            <div className="flex items-center justify-center">
              <div className="flex flex-col" style={{ width: "90%" }}>
                <JumboTronMain>
                  <p className="text-primaryText dark:text-textHeadingDark text-xl">
                    What is Process Feedback?
                  </p>
                  <div className="text-justify" style={{ width: "100%" }}>
                    <p className="mt-3">
                      Process Feedback is a tool for visualizing the journey of a writing task. Summarizing the journey with interactive and insightful data visualizations, it helps us gain a deeper understanding of our writing process. Educators can use the tool to understand their students’ writing process, style, and habits and provide constructive feedback. More broadly, anyone can also use it to analyze their writing process. Process Feedback also works for computer programming tasks. It was featured in <u><a href="https://blogs.umsl.edu/news/2023/05/19/badri-adhikari-develops-online-tool-process-feedback/" target="_blank">UMSL Daily News</a></u> and <u><a href="https://www.mdpi.com/2227-7102/13/9/922/" target="_blank">a research article</a></u> describing the invention was published in the double-blind peer-reviewed journal, Education Science, in September 2023. It is free, does not require a login or sign-up to use, and is respectful of a user's privacy.
                    </p>
                  </div>
                  <br />
                  <div className="text-justify" style={{ width: "100%" }}>
                    <p className="mt-3 text-lg">
                      To learn more about Process Feedback, please visit <u><a href="https://www.processfeedback.org/" target="_blank">www.processfeedback.org</a></u>.
                    </p>
                  </div>
                  <br />
                </JumboTronMain>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div id="header" className="h-[8vh] flex justify-between items-center no-scrollbar bg-primary">
        <img src={logo} alt="Company Logo" className="ml-4 h-[6vh]" />
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="mr-4">
          <FaBars size={24} />
        </button>
        {isDropdownOpen && (
          <div
            id="dropdown"
            onMouseLeave={closeDropdown} // Close on hover outside
            className={`absolute no-scrollbar h-[12.5vh] z-20 top-[8vh] right-0 transition-transform duration-1500 ease-in-out transform ${
              isDropdownOpen ? 'translate-x-0' : 'translate-x-full'
            } w-[50vw] lg:w-[20vw] bg-[#AEC1CF] text-accent`}
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <div
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  setIsHelpOpen(true);
                }}
              >
                Help
              </div>
              <div
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  setIsAboutOpen(true);
                }}
              >
                About
              </div>
            </ul>
          </div>
        )}
        <h1 className="absolute hidden lg:block left-1/2 transform -translate-x-1/2 text-2xl text-secondaryText font-bold ">
          Process Feedback Writing
        </h1>
      </div>
    </>
  )
}

// export default Header;
