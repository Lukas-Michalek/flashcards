import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { selectTopics } from "../features/topics/topicsSlice";
import { addQuizForTopicId } from "../features/quizzes/quizzesSlice";
import { useDispatch } from "react-redux";
import { addCard } from "../features/cards/cardSlice";


export default function NewQuizForm() {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState("");
  const history = useHistory();
  const topics = useSelector(selectTopics);
  const dispatch = useDispatch();

  


  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }

    //{ id: '123', front: 'front of card', back: 'back of card'}.

    const cardIds = [];
    //******************************************************* */
    //********************************************************
    //TODO => The forEach() method does not return a new array, whereas the map() method returns a new array. 
    //TODO => The map() method is used to transform the elements of an array, whereas the forEach() method is used to loop through the elements of an array.
    //******************************************************* */
    //******************************************************* */


    cards.forEach( (card) => {
        let cardId = uuidv4();
        cardIds.push(cardId);
        dispatch(addCard({ ...card, id:cardId}))
    })

    //TODO => So basically instead of creating new front and back lements, becasue each card has these 2 exactly same, I am using this fact by copying the previous card by ...card and just changing the id key. So each card is the same just with the defferent id which is enough to create a new card

    

    // create the new cards here and add each card's id to cardIds
    // create the new quiz here

    let quizzId = uuidv4();
    
  


    dispatch(addQuizForTopicId(
      { name:name, 
        topicId:topicId, 
        cardIds:cardIds, 
        id: quizzId })
    );  
    
    /*
    The payload expected for dispatch is {
        name: 'name of quiz',
        topicId: '123',
        cardIds: ['4', '5', '6'],
        id: '789',
    }
    */

    history.push(ROUTES.quizzesRoute());
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: "", back: "" }));
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };

  const updateCardState = (index, side, value) => {
    const newCards = cards.slice();
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
    <section>
      <h1>Create a new quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="quiz-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Quiz Title"
        />
        <select
          id="quiz-topic"
          onChange={(e) => setTopicId(e.currentTarget.value)}
          placeholder="Topic"
        >
          <option value="">Topic</option>
          {Object.values(topics).map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        {cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={cards[index].front}
              onChange={(e) =>
                updateCardState(index, "front", e.currentTarget.value)
              }
              placeholder="Front"
            />

            <input
              id={`card-back-${index}`}
              value={cards[index].back}
              onChange={(e) =>
                updateCardState(index, "back", e.currentTarget.value)
              }
              placeholder="Back"
            />

            <button
              onClick={(e) => removeCard(e, index)}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        ))}
        <div className="actions-container">
          <button onClick={addCardInputs}>Add a Card</button>
          <button>Create Quiz</button>
        </div>
      </form>
    </section>
  );
}
