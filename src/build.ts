import * as fs from 'fs'
import { promisify } from 'util'
import * as yaml from 'js-yaml'
import { Parser, Font, ParseResult } from './parser'

function readFile(path: string) {
    return promisify(fs.readFile)(path, {encoding: 'UTF-8'})
}

function css(result: ParseResult) {
    return `.${result.className} {font-family: ${result.cssFontFamilies.join(", ")};}`
}

function less(result: ParseResult) {
    return `.${result.className}() {
    font-family: ${result.cssFontFamilies.join(", ")};
}`
}

function scss(result: ParseResult) {
    return `@mixin ${result.className} {
    font-family: ${result.cssFontFamilies.join(", ")}
}`
}

function styl(result: ParseResult) {
    return `${result.className}()
    font-family ${result.cssFontFamilies.join(", ")}`
}

(async function () {
    const fontsYAML = await readFile('src/fonts/fonts.yml')
    const enFontsYAML = await readFile('src/fonts/fonts.en.yml')
    const fonts = yaml.load(fontsYAML) as  Font[]
    const enFonts = yaml.load(enFontsYAML) as Font[]
    const results = new Parser(fonts, enFonts).parse()
    const writeFile = promisify(fs.writeFile);
    for (let fn of [css, less, scss, styl]) {
        await writeFile("fonts." + fn.name, results.map(fn).join("\n"))
    }
})()