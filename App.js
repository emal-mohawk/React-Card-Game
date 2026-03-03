// StAuth10244: I Endrit Maloku, 000928195 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

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
    const [pickedIndex, setPickedIndex] = useState(null);

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
        setPickedIndex(null);
    }

    function reset() {
        setDeck(createDeck());
        setHand([]);
        setPickedIndex(null);
    }

    function togglePick(index) {
        if (pickedIndex === null) {
            setPickedIndex(index);
        } else if (pickedIndex === index) {
            setPickedIndex(null);
        } else {
            const newHand = hand.slice();

            const temp = newHand[pickedIndex];
            newHand[pickedIndex] = newHand[index];
            newHand[index] = temp;

            setHand(newHand);
            setPickedIndex(null);
        }
    }

    function toss() {
        if (pickedIndex === null) return;
        setHand(hand.filter((_, i) => i !== pickedIndex));
        setPickedIndex(null);
    }

    function regroup() {
        const shuffled = hand.slice().sort(function() {
            return Math.random() - 0.5;
        });
        setHand(shuffled);
        setPickedIndex(null);
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
                picked={pickedIndex === index}
                onClick={() => togglePick(index)}
                />
            ))}
        </div>
        </>
    );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);