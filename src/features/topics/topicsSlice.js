import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const topicsSlice = createSlice({
    name: 'topics',
    initialState: {
        topics: {}
    },
    reducers: {
        addTopic: (state, action) => {  // payload for this action looks like {id: '123456', name: 'name of topic', icon: 'icon url'}.

            //TODO => In order to add an object into the main state in the exact way that can be sen below I need:

            //todo => 1. Extract all the variables from action.payload so it will be easier to read the code.(note these are keys in the action.payload object)
            
            const { id, name, icon} = action.payload;

            //todo => Now I want to add new topic object according to exact key id that was given by its creation
            
            state.topics[id] = {
                id: id,
                name: name,
                icon: icon,
                quizIds: []

                
            }

            console.log(`add topic ->  id: ${id}`)
            console.log(`add topic ->  name: ${name}`)
            console.log(`add topic ->  icon: ${icon}`)
            

        },

        //adds a quiz’s id to the quizIds array of the topic with which the newly quiz is associated. 
        addQuizIdForTopic: (state, action) => {

            
            // the payload received is in the form of: {quizId: '123', topicId: '456'}

            const { topicId, quizId} = action.payload;

            console.log(`topicID is: ${topicId}`)
            console.log(`QuizId is: ${quizId}`)
            console.log(state.topics[topicId])

            state.topics[topicId].quizIds.push(quizId);

            //TODO=> Note that state already points to the first level of topics and therefore this would not work state.topics.topics.... The second thing is using of topics[topicId] instead of topics.topicId is because topicId changes and it contains string -> '123' instead of just key such as topics and therefore bracket notation must be used

            

        }

        
    }
})


// Selector that selects the topics object nested within initialState.

export const selectTopics = (state) => state.topics.topics;

//TODO => The reason that to access all topics is state.topics.topics and not state.topics as above is that this is outside createSlice Reducer (topicsSlice) and thus initialState is not set!!!

export const { addTopic, addQuizIdForTopic } = topicsSlice.actions
export default topicsSlice.reducer;


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