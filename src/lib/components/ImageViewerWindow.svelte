<script lang="ts">
  import BaseWindow from "./BaseWindow.svelte";
  import icon from "../../assets/icons/photo-viewer.svg";
  import doc from "../../assets/icons/doc.svg";
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

{#if imageUrl.endsWith(".pdf")}
  <BaseWindow
    title="PDF Viewer"
    icon={doc}
    height={800}
    width={900}
    bind:isOpen
    {onclose}
    {onpointerdown}>
    <embed
      src={imageUrl}
      type="application/pdf"
      class="max-h-full max-w-full h-full w-full"
      style="width: 100%" />
  </BaseWindow>
{:else}
  <BaseWindow
    title="Image Viewer"
    {icon}
    height={700}
    width={500}
    bind:isOpen
    {onclose}
    {onpointerdown}>
    <img
      src={imageUrl}
      alt={imageUrl}
      class="max-h-full max-w-full rounded-lg" />
  </BaseWindow>
{/if}
