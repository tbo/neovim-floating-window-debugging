"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (plugin) => {
    const { nvim } = plugin;
    const createLabel = async () => {
        const buffer = (await nvim.createBuffer(false, false));
        await buffer.setLines("abcdef", {
            start: 0,
            end: -1,
            strictIndexing: true
        });
        const window = (await nvim.openWindow(buffer, false, {
            relative: "cursor",
            row: 1,
            col: 1,
            width: 6,
            height: 1,
            focusable: false
        }));
        await window.setOption("number", false);
        await window.setOption("relativenumber", false);
        await window.setOption("signcolumn", "no");
        return window;
    };
    plugin.setOptions({ dev: true });
    plugin.registerCommand("FloatingWindowDebug", createLabel, { sync: false });
};
