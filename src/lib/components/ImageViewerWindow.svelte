<script lang="ts">
  import BaseWindow from "./BaseWindow.svelte";
  import icon from "../../assets/icons/photo-viewer.svg";
  let {
    isOpen = $bindable(),
    onclose,
    onpointerdown,
    detail = [],
  }: {
    isOpen: boolean;
    onclose: () => void;
    onpointerdown: () => void;
    detail?: string[];
  } = $props();

  const imageUrl = detail?.[0] ?? "";
</script>

<BaseWindow
  title="Image Viewer"
  {icon}
  height={400}
  width={500}
  bind:isOpen
  {onclose}
  {onpointerdown}>
  <div class="h-full w-full flex items-center justify-center">
    <img src={imageUrl} alt="Image" class="max-h-full max-w-full rounded-lg" />
  </div>
</BaseWindow>
