#HIIT List
Create and maintain your HIIT workouts with this customizable interval timer application.

##The Idea
H.I.I.T. represents High Intensity Interval Training which a healthy and efficient way to exercise.  The basic idea is to design your physical activity in intervals toggling between a high-intensity exercise and low-intensity exercise (or rest).


##How it works

###Register
- Click on the Register button to create an account
- Once logged in, you can view your user options

###Create New HIIT List
- Click on create a new HIIT List
- Add exercises to your list that fit your satisfaction.
- Set the high-intensity and low-intensity durations (or use the default).
- Save your HIIT for later use or
- Save and Start your workout

###Ready to Workout?
When you select the option to start your workout, the interval timer begins and will play through your list in sequential order (much like a music playlist). At each exercise, the screen will display the exercise name you're supposed to do along with the countdown of the duration.  During rest periods, it displays "REST" and also display the next workout coming up next.

###All Done?
The app will save your completed workout.  You will have the option of entering calories burned.  When completed, this workout will now be available in your list of completed workouts.

###Saved HIITS
Each HIIT that you create will appear in your Saved HIITS section.  You can always repeat your favorite HIIT for a future workout without the hassle of recreating it from scratch.

###Completed Workouts
(TBD) This view will provide analytics and visualization to the completed workouts for reviewing purposes.  You can also come here and adjust the calories burned in case the initial information provided needs to be edited.

##Usage
This is app is intended for just about anyone that is in good physical condition to perform the activity they plan for.  Always check with your primary care physician to see if this is an appropriate exercise for you.


##Technologies
- Framework: Rails
- Database: Postgres
- Front-end: HTML/CSS/Javascript/Jquery
- Styling: SASS/CSS
- Testing(Models and Controllers): Rspec
- Version Control: Git + Github


##Future Developments
- How about some navigation!  >=|

- Continue style developing on the media breaks for phone-landscape and tablet sizes.  Currently, started with a mobile-first approach with the intention to expand from there.

- Create a single-page app.  AJAXify it!


##Current Problems
- Needing to load specific javascript for a specific page.  Otherwise, serving from the asset pipeline runs all of the scripts on every page.  =/

- My javascript is loading too early on the exercises page.  This is solved by refreshing the page, and it will load correctly.  But that's annoying.

- iOS Safari compatability.  A couple of things: rendering of the workout screen is offset, and the audio bell plays twice each time when it should only play once.  There seems to be some documentation from Apple that might provide some solution (https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html)