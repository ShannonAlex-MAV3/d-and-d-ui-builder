import React, { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-webpage";

export default function Editor() {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    // Initialize editor
    editorInstance.current = grapesjs.init({
      container: editorRef.current,
      plugins: ["gjs-preset-webpage"],
      storageManager: {
  urlStore: '/save-template',
  urlLoad: '/load-template',
        type: "local",
        autosave: true,
        autoload: true,
        stepsBeforeSave: 1,
      },
      blockManager: {
        appendTo: "#blocks",
        blocks: [
          {
            id: "text",
            label: "Text",
            content: '<div data-gjs-type="text">Insert your text here</div>',
          },
        ],
      },
      panels: { defaults: [] }, // Disable default panels
    });

    // Add inside useEffect after initialization
    editorInstance.current.on("storage:store", (e) => {
      console.log("Saved content:", e);
    });

    editorInstance.current.BlockManager.add('my-block', {
        label: 'Custom Block',
        content: '<div class="my-block">Custom content</div>',
        category: 'Custom',
      });

    return () => {
      editorInstance.current.destroy();
    };
  }, []);

  return (
    <div className="editor-container">
      <div id="blocks">
        <button onClick={() => editorInstance.current.store()}>Save</button>
      </div>
      <div ref={editorRef} id="gjs"></div>
    </div>
  );
}
