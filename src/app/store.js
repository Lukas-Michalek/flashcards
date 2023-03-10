import { configureStore } from "@reduxjs/toolkit";
import topicsReducer from '../features/topics/topicsSlice';
import quizzesReducer from '../features/quizzes/quizzesSlice';
import cardReducer from '../features/cards/cardSlice'

export default configureStore({
  reducer: {
      topics: topicsReducer,
      quizzes: quizzesReducer,
      cards: cardReducer
  },
});

//TODO=> The reason I can use topicsReducer instead of topicsSlice as it is called in that file is that I am EXPORTING this reducer through export default topicsSlice.reducer; and therefore It can be imported as such.
