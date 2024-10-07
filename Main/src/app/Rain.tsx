function CreateRain() {
    const RandRange = (minNum: any, maxNum: any) => {
        return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    };

    const CreateDrops = () => {
        const drops = [];
        for (let i = 0; i < 500; i++) {
            const DropLeft = RandRange(0, 1600);
            const DropTop = RandRange(-10000, 10000);
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

export default CreateRain;