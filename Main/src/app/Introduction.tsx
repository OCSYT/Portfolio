import Section from "./Section";

function Introduction() {
    let Element: any =
        Section
            ("About Me",
                ["*Hey there! 👋*",
                    "\n\n",
                    "I'm a software developer in the UK that uses the Unity game engine,",
                    "Node JS, some web development projects in HTML and CSS",
                    "and console applications in python."],
                "text-cyan-500",
                "bg-black backdrop-blur bg-opacity-50 p-10 text-center"
            )
    return Element;
}
export default Introduction;