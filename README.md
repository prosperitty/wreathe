# Wreathe (Client)

Wreathe is a social app specifically for market participants to discuss financial analysis and price action in markets. In this repository, contains the client-side code for the application

The technology used to build the client-side are Next.js(App router), TailwindCSS, and Typescript.

## Overview

This project was built to test my abilities in building full stack apps with modern technologies. After building projects with MERN stack technology, I researched modern technologies and found that Next.js(React Framework), TailwindCSS(CSS Framework), Typescript(Javascript Typechecker), Postgresql(Database), Prisma(ORM), Express(Node.js Framework), and other technologies, are among the most popular modern web development technologies in 2024. Building this project has taught me a vast amount of information on building applications in modern times.

#### Some learning takeaways:

- Server Side Rendering
- Client Side Rendering
- WebSockets(Websocket API/socket.io)
- Typescipt
- SQL

## Functionlity

I wanted this project to be a social app like twitter to test if I had the ability to build social media apps similar to twitter. On the client side, this would involve designing a landing page with modern design, and to mimic functionality like twitter this would involve building:

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

### Feed

I considered the authentication the app would need along with allowing authenticated users to post content similar to tweets. Furthermore, users would have the ability to interact with these posts by liking, commenting, viewing the post, and choosing which posts to view based on their following. The timeline was based on most recent posts, however, I have yet to still learn about applying **_Lazy Loading_** to the feed.

#### Some features I implemented:

- Ensuring the content filled the height of the screen in case there was just one post on the feed
- Scroll to top function
- A header with a search bar to search for users on Desktop mode
- Search bar queries from database. Added debouncing.
- Post button
- Utilizing Next.js Server Actions, Modals, Parallel routing, Intercepting Routes

#### Todo:

- I am considering moving the post button to the sidebar possibly, because it would allow the user to post from different routes. Currently, the only way to post would be from the feed page.
- The current form pages to post content and comment need to be designed and styled.
- Add a loading transparent screen to show the user that the post route is loading when opening the modal
- Add lazy loading

### User Page

The user page includes a user's content from their first name, last name, @name, bio, user's posts, likes, and replies. There is currently no profile image functionality. If an authenticated user is viewing their own profile page, they have the ability to edit their personal information by clicking the edit button. Otherwise, the user may follow or unfollow users to populate the feed with chosen followings of the user's choice. Furthermore, the profile page has analytics based on the number of posts, followings, or followers.

#### Features:

- Following, unfollowing, and editing utilizes next.js server actions.
- Scroll to top function is also applied here
- Separate page to view the list of followings or followers of the user.

#### Things to consider:

- Should a new fetch request be fired when a tab is clicked or should we fetch all data related to user's posts, likes, and comments on render?
  - Would fetching a request when a tab is clicked scale better than fetching all the data on render?
  - Does this app require the user to see the latest posts from the user they're following?
    - Fetching on render might require the user viewing the page to reload the page to view the latest content
- How are loading states handled with Next.js server actions?

### Message App

Building this app involved learning about Websockets. I had thought about using socket.io at first, but then I came across a tweet by Guillermo Rauch that was about socket.io. At first, I had thought socket.io was still popularly used in modern web dev, but reading Guillermo's tweet sounded as if it was ancient and the comments made this even more so. Along the comments, I discovered that browsers now have the Websocket API and a comment mentioned that using this API involves one less package to use(socket.io). Therefore, I decided to use the Websocket API to build the message app.

Although I learned to use the Websocket API, I had alot more questions such as, what was socket.io used for years ago? Does socket.io use websockets or not? What can socket.io be used for today? Overall, what are the differences between the websocket API and socket.io?

#### The takeways of Websockets

- It can be used to open and connect browser and server
- [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) provides a list of websocket tools
- Can be used for realtime messaging
- Utilized for notifications
- Opening chatrooms like twitch chat
- [Javascript.info](https://javascript.info/websocket) provides valuable information on websockets

#### Challenges:

- Websockets seemed fairly simple to learn but challenges arose when building with Next.js involving client-side rendering or server-side rendering. I had thought i could use server side rendering to build a realtime messaging feature, but I was just met with bugs in the end.
- Realtime messaging can be achieved by transferring data between browser and server, but I had considered the best practice on saving messages while chatting.
  - Should we save after or before the message is sent?(Make a query to the database to save the message)
    - Saving a message before receiving from a websocket slowed down the realtime messaging while a fetch request was awaiting to be resolved to save the message to the database
    - Saving after solves this problem but then:
  - What if the message fails to save to the DB?
    - This would cause a bug where the end user can see the message if connected to the chatroom, but the message won't be shown when refreshing the page because it was not saved.
    - A solution could be to continue to try and save the message on failure (i'm sure there's caveats to this)
  - Do big social media apps like instagram or twitter have servers that are lightning fast to make the DM messaging almost realtime?
    - Probably not worth considering this because alot of work and time was considered to make these apps work efficiently.
    - My use case could be different depending on what the app requires

## Future Education

- Learn to test code with Jest and Playwright
- Learn Unit, Integration, Functional tests
- Code is sloppy, learn SOLID principles
- State management with zustand
- Build an ecommerce page
- Learn more Web APIs
