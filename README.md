# Wreathe (Client)

Wreathe is a social app specifically for market participants to discuss financial analysis and price action in markets. In this repository contains the client-side code for the application

The technology used to build the client-side are Next.js(App router), TailwindCSS, and Typescript.

## Overview

This project was built to test my abilities in building full stack apps with modern technologies. After building projects with MERN stack technology, I researched modern technologies and found that Next.js(React Framework), TailwindCSS(CSS Framework), Typescript(Javascript Typechecker), Postgresql(Database), Prisma(ORM), Express(Node.js Framework), and other technologies, are among the most popular modern web development technologies in 2024. Building this project has taught me a vast amount of information on building applications in modern times.

Some learning takeaways:

- Server Side Rendering
- Client Side Rendering
- WebSockets(Websocket API/socket.io)
- Typescipt
- SQL

## Functionlity

I wanted this project to be a social app like twitter to test if i had the ability in building social media apps similar to twitter. On the client side, this would involve designing a landing page with modern design, and to mimic functionality like twitter this would involve building:

- Authentication
  - JWT authentication
- CRUD operations for posts
  - Post interactions(Liking, Unliking, Commenting)
- Building a feed page
  - Timeline based on following
- Profile page
  - View other users profile page or the user's own profile page
  - Follow or Unfollow users
  - Edit user's profile page
  - List of Posts based on the user's Posts, Comments, Likes
- Messaging app
  - An inbox to view active messages
  - Realtime messaging with websockets
  - Private Messages with other users one-to-one
- Search
  - Search for users

I want to continue to build on top of this app to hopefully, in the future, apply a shopping page and further searching functionality to search for posts based on ticker symbols.

#### Feed

I considered the authentication the app would need along with allowing authenticated users to post content similar to tweets. Furthermore, users would have the ability to interact with these posts by liking, commenting, viewing the post, and choosing which posts to view based on their following. The timeline was based on most recent posts, however, I have yet to still learn about applying **_Lazy Loading_** to the feed.

Some features I implemented:

- Ensuring the content filled the height of the screen in case there was just one post on the feed
- Scroll to top function
- A header with a search bar to search for users on Desktop mode
- Post button
- Utilizing Next.js Server Actions, Modals, Parallel routing

I am considering moving the post button to the sidebar possibly because it would allow the user to post from different routes. Currently, the only way to post would be from the feed page.

#### User Page
