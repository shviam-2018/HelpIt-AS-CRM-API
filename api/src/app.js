const express = require('express');
const cors = require('cors');
const caseRoutes = require('./v1/Routes/caseRoutes');

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/v1/cases', caseRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});