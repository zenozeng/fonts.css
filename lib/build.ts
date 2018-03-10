import * as fs from 'fs'
import { promisify } from 'util'
import * as yaml from 'js-yaml'
import { Parser, Font } from './parser'

function readFile(path: string) {
    return promisify(fs.readFile)(path, {encoding: 'UTF-8'})
}

(async function () {
    const headerTemplate = await readFile('template/header.css')
    const fontsYAML = await readFile('src/fonts.yml')
    const enFontsYAML = await readFile('src/fonts.en.yml')
    const fonts = yaml.load(fontsYAML) as  Font[]
    const enFonts = yaml.load(enFontsYAML) as Font[]
    const results = new Parser(fonts, enFonts).parse()
})()