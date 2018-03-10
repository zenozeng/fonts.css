import * as fs from 'fs'
import { promisify } from 'util'

function readFile(path: string) {
    return promisify(fs.readFile)(path, {encoding: 'UTF-8'})
}

async function build() {
    const headerTemplate = await readFile('template/header.css')
    const fontsYAML = await readFile('src/fonts.yml')
    const enFontsYAML = await readFile('src/fonts.en.yml')
}

build()