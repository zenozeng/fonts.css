import * as fs from 'fs'
import { promisify } from 'util'

interface GenericFamily {
    name: string
    fallbackGenericFamily: string
    className: string
}

interface Font {
    name: string
    alias: string[]
    genericFamily: GenericFamily
    platfrom: string[]
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

function readFile(path: string) {
    return promisify(fs.readFile)(path, {encoding: 'UTF-8'})
}

async function build() {
    const headerTemplate = await readFile('template/header.css')
}

build()
