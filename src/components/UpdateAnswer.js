import { v4 as uuidv4 } from "uuid";
import { GetCurrentDateTime } from "./DownloadZip";

export function UpdatePackageForAnswer(answer) {
  const currentDateTime = GetCurrentDateTime();
  const localRevisionCounts = localStorage.getItem("pf_prototype_revisionCounts")
    ? parseInt(localStorage.getItem("pf_prototype_revisionCounts"))
    : 0;
  const timestamp = Date.now(); // get the current Unix timestamp (in milliseconds)
  var date = new Date(timestamp); // create a new Date object from the timestamp
  var timeInIsoString = date.toISOString(); // format the date string in the ISO 8601 format
  const minimumLoggingInterval = 5000;
  if (!localStorage.getItem("pf_prototype_finalTimeStamp")) {
    localStorage.setItem("pf_prototype_finalTimeStamp", timeInIsoString);
  }
  const answerPrev = localStorage.getItem("pf_prototype_answer")
    ? localStorage.getItem("pf_prototype_answer")
    : "";
  if (answerPrev === answer) {
    return false;
  }
  localStorage.setItem("pf_prototype_revisionCounts", localRevisionCounts + 1);
  localStorage.setItem("pf_prototype_answer", answer);
  localStorage.setItem("pf_prototype_finalTimeStamp", timeInIsoString);
  var finalJSON = localStorage.getItem("pf_prototype_fullPackage") ? JSON.parse(localStorage.getItem("pf_prototype_fullPackage")) : {};
  const expiryDateObj = new Date();
  expiryDateObj.setMonth(expiryDateObj.getMonth() + 6); // set the month ahead by six
  const expiryDate = expiryDateObj.toISOString();
  localStorage.setItem("pf_prototype_expiryDate", expiryDate);
  var localAnswerVersions = localStorage.getItem("pf_prototype_fullPackage") ? finalJSON.answerVersions : {};
  localAnswerVersions[timeInIsoString] = answer;
  finalJSON.documentVersion = "1.0";
  finalJSON.formType = "text";
  finalJSON.language = "en";
  finalJSON.encryptionFlag = false;
  finalJSON.compressionFlag = false;
  finalJSON.codeLanguage = "";
  finalJSON.questionPresentFlag = false;
  finalJSON.submissionDeadline = "";
  finalJSON.expiryDate = expiryDate;
  finalJSON.question = "";
  finalJSON.author = "";
  finalJSON.title = "";
  finalJSON.initialTimeStamp = localStorage.getItem("pf_prototype_fullPackage") ? finalJSON.initialTimeStamp : timeInIsoString;
  finalJSON.finalTimeStamp = timeInIsoString;
  finalJSON.minimumLoggingInterval = minimumLoggingInterval;
  finalJSON.answerVersions = localAnswerVersions;
  finalJSON.answer = answer;
  finalJSON.documentUUID = finalJSON.documentUUID
    ? finalJSON.documentUUID
    : `${currentDateTime}_${uuidv4()}`;
  localStorage.setItem("pf_prototype_fullPackage", JSON.stringify(finalJSON));
  return true;
}