import { Terminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import "@xterm/xterm/css/xterm.css";

export default ({ path }) => {
    const ref = useRef(null);

    useEffect(() => {
        const { pty } = pywebview.api
        const term = new Terminal({
            cursorBlink: true,
            cursorStyle: 'block',
            fontSize: 14,
            fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
        });
        term.open(ref.current);
        pty.open(path).then(() => {
            let content = '';
            const onData = () => {
                pty.onData().then(data => {
                    term.write(data);
                    onData();
                });
            }

            term.onData(data => {
                content += data;
                if (data === '\x7F') {
                    pty.write(content);
                    content = '';
                } else {
                    term.write(data);
                }
                if (JSON.stringify(data).includes('\\')) {
                    pty.write(content);
                    content = '';
                }

            });
            onData();
        });
        return () => {
            term.dispose();
            pty.close();
        };
    }, [path]);


    return (
        <div className='bg-black h-1/3 overflow-hidden col-span-3 row-span-1 border-r border-t border-b border-[var(--opacity-color)]' ref={ref}></div>
    );
};