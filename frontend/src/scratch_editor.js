import React from "react";
import Tbar from "./components/topbar.js"
import Frame from "./frame";

/**
 * Contains information describing the workflow of KanScratch for students (and soon also instructors).
 * @function
 */
const ScratchEditor = () => {
  return (
      <div id="frame">
        <Frame/>
      </div>
  );
};

export default ScratchEditor;