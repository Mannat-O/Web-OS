<script lang="ts">
  import { getContext } from "svelte";
  import icon from "../../assets/icons/terminal.svg";
  import {
    createRecord,
    deleteRecord,
    getFromPath,
    normalizePath,
  } from "../fs";
  import BaseWindow from "./BaseWindow.svelte";

  let input: HTMLInputElement;
  let form: HTMLFormElement;

  let prompt = "$ ";
  let dir = $state<string[]>([]);
  let historyIndex = $state(-1);
  let output = $state(
    `${prompt}Type <span class="text-blue-400">\`help\`</span> to see available commands\n`,
  );
  let value = $state(prompt);

  const openWindow = getContext<(type: string) => void>("openWindow");
  const history: string[] = [];

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (value.trim() === prompt.trim()) return;

    historyIndex = -1;
    history.unshift(value);

    const data = value.slice(prompt.length).trim().split(" ");
    output += `<span class="text-green-400">${prompt}</span><span class="text-white">${data.join(" ")}</span>\n`;
    value = prompt;

    switch (data[0]) {
      case "help":
        output += `Available commands:
  <span class="text-blue-400">help</span> - Print this menu
  <span class="text-blue-400">clear</span> - Clear the terminal
  <span class="text-blue-400">reboot</span> - Reboot the computer
  <span class="text-blue-400">pwd, ls, cd, cat, rm, touch, mkdir</span> - File commands
  <span class="text-blue-400">filemanager, notepad, welcome, aboutme, terminal, minesweeper, settings</span> - Open windows\n`;
        break;
      case "pwd":
        output += `/${dir.join("/")}\n`;
        break;
      case "clear":
        output = "";
        break;
      case "ls":
        Object.entries(getFromPath(dir))
          .sort((a, b) => (a[0] > b[0] ? 1 : -1))
          .sort((a) => (typeof a[1] === "string" ? 1 : -1))
          .forEach(([name, content]) => {
            output += `${name}${typeof content === "string" ? "" : "/"}\n`;
          });
        break;
      case "cd": {
        const newDir = normalizePath(
          data[1].startsWith("/")
            ? data[1].split("/")
            : dir.concat(data[1].split("/")),
        );
        const folderData = getFromPath(newDir);
        if (!folderData) {
          output += `<span class="text-red-400">Path does not exist</span>\n`;
          break;
        }
        if (typeof folderData === "string") {
          output += `<span class="text-red-400">${data[1]} is a file</span>\n`;
          break;
        }
        dir = newDir;
        break;
      }
      case "cat": {
        const file = normalizePath(
          data[1].startsWith("/")
            ? data[1].split("/")
            : dir.concat(data[1].split("/")),
        );
        const content = getFromPath(file);
        if (content === undefined) {
          output += `<span class="text-red-400">Path does not exist</span>\n`;
          break;
        }
        if (typeof content !== "string") {
          output += `<span class="text-red-400">${data[1]} is not a file</span>\n`;
          break;
        }
        output += `${content}\n`;
        break;
      }
      case "rm": {
        const file = normalizePath(
          data[1].startsWith("/")
            ? data[1].split("/")
            : dir.concat(data[1].split("/")),
        );
        const content = getFromPath(file);
        if (content === undefined) {
          output += `<span class="text-red-400">Path does not exist</span>\n`;
          break;
        }
        deleteRecord(file);
        break;
      }
      case "touch":
      case "mkdir": {
        if (!/[0-9a-zA-Z]+/.test(data[1])) {
          output += `<span class="text-red-400">Error: non-allowed characters</span>\n`;
          break;
        }
        if (data[0] === "touch" && !data[1].endsWith(".txt")) {
          output += `<span class="text-red-400">You can create only .txt files</span>\n`;
          break;
        }
        const file = normalizePath(
          data[1].startsWith("/")
            ? data[1].split("/")
            : dir.concat(data[1].split("/")),
        );
        const content = getFromPath(file);
        if (content !== undefined) {
          output += `<span class="text-red-400">Path already exists</span>\n`;
          break;
        }
        createRecord(file, data[0] === "touch" ? "" : {});
        break;
      }
      case "reboot":
        location.reload();
        break;
      case "notepad":
      case "welcome":
      case "aboutme":
      case "terminal":
      case "minesweeper":
      case "settings":
      case "filemanager":
        openWindow(data[0]);
        break;
      default:
        output += `<span class="text-red-400">Command not found: ${data[0]}</span>\n`;
    }

    form.scrollTo(0, form.scrollHeight);
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (!["ArrowDown", "ArrowUp"].includes(e.code)) return;
    historyIndex = Math.min(
      Math.max(historyIndex + (e.code === "ArrowDown" ? -1 : 1), -1),
      history.length - 1,
    );
    value = historyIndex === -1 ? prompt : history[historyIndex];
  };

  let {
    isOpen = $bindable(),
    onclose,
    onpointerdown,
  }: {
    isOpen: boolean;
    onclose: () => void;
    onpointerdown: () => void;
  } = $props();
</script>

<BaseWindow
  title="Terminal"
  {icon}
  height={500}
  width={600}
  bind:isOpen
  {onclose}
  onpointerdown={() => {
    onpointerdown();
    setTimeout(() => input.focus());
  }}>
  <form
    bind:this={form}
    onsubmit={handleSubmit}
    class="flex h-full flex-col justify-start overflow-auto bg-[#1e1e1e]/95 text-white font-mono px-5 py-4 text-[13px] rounded-b-[10px] space-y-2 scrollbar-hide shadow-inner shadow-black/30 border-t border-gray-700">
    <pre class="whitespace-pre-wrap leading-relaxed text-white">
      {@html output
        .replace(
          /(Command not found: .*)/g,
          '<span class="text-red-400">$1</span>',
        )
        .replace(
          /\b(help|ls|cd|cat|rm|touch|mkdir|clear|reboot|pwd)\b/g,
          '<span class="text-blue-400">$1</span>',
        )
        .replace(/^\/.+$/gm, '<span class="text-gray-400">$&</span>')}
    </pre>

    <input
      bind:this={input}
      onkeydown={handleKeydown}
      type="text"
      class="bg-transparent text-white caret-white outline-none font-mono w-full tracking-wide placeholder-gray-500"
      bind:value
      autocomplete="off"
      spellcheck="false"
      oninput={() => {
        if (!value.startsWith(prompt)) value = prompt;
      }} />
  </form>
</BaseWindow>

<style>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  input::selection {
    background-color: #4b5563;
    color: white;
  }

  input::after {
    content: "";
    display: inline-block;
    width: 8px;
    height: 1.1em;
    margin-left: 4px;
    background: white;
    animation: blink 1s step-start infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  pre span {
    white-space: pre-wrap;
  }
</style>
