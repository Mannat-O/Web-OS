<script lang="ts">
  import BootOverlay from "./lib/components/BootOverlay.svelte";
  import wallpaper0 from "./assets/wallpapers/0.webp";
  import wallpaper1 from "./assets/wallpapers/1.webp";
  import wallpaper2 from "./assets/wallpapers/2.webp";
  import wallpaper3 from "./assets/wallpapers/3.webp";
  import AboutMeContent from "./lib/components/AboutMeContent.svelte";
  import WelcomeWindow from "./lib/components/WelcomeWindow.svelte";
  import AboutMeWindow from "./lib/components/AboutMeWindow.svelte";

  type WindowData = {
    isOpen: boolean;
    id: string;
    type: "welcome" | "aboutme";

    detail?: string[] | null;
    createdAt: number;
  };

  let windows = $state<WindowData[]>([]);

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
  const wallpaper = wallpaper0;
  console.log(wallpaper);
</script>

<BootOverlay>
  <main
    class="h-screen w-screen select-none bg-cover bg-center bg-no-repeat bg-origin-content text-black dark:text-white"
    style="background-image: url({wallpaper})">
    {#each windows as window (window.id)}
      {@const Component = {
        welcome: WelcomeWindow,
        aboutme: AboutMeWindow,
      }[window.type]}
      <Component
        bind:isOpen={window.isOpen}
        detail={window.detail}
        onclose={() => closeWindow(window.id)}
        onpointerdown={() => focusWindow(window.id)} />
    {/each}
  </main>
</BootOverlay>
