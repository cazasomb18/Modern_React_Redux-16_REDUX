////////////////////////////////////////////////////////////////////////////////////////////////////
//ON WE GO TO REDUX!!!!!!

	//What is Redux?
		//State management library
			//Rather than maintaining state we will extract it to the redux library
		//Makes creating complex applications easier
		//Not required to create a React app!
			//In many cases it will make your life easier.
		//Not explicitly designed to work with React!
			//Not created to solve react specific problems

	//Challenging to learn when you first start
		//What is this crazy terminology?  Why are we doing this?
	//Eventually you start to understand the terminology and design flow
		//Once you hit this point ^^^ the difficulty drops (plummets)



////////////////////////////////////////////////////////////////////////////////////////////////////
//Redux by Analogy
	//Analogy to help you understand Redux
		//-->Write some code in Codepen with Redux only
			//--> Work on a React App
				//--> Understand how to integrate React with Redux

	//Redux Cycle:
		//Action Creator --> Action --> dispatch --> Reducers --> State

	//Analogy to help you understand Redux:
		//Let's Build an Insurance Company!
			//policy: Customer holds a 'policy', if bad stuff happens to them we pay them
			//claim: Customer had something bad happen to them, we need to pay them

		//Insurance Co:
			//Claims History Dept: will store list of every claim every made at this company
			//Policies Dept: Stores a list of who has a policy with our insurance company
				//probably only dept that cares about new customer's form.
			//Accounting Dept: Stores a big bag of cash, we pay people from this, responsible for paying claims

		//What happens when we get a new customer?
			//Customer wants new policy, fills out form that says they want a policy
			//--> customer has to take form to a 'form receiver'
			//--> 'receiver' makes copies of the form and hands them off to the different departments




				//--> Claims History: probably doesn't care about form (still recieves form)



////////////////////////////////////////////////////////////////////////////////////////////////////
//A bit More Analogy
	//POLICIES DEPARTMENT:
	//What happens when a form is taken to the policies dept?
		//policy dept would take form and add them to that list ^^^
			//policies dept maintains a list of all policy holders internally

		//Let's say there's MANAGEMENT who's always asking, "HEY , TELL ME A LIST OF POLICY HOLDERS RIGHT NOW!"
			//Maybe they need the data to collect metrics 
		// Management is tired of walking over there every time there's a new policy and knocking on the door
			//Instead of an internal list, policy dept will store that list of policies in a central
			//repository of company data that is stored outside of their dept.
				//Now management can easily access that list, claims history, accounting info
					//However, now the policies dept will get a new form for a new policy,
						//--> they will need to update the policies list
					//Everytime the 'form receiver' receives a new policy:
						//they hand it in to the policy dept along with list of current policies
						//go the central respository
					//Policies dept updates their list and passes it to the respository for update



/////////////////////////////////////////////////////////////////////////////////////////////////////
//Finishing the analogy
	//Form: customer brings it to form receiver --> receiver makes copy and hands to each dept along
	//with each department's slice of data
		//Let's imagine the form has two different parts:
			//Form:
				//Type: 'claim', (purpose of form)
				//Payload: Name: 'Alexa', Claim amount: $500 (customer's info about what they're trying to do)

		//Our company would need 3 types of forms:
			//1 - Create Policy Form: Name: 'Alexa', Cash: $20
			//2 - Create Claim Form: Name: 'Alexa', Claim amt: $500
			//3 - Delete Policy Form: Name: 'Alexa'

	//THE CLAIMS HISTORY DEPARTMENT:
		//Form reciever, gets form from customer (purpose of form: create new claim)
		//Receiver hands form to claims history dept
			//receiver also hands off list of all different claims created previously
				//REMEMBER: idea is that we want all data centralized in outside repository
					//only when dept is given a form will they be given their data set to update
						//--> update entire claims history list
						//claims dept: looks as form type decides whether or not it's trying to create a claim
							//if not, chances are they don't care about the form
								//--> returns unchanged list of claims (since form isn't relevant)
									//--> list goes back to repository
							//If claims department decides form is related to a new claim:
								//claims hist dept pulls 'payload' out of the form, adds to list of claims
									//and dumps new list in repository

	//THE ACCOUNTING DEPARTMENT:
		//'receiver' takes form, w/ company money bag ($100) to accounting Department
			//Acct dept decides whether the form is a claim
				//if yes --> pulls payload part off form (how much money customer wants)
					//--> takes $20 from company money bag
						//--> takes the rest of the money ($80) and returns to central respository
				//Acct dept also cares about forms of type: create policy
					//if they get new create form 
						//--> takes money, puts into company money bag
					//If the form is not a create or claim form
						//they money is returned to central repository

	//THE POLICIES DEPARTMENT:
		//'receiver' takes new policy form to policies dept and list of all current policies
			//policies dept takes form and decides "is this trying to create or end policy?"
				//If no --> will dump out original policies list completely unchanges
				//If trying to end policy --> will remove name from list
				//If trying to start policy --> will add new name to list
					//New list goes to central repository

		//FLOW:
			//Customer drops off form
				//Form has type and payload
					//Form reciever makes copy of form and hands off to each dept along with their slice of data
						//Each dept decides whether or not they need to process the form
							//if so --> update to their data and returns it to central company data repository

		//Next we'll tell you how this precisely relates to React



