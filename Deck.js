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