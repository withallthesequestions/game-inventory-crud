import fs from 'fs';

export function load(name) {
	let text = fs.readFileSync(name, 'utf8');
	let jsonData = JSON.parse(text);
	return jsonData;
}

export function save(name, obj) {
	let jsonData = JSON.stringify(obj);
	let result = fs.writeFileSync(name, jsonData);
	console.log(result);
}
