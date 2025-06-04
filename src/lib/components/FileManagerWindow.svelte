<script lang="ts">
  import { mdiArrowUpBold } from "@mdi/js";
  import { getContext } from "svelte";
  import type { MouseEventHandler } from "svelte/elements";
  import icon from "../../assets/icons/file-manager.svg";
  import fileIcon from "../../assets/icons/file.svg";
  import folderIcon from "../../assets/icons/folder.svg";
  import github_icon from "../../assets/icons/github_icon.svg";
  import github_white_icon from "../../assets/icons/github-white-icon.svg";
  import linkedin_icon from "../../assets/icons/linkedin_icon.svg";
  import aboutme from "../../assets/icons/aboutme.png";
  import minesweeper from "../../assets/icons/minesweeper.svg";
  import calculator from "../../assets/icons/calculator.svg";
  import notepad from "../../assets/icons/notepad.svg";
  import terminal from "../../assets/icons/terminal.svg";
  import settings from "../../assets/icons/settings.svg";
  import { createRecord, deleteRecord, getFromPath, type Folder } from "../fs";
  import BaseWindow from "./BaseWindow.svelte";
  import Icon from "./Icon.svelte";
  import doc from "../../assets/icons/doc.svg";
  import { settings as theme_settings } from "../settings";
  import { onMount } from "svelte";
  import { normalizePath } from "../fs";

  const openWindow =
    getContext<(type: string, detail?: string[] | null) => void>("openWindow");

  const openFileManager = (event: Event, app_type: string) => {
    event.preventDefault();
    openWindow(app_type);
  };

  onMount(() => {
    if (detail) dir = normalizePath(detail);
  });

  const handleArrowUp = () => {
    dir.pop();
    selectedItem = null;
  };

  const openFile = (file: [string, string | object]) => {
    if (typeof file[1] === "string") {
      if (file[1].includes("webp") || file[1].includes("pdf")) {
        // Imported image — open in new tab
        openWindow("imageviewer", [file[1]]);
      } else if (file[1].startsWith("http")) {
        // External URL — open in new tab
        window.open(file[1], "_blank");
        // Text file — open in notepad
      } else if (file[0].endsWith(".txt")) {
        openWindow("notepad", [...dir, file[0]]);
      } else {
        // Other file types — open in notepad
        openWindow(file[1]);
      }
    } else {
      // It's a folder — navigate into it
      dir = [...dir, file[0]];
    }
    selectedItem = null;
  };

  const handleFileContextMenu = (e: MouseEvent & { target: HTMLElement }) => {
    e.preventDefault();
    if (!e.target.closest(".file")) openContextMenu(e, null);
  };

  const openContextMenu = (e: MouseEvent, file: string | null) =>
    (contextMenu = { x: e.layerX, y: e.layerY, file });

  const createNewFile = () => {
    contextMenu = null;
    const name = prompt("Name of the file:");
    if (!name) return;
    if (!/[0-9a-zA-Z]+/.test(name))
      return alert("Error: non-allowed characters");
    createRecord([...dir, `${name}.txt`], "");
    updateFiles();
  };

  const createNewFolder = () => {
    contextMenu = null;
    const name = prompt("Name of the folder:");
    if (!name) return;
    if (!/[0-9a-zA-Z]+/.test(name))
      return alert("Error: non-allowed characters");
    createRecord([...dir, name], {});
    updateFiles();
  };

  const deleteFile = () => {
    if (!contextMenu?.file) return;
    deleteRecord([...dir, contextMenu.file]);
    updateFiles();
    contextMenu = null;
  };
  const imageMap: Record<string, string> = {
    terminal,
    calculator,
    notepad,
    minesweeper,
    settings,
  };

  const returnLogo = (file: any): string => {
    if (typeof file === "string") {
      if (file.includes("github")) {
        return $theme_settings.theme == "light"
          ? github_icon
          : github_white_icon;
      } else if (file.includes("linkedin")) {
        return linkedin_icon;
      } else if (file.endsWith("pdf")) {
        return doc;
      } else if (file == "aboutme") {
        return aboutme; // Assuming 'aboutme' is a special case
      } else if (file in imageMap) {
        return imageMap[file]; // returns string
      } else if (file.endsWith(".txt")) {
        return fileIcon;
      } else if (file.startsWith("/")) {
        return file; // Assuming it's an image URL
      } else return fileIcon;
    } else return folderIcon;
  };

  const handleWindowClick = (e: MouseEvent & { target: HTMLElement }) =>
    !e.target.closest(".contextmenu") && (contextMenu = null);

  let dir = $state<string[]>([]);
  let selectedItem = $state<string | null>(null);
  let contextMenu = $state<{
    x: number;
    y: number;
    file: string | null;
  } | null>(null);

  let files = $state<[string, string | Folder | Blob][]>([]);

  const updateFiles = () => {
    files = Object.entries(getFromPath(dir));
  };

  $effect(updateFiles);

  let {
    isOpen = $bindable(),
    onclose,
    onpointerdown,
    detail,
  }: {
    isOpen: boolean;
    onclose: () => void;
    onpointerdown: () => void;
    detail: string[] | null | undefined;
  } = $props();

  const appNames = [
    "terminal",
    "calculator",
    "notepad",
    "minesweeper",
    "settings",
  ];
