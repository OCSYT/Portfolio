import Section from "./Section";

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

export default LanguageElement;