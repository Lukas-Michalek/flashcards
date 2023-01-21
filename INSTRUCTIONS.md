# **Challenge Project: Flashcards**



## **Tasks**
---

<br>

### **Prerequisites**
<br>

`1.`
To complete this project, you should have completed Codecademy’s Learn React and Learn Redux courses.

`2.`
This app uses uuidv4() function from the uuid package to create unique identifiers for topics/quizzes/cards. Below, you can see an example of how this function is used:

```javascript
import { v4 as uuidv4 } from 'uuid';
 
let uniqueId = uuidv4(); 
 
console.log(uniqueId); // Prints '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
Though not required, if you would like to learn more about this function, check out its documentation.
```

`3.`
This app uses react-router to handle routing between different pages. Since react-router is outside the scope of this project, we’ve written the routing code for you. Though not required, if you’re curious about how it works, you can explore App.js (where the routes for this app are defined), read the react-router docs, or take our Learn React Router course!
<br>

### **Project Requirements**
<br>

`4.`
At a high level, your application will be able to handle the following URL routes, each with their own functionality:

***On the '/topics/new' page:***
 - Users can create topics

<br>

***On the '/topics' page:***
 - Users can view all topics
 - Users can click on an individual topic and be redirected to the page for that topic

<br>

***On the /topics/:topicId page:***

 - Users can view an individual topic and all quizzes for that topic
 - Users can click on a quiz associated with a topic and be redirected to that quiz’s page

<br>

***On the 'quizzes/new' page:***

 - Users can create quizzes that are associated with topics and contain lists of flashcards
 - Users can add and remove card fields in the new quiz form

<br>

***On the '/quizzes' page:***

 - Users can view all quizzes
 - sers can click on an individual quiz and be redirected to that quiz’s page

<br>

***On the '/quizzes/:quizId' page:***

 - Users can view an individual quiz and flip cards over

<br>

`5.`
Before you start writing code, take a moment to review our recommended state structure:

 - Your app will include three slices: one for topics, one for quizzes, and one for cards.
 - Each slice’s state should include an object storing all the topics/quizzes/cards keyed by their id. This will allow you to quickly retrieve an object’s information whenever you need to look it up.
 - Each individual quiz will have a topicId value corresponding to an individual topic in state.
 - Similarly, each topic which will have a quizIds array corresponding to the associated quizzes in state.

All together, your app state will look like this:

```javascript
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
```

**Hint**
```
You might be wondering why, in each slice, we are asking you to include a property with the same name as the slice itself (for example state.topics.topics). This app is relatively small, but you can imagine that in a more complex application you might want to store multiple groupings of topics, quizzes, or cards in one slice in state.

For example, if you allowed users to favorite topics, you might store a favoriteTopics in your topics slice. By storing all of the topics under a named key, rather than deciding that they should comprise the entire slice, you are creating a flexible state structure that can grow as you add functionality to your app.

This is how we recommend you structure your state, but you are free to adjust it if you wish. Just know that the rest of the instructions assume you are using this structure.
```

`6.`
Your first task is to write code to manage the state associated with topics. In the **src/features/topics** directory, create a new file containing a slice that:

 - Is named topics.
 - Has initial state consisting of an object that includes one property, topics, which corresponds to an empty object. This inner topics object will eventually hold all topics keyed by id.
 - Has an addTopic action. You can expect the payload for this action to look like {id: '123456', name: 'name of topic', icon: 'icon url'}. Store these values in the state as a new topic object.
 - Each topic object added to the state should also have a quizIds property, which will correspond to an array containing the ids of each quiz associated with the topic. When a topic is first created, it won’t have any associated quizzes, but you should still create an empty quizIds array so that all topics in the state conform to the same shape.
 - Create a selector that selects the topics object nested within initialState.
 - Export the selector as well as the action creators and reducer that your slice generates.

