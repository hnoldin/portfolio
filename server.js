const express = require('express');
const cors = require('cors');
const path = require('path'); // Import the 'path' module to work with file paths

const app = express();

// Enable CORS for all routes
app.use(cors());

// Define a route to serve the 'main.js' file
app.get('/dev/main.js', (req, res) => {
    // Resolve the absolute path to the 'main.js' file
    const filePath = path.join(__dirname, 'dev', 'main.js');
    
    // Serve the file using Express' sendFile function
    res.sendFile(filePath);
});

// Define a route for the root URL '/'
app.get('/', (req, res) => {
    res.send('<h1>Hello, World!</h1>');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

