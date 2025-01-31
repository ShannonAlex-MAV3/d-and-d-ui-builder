import React, { useEffect, useRef } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import gjsPresetWebpage from 'grapesjs-preset-webpage';
import gjsBlocksBasic from 'grapesjs-blocks-basic';

const WebBuilder = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = grapesjs.init({
        container: '#gjs',
        height: '700px',
        width: 'auto',
        storageManager: {
          type: 'local',
          autosave: true,
          autoload: true,
          stepsBeforeSave: 1,
        },
        deviceManager: {
          devices: [{
            name: 'Desktop',
            width: '',
          }, {
            name: 'Mobile',
            width: '320px',
            widthMedia: '480px',
          }]
        },
        plugins: [gjsPresetWebpage, gjsBlocksBasic],
        pluginsOpts: {
          gjsPresetWebpage: {},
          gjsBlocksBasic: {
            blocks: ['column1', 'column2', 'column3', 'column3-7', 'text', 'link', 'image', 'video', 'map']
          },
        },
        blockManager: {
          appendTo: '#blocks',
          blocks: [
            {
              id: 'section',
              label: '<b>Section</b>',
              category: 'Basic',
              content: `<section>
                <h1>This is a simple title</h1>
                <div>This is just a basic section</div>
              </section>`,
            },
            {
              id: 'text',
              label: 'Text',
              category: 'Basic',
              content: '<div data-gjs-type="text">Insert your text here</div>',
            },
            {
              id: 'image',
              label: 'Image',
              category: 'Basic',
              content: { type: 'image' },
              activate: true,
            },
            {
              id: 'button',
              label: 'Button',
              category: 'Basic',
              content: '<button class="button">Click me</button>',
            },
          ]
        },
        selectorManager: {
          appendTo: '#styles-container'
        },
        styleManager: {
          appendTo: '#styles-container',
          sectors: [
            {
              name: 'General',
              open: false,
              buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom']
            },
            {
              name: 'Dimension',
              open: false,
              buildProps: [
                'width',
                'height',
                'max-width',
                'min-height',
                'margin',
                'padding'
              ]
            },
            {
              name: 'Typography',
              open: false,
              buildProps: [
                'font-family',
                'font-size',
                'font-weight',
                'letter-spacing',
                'color',
                'line-height',
                'text-align',
                'text-decoration',
                'text-shadow'
              ]
            },
            {
              name: 'Decorations',
              open: false,
              buildProps: [
                'background-color',
                'border',
                'border-radius',
                'border-width',
                'border-style',
                'border-color',
                'box-shadow',
                'opacity',
              ]
            },
            {
              name: 'Extra',
              open: false,
              buildProps: [
                'transition',
                'perspective',
                'transform'
              ]
            }
          ]
        },
        panels: {
          defaults: [
            {
              id: 'panel-devices',
              el: '.panel__devices',
              buttons: [{
                id: 'device-desktop',
                label: 'Desktop',
                command: 'set-device-desktop',
                active: true,
                togglable: false,
              }, {
                id: 'device-mobile',
                label: 'Mobile',
                command: 'set-device-mobile',
                togglable: false,
              }],
            },
            {
              id: 'panel-switcher',
              el: '.panel__switcher',
              buttons: [
                {
                  id: 'show-layers',
                  active: true,
                  label: 'Layers',
                  command: 'show-layers',
                  togglable: false,
                },
                {
                  id: 'show-style',
                  active: false,
                  label: 'Styles',
                  command: 'show-styles',
                  togglable: false,
                },
                {
                  id: 'show-blocks',
                  active: false,
                  label: 'Blocks',
                  command: 'show-blocks',
                  togglable: false,
                }
              ]
            },
            {
              id: 'basic-actions',
              el: '.panel__basic-actions',
              buttons: [
                {
                  id: 'visibility',
                  active: true,
                  className: 'btn-toggle-borders',
                  label: '<u>B</u>',
                  command: 'sw-visibility',
                },
                {
                  id: 'export',
                  className: 'btn-open-export',
                  label: 'Exp',
                  command: 'export-template',
                },
                {
                  id: 'show-json',
                  className: 'btn-show-json',
                  label: 'JSON',
                  context: 'show-json',
                  command(editor) {
                    editor.Modal.setTitle('Components JSON')
                      .setContent(`<textarea style="width:100%; height: 250px;">
                        ${JSON.stringify(editor.getComponents(), null, 2)}
                      </textarea>`)
                      .open();
                  },
                },
              ],
            }
          ]
        },
      });

      // Commands for switching views
      editor.Commands.add('show-layers', {
        getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
        getLayersEl(row) { return row.querySelector('#layers-container'); },
        run(editor, sender) {
          const row = this.getRowEl(editor);
          const layers = this.getLayersEl(row);
          layers.style.display = '';
          row.querySelector('#styles-container').style.display = 'none';
          row.querySelector('#blocks').style.display = 'none';
        }
      });
      
      editor.Commands.add('show-styles', {
        getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
        getStyleEl(row) { return row.querySelector('#styles-container'); },
        run(editor, sender) {
          const row = this.getRowEl(editor);
          const styles = this.getStyleEl(row);
          styles.style.display = '';
          row.querySelector('#layers-container').style.display = 'none';
          row.querySelector('#blocks').style.display = 'none';
        }
      });
      
      editor.Commands.add('show-blocks', {
        getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
        getBlocksEl(row) { return row.querySelector('#blocks'); },
        run(editor, sender) {
          const row = this.getRowEl(editor);
          const blocks = this.getBlocksEl(row);
          blocks.style.display = '';
          row.querySelector('#layers-container').style.display = 'none';
          row.querySelector('#styles-container').style.display = 'none';
        }
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

  return (
    <div className="app-container">
      <div className="panel__top">
        <div className="panel__basic-actions"></div>
        <div className="panel__devices"></div>
        <div className="panel__switcher"></div>
      </div>
      <div className="editor-row">
        <div className="editor-canvas">
          <div id="gjs">
            <h1>Welcome to GrapeJS Website Builder</h1>
            <p>Start building your website by dragging elements from the blocks panel.</p>
          </div>
        </div>
        <div className="panel__right">
          <div id="layers-container"></div>
          <div id="styles-container"></div>
          <div id="blocks"></div>
        </div>
      </div>
    </div>
  );
};

export default WebBuilder;
