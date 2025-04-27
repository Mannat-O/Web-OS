<script lang="ts">
  import { mdiGithub, mdiFileDocument, mdiEmail } from "@mdi/js";
  import avatar from "../../assets/avatar.webp";
  import blogIcon from "../../assets/cat.webp";
  import Icon from "./Icon.svelte";
  import { mdiLinkedin } from "@mdi/js";
  import FileManagerWindow from "./FileManagerWindow.svelte";
  import { getContext } from "svelte";

  const openWindow =
    getContext<(type: string, detail?: string[] | null) => void>("openWindow");

  let copy_message = $state(false);

  const openFileManager = (event: Event) => {
    event.preventDefault();
    openWindow("filemanager");
  };

  const copiedPopup = (event: Event) => {
    event.preventDefault();
    const email = "oberoi.g55@gmail.com";

    navigator.clipboard
      .writeText(email)
      .then(() => {
        const copiedAlert = document.createElement("div");
        copiedAlert.textContent = "Email copied to clipboard!";
        copiedAlert.style.cssText = `
          position: fixed;
          top: 15%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 1rem 2rem;
          background-color: #333;
          color: white;
          border-radius: 8px;
          z-index: 9999;
        `;
        document.body.appendChild(copiedAlert);
        setTimeout(() => {
          copiedAlert.remove();
        }, 1500);
      })
      .catch((err) => alert("Failed to copy email"));
  };
</script>

<div class="mx-auto flex max-w-lg flex-col gap-4">
  <h1 class="text-4xl font-bold mt-8 text-center mb-4">
    Hey, I'm Gurmannat! 👋
  </h1>
  <div
    class="gap-4 flex-wrap grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))]">
    <a
      target="_blank"
      rel="noopener noreferrer"
      class="rounded-3xl hover:shadow-xl bg-white border-4 border-black hover:bg-black hover:-translate-y-1 translate-y-0 duration-500 hover:text-white transition-all group text-black shadow-lg aspect-square flex flex-col text-lg justify-center items-center"
      href="https://github.com/Mannat-O">
      <div
        class="group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-500">
        <Icon icon={mdiGithub} size={4} />
      </div>
      Mannat-O
    </a>
    <!-- svelte-ignore a11y_img_redundant_alt -->
    <img
      src={avatar}
      class="rounded-3xl hover:shadow-xl border-4 border-black shadow-lg aspect-square hover:-translate-y-1 translate-y-0 duration-500"
      alt="My profile picture" />
    <a
      target="_blank"
      rel="noopener noreferrer"
      class="rounded-3xl hover:shadow-xl bg-[#0088CC] border-4 border-[#0088CC] hover:bg-white hover:text-[#0088CC] duration-500 group transition-all hover:-translate-y-1 translate-y-0 text-white shadow-lg aspect-square flex flex-col text-lg justify-center items-center"
      href="https://www.linkedin.com/in/mannatoberoi55/">
      <div
        class="group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-500">
        <Icon icon={mdiLinkedin} size={4} />
      </div>
      @G_Oberoi
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      class="rounded-3xl hover:shadow-xl bg-black text-white border-4 border-neutral-900 hover:bg-white hover:text-neutral-900 duration-500 group transition-all hover:-translate-y-1 translate-y-0 shadow-lg aspect-square flex flex-col text-lg justify-center items-center gap-2"
      href=""
      onclick={openFileManager}>
      <img
        width="auto"
        height="100"
        src={blogIcon}
        class="w-25 rounded-xl group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-500"
        alt="Pepe petting a cat" />
      My Cats
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      class="rounded-3xl hover:shadow-xl bg-white border-4 border-[#0085ff] hover:bg-[#0085ff] hover:-translate-y-1 translate-y-0 duration-500 hover:text-white transition-all group text-[#0085ff] shadow-lg aspect-square flex flex-col text-lg justify-center items-center"
      href=""
      onclick={copiedPopup}>
      <div
        class="group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-500">
        <Icon icon={mdiEmail} size={4} />
      </div>
      Email
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      class="rounded-3xl hover:shadow-xl bg-indigo-800 border-4 border-indigo-800 hover:bg-white hover:text-indigo-800 duration-500 group transition-all hover:-translate-y-1 translate-y-0 text-white shadow-lg aspect-square flex flex-col text-lg justify-center items-center"
      href="https://gurmannat-resume.tiiny.site/">
      <div
        class="group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-500">
        <Icon icon={mdiFileDocument} size={4} />
      </div>
      My Resume
    </a>
  </div>
</div>
