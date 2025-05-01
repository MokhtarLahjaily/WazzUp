<h1>WazzUp - Dockerized Real-time Chat Application</h1>
<p>A lightweight, real-time chat application built with Node.js, Express, and Socket.io, conveniently packaged as a Docker image.</p>

<h2>Features</h2>
<ul>
  <li>Real-time messaging - Instant message delivery without page refresh</li>
  <li>User presence - Join/leave notifications</li>
  <li>Typing indicators - See when other users are typing</li>
  <li>Online user list - View all currently connected users</li>
  <li>Responsive design - Works on desktop and mobile devices</li>
  <li>Dockerized - Easy deployment with Docker</li>
</ul>

<h2>Quick Start</h2>

<h3>Prerequisites</h3>
<ul>
  <li>Docker installed on your system</li>
</ul>

<h3>Running the Application</h3>
<p><strong>Pull and run the Docker image:</strong></p>
<pre><code># Pull the image (optional - docker run will automatically pull if not present)
docker pull wazzup

# Run the container
docker run -p 3000:3000 wazzup
</code></pre>

<p>Once running, open your browser and navigate to:</p>
<p><a href="http://localhost:3000" target="_blank">http://localhost:3000</a></p>
<p>Open multiple browser windows to simulate different users chatting with each other.</p>

<h3>Building the Image Yourself</h3>
<ul>
  <li>Clone this repository</li>
  <li>Navigate to the project directory</li>
</ul>

<p><strong>Build the Docker image:</strong></p>
<pre><code>docker build -t wazzup .</code></pre>

<p><strong>Run the container:</strong></p>
<pre><code>docker run -p 3000:3000 wazzup</code></pre>

<h2>Configuration</h2>

<h3>Port Mapping</h3>
<p>By default, the application runs on port 3000. You can map it to a different port on your host:</p>
<pre><code>docker run -p 8080:3000 wazzup</code></pre>
<p>This would make the app available at <a href="http://localhost:8080" target="_blank">http://localhost:8080</a>.</p>

<h3>Environment Variables</h3>
<p>The application doesn't currently use environment variables, but future versions may include customization options.</p>

<h2>Project Structure</h2>
<pre><code>/usr/src/app/
├── Dockerfile        # Docker configuration
├── node_modules/     # Dependencies
├── package.json      # Project metadata and dependencies
├── package-lock.json # Dependency lock file
├── public/           # Client-side files
└── server.js         # Server-side code
</code></pre>

<h2>How It Works</h2>

<h3>Server-Side (Node.js)</h3>
<ul>
  <li>Creates an Express server with Socket.io integration</li>
  <li>Manages user connections and disconnections</li>
  <li>Broadcasts messages to all connected clients</li>
  <li>Tracks and broadcasts user typing status</li>
  <li>Maintains a list of online users</li>
</ul>

<h3>Client-Side (Browser)</h3>
<ul>
  <li>Provides a user-friendly interface for chatting</li>
  <li>Handles joining the chat with a username</li>
  <li>Displays incoming and outgoing messages</li>
  <li>Shows typing indicators when someone is typing</li>
  <li>Lists all online users</li>
</ul>

<h2>Development</h2>
<p>If you want to develop the application further:</p>
<pre><code># Run the container with a volume mount for live code changes
docker run -p 3000:3000 -v $(pwd):/usr/src/app wazzup
</code></pre>

<h2>Troubleshooting</h2>

<h3>Connection Issues</h3>
<ul>
  <li>Ensure port 3000 is not being used by another application</li>
  <li>Check your firewall settings</li>
  <li>Verify the container is running with <code>docker ps</code></li>
</ul>

<h3>Container Logs</h3>
<p>View the container logs for debugging:</p>
<pre><code>docker logs &lt;container_id&gt;</code></pre>

<h2>License</h2>
<p>MIT License</p>

<h2>Contributing</h2>
<p>Contributions are welcome! Please feel free to submit a Pull Request.</p>

<h2>Acknowledgments</h2>
<ul>
  <li>Built with Node.js</li>
  <li>Real-time communication powered by Socket.io</li>
  <li>Web framework by Express</li>
</ul>
