const fs = require('fs')
const Handlebars = require('handlebars')
const data = require('./assets/data.json')

generateHTML('./src/page.hbs', './generatedOutput/index.html')
copyFile('./src/assets/index.css', './generatedOutput/index.css', 'utf-8')
copyFiles('./src/assets/images', './generatedOutput')

console.log('OK!')

function generateHTML(input, output) {
	const handlebarsInput = fs.readFileSync(input, 'utf-8')
	const template = Handlebars.compile(handlebarsInput)
	fs.writeFileSync(output, template(data))
}

function copyFile(input, output, options) {
	fs.writeFileSync(output, fs.readFileSync(input, options))
}

function copyFiles(input, output) {
	files = fs.readdirSync(input)
	files.forEach(file => {
		copyFile(`${input}/${file}`, `${output}/${file}`)
	})
}
