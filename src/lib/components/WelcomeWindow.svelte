<script lang="ts">
  import { getContext, onMount } from "svelte";
  import icon from "../../assets/icons/welcome.svg";
  import BaseWindow from "./BaseWindow.svelte";

  const openWindow = getContext<(type: string) => void>("openWindow");

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
  title="Welcome"
  {icon}
  height={500}
  width={600}
  bind:isOpen
  {onclose}
  {onpointerdown}>
  <div class="grid place-items-center h-full">
    <div class="space-y-6 w-full">
      <h1 class="text-6xl grid font-bold">
        <span
          class="bg-linear-to-tl from-indigo-800 dark:from-indigo-600 dark:to-blue-400 to-blue-600 bg-clip-text text-transparent">
          Hi there,
        </span>
        I'm Gurmannat
      </h1>
      <p class="text-2xl">I'm a Full-stack Developer</p>
    </div>
  </div>
</BaseWindow>
