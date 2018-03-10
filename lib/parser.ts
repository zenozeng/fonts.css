export interface GenericFamily {
    name: string
    fallbackGenericFamily: string
    className: string
}

export interface Font {
    name: string
    alias: string[] | string
    genericFamilyName: string
    platfrom: string[] | string
    note: string[] | string
}

export interface ParseResult extends GenericFamily {
    fonts: Font[]
    cssFontFamilies: string[]
}

const genericFamilies: GenericFamily[] = [
    {
        name: "黑体",
        fallbackGenericFamily: "sans-serif",
        className: "hei",
    },
    {
        name: "楷体",
        fallbackGenericFamily: "serif",
        className: "kai",
    },
    {
        name: "宋体",
        fallbackGenericFamily: "serif",
        className: "song",
    },
    {
        name: "仿宋",
        fallbackGenericFamily: "serif",
        className: "fang-song",
    },
]

export class Parser {
    constructor(private fonts: Font[], private enFonts: Font[]) {}

    parseGenericFamily(genericFamily: GenericFamily) : ParseResult {
        let result = {} as ParseResult
        Object.assign(result, genericFamily)
        const filter = (font: Font) => font.genericFamilyName == genericFamily.name 
        result.fonts = this.enFonts.filter(filter)
        result.fonts = result.fonts.concat(this.fonts.filter(filter))
        result.cssFontFamilies = ([] as string[]).concat(...result.fonts.map((font) => font.alias)) // type of font.alias is string[] | string, flatten here
        result.cssFontFamilies.push(genericFamily.fallbackGenericFamily)
        return result
    }

    parse() : ParseResult[] {
        return genericFamilies.map((genericFamily) => this.parseGenericFamily(genericFamily))
    }

}