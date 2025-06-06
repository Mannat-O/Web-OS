<script lang="ts">
  import SettingsWindow from "./lib/components/SettingsWindow.svelte";
  import WelcomeWindow from "./lib/components/WelcomeWindow.svelte";
  import AboutMeWindow from "./lib/components/AboutMeWindow.svelte";
  import BootOverlay from "./lib/components/BootOverlay.svelte";
  import CalculatorWindow from "./lib/components/CalculatorWindow.svelte";
  import MinesweeperWindow from "./lib/components/MinesweeperWindow.svelte";
  import fileManagerIcon from "./assets/icons/file-manager.svg";
  import minesweeperIcon from "./assets/icons/minesweeper.svg";
  import calculatorIcon from "./assets/icons/calculator.svg";
  import imageViewerIcon from "./assets/icons/photo-viewer.svg";
  import NotepadWindow from "./lib/components/NotepadWindow.svelte";
  import FileManagerWindow from "./lib/components/FileManagerWindow.svelte";
  import TerminalWindow from "./lib/components/TerminalWindow.svelte";

  import {
    mdiMenu,
    mdiWifi,
    mdiVolumeHigh,
    mdiVolumeOff,
    mdiThemeLightDark,
  } from "@mdi/js";
  import StartMenu from "./lib/components/StartMenu.svelte";
  import Calendar from "./lib/components/Calendar.svelte";
  import { onDestroy, onMount, setContext } from "svelte";
  import settingsIcon from "./assets/icons/settings.svg";
  import terminalIcon from "./assets/icons/terminal.svg";
  import aboutMeIcon from "./assets/icons/about-me.svg";
  import nodepadIcon from "./assets/icons/notepad.svg";
  import welcomeIcon from "./assets/icons/welcome.svg";
  import Icon from "./lib/components/Icon.svelte";
  import { settings } from "./lib/settings";
  import type { MouseEventHandler } from "svelte/elements";
  import wallpaper0 from "./assets/wallpapers/0.webp";
  import wallpaper1 from "./assets/wallpapers/1.webp";
  import wallpaper2 from "./assets/wallpapers/2.webp";
  import wallpaper3 from "./assets/wallpapers/3.webp";
  import ImageViewerWindow from "./lib/components/ImageViewerWindow.svelte";
  import folderIcon from "./assets/icons/folder.svg";

  type WindowData = {
    isOpen: boolean;
    id: string;
    type:
      | "welcome"
      | "aboutme"
      | "settings"
      | "minesweeper"
      | "calculator"
      | "notepad"
      | "filemanager"
      | "terminal"
      | "imageviewer";
    detail?: string[] | null;
    createdAt: number;
  };

  let time = $state(
    new Date().toLocaleTimeString("en-GB", {
      minute: "numeric",
      hour: "numeric",
    }),
  );
  let isCalendarOpen = $state(false);
  let windows = $state<WindowData[]>([]);
  let volumeOn = $state(true);
  let navOn = $state(false);

  const handleClick = (e: MouseEvent & { target: HTMLElement }) => {
    if (!e.target.closest(".calendar")) isCalendarOpen = false;
  };
  const closeWindow = (id: string) => {
    windows = windows.map((w) =>
      w.id === id ? { ...w, isOpen: !w.isOpen } : w,
    );
    setTimeout(() => (windows = windows.filter((w) => w.id !== id)), 500);
  };
  const openWindow = (type: string, detail = null) => {
    windows = [
      ...windows,
      {
        id: crypto.randomUUID(),
        isOpen: true,
        type: type as WindowData["type"],
        detail,
        createdAt: Date.now(),
      },
    ];
  };
  const focusWindow = (id: string) => {
    if (windows.at(-1)?.id === id) return;
    windows = [
      ...windows.filter((w) => w.id !== id),
      windows.find((w) => w.id === id)!,
    ];
  };

  setContext("openWindow", openWindow);

  let interval: ReturnType<typeof setInterval>;
  onMount(() => {
    interval = setInterval(
      () =>
        (time = new Date().toLocaleTimeString("en-GB", {
          minute: "numeric",
          hour: "numeric",
        })),
      60000,
    );
  });

  onDestroy(() => clearInterval(interval));

  const wallpaper = $derived(
    [wallpaper0, wallpaper1, wallpaper2, wallpaper3][$settings.wallpaper],
  );
