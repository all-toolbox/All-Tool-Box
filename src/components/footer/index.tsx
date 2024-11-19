import {
    useEffect,
    useRef, useState,
} from 'react';

import * as stylex from '@stylexjs/stylex';
import { TopFooter } from "./top-footer.tsx";
import { BottomFooter } from "./bottom-footer.tsx";
import { MiddleContent } from "./middle-content.tsx";
import { useRecoilState, useRecoilValue } from 'recoil';
import { FooterExpandedData } from '@src/store/footer_expanded_atom.ts';

const styles = stylex.create({
    wrapper: {
        height: 'calc(var(--footer-height) - 0.0625rem)',
        width: '100%',

        backgroundColor: 'var(--footer-bg)',
        borderTop: "0.0625rem solid var(--color-border)",

        display: "grid",
        gridTemplateRows: "1fr",
        containerType: 'inline-size',
        containerName: 'footer',
        position: 'relative',
    },

    footer: {
        height: '1.25rem',
        width: '100%',
        flexGrow: 1,

        backgroundColor: 'var(--sidebar-bg)',
        overflow: "auto",

        display: 'flex',
        flexDirection: 'row',
        borderTop: "0.0625rem solid var(--main-border-color)",
    },

    expandedFooter: {
        flexDirection: 'column',
        height: '100%',
    },

    resizeHandle: {
        zIndex: 10,
        width: "100%",
        backgroundColor: 'transparent',
        cursor: 'row-resize',
        position: 'absolute',
        height: "0.125rem",
        top: "-0.125rem",
        ':hover': {
            backgroundColor: "var(--resizer-color)",
        }
    },

    resizeHandleActive: {
        backgroundColor: "var(--resizer-color)",
    },

    topRow: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: '0.5rem',
        flex: 1,
        paddingLeft: '0.5rem',
    },

    bottomRow: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: '0.5rem',
        flex: 1,
        justifyContent: 'flex-end',
        paddingRight: '0.5rem',
    },

    middleRow: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
    },

    container: {
        width: "100%",
        display: 'flex',
        flex: 1,
    },

    text: {
        color: 'var(--color-sidebar-text)',
        fontSize: '0.625rem',
        lineHeight: '1rem',
        textAlign: 'center',
        margin: 0,
        textWrap: 'nowrap',
    },
});

const MIN_EXPANDED_HEIGHT = 16 * 10;
const EXPANDED_THRESHOLD = MIN_EXPANDED_HEIGHT / 2;

function Footer() {
    const html_style = document.getElementsByTagName("html")[0].style;
    const body = document.getElementsByTagName("body")[0];
    const resizerRef = useRef<HTMLDListElement | null>(null);
    const [resizeInProgress, setResizeInProgress] = useState<boolean>(false);

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const isExpandedRef = useRef<boolean>(false);

    useEffect(() => {
        const h = html_style.getPropertyValue('--footer-height');
        const px = parseInt(h.substring(0, h.length - 2));
        if (px > MIN_EXPANDED_HEIGHT) {
            setIsExpanded(true);
            isExpandedRef.current = true;
        }
    }, []);

    useEffect(() => {
        if (resizerRef.current) {
            // Allow card banner to toggle the help
            resizerRef.current.addEventListener("CustE_OpenHelp", (e) => {
                e.stopImmediatePropagation();

                if (isExpandedRef.current) {
                    setIsExpanded(false);
                    isExpandedRef.current = false;

                    const eventmove = new MouseEvent("mousemove", {
                        clientY: 9999999, // NOTE: set high to ensure footer closes
                    });

                    resize(eventmove);
                } else {
                    setIsExpanded(true);
                    isExpandedRef.current = true;

                    const eventmove = new MouseEvent("mousemove", {
                        clientY: body.clientHeight - Math.min(MIN_EXPANDED_HEIGHT, body.clientHeight - 48 - 2) - 200,
                    });

                    resize(eventmove);
                }
            });

            resizerRef.current.addEventListener("mousedown", () => {
                setResizeInProgress(true);
                html_style.cursor = 'row-resize';

                // @ts-ignore
                document.body.style['-webkit-user-select'] = "none";
                document.addEventListener("mousemove", resize, false);
                document.addEventListener("mouseup", () => {
                    setResizeInProgress(false);
                    html_style.cursor = 'inherit';

                    document.removeEventListener("mousemove", resize, false);
                    // @ts-ignore
                    document.body.style['-webkit-user-select'] = "auto";
                }, false);
            });
        }
    }, []);

    function resize(e: MouseEvent) {
        e.preventDefault();
        // console.log(body.clientHeight, e);
        const size = body.clientHeight - e.y;
        if (!resizerRef.current) return;
        let curSize = size;
        if (curSize < MIN_EXPANDED_HEIGHT && size >= EXPANDED_THRESHOLD) {
            setIsExpanded(true);
            isExpandedRef.current = true;
            curSize = MIN_EXPANDED_HEIGHT
        } else if (size <= EXPANDED_THRESHOLD) {
            setIsExpanded(false);
            isExpandedRef.current = false;
            curSize = 20
        }
        html_style.setProperty(
            '--footer-height',
            `${Math.min(curSize, body.clientHeight - 48 - 2)}px`,
        );
    }

    return (
        <div
            {...stylex.props(styles.wrapper)}
        >
            <div
                ref={resizerRef as any}
                id="footer-resize-handle"
                {...stylex.props(styles.resizeHandle, (
                    resizeInProgress && styles.resizeHandleActive
                ))}
            />

            <div
                {...stylex.props(styles.footer, isExpanded && styles.expandedFooter)}
            >
                {/* <TopFooter isExpanded={isExpanded}/> */}
                <MiddleContent isExpanded={isExpanded} />
                {/* <BottomFooter isExpanded={isExpanded}/> */}
            </div>
        </div>
    );
}

export default Footer;
