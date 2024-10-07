import exp from "constants";
import Section from "./Section";

function LibrariesAndFrameworks() {
    let Element: any =
      Section
        ("Libraries / Frameworks",
          [
            "*A list of some of the libraries and frameworks i've used*",
            "\n",
            "\n",
            "*Javascript:*",
            "- Ws",
            "- Socket.io",
            "- Express",
            "- ThreeJS",
            "- Electron",
            "\n",
            "\n",
            "*C#:*",
            "- Websocketsharp",
            "- Facepunch Transport for Netcode for GameObjects",
            "\n",
            "\n",
            "*Python:*",
            "- Pandas",
            "- Matplotlib",
            "- Tkinter",
            "\n",
            "\n",
            "*Typescript:*",
            "- React",
            "- Next JS",
            "\n",
            "\n",
            "*C++:*",
            "- OpenGL",
            "\n",
            "\n",
            "*Non Language Specific:*",
            "- Tailwind",
          ],
          "text-purple-500",
          "bg-black backdrop-blur bg-opacity-50 p-10"
        )
    return Element;
  }

  export default LibrariesAndFrameworks;