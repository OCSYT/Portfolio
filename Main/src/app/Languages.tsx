import LanguageElement from './LanguageElement';
import Section from './Section';

function ProgrammingLanguages() {
    let Element: any =
      Section
        ("Programming Languages",
          [
            (<div key="GraphTitle"><strong>Language</strong><strong className="fixed right-5">Confidence/Experience</strong></div>),
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

  export default ProgrammingLanguages;