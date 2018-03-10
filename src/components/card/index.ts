import Vue from "vue";

// input: availableFonts

export default Vue.extend({
    template: `
        <div>
        </div>
    `,
    props: ['name'],
    data() {
        return {
            sizes: [24, 18, 16, 14, 12],
            text: "我能吞下玻璃而不伤身体，The quick brown fox jumps over the lazy dog.",
        }
    },
    methods: {
    },
    computed: {
        platforms() : string {
            return ""
        },
    }
});