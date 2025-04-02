<h1>How the Chat App Works</h1>
<p>The application uses Socket.io to enable real-time communication between users. Here's a breakdown of the components:</p>
<p>Server-Side (Node.js):</p>

<p>Creates an Express server with Socket.io integration</p>
<p>Manages user connections and disconnections</p>
<p>Broadcasts messages to all connected clients</p>
<p>Tracks and broadcasts user typing status</p>
<p>Maintains a list of online users</p>

<h2>Client-Side (Browser):</h2>

<p>Provides a user-friendly interface for chatting</p>
<p>Handles joining the chat with a username</p>
<p>Displays incoming and outgoing messages</p>
<p>Shows typing indicators when someone is typing</p>
<p>Lists all online users</p>

<h1>Features:</h1>

<p>Real-time messaging without page refresh</p>
<p>"User is typing" indicators</p>
<p>Join/leave notifications</p>
<p>Responsive design for desktop and mobile</p>
<p>User list panel showing who's online</p>
<p>System messages for user activities</p>

<h2>How to Run the Application</h2>

<p>Create a new directory for your project</p>


<p>Install the required packages:</p>

<p>npm init -y</p>

<p>npm install express socket.io</p>


<p>Start the server:</p>


<p>node server.js</p>

<p>Visit http://localhost:3000 in your browser</p>

<p>Open multiple browser windows to simulate different users</p>
