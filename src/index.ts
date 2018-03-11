import Vue, { VueConstructor } from 'vue'
import {Parser, Font} from './parser'
import Card from './components/card'
console.log(Card)
const FontDetect = require('font-detect')

interface HashTable<T> {
    [key: string]: T;
}

const fonts = require('json-loader!yaml-loader!./fonts/fonts.yml') as Font[]
const enFonts = require('json-loader!yaml-loader!./fonts/fonts.en.yml') as Font[]
const cards = new Parser(fonts, enFonts).parse()

const cssFontFamilies = ([] as string[]).concat(...cards.map((card) => card.cssFontFamilies))
const fontAvailability : HashTable<boolean> = {};
new FontDetect().detect(cssFontFamilies.map((v) => v.replace(/"/g, '')), (err: any, result: any) => {
    if (err) {
        throw err;
    }
    cssFontFamilies.forEach((val, i) => {
        fontAvailability[val] = result[i];
    })    
})

console.log(cards);

let v = new Vue({
    el: '#app',
    template: `
    <div>
        <h1>Fonts.css -- 跨平台中文字体解决方案</h1>
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