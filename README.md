# Advanced In-Browser Operating System Simulator

A highly interactive, browser-based operating system environment built with Svelte, TypeScript, and TailwindCSS. Features include a dynamic desktop, recursive virtual filesystem, Unix-like terminal emulator, and modular applications—all running client-side with persistent state.

---

## Features

- **Interactive Desktop UI**  
  Draggable, resizable windows with z-index stacking, window tiling, and multitasking support.

- **Virtual Filesystem**  
  Recursive, in-memory file and folder management with hierarchical navigation, CRUD operations, and persistent storage via browser Local Storage.

- **Terminal Emulator**  
  Advanced command-line interface supporting simulated Unix-like commands, command parsing, stateful execution, and full filesystem integration.

- **Modular Applications**

  - **Minesweeper**: Classic game implementation with stateful logic.
  - **Image Viewer**: Browse and view images stored in the virtual filesystem.
  - **Notepad**: Persistent text editor with real-time saving and file management.

- **Persistent State**  
  All file and application state is stored client-side, allowing full OS simulation with no backend required.

- **Modern Tech Stack**  
  Built with Svelte 5, TypeScript, TailwindCSS, and Vite for fast, scalable development and optimized client performance.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (or `npm`/`yarn`)

### Installation

```bash
pnpm install
# or
npm install
```

### Development

```bash
pnpm dev
# or
npm run dev
```

### Build

```bash
pnpm build
# or
npm run build
```

---

## Project Structure

```
src/
│
├── main.ts                # Svelte app entry point
├── App.svelte             # Root component
├── lib/
│   ├── fs.ts              # In-memory filesystem logic
│   ├── settings.ts        # System settings and state
│   └── components/        # Desktop and application components
└── app.css                # Global styles (Tailwind)
```

---

## Technologies Used

- [Svelte 5](https://svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [@mdi/js](https://github.com/Templarian/MaterialDesign-JS) for iconography
