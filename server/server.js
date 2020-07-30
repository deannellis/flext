const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 7777;

app.use(express.static(publicPath));

app.get('*', (req, res) => {
	res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
	const startMessage = 'flext is running on port 7777 ᕦ(ò_óˇ)ᕤ';
	console.log(startMessage);
});
