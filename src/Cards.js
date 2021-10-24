import { BASE_URL } from "./constants";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Card";

const Cards = () => {
  const [deckId, setDeckId] = useState(null);
  const [cardsDrawn, setCardsDrawn] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getShuffledDeck() {
      const response = await axios.get(`${BASE_URL}/new/shuffle/`);
      setDeckId(response.data.deck_id);
    }
    getShuffledDeck();
  }, []);

  useEffect(() => {
    async function drawOneCard() {
      const response = await axios.get(`${BASE_URL}${deckId}/draw/`);
      //   sample response:
      //  {
      //   "success": true,
      //   "deck_id": "kmu8f320cvc8",
      //   "cards": [
      //     {
      //       "code": "KC",
      //       "image": "https://deckofcardsapi.com/static/img/KC.png",
      //       "images": {
      //         "svg": "https://deckofcardsapi.com/static/img/KC.svg",
      //         "png": "https://deckofcardsapi.com/static/img/KC.png"
      //       },
      //       "value": "KING",
      //       "suit": "CLUBS"
      //     }
      //   ],
      //   "remaining": 49
      // }

      if (response.data.remaining === 0) {
        throw new Error("no cards remaining!");
      }
      const card = response.data.cards[0];
      setCardsDrawn((cardsDrawn) => [
        ...cardsDrawn,
        {
          id: card.code,
          image: card.image,
          name: `${card.value} of ${card.suit}`,
        },
      ]);
    }
    drawOneCard();
  }, [count, deckId]);

  console.log(deckId, cardsDrawn);
  return (
    <div className="Deck">
      <div>
        <button
          className="Deck-gimme "
          onClick={() => setCount((count) => count + 1)}
          style={{ display: "block" }}
        >
          Draw a Card
        </button>
      </div>
      <div className="Deck-cardarea">
        {cardsDrawn.map((c) => (
          <Card key={c.id} name={c.name} image={c.image} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
