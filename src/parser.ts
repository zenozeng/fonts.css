export interface GenericFamily {
    name: string
    fallbackGenericFamily: string
    className: string
}

export interface Font {
    name: string
    alias: string[] | string
    genericFamilyName: string
    platform: string[] | string
    note: string[] | string
}

export interface ParseResult extends GenericFamily {
    fonts: Font[]
    cssFontFamilies: string[]
    platforms: string[]
    notes: string[]
}

const genericFamilies: GenericFamily[] = [
    {
        name: "黑体",
        fallbackGenericFamily: "sans-serif",
        className: "font-hei",
    },
    {
        name: "楷体",
        fallbackGenericFamily: "serif",
        className: "font-kai",
    },
    {
        name: "宋体",
        fallbackGenericFamily: "serif",
        className: "font-song",
    },
    {
        name: "仿宋",
        fallbackGenericFamily: "serif",
        className: "font-fang-song",
    },
]

function flatten(strings: (string[] | string)[]) : string[] {
    return ([] as string[]).concat(...strings)
}

function uniq(strings: string[]) {
    return strings.filter((v, i, arr) => arr.indexOf(v) == i)
}

export class Parser {

    constructor(private fonts: Font[], private enFonts: Font[]) {}

    parseGenericFamily(genericFamily: GenericFamily) : ParseResult {
        let result = JSON.parse(JSON.stringify(genericFamily)) as ParseResult
        const filter = (font: Font) => font.genericFamilyName == genericFamily.name
        result.fonts = this.enFonts.filter(filter)
        result.fonts = result.fonts.concat(this.fonts.filter(filter))
        result.cssFontFamilies = flatten(result.fonts.map((font) => font.alias))
        result.cssFontFamilies.push(genericFamily.fallbackGenericFamily)
        result.cssFontFamilies = result.cssFontFamilies.map((str) => str.indexOf(" ") > -1 || str.indexOf("\\") > -1 ? `"${str}"` : str)
        result.platforms = uniq(flatten(this.fonts.map((font) => font.platform))) // based on Chinese fonts here
        result.notes = flatten(result.fonts.map((font) => font.note)).filter((note) => note)
        return result
    }

    parse() : ParseResult[] {
        return genericFamilies.map((genericFamily) => this.parseGenericFamily(genericFamily))
    }

}