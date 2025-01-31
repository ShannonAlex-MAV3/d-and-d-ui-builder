import React, { useEffect, useRef } from "react";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import gjsExport from "grapesjs-plugin-export";
import gjsForms from "grapesjs-plugin-forms";
import grapesjsClick, { getMouseListener, showGrabbedInfo, hideGrabbedInfo } from 'grapesjs-click'
import template from './data.json'

const WebBuilder = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = grapesjs.init({
        container: "#gjs",
        height: "100vh",
        width: "auto",
        storageManager: {
          type: "local", // Type of the storage, available: 'local' | 'remote'
          autosave: true, // Store data automatically
          autoload: true, // Autoload stored data on init
          stepsBeforeSave: 1, // If autosave enabled, indicates how many changes are necessary before store method is triggered
          options: {
            local: {
              // Options for the `local` type
              key: "gjsProject", // The key for the local storage
            },
          },
        },
        plugins: [gjsPresetWebpage, gjsBlocksBasic, gjsExport, gjsForms, grapesjsClick],
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if(editorRef.current){
        editorRef.current.setComponents(template.components);
        editorRef.current.setStyle(template.style);
    }
  }, [editorRef.current]) 

  return (
    <>
      <div className="app-container">
        <div className="editor-row">
          <div className="editor-canvas">
            <div id="gjs">
              <h1>Welcome to GrapeJS Website Builder</h1>
              <p>
                Start building your website by dragging elements from the blocks
                panel.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="p-2 z-10 absolute top-0">
        <button
          className="text-white bg-black p-2"
          type="button"
          onClick={() => {
            let components = editorRef.current.getComponents();
            let style = editorRef.current.getStyle();
            let templateData = {
              components: components,
              style: style,
            };
            // console.log("template data:", templateData);
            const jsonData = JSON.stringify(templateData);
            const blob = new Blob([jsonData], { type: "application/json" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "data.json";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          Save
        </button>
      </div> */}
    </>
  );
};

export default WebBuilder;
