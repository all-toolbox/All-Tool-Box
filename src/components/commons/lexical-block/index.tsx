import * as stylex from "@stylexjs/stylex";
import { $getRoot, $getSelection, BLUR_COMMAND, COMMAND_PRIORITY_LOW, EditorState, FOCUS_COMMAND, LexicalEditor } from 'lexical';
import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
// import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CLEAR_HISTORY_COMMAND } from "lexical";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";

import { mergeRegister } from '@lexical/utils';

import { writeText, readText } from '@tauri-apps/plugin-clipboard-manager';
import { save } from '@tauri-apps/plugin-dialog';
import { writeTextFile } from '@tauri-apps/plugin-fs';

const theme = {
    // Theme styling goes here
    // ...
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
    console.error(error);
}

const styles = stylex.create({
    base: {
        backgroundColor: "var(--background-100)",
        height: "100%",
    },

    fullscreen: {
        height: "calc(100% - 2.5rem)",
        top: 0,

        position: "absolute",
        left: 0,
        width: "100%",
        zIndex: "10000000000000",
    },

    btn: {
        backgroundColor: "var(--color-bg-compliment)",
        borderRadius: "0",
        border: "0.0625rem solid var(--color-border)",
        cursor: "pointer",
        outline: "none",

        transition: "background-color var(--transition-speed) ease",

        ":hover": {
            backgroundColor: "var(--color-bg)",
        }
    },

    contentEditable: {
        backgroundColor: "var(--color-bg)",
        height: "100%",
        outline: "none",
        padding: "0.5rem",
        boxSizing: "border-box",
        overflow: "auto",

        transition: "opacity var(--transition-speed) ease",

        ":hover": {
            opacity: "0.9"
        }
    },

    placeholder: {
        padding: "0.5rem",
        position: "absolute",
        top: 0,
        userSelect: "none",
        pointerEvents: "none",
    },
});

// @ts-ignore
function MyOnChangePlugin({ onChange }) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            onChange(editorState);
        });
    }, [
        editor, onChange
    ]);

    return null;
}

