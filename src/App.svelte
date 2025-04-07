<script lang="ts">
  import BootOverlay from "./lib/components/BootOverlay.svelte";
  import wallpaper0 from "./assets/wallpapers/0.webp";
  import wallpaper1 from "./assets/wallpapers/1.webp";
  import wallpaper2 from "./assets/wallpapers/2.webp";
  import wallpaper3 from "./assets/wallpapers/3.webp";
  import AboutMeContent from "./lib/components/AboutMeContent.svelte";

  const wallpaper = wallpaper0;
  console.log(wallpaper);
</script>

<BootOverlay>
  <main
    class="h-screen w-screen select-none bg-cover bg-center bg-no-repeat bg-origin-content text-black dark:text-white"
    style="background-image: url({wallpaper})">
    <AboutMeContent />
  </main>
</BootOverlay>
