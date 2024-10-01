//RUN USING npm run dev
import Image from 'next/image';
import { relative } from 'path';
import React, { useState, useEffect } from "react";
const PageURL = "http://localhost:3000"

function LanguageElement(Name: string, Content: string, Amount: number) {
  var BarColor: string = "bg-black";
  if (Amount > 90) {
    BarColor = "bg-cyan-500";
  }
  else if (Amount > 75) {
    BarColor = "bg-green-500";
  }
  else if (Amount > 50) {
    BarColor = "bg-yellow-500";
  }
  else if (Amount >= 0) {
    BarColor = "bg-red-500";
  }

  return (
    <div className="w-full h-full">
      <strong className="inline-block">{Name} &nbsp;&nbsp;&nbsp;</strong>
      <div className="absolute mr-5 inline-block w-9/12">
        <div style={{ width: "calc(" + Amount / 2 + "% - 2vh)", height: "25px" }} className={"languagebar " + BarColor + " p-[.1vw] truncate fixed right-5 rounded-[2.5rem]"}><p className="relative bottom-0 left-5">{Content}</p></div>
      </div>
      <br /><br />
    </div>
  );
}

function Section(Title: string, Content: any[], TitleColor: string, BgColor: string) {

  const ProcessContent = (Text: string) => {
    return Text.split('\n').map((Line, LineIndex) => (
      <span key={LineIndex}>
        {Line.split(/(\*.*?\*|https?:\/\/\S+)/).map((Part, PartIndex) => {
          if (Part.startsWith('*') && Part.endsWith('*')) {
            return (
              <strong key={PartIndex}>
                {Part.slice(1, -1)}
              </strong>
            );
          } else if (Part.startsWith('http')) {
            if (/\.(png|jpg|jpeg|gif)$/i.test(Part)) {
              return (
                <Image key={PartIndex} src={Part} alt="Image" layout="responsive" width={700} height={475} />
              );
            } else {
              return (
                <a key={PartIndex} href={Part} target="_blank" rel="noopener noreferrer">
                  {Part}
                </a>
              );
            }
          } else if (/\.(png|jpg|jpeg|gif)$/i.test(Part)) {
            return (
              <Image key={PartIndex} src={Part} alt="Image" layout="responsive" width={700} height={475} />
            );
          } else {
            return Part;
          }
        })}
        {LineIndex < Text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  let FinalContent;

  if (Title !== "") {
    FinalContent = (
      <div className="w-full">
        <h1 className={`${TitleColor} text-3xl`}>{Title}</h1>
        <br />
        {Content.map((Item, Index) => (
          <div key={Index}>
            {typeof Item === 'string' ? ProcessContent(Item) : Item}
          </div>
        ))}
      </div>
    );
  } else {
    FinalContent = (
      <div>
        {Content.map((Item, Index) => (
          <div className="w-full" key={Index}>
            {typeof Item === 'string' ? ProcessContent(Item) : Item}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className={`m-border rounded-[2.5rem] content-container ${BgColor}`}>
        {FinalContent}
      </div>
      <br></br>
    </div>
  );
}

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

function ProgrammingLanguages() {
  let Element: any =
    Section
      ("Programming Languages",
        [
          (<div key="GraphTitle"><strong>Language</strong><strong className="fixed right-5">Experience</strong></div>),
          "\n\n",
          LanguageElement("Javascript", "Node JS, Browser", 100),
          LanguageElement("Typescript", "Node JS", 100),
          LanguageElement("C#", "Unity, Console", 100),
          LanguageElement("Python", "Console", 100),
          LanguageElement("HTML", "Browser", 90),
          LanguageElement("CSS", "Browser", 75),
          LanguageElement("C++", "Console", 50),
          "\n\n\n\n"
        ],
        "text-purple-500",
        "bg-black backdrop-blur bg-opacity-50 p-10"
      )
  return Element;
}
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

function Projects() {
  let Element: any = Section
    ("Projects",
      ["*Portfolio - You're Here!*",
        "A portfolio site for some of my projects - Made using React",
        "\n",
        "\n",
        "*Ram Clicker*",
        "A cookie clicker style game that uses Javascript and Flask",
        PageURL + "/Projects/Ram_Clicker/Ram_Clicker.zip",
        "\n",
        "\n",
        "*Pokedex (Python)*",
        "A project that allows you to find and search for pokemon by type, name, id. Written in python.",
        PageURL + "/Projects/Pokedex/main.py",
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
        "*VoxelProject*",
        "A recreation of Minecraft's Voxel's generation with Steamworks client host networking made in Unity.",
        "https://github.com/OCSYT/VoxelProject",
        "/images/voxel.png"
      ],
      "text-red-500",
      "bg-black backdrop-blur bg-opacity-50 p-10 text-center"
    )
  return Element;
}

function ContactInfo() {
  let Element: any =
    Section("Contact Information",
      ["*Email*: connor.macdonald.791@accesscreative.ac.uk",
        "\n",
        "\n",
        "*Github*: https://github.com/OCSYT",
      ],
      "text-green-500",
      "bg-black backdrop-blur bg-opacity-50 p-10 text-center"
    )
  return Element;
}



function CreateRain() {
  const RandRange = (minNum: any, maxNum: any) => {
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  };

  const CreateDrops = () => {
    const drops = [];
    for (let i = 0; i < 100; i++) {
      const DropLeft = RandRange(0, 1600);
      const DropTop = RandRange(-1000, 1400);
      drops.push(
        <div
          key={i}
          style={{ left: DropLeft, top: DropTop, position: 'absolute' }}
          className="drop"
        />
      );
    }
    return drops;
  };

  return (
    <div className="rain rain fixed w-full h-full pointer-events-none overflow-hidden">
      {CreateDrops()}
    </div>
  );
}


export default function Main() {
  return (
    <div id="root">
      <div id="background" />
      <CreateRain />
      <div className="m-0 p-0 w-full flex flex-col min-h-screen justify-center items-center container">
        {/* Header */}
        <div className="bg-transparent p-10 font-bold text-cyan-500 text-3xl mb-10 top-0 z-10 text-center">
          <h1>Connor Macdonald</h1>
        </div>
        <Introduction></Introduction>
        <ProgrammingLanguages></ProgrammingLanguages>
        <LibrariesAndFrameworks></LibrariesAndFrameworks>
        <Projects></Projects>
        <ContactInfo></ContactInfo>
      </div>
    </div>
  );
}