/////////////////////////////////////////////////////////////////////////////////////////////////////
//Mapping the Analogy to Redux
	//								REDUX CYCLE
	//Action Creator 	> Action 	> Dispatch 			> Reducers 		> State

	//Customer			> Form  	> Form reciever 	> Departments 	> Compiled Department Data
	//								INSURANCE COMPANY

	//Action Creator: function that will returns plain JS object

	//Action === JS object, purpose: describes some change we may want to make inside our data
		//Payload prop: describes some context around the change we want to make

	//Dispatch Function: takes in an action, makes copies of that object and passes to different places in App

	//Reducers: a function that is responsible for taking in an action and some existing data,
		//will process that action, and return it so it can be centralized in some other location

	//State: receives data that has been processed by Reducers
		//In this way our react app doesn't have to go around asking for data, all centralized in one place!!

		//next - we'll do some codepen stuff to model out our insurance company, will understand purpose 
		//of each one in the flow!



/////////////////////////////////////////////////////////////////////////////////////////////////////
//Modeling with Redux
	//We will start writing our some code to model our insurance company step by step using Redux!
		//We'll do this in codepen.io

		//We'll create:
			//1 - ACTION CREATOR: function that returns a plain JS object
			//2 - ACTION: js Object, like the form:
				//type: describes purpose of form 
				//payload: provides context on exactly what form is doing

			//We'll make an ACTION CREATOR for each type of ACTION
				//(ACTION CREATOR): Creator for Policy --> creates policy  (ACTION)
				//(ACTION CREATOR): Creator for Claim --> creates claim (ACTION)
				//(ACTION CREATOR): Creator for Delete Policy --> deleted policy (ACTION)

			//Action Creators: 
				const createPolicy = (name, amount) => {
				  return {
				      type: 'CREATE_POLICY',
				      payload: {
				        name: name,
				        amount: amount
				    }
				  }
				};

				const deletePolicy = (name) => {
				  return {
				    type: 'DELETE_POLICY',
				    payload: {
				      name: name,
				    }
				  }
				};

				const createClaim = (name, amountofMoneyToCollect) => {
				  return {
				    action: 'CREATE_CLAIM',
				    payload: {
				      name: name,
				      amountofMoneyToCollect: amountofMoneyToCollect
				    }
				  }
				};
				//almonst every single ACTION CREATOR will look almost identical to these ^^^
					//code isn't syntactically complicated, the terminology and purposes are hard

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Creating Reducers

	//We are now going to skip over DISPATCH
		//part of redux lib, don't have to  manually write these out

	//REDUCERS: We're going to write some functions that will model out each department
		//3 total: claims dept, accounting dept, policy dept
		//Each reducer will be called with an ACTION (form)
			//--> will inspect ACTION and reduce whether or not to modify data based upon ACTION
				//*** remember: we will move our data to central repository
					//only  when we have a form to pass to a dept will we take that dept's slice
					//of data and pass it to that department

					/*syntax*/ return [...oldListOfClaims, action.payload]
						// "..." --> take all records inside of oldListOfClaims and add them to a new []
					//it works like this:
					const numbers = [1,2,3];
					[...numbers, 4];
					//4 is added as a value within the existing array
					[1, 2, 3, 4]
					//Now new array === [1,2,3,4] (abbreviated syntax to join the two arrays together)
						//like the .push() HOWEVER, push MODIFIES EXISTING ARRAY
						//"..." --> ON THE OTHER HAND CREATES A NEW ARRAY WITH ORIGINAL AND NEW VALUE

					//this is highly important because ALMOST ALWAYS we are going to create new data and
					//not modify the original data!!!

		//REDUCERS:
			const claimsHistory = (oldListofClaims, action) => {
			  if (action.type === 'CREATE_CLAIM') {
			    //we care about this action (FORM!)
			    return [...oldListOfClaims, action.payload]
			  }
			  //we don't care about the action (form!)
			  return oldListofClaims;
			};
			//Reducer is a function, doesn't have any idea of waht it's data is until it gets called for 1st time
				//need to handle case for when reducer is called for 1st time where it may not have any data:
					//1st time called --> undefined, therefore we need to default value of 1st arg:
					const claimsHistory = (oldListOfClaims = [], action) => {]
						//oldListOfClaims = [] takes care of the 1st case where there's no data

			const accounting = (bagOfMoney = 100, action) => {
			  if (action.type === 'CREATE_CLAIM') {
			    return bagOfMoney - action.payload.amtOfMoneyToCollect
			  } else if (action.type === 'CREATE_POLICY') {
			    return bagOfMoney + action.payload.amount
			  }
			  
			  return bagOfMoney
			};

				//quick note on .filter() function
					numbers.filter(num => num !== 2);
						//new array is now [1,3], numbers still equals [1,2,3];
							//produces new array with the filetered numbers inside of it

			const policies = (listOfPolicies = [], action) => {
			  if (action.type === 'CREATE_POLICY') {
			    return [...listOfPolicies, action.payload.name]
			  } else if (action.type === 'DELETE_POLICY') {
			    return listOfPolicies.filter(name => name !== action.payload.name)
			  }
			  return listOfPolicies;
			};

	//OVERALL GOAL OF REDUCER:
		//takes in an action, modify and return that existing data based upon the contents of the action



