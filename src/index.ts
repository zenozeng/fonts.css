import Vue, { VueConstructor } from 'vue'
import {Parser, Font} from './parser'
import Card from './components/card'
import './styles.css'

const FontDetect = require('font-detect')

interface HashTable<T> {
    [key: string]: T;
}

const fonts = require('./fonts/fonts.yml') as Font[]
const enFonts = require('./fonts/fonts.en.yml') as Font[]
const cards = new Parser(fonts, enFonts).parse()

const cssFontFamilies = ([] as string[]).concat(...cards.map((card) => card.cssFontFamilies)).map((v) => v.replace(/"/g, ''))
const fontAvailability : HashTable<boolean> = {};
new FontDetect().detect(cssFontFamilies, (err: any, result: any) => {
    if (err) {
        throw err;
    }
    cssFontFamilies.forEach((val, i) => {
        Vue.set(fontAvailability, val, result[i])
    })
})

let v = new Vue({
    el: '#app',
    template: `
    <div>
        <h1>Fonts.css -- 跨平台中文字体解决方案</h1>
        <h3><a href="https://github.com/zenozeng/fonts.css">github.com/zenozeng/fonts.css</a></h3>
        <card v-for="card in cards" :data="card" :fontAvailability="fontAvailability"></card>
        </template>
    </div>
    `,
    data: {
        name: 'Fonts.css',
        fontAvailability,
        cards,
    },
    components: {
        card: Card,
    }
})