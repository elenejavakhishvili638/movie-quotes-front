# Movie quotes

Movie Quotes is an exciting application where you can explore, engage with, and share movie quotes. New users can easily register and then authorize themselves to gain access to a wide array of features. Authorized users can browse through a collection of quotes from various movies. Users can interact with quotes in real-time by liking or commenting on them, and they will receive notifications to keep them updated with the latest activities.
Users can add their own quotes from their movies. Each user has their personal page for movies. Where they can:
-   Add a new movie
-   Add a new quote to an existing movie
-   Edit an existing movie or quote
-   Delete a quote or a movie

Users also have full control over their profiles. They can:
-   Update their profile details
-   Change their username
-   Add or change their profile picture

## Table of contents
- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development](#development)

## Prerequisites
- npm@9.5.0
- tailwind@3.3.1

## Tech stack
- [Vue.js](https://vuejs.org/) - Front-end framework 
	- [Vue Router](https://router.vuejs.org/) - Vue.js library for routing and navigation 
	- [Pinia](https://pinia.vuejs.org/) - Vue.js library for state management 		   	
	- [Vee-Validate](https://vee-validate.logaretm.com/v4/) - Vue.js library for form validation 
- [TailwindCSS](https://tailwindcss.com/docs/installation) - CSS framework


## Getting started

1.First of all, clone the Movie Quotes repository from GitHub:

```bash
https://github.com/RedberryInternship/-elene-javakhishvili-movie-quotes-front.git
```
2.Install dependencies:

```bash
npm install
```
and also:

```bash
npm run dev
```
4.Now we need to set our env file. Go to the root of your project and execute this command.
```bash
cp .env.example .env
```
Update the .env file with your database credentials:

Pusher:
>VITE_PUSHER_KEY=your-pusher-key

>VITE_BACKEND_URL=your-backend-url

## Development
```bash
npm run dev
```