<script>
    import {mapState} from "vuex";
    import utils from "@/scripts/utils.js";
    import { tickStep } from "d3-array";

    export default {
        name: "Circles",
        components: {},
        props: {
            data: {
                type: Object,
                required: true,
            },
            totalData: {
                type: Object,
                required: true,
            },
            mainChartProps: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                animated: false,
            };
        },
        computed: {
            ...mapState({
                doShowChapterColors: state => state.doShowChapterColors,
                chapterColors: state => state.chapterColors,
                selection: state => state.selection,
            }),
        },
        watch: {
            data: {
                deep: true,
                immediate: true,
                handler() {
                    if (this.data[0].x) {
                        setTimeout(() => {
                            this.animated = true;
                        }, 1000);
                    } else {
                        this.animated = false;
                    }
                },
            },
        },
    };
</script>

<template>
    <template v-if="data[0].x">
        <circle
            class="data-circle"
            v-for="d in totalData"
            :key="d"
            :cx="d.x"
            :cy="animated ? d.y : mainChartProps.boundedHeight"
            r="6"
            :opacity="
                animated ? 0.15 : 0
            "
        />
        <circle
            class="data-circle"
            v-for="d in data"
            :key="d"
            :cx="d.x"
            :cy="animated ? d.y : mainChartProps.boundedHeight"
            :r="selection.chapter ? 8 : 6"
            :opacity="
                animated ? 1 : 0
            "
            :fill="doShowChapterColors ? chapterColors[d.section] : '#501017'"
        />
       
        <!-- <text
            :class="{
                flip: d.x > mainChartProps.boundedWidth * 0.85,
                large: selection.chapter,
            }"
            class="dot-title"
            v-for="d in data"
            :key="d"
            :x="parseFloat(d.x) + (d.x > mainChartProps.boundedWidth * 0.85 ? -3 : 3)"
            :y="d.y + (parseFloat(d.x) > mainChartProps.boundedWidth * 0.85 ? 9 : -2)"
            :opacity="
                selection.chapter && selection.chapter != d.section
                    ? 0
                    : !selection.chapter
                    ? 0.45
                    : 0.85
            "
            >{{ d.title }}</text
        > -->
    </template>
</template>

<style lang="scss">
    .data-circle {
        transition: all 300ms ease-out;
    }
    .dot-title {
        font-size: 0.575em;
        //opacity: 0.5;

        &.flip {
            text-anchor: end;
        }

        @media (max-width: 600px) {
            display: none;
        }

        &.large {
            font-size: 0.7rem;

            @media (max-width: 600px) {
                display: block;
            }
        }
    }
</style>