**Hint**
```
 - Use createSlice to generate your topics slice. Your addTopic action should modify the state.topics object by adding an object representing a single topic to the state.topics object. Remember, we want the state.topics object to be keyed by the topic’s id which you receive in the action’s payload.
 - You can use computed property names to add values to an object using a variable as a key:
```

```javascript
const obj = {
  [key]: value,
}
```
`7.`
Add topics to the app’s store.


**Hint**
```
You’ll need to import the reducer generated by your topics slice in src/app/store.js and add it to the empty object passed to configureStore under the key topics.
```

`8.`
In **src/features/topics/Topics.js**, import the selector defined in your slice and use it to access all the topics in state, and replace the empty object currently assigned to topics with the topics in state.


**Hint**
```
You will need to import useSelector and then call it in conjunction with your selector to access all the topics in state.
```

`9.`
Next, you’ll need to hook the new topic form up to the action creators your slice generates. In **src/components/NewTopicForm.js**, import addTopic and dispatch it from the event handler that runs when the new topic form is submitted.

Verify that your code is working by filling out the form and submitting it. You should be redirected to the /topics page and should see your newly created topic there.


**Hint**
```
 - You will need to import and call the useDispatch() method in order to dispatch actions to the store.
 - You will need to include the topic’s name in the action payload as well as an id property (you should generate a value for this property by calling uuidv4()) and an icon property.
 - The icon variable from the useSelect() hook holds the URL for the icon image selected by the user.
```

`10.`
Great work! Now that you can create topics, your next task is to build out the necessary functionality to add quizzes to your app. This will involve creating two new slices—one for the quizzes themselves and one for the cards that comprise them—and adding an action to your topics slice to associate quizzes with the topic to which they belong. To start, create in the **src/features/quizzes** directory, create a new file containing a slice for quizzes that:

 - Is named 'quizzes'
 - Has initial state consisting of an object that includes one property, quizzes, which corresponds to an empty object. This inner quizzes object will eventually hold all quizzes keyed by id.
 - Has an addQuiz action. This action will receive a payload of the form 
```javascript
{ id: '123', name: 'quiz name', topicId: '456', cardIds: ['1', '2', '3', ...]}.
```
Export the selector as well as the action creators and reducer that your slice generates.

**Hint**
```
 - Use createSlice to generate your quizzes slice.
 - Your addQuiz action should modify the quizzes object in state by adding an object representing a single quiz to the quizzes object.
 - Remember, we want the quizzes object to be keyed by quiz id, so insert your newly created quiz object as the value associated with the id you receive in the action’s payload.
```

`11.`
Next, you should add an action to your topics slice that adds a quiz’s id to the quizIds array of the topic with which the newly quiz is associated. This action action will receive a payload of the form **`{quizId: '123', topicId: '456'}`**. Make sure to export this action creator for use elsewhere in the app.


**Hint**
```
Use the payload’s topicId to find the correct topic in state, and push the payload’s quizId into that topic’s quizIds array.
```

12.
Conceptually, the actions of creating a new quiz and associating it with its topic are a part of a single process. Back in the quiz slice file, write an action creator that returns a thunk that dispatches these two actions one after the other. This new thunk action creator is the one that you will dispatch when a user creates a new quiz.


**Hint**
```javascript
Remember, thunks take the form:

export const thunkActionCreator = (payload) => {
    return (dispatch) => {
      // dispatch multiple actions here
    };
};
```
And your action creator will receive a payload of the form

```javascript
{
  name: 'name of quiz',
  topicId: '123',
  cardIds: ['4', '5', '6'],
  id: '789',
}
```
`13.`
To test your work, you’ll need to connect your action creator to **src/components/NewQuizForm** and make that component work. First, import your topics selector from your topics slice and replace assign a call to that selector to the variable topics (which is currently assigned an empty object).


**Hint**
```
To use your selector you will need to call useSelector with the selector you defined in your topics slice.
```

