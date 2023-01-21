import { createSlice } from "@reduxjs/toolkit";
import { addQuizIdForTopic } from '../topics/topicsSlice'



export const quizzesSlice = createSlice({
    name:" quizzes",
    initialState: {
        quizzes: {}
    },
    reducers:{
        addQuiz: (state, action) => {
            // Payload is in the form { id: '123', name: 'quiz name', topicId: '456', cardIds: ['1', '2', '3', ...]}.

            const { id } = action.payload;

            //TODO=> The reason why I am taking out extracting id from action.payload is that it is easier to read the code. Also note that while in topicsSlice.js I was sort of creating the whole object was that I was gett only 3 keys:values -> {id: '123456', name: 'name of topic', icon: 'icon url'}, but I needed to create  quizIds while in this case I am getting { id: '123', name: 'quiz name', topicId: '456', cardIds: ['1', '2', '3', ...]} but I do not need to create new value. So the principe is the same

            state.quizzes[id] = action.payload 
        }    
    }
    
});

//TODO=> action creator that returns a thunk that dispatches addQuiz and addQuizIdForTopic(imported from topicsSlice) one after another (so ther is no conflict). This new thunk action creator will dispatch when a user creates a new quiz.

/*
The payload is {
    name: 'name of quiz',
    topicId: '123',
    cardIds: ['4', '5', '6'],
    id: '789',
}
*/


export const addQuizForTopicId = (quiz) => {
    const { topicId, id} = quiz;   // TODO=> Becasue these 2 are needed for payload to addQuizIdForTopic and again, to make it easier I will take them out

    console.log(`QUIZ -> topicID is: ${topicId}`)
    console.log(`QUIZ -> id(quizID later)is: ${id}`)

    return (dispatch) => {
        dispatch(quizzesSlice.actions.addQuiz(quiz)) // TODO=> Note that I am not using simply dispatch(addQuiz(quiz)) even though it is exported. The reason is that I am working in SAME FILE AS THE THUNK IS!
        
        dispatch(addQuizIdForTopic({topicId:topicId, id:id})) // Remember that addQuizIdForTopic needs payload in this form => {quizId: '123', topicId: '456'}

    }
};

export default quizzesSlice.reducer;
export const { addQuiz } = quizzesSlice.actions;
export const selectQuizzes = (state) => state.quizzes.quizzes;

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