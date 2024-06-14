export default function Main() {
  return (
    <div id="root">
      <div id="background"></div>
      {/* Header */}
      <div className="backdrop-blur bg-black p-10 bg-opacity-50 font-bold text-cyan-500 text-3xl">
        <h1>Portfolio</h1>
      </div>

      <div className="m-2.5">

        {/* Introduction */}
        {Section
          ("About Me",
            ["*Hey there!*",
              "\n",
              "I'm a software developer in the UK that uses the Unity game engine,",
              "Node JS, some web development projects in HTML and CSS",
              "and console applications in python."],
            "text-cyan-500",
            "bg-black backdrop-blur bg-opacity-50"
          )}

        {Section
          ("Programming Languages",
            [
              (<div><strong>Language</strong><strong className="fixed right-5">Experience</strong></div>),
              "\n\n",
              LanguageElement("Javascript", "Node JS, Browser", 100),
              LanguageElement("C#", "Unity, Console Applications", 100),
              LanguageElement("HTML", "Browser", 100),
              LanguageElement("CSS", "Browser", 100),
              LanguageElement("Python", "Default", 85),
              LanguageElement("Typescript", "Node JS", 60),
              LanguageElement("C++", "Console", 50),
              "\n\n\n\n",
              Section
                ("Libraries / Frameworks",
                  [
                    "*A list of some of the libraries and frameworks i've used*",
                    "\n",
                    "*Javascript:*",
                    "Ws + Socket.io", "Express", "ThreeJS", "Electron",
                    "\n",
                    "*C#:*",
                    "Websocketsharp, Facepunch Transport for Netcode for GameObjects",
                    "\n",
                    "*Typescript:*",
                    "React, Next js"
                  ],
                  "text-purple-500",
                  "bg-transparent"
                )
            ],

            "text-purple-500",
            "bg-black backdrop-blur bg-opacity-50"
          )}

        {/* Projects */}
        {Section
          ("Projects",
            ["*Pokedex*",
              "https://drive.google.com/file/d/1VYL_uxi8Ktz8BOb2-NBto1vEcIAKyHGJ/view?usp=sharing",
              "\n",
              "\n",
              "*SlimeTora*",
              "A project that connects HaritoraX full body trackers to the SlimeVR Server.",
              "https://github.com/OCSYT/SlimeTora",
              "\n",
              "\n",
              "*BracketEngine*",
              "game engine that uses ThreeJS and the CannonJs Physics Engine.",
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
            "bg-black backdrop-blur bg-opacity-50"
          )}


        {/* Contact */}
        {Section("Contact Information",
          ["*Email*: connor.macdonald.791@accesscreative.ac.uk",
            "\n",
            "\n",
            "*Github*: https://github.com/OCSYT",
            "\n",
            "\n",
            "*Phone*: 07986015717"
          ],
          "text-green-500",
          "bg-black backdrop-blur bg-opacity-50"
        )}
      </div>

      <br></br>
    </div>
  );
}

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
        <div style={{ width: "calc(" + Amount / 2 + "% - 5vh)", height: "25px" }} className={"languagebar " + BarColor + " p-[.1vw] truncate fixed right-5 rounded-[2.5rem]"}><p className="relative bottom-0 left-5">{Content}</p></div>
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
                <img key={PartIndex} src={Part} alt="Image" style={{ maxWidth: '100%' }} />
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
              <img key={PartIndex} src={Part} alt="Image" style={{ maxWidth: '100%' }} />
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
      <div className={`p-10 m-border rounded-[2.5rem] max-w-screen-md ${BgColor}`}>
        {FinalContent}
      </div>
      <br></br>
    </div>
  );
}


