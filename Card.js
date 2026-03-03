function Card({value, suit, picked, onClick}) {
    const red = suit === '♥' || suit === '♦';

    return (
        <div className={`card ${red ? "red" : ""} ${picked ? "picked" : ""}`} onClick={onClick}>
            <div className="corner">{value}{suit}</div>
            <div className="center">{suit}</div>
            <div className="corner bottom">{value}{suit}</div>
        </div>
    );
}

export default Card;