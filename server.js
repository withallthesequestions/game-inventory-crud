/* TOP TEMPLATE START || URL http://localhost:3333
 * Note the `.gitignore` file in the folder (it should contain /node_modules). Ignoring the node_modules mess is best practice when saving to git repo. */
import express from 'express'; // Imports Express package.
const server = express(); // express() deploys a server. Assigning it to a variable lets you operate on it.
const PORT = 3333; // Local server port. Note the var name uses LOUDCASE. This is because its value is a magic number value.
server.use(express.json()); // This is middle-ware. It parses incoming requests which have JSON payloads (eg, POST requests with JSON in their bodies). In order to work, the relevant POST request must have headers which set the content type to JSON. (ie, ‘content-type: application/json’)
const INV_FILE_NAME = './chuckNorrisInventory.json'; // LOUDCASE, magic file-name.
import { save, load } from './jsonUtil.js'; // In case you want to import functions from a secondary file later.

server.listen(PORT, function (err) {
	console.log(err);
	console.log(`Now listening on port: ${PORT}`);
}); // Listens to the right port. Needed for local server and loading pages.
server.get('/', function (req, res) {
	res.sendFile(import.meta.dirname + '/index.html');
}); // Root document location. 'res.sendFile()' assigns a file to the root location.
/* TOP TEMPLATE END || CODE GOES BELOW || Note bottom template, for 404 route. */

// Saves and Loads Inventory
let chuckInventory = load(INV_FILE_NAME);
console.log('Current Inventory: ', chuckInventory);
function saveInventory() {
	save(INV_FILE_NAME, chuckInventory);
}

server.get('/toChuck', function (req, res) {
	res.json(chuckInventory);
});

server.post('/toChuck', function (req, res) {
	console.log('Post request body: ', req.body);
	const { typeOfHat } = req.body;
	console.log('Data from frontend: ', typeOfHat);
	chuckInventory.push(typeOfHat);
	saveInventory();
	res.json(chuckInventory);
});

server.delete('/toChuck/:deleteThisIndex', function (req, res) {
	const { deleteThisIndex } = req.params;
	console.log("You're deleting", deleteThisIndex);
	chuckInventory.splice(deleteThisIndex, 1);
	// The problem seems to narrow down to this splicing. But in reality, it seems to go to the item indexes in the HTML's display function.
	console.log('Now, the inventory looks like: ', chuckInventory);
	saveInventory();
	res.json(chuckInventory);
});

/* BOTTOM TEMPLATE START */
server.get('*', function (req, res) {
	res.sendFile(import.meta.dirname + '/404.html');
}); // 404 route. It's at the bottom because NodeJS routes work like switch cases, and you want this to be the final leftover route.
/* BOTTOM TEMPLATE END */
