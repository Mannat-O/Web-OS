import cat1 from "../assets/cat1.webp";
import cat2 from "../assets/cat2.webp";
import cat3 from "../assets/cat3.webp";
import readmeText from "../assets/readme.txt?raw";
import resume from "../assets/Gurmannat_Oberoi.pdf";
export type FileContent = string | Blob; // URL covers href links

export type Folder = {
  [key: string]: Folder | FileContent;
};

const filesystem: Folder = {
  AboutMe: "aboutme",
  Github: "https://github.com/Mannat-O",
  Linkedin: "https://www.linkedin.com/in/mannatoberoi55/",
  "Resume.pdf": resume,
  cats: {
    "cleo&oreo.jpg": cat1,
    "oreo.jpg": cat2,
    "oreo2.jpg": cat3,
  },
  Terminal: "terminal",
  Minesweeper: "minesweeper",
  Notepad: "notepad",
  Calculator: "calculator",
  Settings: "settings",
  "ReadMe.txt": readmeText,
};
export const getFromPath = (path: string[]): Folder | string => {
  let folder = filesystem;
  normalizePath(path).forEach((bit) => (folder = folder[bit] as Folder));
  return folder;
};
export const normalizePath = (path: string[]): string[] => {
  const normal: string[] = [];
  path.forEach((bit) => {
    if (!bit || bit === ".") return;
    if (bit === "..") return normal.pop();
    normal.push(bit);
  });
  return normal;
};
export const deleteRecord = (path: string[]) => {
  const name = path.pop()!;
  let folder = filesystem;
  normalizePath(path).forEach((bit) => (folder = folder[bit] as Folder));
  delete folder[name];
};
export const createRecord = (path: string[], data: Folder | string) => {
  const pathCopy = [...path];
  const name = pathCopy.pop()!;
  let folder = filesystem;
  normalizePath(pathCopy).forEach((bit) => (folder = folder[bit] as Folder));
  folder[name] = data;
};
