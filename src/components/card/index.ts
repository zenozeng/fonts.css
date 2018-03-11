import Vue from 'vue'
import { ParseResult, Font } from '../../parser'
import './styles.css'

interface FontWithAvailability extends Font {
    available: boolean
}

export default Vue.extend({
    template: require('./template.html'),
    props: ['data', 'fontAvailability'],
    data() {
        return {
            peekFont: null,
            peekPlatform: null,
            sizes: [24, 18, 16, 14, 12],
            text: '我能吞下玻璃而不伤身体，The quick brown fox jumps over the lazy dog.',
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
            let peekFont = this.peekFont as FontWithAvailability | null
            if (!peekFont || !peekFont.available) {
                return this.cardData.cssFontFamilies.join(',')
            }
            return ([] as string[]).concat(peekFont.alias).join(',')
        },
        highlightFonts() : FontWithAvailability[] {
            let peekFont = this.peekFont as FontWithAvailability | null
            let peekPlatform = this.peekPlatform as string | null
            if (peekFont) {
                return [peekFont]
            }
            if (!peekPlatform) {
                return []
            }
            return this.fonts.filter((font) => peekPlatform && (font.platform == peekPlatform || font.platform.indexOf(peekPlatform) > -1))
        },
        highlightCssFontFamilies() : string[]{
            const fonts = ([] as string[]).concat(...this.highlightFonts.map((font) => font.alias))
            return fonts.map((v) => /[ \\]/.test(v) ? `"${v}"` : v)
        },
        notes(): string[] {
            return ["下划线标注的为检测到的可用字体，检测方法参见：github.com/zenozeng/font-detect.js"].concat(this.data.notes)
        }
    },
    mounted() {
        console.log(this.fonts)
    }
});