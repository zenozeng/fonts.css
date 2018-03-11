import Vue from 'vue'
import { ParseResult } from '../../parser'
import './styles.css'

export default Vue.extend({
    template: require('./template.html'),
    props: ['data', 'fontAvailability'],
    data() {
        return {
            sizes: [24, 18, 16, 14, 12],
            text: "我能吞下玻璃而不伤身体，The quick brown fox jumps over the lazy dog.",
        }
    },
    methods: {
    },
    computed: {
        cardData() : ParseResult {
            return this.data
        },
        platforms() : string[] {
            return []
        },
    }
});