14.
Next, import the thunk action creator from your quiz slice and dispatch it from the handleSubmit() event handler that fires when the new quiz form is submitted.

 - Remember, that action creator expects to receive a payload of the form { id: '123', name: 'quiz name', topicId: '456', cardIds: ['1', '2', '3', ...]}. You’ll have to generate an id by calling uuidv4. For now, pass the empty cardIds array variable for the cardIds property (you’ll change that in a later task).
 - Test that your action creator works by filling out the new quiz form. After your quiz is created you should be rerouted to the /quizzes page and should see your newly created quiz there.

*Note: If you are doing this project on Codecademy.com, the URL bar may not change (but the user interface should!)*


**Hint**
Your dispatch statement should do something like:

```javascript
dispatch(
    addQuizForTopicId({
      name: '...',
      topicId: '...',
      cardIds: [],
      id: '...',
    })
);
```

`15.`
Lastly, import your selector in **src/features/quizzes/Quizzes.js** and **src/features/quizzes/Quiz.js** and make sure those components are displaying the correct data:

 - The Quizzes component should render a Link for each quiz value in the quizzes slice of state.
 - The Quiz component uses the react-router-dom method useParams() to determine the quizId to render. Therefore, it needs the full set of quizzes to find the appropriate quiz object to render.

**Hint**
```
Use useSelector in conjunction with your selectors to pull the all the quizzes from state.
```

`16.`
Great work! Next, in the **src/features/cards** directory, create a new file containing slice for cards that:

 - Is named 'cards'
 - Has initial state consisting of an object that includes one property, cards, which corresponds to an empty object. This inner cards object will eventually hold all cards keyed by id.
 - Has an addCard action. This action will receive a payload of the form 

```javascript
{ id: '123', front: 'front of card', back: 'back of card'}.
```

**Hint**
```
Use createSlice to generate your cards slice. addCard should insert the payload into the cards object in state as the value associated with the id in the payload.
```

`17.`
Lastly, connect your addCard action creator to the new quiz form. In **src/components/NewQuizForm**, in the event handler that fires when the quiz form is submitted, iterate through the cards in that form’s local state, and for each one:

 - dispatch your addCard action creator. You will have to generate an id for each card using uuidv4.
 - Store the id you create for each card in the cardIds array we’ve provided for you.Remember, your action creator expects to receive a payload of the form { id: '123', front: 'front of card', back: 'back of card'}. You want to collect all the cardIds in an array so that you can pass them to the action creator that generates new quizzes. To use uuidv4 to create an id, call the function like so: uuidv4().

**Hint**

Remember, your action creator expects to receive a payload of the form 
```javascript
{ id: '123', front: 'front of card', back: 'back of card'}. 
```
You want to collect all the cardIds in an array so that you can pass them to the action creator that generates new quizzes. To use uuidv4 to create an id, call the function like so: uuidv4().


`18.`
You previously passed an empty array for cardIds to the action creator that generates a new quiz. Now that you have written code to collect an array of all the cardIds created whenever the new quiz form is submitted, replace the empty array with this array of cardIds.

To test that your code is working, create a new quiz with some cards. Navigate to that quiz from the /quizzes page, and verify that your cards show up. Flip them over by clicking on them to make sure that you’ve correctly captured all of the state belonging to each card.


**Hint**
```
Since you’re already dispatching the action that generates a new quiz with an appropriately structured payload, all you need to do is replace the empty array you previously assigned to cardIds with an array that contains the ids belonging to the cards associated with the quiz that’s being created.
```

`19.`
Now that you can add new cards, you’ll need to display cards on the individual quiz page. The Quiz component renders a list of Card components, so in **src/features/cards/Card.js**, import your cards selector and use it to access all the cards in state.


**Hint**
```
Use useSelector in conjunction with your selector to get all the cards in state. We’ve already written the code that will use the id in props to select the relevant card.
```

<br>

### **Solution**

<br>

`20.`
Great work! Visit our forums to compare your project to our sample solution code. You can also learn how to host your own solution on GitHub so you can share it with other learners! Your solution might look different from ours, and that’s okay! There are multiple ways to solve these projects, and you’ll learn more by seeing others’ code.