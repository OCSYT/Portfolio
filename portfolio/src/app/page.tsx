export default function Home() {
  return (
    <div id="root">
      {/* Header */}
      <div className="bg-black p-10 font-bold text-cyan-500 text-10">
        <h1>Portfolio</h1>
      </div>

      <div className="m-2.5">

        {/* Introduction */}
        {Section("Introduction", ["Hi!", 
        "I'm a software developer in the UK that uses the Unity game engine,"
        , "Node JS, and some web development projects in HTML and CSS."])}
      </div>
    </div>
  );
}

function Section(title: string, content: string[]) {

  var FinalContent = null;

  if (title != "") {
    FinalContent = (
      <div>
        <h1 className="text-cyan-500">{title}</h1>
        {content.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    );
  } else {
    FinalContent = (
      <div>
        {content.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    );
  }

  return (
    <div className="p-10">
      {FinalContent}
    </div>
  );
}
