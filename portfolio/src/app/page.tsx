export default function Main() {
  return (
    <div id="root">
      <div id="background"></div>
      {/* Header */}
      <div className="bg-black p-10 bg-opacity-75 font-bold text-cyan-500 text-3xl">
        <h1>Portfolio</h1>
      </div>

      <div className="m-2.5">

        {/* Introduction */}
        {Section
          ("About Me",
            ["*Hey there!*",
              "\n",
              "I'm a software developer in the UK that uses the Unity game engine,",
              "Node JS, and some web development projects in HTML and CSS."],
            "text-cyan-500",
            "bg-black bg-opacity-75"
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
            "bg-black bg-opacity-75"
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
          "bg-black bg-opacity-75"
        )}
      </div>
    </div>
  );
}

function Section(Title: string, Content: string[], TitleColor: string, BgColor: string) {

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
      <div>
        <h1 className={`${TitleColor} text-3xl`}>{Title}</h1>
        <br />
        {Content.map((Item, Index) => (
          <p key={Index}>
            {ProcessContent(Item)}
          </p>
        ))}
      </div>
    );
  } else {
    FinalContent = (
      <div>
        {Content.map((Item, Index) => (
          <p key={Index}>
            {ProcessContent(Item)}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className={`p-10 m-10 rounded-lg max-w-screen-md ${BgColor}`}>
      {FinalContent}
    </div>
  );
}


