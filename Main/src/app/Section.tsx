import Image from 'next/image';
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

export default Section;