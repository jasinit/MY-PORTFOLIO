
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  console.log(
    "%c JASMINE %c a designer who opens devtools. I like you already. ✦ ",
    "background:#e8ff59;color:#080808;font-weight:bold;padding:3px 8px;border-radius:4px;",
    "color:#8b8880;"
  );

  createRoot(document.getElementById("root")!).render(<App />);