// NOTE: This is an approved solution from the lexical github discussions
// Default clean editor state for simple text insertions
const desiredUpdate = {
    editorState: {
        root: {
            children: [
                {
                    children: [
                        {
                            detail: 0,
                            format: 0,
                            mode: "normal",
                            style: "",
                            text: "anmwieonvaiweonviaowenvioew",
                            type: "text",
                            version: 1,
                        },
                    ],
                    direction: "ltr",
                    format: "",
                    indent: 0,
                    type: "paragraph",
                    version: 1,
                },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "root",
            version: 1,
        },
    },
    lastSaved: 1656765599382,
    source: "Playground",
    version: "0.3.6",
};

const ExternalUsagePlugin = forwardRef((props: any, ref: any) => {
    const [editor] = useLexicalComposerContext();

    useImperativeHandle(ref, () => ({
        SetEditable(editable: boolean): void {
            editor.setEditable(editable);
        },

        SetSimpleTextContent(value: string): void {
            desiredUpdate.editorState.root.children[0].children[0].text = value;
            const editorState = editor.parseEditorState(
                JSON.stringify(desiredUpdate.editorState)
            );
            editor.setEditorState(editorState);
            editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
        },

        Focus(): void {
            editor.focus();
        },

        GetTextContent(): string {
            const stringifiedEditorState = JSON.stringify(
                editor.getEditorState().toJSON(),
            );
            const parsedEditorState = editor.parseEditorState(stringifiedEditorState);

            return parsedEditorState.read(() => $getRoot().getTextContent());
        },

        GetEditorContent(): string {
            return JSON.stringify(editor.getEditorState());
        },

        ClearEditorState(): void {
            // Dirty hack to prevent lexical from shifting autofocus when multiple editors are on the same page
            editor.setEditable(false);

            editor.update(() => {
                $getRoot().clear();
            });

            // Dirty hack to prevent lexical from shifting autofocus when multiple editors are on the same page
            requestAnimationFrame(() => editor.setEditable(true));
        },
    }));

    return <></>;
});

function EditorFocusPlugin({ FocusChange }: any) {
    const [editor] = useLexicalComposerContext();

    useLayoutEffect(() => {
        return mergeRegister(
            editor.registerCommand(
                FOCUS_COMMAND,
                () => {
                    FocusChange(true);
                    return false;
                },
                COMMAND_PRIORITY_LOW
            ),

            editor.registerCommand(
                BLUR_COMMAND,
                () => {
                    FocusChange(false);
                    return false;
                },
                COMMAND_PRIORITY_LOW
            ),
        );
    }, [editor]);

    return null;
}

const LexicalBlock = forwardRef((props: any, ref: any) => {
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
    };

    const [expanded, setExpanded] = useState<boolean>(false);

    const editorRef = useRef(null);
    const safeUpdatingRef = useRef<boolean>(true);

    useImperativeHandle(ref, () => ({
        SetSafeUpdating(arg: boolean): void {
            safeUpdatingRef.current = !arg;
        },

        SetSimpleTextContent(value: string): void {
            if (editorRef.current) {
                // @ts-ignore
                editorRef.current.SetSimpleTextContent(value);
            } else {
                console.error("Failed to focus on editor.");
            }
        },

        GetTextContent(): string {
            if (editorRef.current) {
                // @ts-ignore
                return editorRef.current.GetTextContent();
            }

            console.error("Failed to focus on editor.");
            return "";
        },

        Focus(): void {
            if (editorRef.current) {
                // @ts-ignore
                editorRef.current.Focus();
            } else {
                console.error("Failed to focus on editor.");
            }
        },

        ClearEditorState(): void {
            if (editorRef.current) {
                // @ts-ignore
                editorRef.current.ClearEditorState();
            } else {
                console.error("Failed to clear editor state");
            }
        },

        GetEditorContent(): string {
            return JSON.stringify(editorState);
        },

        SetEditable(editable: boolean): void {
            if (editorRef.current) {
                //
            } else {
                console.error("Failed to change editor editable state.");
            }
        },

        // SetFocusToEditorAtEnd(),

        // CancelEditing(null),
    }));

    const [editorState, setEditorState] = useState();
    function onChange(editorState: EditorState, editor: LexicalEditor) {
        if (safeUpdatingRef.current === true) {
            props.onChange(editorState, editor);
        }
    }

    function FocusChange(arg: boolean): void {
        safeUpdatingRef.current = arg;
    }

    function OpenFile(et: any) {
        // TODO: create a global file input comp and just use its ID for ref
        const input = document.createElement('input');
        input.type = 'file';

        input.onchange = (e: any) => {
            const file = e.target.files[0];

            const reader = new FileReader();
            reader.readAsText(file, 'UTF-8');

            reader.onload = (readerEvent: any) => {
                const content = readerEvent.target.result;
                console.log(content);

                if (editorRef.current) {
                    // @ts-ignore
                    editorRef.current.SetSimpleTextContent(content);
                }
            }
        }

        input.click();
    }

    async function WriteFile(): Promise<void> {
        const path = await save({
            filters: [
                {
                    name: 'My Filter',
                    extensions: ['txt'],
                },
            ],
        });

        if (editorRef.current) {
            // TODO: need some kind of notication for success and filaure
            writeTextFile(
                // @ts-ignore
                path,
                // @ts-ignore
                editorRef.current.GetTextContent(),
                {
                    createNew: true,
                }
            );
        }
    }

    return (
        <div
            {...stylex.props(
                (expanded === true ? styles.fullscreen :
                    styles.base
                )
            )}
        >
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    backgroundColor: "var(--color-bg-hover)",
                }}
            >
                <button
                    {...stylex.props(styles.btn)}
                    type="button"
                    onClick={OpenFile}
                >
                    Load File
                </button>

                <button
                    {...stylex.props(styles.btn)}
                    type="button"
                    onClick={() => {
                        if (editorRef.current) {
                            readText()
                                .then((res) => {
                                    console.log(res);
                                    // @ts-ignore
                                    editorRef.current.SetSimpleTextContent(res);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }
                    }}
                >
                    Clipboard
                </button>

                <button
                    {...stylex.props(styles.btn)}
                    type="button"
                    onClick={WriteFile}
                >
                    Download
                </button>

                <button
                    {...stylex.props(styles.btn)}
                    type="button"
                    onClick={() => {
                        if (editorRef.current) {
                            // @ts-ignore
                            writeText(editorRef.current.GetTextContent())
                                .then((res) => {
                                    console.log(res);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }
                    }}
                >
                    Copy
                </button>

                <button
                    {...stylex.props(styles.btn)}
                    type="button"
                    onClick={() => {
                        if (editorRef.current) {
                            // @ts-ignore
                            editorRef.current.ClearEditorState();

                            props.onClear();
                        }
                    }}
                >
                    Clear
                </button>

                <button
                    {...stylex.props(styles.btn)}
                    type="button"
                    onClick={() => {
                        setExpanded(!expanded);
                    }}
                >
                    Expand
                </button>
            </div>

            <div
                style={{
                    height: "100%",
                    position: "relative",
                }}
            >
                <LexicalComposer initialConfig={initialConfig}>
                    <ExternalUsagePlugin ref={editorRef} />


                    <PlainTextPlugin
                        contentEditable={
                            <ContentEditable
                                {...stylex.props(styles.contentEditable)}
                            />
                        }
                        placeholder={<div
                            {...stylex.props(styles.placeholder)}
                        >
                            Enter some text...
                        </div>
                        }
                        // @ts-ignore
                        ErrorBoundary={}
                    />

                    <HistoryPlugin />

                    <MyOnChangePlugin onChange={onChange} />

                    <EditorFocusPlugin
                        FocusChange={FocusChange}
                    />
                </LexicalComposer>
            </div>
        </div >
    );
});

export default LexicalBlock;
