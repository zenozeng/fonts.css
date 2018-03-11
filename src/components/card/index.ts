import Vue from 'vue'
import { ParseResult, Font } from '../../parser'
import './styles.css'

// TODO: highlight available fonts
// TODO: apply fonts

interface FontWithAvailability extends Font {
    available: boolean
}

export default Vue.extend({
    template: require('./template.html'),
    props: ['data', 'fontAvailability'],
    data() {
        return {
            peekFont: null,
            sizes: [24, 18, 16, 14, 12],
            text: '我能吞下玻璃而不伤身体，The quick brown fox jumps over the lazy dog.',
        }
    },
    methods: {
        highlightFonts(fonts: Font[]) {
            
        },
        previewFonts(fonts: Font[]) {
        }
    },
    computed: {
        cardData() : ParseResult {
            return this.data
        },
        fonts(): FontWithAvailability[] {
            return this.cardData.fonts.map((font) => {
                let v = JSON.parse(JSON.stringify(font)) as FontWithAvailability
                v.available = false
                if (typeof v.alias === 'string') {
                    v.available = this.fontAvailability[v.alias]
                } else {
                    for (let alias of v.alias) {
                        if (this.fontAvailability[alias]) {
                            v.available = true
                        }
                    }
                }
                return v
            })
        },
        fontFamily() : string{
            let peekFont = this.peekFont as Font | null
            if (!peekFont) {
                return this.cardData.cssFontFamilies.join(',')
            }
            return ([] as string[]).concat(peekFont.alias).join(',')
        }
    },
    mounted() {
        console.log(this.fonts)
    }
});