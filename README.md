# TravelPlanner

It's my pet project which is designed to practice with new stack of web technologies: ASP.NET Core, Angular 2, RxJs. 
The main purpose is to make it easier to organize trips with your friends.

# Description

When I was going to organize a trip with my friends I had the problems that I solved with this web application. 

List of the main features: 

1. You can create a trip and invite your friends via Telegram or Viber.
2. Built in google map with all cool places on it with ability to build your trip route based on that places.
3. Text chat to discuss trip details with the trip members.
4. Ability to add cars with their petrol usage so an algorithm can calculate how much gas it will consume for the trip.
5. Localization support (for now it supports English and Russian)

TODO: 

1. Add a budget feature so you can track all spends like for the hotel, gas, etc.
2. Add a hotel vote feature so you can decide together where to stay during the trip.

# Technical Details

It's a Signle Page Application. I used classical layered architecture which includes:

1. Web UI which is built on top of ASP.NET Core and Angular 4
2. BusinessLogic layer
3. Identity layer which is responsible for authorization and security and uses ASP.NET Identity library
4. DataAccess layer which uses EntityFramework to access to MS SQL DB
5. DomainModel layer

# Screenshots

# Home Page
![Alt text](/TravelPlanner.Web/screenshots/main.png)
# Create Trip Page
![Alt text](/TravelPlanner.Web/screenshots/create.png)
# Trip Route
![Alt text](/TravelPlanner.Web/screenshots/directions.png)
# Trip Invites by Phone Number
![Alt text](/TravelPlanner.Web/screenshots/invites.png)
# Chat Page
![Alt text](/TravelPlanner.Web/screenshots/chat.png)