</script>

<svelte:window
  onclick={handleWindowClick as unknown as MouseEventHandler<Window>} />

<BaseWindow
  title="File Manager"
  {icon}
  height={500}
  width={600}
  bind:isOpen
  {onclose}
  {onpointerdown}>
  {#if contextMenu}
    <div
      class="contextmenu absolute grid rounded-lg p-1 bg-white shadow-lg dark:bg-zinc-800"
      style:top="{contextMenu.y}px"
      style:left="{contextMenu.x}px">
      {#if contextMenu.file}
        <button
          class="rounded-lg p-1 text-left hover:bg-zinc-100 dark:hover:bg-zinc-900"
          onclick={deleteFile}>
          Delete
        </button>
      {:else}
        <button
          class="rounded-lg p-1 text-left hover:bg-zinc-100 dark:hover:bg-zinc-900"
          onclick={createNewFolder}>
          New folder
        </button>
        <button
          class="rounded-lg p-1 text-left hover:bg-zinc-100 dark:hover:bg-zinc-900"
          onclick={createNewFile}>
          New file
        </button>
      {/if}
    </div>
  {/if}

  <div class="mb-8 flex gap-4">
    <button
      onclick={handleArrowUp}
      class="rounded-lg bg-zinc-200 p-2 dark:bg-zinc-800">
      <Icon icon={mdiArrowUpBold} size={0} />
    </button>
    <p
      class="flex w-full gap-2 rounded-lg bg-zinc-200 py-2 px-4 dark:bg-zinc-800">
      /{dir.join("/")}
    </p>
  </div>

  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="h-[calc(100%_-_5rem)]"
    oncontextmenu={handleFileContextMenu as unknown as MouseEventHandler<HTMLDivElement>}>
    <div
      class="grid w-full grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] gap-4">
      <!-- Non-app files -->
      {#each files.filter(([name]) => !appNames.includes(name.toLowerCase())) as file}
        <button
          onclick={() => ([selectedItem] = file)}
          ondblclick={() => openFile(file)}
          oncontextmenu={(e) => {
            e.preventDefault();
            openContextMenu(e, file[0]);
          }}
          class:bg-blue-200={selectedItem === file[0]}
          class:dark:bg-blue-900={selectedItem === file[0]}
          class="file flex flex-col items-center justify-center gap-1 rounded-lg p-2">
          <img src={returnLogo(file[1])} alt="" width="50" height="50" />
          <span class="truncate text-center w-full">{file[0]}</span>
        </button>
      {/each}

      <!-- Divider if there are apps -->
      {#if files.some(([name]) => appNames.includes(name.toLowerCase()))}
        <div class="col-span-full h-px bg-gray-300 dark:bg-zinc-700 my-2"></div>
      {/if}

      <!-- App files -->
      {#each files.filter( ([name]) => appNames.includes(name.toLowerCase()), ) as file}
        <button
          onclick={() => ([selectedItem] = file)}
          ondblclick={() => openFile(file)}
          oncontextmenu={(e) => {
            e.preventDefault();
            openContextMenu(e, file[0]);
          }}
          class:bg-blue-200={selectedItem === file[0]}
          class:dark:bg-blue-900={selectedItem === file[0]}
          class="file flex flex-col items-center justify-center gap-1 rounded-lg p-2">
          <img src={returnLogo(file[1])} alt="" width="50" height="50" />
          <span class="truncate text-center w-full">{file[0]}</span>
        </button>
      {/each}
    </div>
  </div>
</BaseWindow>
