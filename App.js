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