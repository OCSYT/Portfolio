import Section from "./Section";
import Properties from "./Properties.json";

function Projects() {
    let Element: any = Section
        ("Projects",
            ["*Portfolio - You're Here!*",
                "A portfolio site for some of my projects - Made using React",
                "\n",
                "\n",
                "*Ram Clicker*",
                "A cookie clicker style game that uses Javascript and Flask",
                Properties.PageURL + "/Projects/Ram_Clicker/Ram_Clicker.zip",
                "\n",
                "\n",
                "*Pokedex (Python)*",
                "A project that allows you to find and search for pokemon by type, name, id. Written in python.",
                Properties.PageURL + "/Projects/Pokedex/main.py",
                "\n",
                "\n",
                "\n",
                "\n",
                <h1 className='text-3xl text-red-500'>Personal Projects</h1>,
                "\n",
                "\n",
                "*SlimeTora*",
                "A project that connects HaritoraX full body trackers to the SlimeVR Server.",
                "https://github.com/OCSYT/SlimeTora",
                "\n",
                "\n",
                "*BracketEngine*",
                "A game engine that uses ThreeJS and the CannonJs Physics Engine.",
                "https://github.com/OCSYT/BracketEngine",
                "/images/engine.png",
                "\n",
                "\n",
                "*Voxel*",
                "A recreation of Minecraft's Voxel's generation with Steamworks client host networking made in Unity.",
                "https://github.com/OCSYT/VoxelProject",
                "/images/voxel.png"
            ],
            "text-red-500",
            "bg-black backdrop-blur bg-opacity-50 p-10 text-center"
        )
    return Element;
}

export default Projects;