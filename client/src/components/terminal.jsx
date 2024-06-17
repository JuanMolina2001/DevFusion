import { Terminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import "@xterm/xterm/css/xterm.css";

export default ({ path }) => {
    const ref = useRef(null);
    const cols = 80;
    const rows = 17;
    const term = new Terminal({
        cols: cols,
        rows: rows,
    });
    useEffect(() => {

        term.open(ref.current);
        pywebview.api.terminal.create(cols, rows, path).then(() => {
            term.onData((data) => {
                pywebview.api.terminal.write(data)
            });

            const fetchData = ()=>{
                pywebview.api.terminal.onData().then((data) => {
                    term.write(data);
                });
                requestAnimationFrame(fetchData);
            }
            
            fetchData();

        });

        return () => {
            term.dispose();
            pywebview.api.terminal.close();
        };
    }, [path]);

    return (
            <div className='bg-black h-1/3 overflow-hidden col-span-3 row-span-1 border-r border-t border-b border-[var(--opacity-color)]' ref={ref}></div>
    );
};