//Testing Our Example
	//We now have 3 action creators and 3 reducers
		//Note: we haven't made any reference to the Redux library
			//Majority of our code is pretty simple and not special syntax

	//Now we'll wire all of the actions creators and reducers into a sinle object called a 'store':
		//in Redux a 'store' is a collection of REDUCERS and ACTION CREATORS

	//Creating a 'store':
	const {createStore, combineReducers} = Redux;

	const ourDepartments = combineReducers({
	  accounting: accounting,
	  claimsHistory: claimsHistory,
	  policies: policies
	});

	const store = createStore(ourDepartments);

	//store {} has many useful functions, one of which is the dispatch function:
		//this acts just like the original form receiver, want to pass it an action
			//DISPATCH function will make a copy of it and send it to each REDUCER in Application
				//like receiver passing copies of form to each department

	//Let's call an action creator and pass the actions off to dispatch:
		store.dispatch(createPolicy('Alex', 20)); //creates police w/ 'Alex', adds 20 to bag
		store.dispatch(createPolicy('Jim', 30)); //creates police w/ 'Jim', adds 30 to bag
		store.dispatch(createPolicy('Bob', 40)); //creates police w/ 'Bob', adds 40 to bag

		store.dispatch(createClaim('Alex', 120)); //deducts $120 from bag of money
		store.dispatch(createClaim('Jim', 50)); //deducts $50 from bag of money

		store.dispatch(deletePolicy('Bob')); //removes bob from list



/////////////////////////////////////////////////////////////////////////////////////////////////////
//Important Redux Notes

	//We start with calling an action creator, we call a creator anytime we want to change state, 
	//--> produces action object
	//--> Action is fed to Dispatch, which copies action objects and feeds to reducers
	//--> Reducers will process action objects and return data
	//--> Data is then updated in State

		//All of these things: reducers, need to be wired together, to do this we call:
			const ourDepartments = combineReducers({
			  accounting: accounting,
			  claimsHistory: claimsHistory,
			  policies: policies
			});
				//b/c we used the key names of accounting, claimsHistory and policies
					//those key names are === to the state properties
						//If we change that key we can change the state prop
							//don't have to name reducers after keys but by convention they will be similar

		//Each dispatch is running an entire Redux Cycle:
			//Gets action --> feeds action to dispatch --> dispatch processes and updates state

		//We can print out our state total inbetween each of those dispatches, we don't have to run all dispatches
		//and THEN get access to state
		//Likewise: even after we call store.geState() we can continue to modify our state object!

		//Just like in classes we cannot directly modify our state:
			store.state.accounting - 20; /*you cannot do this*/

		//We can only modify state by dispatching an action that has been created by an action creator:
			store.dispatch(deletePolicy('Bob'));

	//USUALLY an app gets bigger, it usually ends up being more and more complex over time,
		//this happens non-linearally, meaning that it gets exponentially more complex as it grows larger

	//With REDUX - it starts with a higher level of complexity, but b/c we can only change our data via
	//action creators our app is almost self documenting
		//makes it clear to other engineers how you can modify the data.
			//in theory - as app grows, you get a more linear increase in complexity as it grows