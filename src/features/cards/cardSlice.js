import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
    name: "cards",
    initialState: {
        cards: {}
    },
    reducers:{
        // Paylod received { id: '123', front: 'front of card', back: 'back of card'}.
        addCard: (state, action) => {

          const {id} = action.payload;

            state.cards[id] = (action.payload);

        }
    }
})

export default cardSlice.reducer;
export const { addCard } = cardSlice.actions;
export const selectCards = (state) => state.cards.cards;


// I want the main state to look like sthis:
/*
{
  topics: {
    topics: {
      '123': {
        id: '123',
        name: 'example topic',
        icon: 'icon url',
        quizIds: ['456']
      }
    }
  },
  quizzes: {
    quizzes: {
      '456': {
        id: '456',
        topicId: '123',
        name: 'quiz for example topic',
        cardIds: ['789', '101', '102']
      }
    }
  },
  cards: {
    cards: {
      '789': {
        id: '789',
        front: 'front text',
        back: 'back text'
      },
      '101': {
        id: '101',
        front: 'front text',
        back: 'back text'
      },
      '102': {
        id: '102',
        front: 'front text',
        back: 'back text'
      },
    }
  }
}
*/