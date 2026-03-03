// StAuth10244: I Endrit Maloku, 000928195 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
function Deck({deck, drawCard}) {
    if (deck.length === 0) {
        return (
            <div className="deck empty">No Cards Remaining</div>
        );
    }

    return (
        <div className="deck" onClick={drawCard}>Deck ({deck.length} cards left)</div>
    );
}
