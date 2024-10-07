//RUN USING npm run dev
import CreateRain from './Rain';
import Introduction from './Introduction';
import ProgrammingLanguages from './Languages';
import LibrariesAndFrameworks from './Libraries';
import Projects from "./Projects";
import ContactInfo from './Contact';


export default function Main() {
  return (
    <div id="root">
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


