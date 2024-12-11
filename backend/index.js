const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const formRoutes = require('./routes/formRoutes');

// Middleware
const app = express();
app.use(bodyParser.json());

// Use the user routes
app.use('/api/users', userRoutes);
app.use('/api/forms', formRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
