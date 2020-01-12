# Onboarding 

Get starting weights

- update 'masterMaxWeight' object with starting weight values

-------------------------

# Start a Workout

Decide what lifts 

Represented by two values 
 - 'a': alternates between 0 and 1 each workout 
 - 'b': incremements twice and resets

Update 'inProgressWorkout' object with current workouts

 -------------------------

 # Perform a Lift

 - Update an 'inProgressWorkout' object with the results of the lift

 -------------------------

 # Complete a Workout

 - Use the values from the 'inProgressWorkout' object to create a new workout object and add it to an array of workouts
 - Reset the 'inProgressWorkout' object
 - Update the 'masterMaxWeight' object
 - Update 'liftVariant' object