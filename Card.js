// StAuth10244: I Endrit Maloku, 000928195 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
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