</script>

<svelte:head>
  {#if wallpaper}
    <link rel="preload" as="image" href={wallpaper} />
    <link rel="preload" as="image" href={wallpaper1} />
  {/if}
</svelte:head>

<BootOverlay>
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->

  <main
    class="h-screen w-screen select-none bg-cover bg-center bg-no-repeat bg-origin-content text-black dark:text-white"
    style:background-image="url({wallpaper})"
    onclick={handleClick as unknown as MouseEventHandler<HTMLElement>}>
    <nav
      class="absolute top-0 z-1 bottom-0 left-0 flex h-screen overflow-y-hidden w-16 starting:-translate-x-16 flex-col items-center gap-2 bg-white shadow-lg delay-1000 transition-transform duration-[1500ms] dark:bg-zinc-900">
      <button
        popovertarget="start-menu"
        class="startmenu rounded-lg p-1 hover:bg-blue-100 active:bg-blue-200 dark:hover:bg-blue-900">
        <Icon icon={mdiMenu} size={3} />
      </button>
      {#each windows.toSorted((a, b) => a.createdAt - b.createdAt) as window (window.id)}
        <button
          class="rounded-lg p-2"
          class:bg-blue-200={window.isOpen}
          class:dark:bg-blue-900={window.isOpen}
          onclick={() =>
            (windows = windows.map((w) =>
              w.id === window.id ? { ...w, isOpen: !w.isOpen } : w,
            ))}>
          <img
            src={{
              welcome: welcomeIcon,
              aboutme: aboutMeIcon,
              terminal: terminalIcon,
              settings: settingsIcon,
              minesweeper: minesweeperIcon,
              filemanager: fileManagerIcon,
              notepad: nodepadIcon,
              calculator: calculatorIcon,
              imageviewer: imageViewerIcon,
            }[window.type]}
            width="40"
            height="40"
            class="h-10 w-10"
            alt="" />
        </button>
      {/each}
      <div class="flex-1"></div>

      <button
        class="rounded-full p-1 text-zinc-800 hover:bg-blue-100 hover:text-black dark:text-zinc-300 dark:hover:bg-blue-900"
        onclick={() => {
          $settings.wallpaper = $settings.theme === "light" ? 1 : 0;
          $settings.theme = $settings.theme === "light" ? "dark" : "light";
        }}>
        <Icon icon={mdiThemeLightDark} size={0} />
      </button>
      <button
        class="rounded-full p-1 text-zinc-800 hover:bg-blue-100 hover:text-black dark:text-zinc-300 dark:hover:bg-blue-900"
        onclick={() => {
          volumeOn = !volumeOn;
        }}>
        <Icon icon={volumeOn ? mdiVolumeHigh : mdiVolumeOff} size={0} />
      </button>
      <button
        class="rounded-full p-1 text-zinc-800 hover:bg-blue-100 hover:text-black dark:text-zinc-300 dark:hover:bg-blue-900">
        <Icon icon={mdiWifi} size={0} />
      </button>
      <button
        onclick={() => (isCalendarOpen = !isCalendarOpen)}
        class="calendar rounded-t-lg p-2 text-center hover:bg-blue-100 dark:hover:bg-blue-900">
        {time}
      </button>
    </nav>
    <button
      ondblclick={() => openWindow("filemanager")}
      class="absolute left-20 top-4 z-10001 flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-blue-200 dark:hover:bg-blue-900">
      <img src={folderIcon} width="48" height="48" class="h-12 w-12" alt="" />
      <span class="text-sm">My Computer</span>
    </button>
    <StartMenu {openWindow} />
    <Calendar bind:isOpen={isCalendarOpen} />
    {#each windows as window (window.id)}
      {@const Component = {
        welcome: WelcomeWindow,
        aboutme: AboutMeWindow,
        settings: SettingsWindow,
        calculator: CalculatorWindow,
        minesweeper: MinesweeperWindow,
        notepad: NotepadWindow,
        filemanager: FileManagerWindow,
        terminal: TerminalWindow,
        imageviewer: ImageViewerWindow,
      }[window.type]}
      <Component
        bind:isOpen={window.isOpen}
        detail={window.detail}
        onclose={() => closeWindow(window.id)}
        onpointerdown={() => focusWindow(window.id)} />
    {/each}
  </main>
</BootOverlay>
