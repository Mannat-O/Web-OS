<script lang="ts">
  import icon from "../../assets/icons/about-me.svg";
  import AboutMeContent from "./AboutMeContent.svelte";
  import { getContext } from "svelte";
  import BaseWindow from "./BaseWindow.svelte";

  let {
    isOpen = $bindable(),
    onpointerdown,
    onclose,
  }: {
    isOpen: boolean;
    onpointerdown: () => void;
    onclose: () => void;
  } = $props();

  const openWindow =
    getContext<(type: string, detail?: string[] | null) => void>("openWindow");
</script>

<BaseWindow
  title="About Me"
  {icon}
  height={565}
  width={600}
  bind:isOpen
  {onclose}
  {onpointerdown}>
  <AboutMeContent />
</BaseWindow>
