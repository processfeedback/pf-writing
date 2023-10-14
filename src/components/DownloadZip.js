import { v4 as uuidv4 } from "uuid";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export function GetCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}-${hours}-${minutes}`;
};

export const generateJSONzip = () => {
    return new Promise((resolve, reject) => {
        try {
            const uuid = `${GetCurrentDateTime()}_${uuidv4()}`;
            const fullPackageJSON = JSON.parse(localStorage.getItem("pf_prototype_fullPackage"));
            fullPackageJSON.author = "Test Author";
            fullPackageJSON.title = "Prototype Test";
            fullPackageJSON.uuid = uuid;
            // Create a new zip object
            const zip = new JSZip();
            const serverPackage = {
                documentVersion: fullPackageJSON.documentVersion,
                formType: fullPackageJSON.formType,
                uuid: fullPackageJSON.uuid,
                language: fullPackageJSON.language,
                questionPresentFlag: fullPackageJSON.questionPresentFlag,
                encryptionFlag: fullPackageJSON.encryptionFlag,
                compressionFlag: fullPackageJSON.compressionFlag,
                expiryDate: fullPackageJSON.expiryDate,
                fullPackage: fullPackageJSON,
                ignoreEncryptDecrypt: true,
                required: ["documentVersion", "formType"],
            };
            zip.file("data.json", JSON.stringify(serverPackage));
            const link = `${window.location.origin}/readme.txt`;
            fetch(link)
                .then((response) => response.text())
                .then((text) => {
                    zip.file("readme.txt", text);
                    zip.generateAsync({ type: "blob" }).then(function (blob) {
                        saveAs(
                            blob,
                            `PF_Data.zip`
                        );
                    });
                })
                .catch((error) => {
                    console.error("Failed to add readme.txt:", error);
                });
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};