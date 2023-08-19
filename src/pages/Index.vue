<script>
    import {mapState} from "vuex";
    import Scatterplot from "@/components/Scatterplot/Scatterplot.vue";
    import SelectionPanel from '@/components/SelectionPanel.vue';

    export default {
        name: "Index",
        components: {
            Scatterplot,
            SelectionPanel,
        },
        data() {
            return {
                isLoaded: false,
                plotHeight: 0,
            };
        },
        computed: {
            ...mapState({
                hasSeenNote: state => state.hasSeenNote,
                selection: state => state.selection,
                sessions: state => state.sessions,
            }),
        },
        methods: {
            DoXThing:() => d => d.minutes,
            DoYThing: () => d => d.difficulty,
            toggleNote() {
                this.$store.dispatch("setHasSeenNote", false);
            },
        },
        watch: {
            sessions() {
                if (Object.keys(this.sessions).length) {
                    this.isLoaded = true;
                }
            },
        },
    };
</script>

<template>
    <MaxWidth class="Index" size="l" v-if="isLoaded">
        <div class="metas">
            <div>
                <DessertPersonTitle />
                <div class="subtitle">
                    <p>
                        Cookbook by Clare Saffitz / Book & Infographic designed by
                        Mia Johnson
                        / Original Interactive UI built by <a href="https://github.com/margueriteroth">@margueriteroth</a>
                    </p>
                </div>
            </div>
            <div class="col">
                <Button @click="toggleNote" class="note-btn"> See Note </Button>
            </div>
        </div>
        <SelectionPanel/>
        <FilterBar />
        <div class="flex">
            <wonderplot ref="wonderful"/>
            <Scatterplot title="Name of Chart" :xAccessor="DoXThing()" :yAccessor="DoYThing()" ref="plot" />
            <Session />
        </div>
        <Note v-if="!hasSeenNote.hasSeenNote" />
    </MaxWidth>
</template>

<style lang="scss">
    @import "./../styles/globals";

    .Index {
        height: 100%;
        padding: 0em 2em 6em 2em;
        position: relative;
        background-color: rgb(193, 163, 158);
        // background: url("/images/background-marble-04.jpg");
        // background-repeat: no-repeat;
        // background-size: cover;
        // height: 100vh;
        // max-height: 2000px;

        @media (max-width: 600px) {
            padding: 0 1em;
        }

        .metas {
            // padding: 1em 0;
            color: var(--background-color);
            position: relative;
            z-index: 10;
            display: flex;
            justify-content: space-between;
            align-items: end;

            @media (max-width: 600px) {
                align-items: end;
            }

            .col {
                padding-bottom: 0.5em;
            }
        }

        .note-btn {
            font-weight: 500;
            background: $dp-pink;
            border: 1px solid darken($dp-pink, 20%);
            color: white;
            border-radius: 2px;
            color: $dp-dark;
            font-size: 0.9em;
            opacity: 0.7;
            transition: all 100ms linear;
            white-space: nowrap;

            @media (max-width: 600px) {
                padding-bottom: 0.25em;
            }

            &:hover {
                opacity: 1;
                transition: all 100ms linear;
            }
        }

        .flex {
            display: flex;
            gap: 2em;
            position: relative;
            z-index: 10;

            @media (max-width: 900px) {
                flex-direction: column;
            }

            @media (max-width: 600px) {
                gap: 1em;
            }
        }

        img {
            position: relative;
        }

        .title {
            max-width: 400px;
        }

        .FilterBar {
            position: relative;
            z-index: 10;
        }
        .subtitle{
            display: none;
        }
    }
</style>
