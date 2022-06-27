const express = require('express');

const app = express();
const PORT = process.env.PORT || 3003;

app.get('/', (req, res) => {
    res.send('Welcome to Node with Express');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});