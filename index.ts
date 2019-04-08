import { Buffer, Window, NvimPlugin } from "neovim";

export default (plugin: NvimPlugin) => {
  const { nvim } = plugin;

  const createLabel = async (): Promise<Window> => {
    const buffer = (await nvim.createBuffer(false, false)) as Buffer;
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
    })) as Window;
    await window.setOption("number", false);
    await window.setOption("relativenumber", false);
    await window.setOption("signcolumn", "no");
    return window;
  };

  plugin.setOptions({ dev: true });

  plugin.registerCommand("FloatingWindowDebug", createLabel, { sync: false });
};
