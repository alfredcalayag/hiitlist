#HIIT List
Create and maintain your HIIT workouts with this customizable interval timer application.

##The Idea
H.I.I.T. represents High Intensity Interval Training which a healthy and efficient way to exercise.  The basic idea is to design your physical activity in intervals toggling between a high-intensity exercise and low-intensity exercise (or rest).


##How it works

###Register
- Click on the Register button to create an account
- Once logged in, you can view your user options

###Create New HIIT List
<div style="text-align:center;">
<center><img alt="HIIT-Setup" src="http://alfredcalayag.com/imgs/hiitlist/hiit-setup.png" width="250px"></center></div>

- Click on create a new HIIT List
- Add exercises to your list that fit your satisfaction.
- Set the high-intensity and low-intensity durations (or use the default).
- Save your HIIT for later use or
- Save and Start your workout

###Ready to Workout?
<div style="text-align:center;">
<center><img alt="HIIT-In-Workout" src="http://alfredcalayag.com/imgs/hiitlist/hiit-in-workout.png" width="250px"></center></div>

When you select the option to start your workout, the interval timer begins and will play through your list in sequential order (much like a music playlist). At each exercise, the screen will display the exercise name you're supposed to do along with the countdown of the duration.  During rest periods, it displays "REST" and also display the next workout coming up next.

###All Done?
<div style="text-align:center;">
<center><img alt="HIIT-Complete" src="http://alfredcalayag.com/imgs/hiitlist/hiit-workout-complete.png" width="250px"></center></div>

Your completed workouts can be saved and have the option of entering calories burned.  When completed, this workout would be available in your list of completed workouts.

###Saved HIITS
Each HIIT that you create will appear in your Saved HIITS section.  You can always repeat your favorite HIIT for a future workout without the hassle of recreating it from scratch.

###Completed Workouts
(TBD) This view will provide analytics and visualization to the completed workouts for reviewing purposes.  You can also come here and adjust the calories burned in case the initial information provided needs to be edited.

##Usage
This is app is intended for just about anyone that is in good physical condition to perform the activity they plan for.  Always check with your primary care physician to see if this is an appropriate exercise for you.


##Technologies
- Back-end: Rails
- Database: Postgres
- Front-end: Angular + HTML (Re-designed from basic JS/JQuery)
- Styling: SASS/CSS
- Testing(Models and Controllers): Rspec
- Version Control: Git + Github


##Future Developments
- How about some navigation!  >=|

- OAuthorization sign up and log in.

- Sessions for staying logged in.

- Continue style developing on the media breaks for phone-landscape and tablet sizes.  Currently, started with a mobile-first approach with the intention to expand from there.


##Known Issues

- Audio on Mobile: iOS Safari and Chrome compatability (perhaps an issue across all mobile browsers).  Sound just doesn't appear to play, but works fine on desktop.  There seems to be some documentation from Apple that might provide some solution (https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html)