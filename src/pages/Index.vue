<script>
    import {mapState} from "vuex";
    import Scatterplot from "@/components/Scatterplot/Scatterplot.vue";
    import facetedScatterplot from "../components/facetedScatterplot.vue";

    export default {
        name: "Index",
        components: {
            Scatterplot,
            facetedScatterplot,
        },
        data() {
            return {
                isLoaded: false,
            };
        },
        computed: {
            ...mapState({
                hasSeenNote: state => state.hasSeenNote,
                sessions: state => state.sessions,
            }),
        },
        methods: {
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
            <div class="col subtitle">
                <Button @click="toggleNote" class="note-btn"> See Note </Button>
            </div>
            <FilterBar />
        </div>
        <div class="explorationTool">
            <div class="left">    
                <faceted-scatterplot class="splom-grid-area"/>
                <Session class="table-grid-area" />
            </div>
            <div class="right">
                <wonderplot class="graph-grid-area" title="Metric Comparison" ref="wonderful"/>
            </div>
            <!-- <Scatterplot title="Name of Chart" :xAccessor="DoXThing()" :yAccessor="DoYThing()" ref="plot" /> -->
        </div>
        <Note v-if="!hasSeenNote.hasSeenNote" />
    </MaxWidth>
</template>

<style lang="scss">
    @import "./../styles/globals";

    .Index {
        height: 100vh;
        padding: 0em 2em 2em 2em;
        position: relative;
        background-color:rgb(203, 179, 197);
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

        // .flex {
        //     display: flex;
        //     gap: 2em;
        //     position: relative;
        //     z-index: 10;

        //     @media (max-width: 900px) {
        //         flex-direction: column;
        //     }

        //     @media (max-width: 600px) {
        //         gap: 1em;
        //     }
        // }
        
        .left, .right{
            width: 47vw;
        }


        .splom-grid-area{
            grid-area: "splom";
        }
        .table-grid-area{
            grid-area: "table";
        }
        .graph-grid-area{
            grid-area: "graph";
            // grid-row: span 2;
        }
        .explorationTool{
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 0.5em;
            grid:
            "splom graph" minmax(100px, auto);
            // "table graph" minmax(100px, auto);
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
