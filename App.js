const {useState} = React;

const suits = ["♥","♦","♣","♠"];
const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

function createDeck() {
    let id = 0;
    const deck = [];
    for (let s of suits) {
        for (let v of values) {
            deck.push({id: id++, suit: s, value: v});
        }
    }
    return deck;
}

function App() {
    const [deck, setDeck] = useState(createDeck());
    const [hand, setHand] = useState([]);
    const [pickedCardIds, setPickedCardIds] = useState(null);

    function drawCard() {
        if (deck.length === 0) return;
        const index = Math.floor(Math.random() * deck.length);
        const card = deck[index];
        setDeck(deck.filter(c => c.id !== card.id));
        setHand(hand.concat(card));
    }

    function deal(n) {
        const fullDeck = deck.concat(hand);
        let copy = fullDeck.slice();
        let selected = [];

        for (let i = 0; i < n && copy.length > 0; i++) {
            const index = Math.floor(Math.random() * copy.length);
            selected.push(copy.splice(index, 1)[0]);
        }

        setDeck(copy);
        setHand(selected);
        setPickedCardIds(null);
    }

    function reset() {
        setDeck(deck.concat(hand));
        setHand([]);
        setPickedCardIds(null);
    }

    function togglePick(index) {
        if (pickedCardIds === null) {
            setPickedCardIds(index);
        } else if (pickedCardIds === index) {
            setPickedCardIds(null);
        } else {
            const newHand = hand.slice();

            const temp = newHand[pickedCardIds];
            newHand[pickedCardIds] = newHand[index];
            newHand[index] = temp;

            setHand(newHand);
            setPickedCardIds(null);
        }
    }

    function toss() {
        if (pickedCardIds === null) return;
        setHand(hand.filter((_, i) => i !== pickedCardIds));
        setPickedCardIds(null);
    }

    function regroup() {
        const shuffled = hand.slice().sort(function() {
            return Math.random() - 0.5;
        });
        setHand(shuffled);
        setPickedCardIds(null);
    }

    function wildcard() {
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const value = values[Math.floor(Math.random() * values.length)];
        const newCard = {id: Date.now(), suit, value};
        setHand(hand.concat(newCard));
    }

    return (
        <>
        <Deck deck={deck} drawCard={drawCard} />
        <div className="buttons">
            <button onClick={() => deal(5)}>Deal 5</button>
            <button onClick={() => deal(7)}>Deal 7</button>
            <button onClick={reset}>Reset</button>
            <button onClick={toss}>Toss</button>
            <button onClick={regroup}>Regroup</button>
            <button onClick={wildcard}>Wildcard</button>
        </div>

        <div className="hand">
            {hand.map((card, index) => (
                <Card 
                key={card.id}
                value={card.value}
                suit={card.suit}
                picked={pickedCardIds === index}
                onClick={() => togglePick(index)}
                />
            ))}
        </div>
        </>
    );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);