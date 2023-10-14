import { FaTrashAlt } from "react-icons/fa";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { UpdatePackageForAnswer } from './UpdateAnswer';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useRef, useState, useEffect } from 'react';
import { generateJSONzip } from './DownloadZip';
import "../assets/styles/ckeditor.css";

function ClearPfLocalStorage() {
    /**
     * Function that removes all the local storage items whose key starts with "pf_prototype_"
     */
    for (let key in localStorage) {
        if (key.startsWith("pf_prototype_")) {
            localStorage.removeItem(key);
        }
    }
}

function MyEditorComponent({ localStorageName }) {
    const editorRef = useRef(null);
    const toolBarRef = useRef(null);
    const [isTyping, setIsTyping] = useState(null);
    const [mostRecentRevisionTimestamp, setMostRecentRevisionTimestamp] = useState(null);
    const timeoutRef = useRef(null);
    const [content, setContent] = useState(() => {
        let localStorageItem = localStorage.getItem(localStorageName);
        if (localStorageItem) {
            return localStorageItem;
        } else {
            console.log(`${localStorageName} is not present`);
            return "";
        }
    });

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // this function is used to handle the content change in the editor
    function handleContentChange(event, editor) {
        const content = editor.getData();
        setIsTyping(true);
        if (mostRecentRevisionTimestamp === null) {
            setMostRecentRevisionTimestamp(Date.now());
        } else {
            handleRevisionUpdate(content); // updating the local storage
        }
        // if there is already a timer, we clear that timer
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        // now we set a new timer for logging interval, 
        timeoutRef.current = setTimeout(() => {
            console.log("updating local storage after timeout");
            handleRevisionUpdate(content);
            setMostRecentRevisionTimestamp(null);
            setIsTyping(false);
        }, 5000);
    };
    // function to check if updatng local storage is necessary
    function handleRevisionUpdate(content) {
        const currentTimeStamp = Date.now();
        const timeDifference =
            currentTimeStamp - mostRecentRevisionTimestamp;
        if (timeDifference && timeDifference >= 5000) {
            console.log("Updating local storage data");
            updateLocalStorageData(content);
            setMostRecentRevisionTimestamp(currentTimeStamp);
        }
    }
    // function to update the local storage data
    function updateLocalStorageData(content) {
        UpdatePackageForAnswer(content);
    }

    // delete the item in local storage
    const handleClear = () => {
        setContent("");
        ClearPfLocalStorage();
        window.location.reload();
    };

    function handleDownload() {
        console.log("Download button clicked");
        if ((!localStorage.getItem("pf_prototype_revisionCounts") || (parseInt(localStorage.getItem("pf_prototype_revisionCounts")) < 4))) {
            window.alert(`You must type for more than 20seconds to download the file.`);
            return;
        }
        generateJSONzip();
    }

    const editorConfiguration = {
        toolbar: [
            "heading",
            "|",
            "undo",
            "redo",
            "|",
            "bold",
            "italic",
            "strikethrough",
            "underline",
            "|",
            "subscript",
            "superscript",
            "|",
            "outdent",
            "indent",
            "|",
            "fontfamily",
            "fontsize",
            "alignment",
            "|",
            "highlight",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "|",
            "link",
            "insertTable",
            "specialcharacters",
            "blockQuote",
            "|",
            "code",
            "codeBlock",
            "sourceEditing",
            "|",
            "removeFormat",
            "|",
            "findandreplace",
            "|",
        ],
        table: {
            contentToolbar: [
                "tableColumn",
                "tableRow",
                "mergeTableCells",
                "tableCellProperties",
                "tableProperties",
            ],
        },
        removePlugins: ["Title", "MediaEmbed"],
    };
    return (
        <>
            <div id="main-container" className='h-full w-full flex flex-col no-scrollbar bg-background'>
                <div id='' className='h-[10%] ml-[3.5vw] mr-[2.8vw] bg-bg-secondary flex justify-between items-center no-scrollbar'>
                    <div className="word-char-button flex flex-wrap md:flex-nowrap gap-0 no-scrollbar">
                        <button className={`bg-transparent hover:bg-primaryText hover:text-white font-bold py-2 px-4 ml-2 border ${isTyping ? "border-transparent" : " border-primaryText"} rounded inline-flex items-center`}
                            disabled={isTyping}
                            onClick={handleDownload}
                        >
                            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                            <span>Download</span>
                        </button>
                    </div>
                    <div>
                        <button
                            className={`flex items-center justify-center text-primaryText whitespace-nowrap mb-1 mr-2 py-1 px-4 rounded-lg transition duration-300 sm:py-1 sm:px-2 hover:text-red-600`}
                            onClick={() => {
                                const x = window.confirm("Delete the current progress and Editor contents?");
                                console.log(x);
                                if (x) {
                                    handleClear();
                                }
                            }}
                        >
                            <span className="ml-1 mr-1 text-base">
                                Start Over
                            </span>
                            <span>
                                <FaTrashAlt className="text-red-500 text-base mr-1" />
                            </span>
                        </button>
                    </div>
                </div>
                <div className="document-editor md:h-[84%] h-[80%] no-scrollbar text-black">
                    <div ref={toolBarRef} className="document-editor__toolbar"></div>
                    <div className="document-editor__editable-container">
                        <div className="document-editor__editable"></div>
                        <CKEditor
                            ref={editorRef}
                            editor={Editor}
                            data={content}
                            config={editorConfiguration}
                            onChange={handleContentChange}
                            onReady={(editor) => {
                                if (toolBarRef.current) {
                                    toolBarRef.current.innerHTML = ""; // Remove old toolbar
                                    toolBarRef.current.appendChild(
                                        editor.ui.view.toolbar.element
                                    );
                                }
                                editor.keystrokes.set("Tab", (keyEvtData, cancel) => {
                                    editor.model.change((writer) => {
                                        const insertPosition =
                                            editor.model.document.selection.getFirstPosition();
                                        writer.insertText("    ", insertPosition);
                                    });
                                    keyEvtData.preventDefault();
                                    cancel(); // Prevent the default behavior
                                });
                            }}
                        />
                    </div>
                </div>
                <div id="status" className='h-[10%] md:h-[5%] text-xs md:text-base ml-[3.8vw] mr-[3.6vw] flex flex-row pl-1 items-center justify-center no-scrollbar'>
                    <div className="word-char-button flex flex-wrap md:flex-nowrap gap-0 pr-1">
                        <div className="w-full  loading-button pl-1">
                            <>
                                {isTyping ? (
                                    <div className="text-black opacity-40">
                                        Saving (every 5s)
                                    </div>
                                ) : (
                                    <div content="Saved Locally" className="text-green-700">
                                        Saved Locally
                                    </div>
                                )}
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyEditorComponent;
