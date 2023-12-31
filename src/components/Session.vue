<script>
    import {mapState} from "vuex";
    import utils from "@/scripts/utils.js";
    import YouTubeLink from "./YouTubeLink.vue";

    export default {
        name: "Session",
        components: {YouTubeLink},
        props: {},
        data() {
            return {
                activeSort: ["session", 1],
                sortedSessions: [],
                isLoaded: false,
            };
        },
        computed: {
            ...mapState({
                lockedData: state => state.lockedData,
                sessions: state => state.sessions,
                selection: state => state.selection,
                mainChartProps: state => state.mainChartProps,
                chapterColors: state => state.chapterColors,
            }),
        },
        methods: {
            changeRoute(session) {
                let query = {...this.$route.query};

                if (session && query["session"] != session.slug) {
                    query["session"] = session.slug;
                    this.$router.push({query});
                } else {
                    query["session"] = undefined;
                    this.$router.push({query});
                }
            },
            processTitle(title) {
                return title
                    .replaceAll("And", "and")
                    .replaceAll("Of", "of")
                    .replaceAll("With", "with")
                    .replaceAll("_", " ");
            },
            toggleSort(sort) {
                if (sort == this.activeSort[0]) {
                    this.activeSort[1] = this.activeSort[1] == 1 ? -1 : 1;
                } else {
                    this.activeSort = [sort, 1];
                }

                this.sortSessions();
            },
            sortSessions() {
                let sorted;

                if (this.selection.chapter) {
                    sorted = Object.values(this.sessions).filter(
                        session =>
                            utils.slugify(session.section) ==
                            this.selection.chapter
                    );
                } else {
                    sorted = Object.values(this.sessions);
                }

                if (this.activeSort[0] == "session") {
                    if (this.activeSort[1] == 1) {
                        sorted = sorted.sort((a, b) => {
                            return a.session.localeCompare(b.session);
                        });
                    } else {
                        sorted = sorted.sort((a, b) => {
                            return b.session.localeCompare(a.session);
                        });
                    }
                } else {
                    if (this.activeSort[1] == 1) {
                        sorted = sorted.sort((a, b) => {
                            return a.total_search_count - b.total_search_count;
                        });
                    } else {
                        sorted = sorted.sort((a, b) => {
                            return b.total_search_count - a.total_search_count;
                        });
                    }
                }

                this.sortedSessions = sorted;

                this.$nextTick(() => {
                    if (this.lockedData?.slug) {
                        this.scrollList(this.lockedData?.slug);
                    }
                });
            },
            setSelection(newSelection) {
                let query = {...this.$route}.query;
                query = {...query, ...newSelection.query};

                this.$router.push({query});
            },
            scrollList(session) {
                let scrollDiv = this.$refs["table-scroll"];
                if (scrollDiv) { //check that there is a reference to element we wish to scroll. If there is, proceed.
                    if (!session) {
                        scrollDiv.scrollTo({
                            top: 0,
                            behavior: "smooth",
                            duration: 100,
                        });
                        return;
                    }

                    let scrollDepth = scrollDiv?.scrollTop;
                    let rowHeight = 0
                    if (this.$refs[session][0]?.clientHeight != undefined) {
                        rowHeight = this.$refs[session][0]?.clientHeight
                    }
                    let rowOffsetTop = this.$refs[session][0]?.offsetTop - rowHeight;

                    let tableHeight =
                        this.$refs["table-container"]?.clientHeight * 0.85;

                    let isSessionVisible =
                        rowOffsetTop > scrollDepth &&
                        rowOffsetTop - 50 < scrollDepth + tableHeight;

                    let additionalOffset = 70;
                    if (window.screen.width < 601) {
                        additionalOffset = 10;
                    }

                    if (!isSessionVisible) {
                        scrollDiv?.scrollTo({
                            top: rowOffsetTop - additionalOffset,
                            behavior: "smooth",
                            duration: 100,
                        });
                        return;
                    }
                }
            },
            humanTime(minutes) {
                if (minutes < 60) {
                    return `${minutes} minutes`;
                }

                let min = minutes % 60;
                let hours = Math.floor(minutes / 60);

                return `${hours} ${
                    hours == 1 ? "hour" : "hours"
                } ${min} minutes`;
            },
            clearAll() {
                this.$router.push({});
                this.$store.commit("setSelection", {});
            },
        },
        mounted() {
            this.sortSessions();
            this.$nextTick(() => {
                if (this.lockedData?.slug) {
                    this.scrollList(this.lockedData?.slug);
                }
            });
        },

        watch: {
            lockedData: {
                deep: true,
                handler() {
                    if (this.lockedData?.slug) {
                        this.scrollList(this.lockedData?.slug);
                    } else {
                        this.scrollList();
                    }
                },
            },
            "selection.chapter": {
                deep: true,
                immediate: true,
                handler() {
                    this.sortSessions();
                },
            },
        },
    };
</script>

<template>
    <div class="Session">
        <div class="session-list-container">
            <h2>
                <!-- <span
                    class="letter-rotate"
                    v-for="letter in 'Sessions'.split('')"
                    :style="{opacity: letter == '_' ? 0 : 1}"
                    :key="letter"
                >
                    {{ letter }}
                </span> -->
                Sessions
            </h2>
            <div class="table-container" ref="table-container">
                <div class="table-header">
                    <div class="header-toggle" @click="toggleSort('session')">
                        Session
                        <span v-if="activeSort[0] == 'session'" class="arrow">
                            {{ activeSort[1] == 1 ? "&#8593;" : "&#8595;" }}
                        </span>
                    </div>
                    <div
                        class="header-toggle right-align"
                        @click="toggleSort('total_search_count')"
                    >
                        <span
                            v-if="activeSort[0] == 'total_search_count'"
                            class="arrow"
                        >
                            {{ activeSort[1] == 1 ? "&#8593;" : "&#8595;" }}
                        </span>
                        Searches
                    </div>
                </div>
                <div
                    class="table-scroll"
                    ref="table-scroll"
                    :style="{maxHeight: `24vh`}"
                >
                    <div class="table" v-if="sortedSessions[0]" ref="table">
                        <template
                            v-for="(session, index) in sortedSessions"
                            :key="index"
                        >
                            <a
                                @click="changeRoute(session)"
                                class="row"
                                :class="{
                                    active: selection?.session == session.slug,
                                    inactive:
                                        selection?.session &&
                                        selection?.session != session.slug,
                                }"
                                :ref="session.slug"
                            >
                                <div class="session">
                                    {{ processTitle(session.session) }}
                                </div>
                                <div>
                                    <div
                                        class="youtube-icon"
                                        v-if="session.video_src"
                                        title="Has a YouTube video!"
                                    >
                                        <svg
                                            width="20"
                                            height="14"
                                            viewBox="0 0 20 14"
                                            fill="none"
                                        >
                                            <g clip-path="url(#clip0_85_15)">
                                                <path
                                                    d="M19.5835 2.18627C19.353 1.32526 18.6763 0.648636 17.8153 0.418156C16.2545 0 10 0 10 0C10 0 3.74547 0 2.18637 0.418156C1.32532 0.648636 0.648666 1.32526 0.418176 2.18627C0 3.7453 0 7 0 7C0 7 0 10.2547 0.418176 11.8137C0.648666 12.6747 1.32532 13.3514 2.18637 13.5818C3.74547 14 10 14 10 14C10 14 16.2545 14 17.8136 13.5818C18.6747 13.3514 19.3513 12.6747 19.5818 11.8137C20 10.2547 20 7 20 7C20 7 20 3.7453 19.5835 2.18627Z"
                                                    fill="#d7c6c8"
                                                />
                                                <path
                                                    d="M7.99951 9.99955L13.1971 7.00002L7.99951 4.00049V9.99955Z"
                                                    fill="white"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_85_15">
                                                    <rect
                                                        width="20"
                                                        height="14"
                                                        fill="white"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                                <div class="right-align">
                                    {{
                                        (
                                            Math.floor(session.total_search_count * 10) /
                                            10
                                        ).toFixed(1)
                                    }}
                                </div>
                            </a>
                            <div
                                class="expanded-row"
                                v-if="selection?.session == session.slug && lockedData.section != undefined"
                            >
                                <div class="info">
                                    <div
                                        class="FilterBar__button__dot"
                                        :style="{
                                            background:
                                                chapterColors[
                                                    slugify(lockedData?.section)
                                                ],
                                        }"
                                    ></div>
                                    <div>
                                        {{ lockedData.section }}
                                    </div>
                                </div>
                                <div class="info">
                                    <div>
                                        Search Variation: {{ Math.floor(lockedData.search_time_std_dev) }}
                                        | Search Term Similarity: {{ lockedData.search_term_similarity }}
                                        | Total time: {{ humanTime(Math.floor(lockedData.total_duration/1000)) }}
                                    </div>
                                </div>
                                <YouTubeLink
                                    v-if="lockedData.video_thumbnail"
                                    :data="lockedData"
                                    :src="lockedData.video_src"
                                    :thumbnail="lockedData.video_thumbnail"
                                    :title="lockedData.video_title"
                                    :date="lockedData.video_date"
                                />
                            </div>
                        </template>
                        <div v-if="selection.session">
                            <div @click="clearAll()">Clear all</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="decoration">
            <div
                v-for="tab in [1, 2, 3, 4]"
                :key="tab"
                class="corner-tab"
            ></div>
        </div> -->
    </div>
</template>

<style lang="scss">
    .Session {
        position: relative;
        // max-width: 22em;
        // width: 100%;
        background: var(--background-color);
        border-radius: var(--border-radius);
        margin: 1em 0em;
        // padding-top: 1em;
        // max-height: 20em;
        color: var(--text-base-color);
        transition: all 100ms linear;
        // overflow: scroll;

        // @media (max-width: 1250px) {
        //     max-width: 15em;
        // }

        // @media (max-width: 1200px) {
        //     max-width: 14em;
        // }

        // @media (max-width: 900px) {
        //     max-width: 100%;
        // }

        // @media (max-width: 600px) {
        //     max-height: 500px;
        // }

        // @media (min-width: 1250px) {
        //     wax-width: 100%;
        // }

        .active-session {
            padding: 0 1em;

            h2 {
                text-align: center;
            }
        }

        .youtube-preview {
            width: 100%;
            background: #fff3f4;
            color: #97484f;
        }

        .session-list-container {
            h2 {
                text-align: left;
                margin: 0 0 0 0.7em;
                color: $dp-dark;

                font-family: var(--molitor);
                font-weight: 500;
                font-size: 1.3em;
                font-variation-settings: "opsz" 100, "wght" 255;

                @media (max-width: 600px) {
                    display: none;
                }
            }

            .table-scroll {
                overflow-y: scroll;
            }

            .table {
                font-size: 0.9rem;
                display: flex;
                flex-direction: column;
                height: 100%;

                @media (max-width: 600px) {
                    max-height: 23vh;
                }

                .right-align {
                    text-align: right;
                    font-variant-numeric: tabular;
                }
            }

            .table-header {
                display: grid;
                grid-template-columns: 1fr auto;
                padding: 0.25em 1rem 0.25em 1rem;
                font-size: 0.7em;

                &:hover {
                    cursor: pointer;
                }
            }

            .header-toggle {
                color: rgba($dp-dark, 0.5);

                span {
                    color: rgba($dp-dark, 0.5);
                }
            }

            .row {
                display: grid;
                grid-template-columns: 1fr auto 1.5em;
                gap: 1em;
                padding: 0.5em 1rem 0.5em 1rem;
                border-top: 1px solid $dp-pink;
                align-items: baseline;
                color: $dp-dark;
                line-height: 1.2;
                font-size: 0.9em;
                text-decoration: none;

                .index {
                    opacity: 0.4;
                }

                &:hover {
                    cursor: pointer;

                    &:hover {
                        background: rgba($dp-pink-pink, 0.15);
                    }
                }

                .youtube-icon {
                    svg {
                        max-width: 16px;
                        padding-top: 4px;
                    }
                }

                .session {
                    padding-right: 0.5em;
                    opacity: 0.7;
                }

                &.active {
                    background: white;

                    .session {
                        font-weight: 600;
                        padding-right: 0.25em;
                        opacity: 1;
                    }
                }

                &.inactive {
                    background: rgba($dp-pink-pink, 0.05);

                    &:hover {
                        background: rgba($dp-pink-pink, 0.15);
                    }
                }
            }

            .expanded-row {
                padding: 0em 3.1rem 0.6em 1rem;

                .info {
                    display: flex;
                    font-size: 0.825em;
                    width: 100%;
                    justify-content: flex-start;
                    align-items: baseline;
                    color: rgba($dp-dark, 0.75);
                }

                .YouTubeLink {
                    margin-top: 0.5em;
                }
            }

            @media (max-width: 1200px) {
                .row {
                    .session {
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }

                    .youtube-icon {
                        svg {
                            max-width: 13px;
                            padding-top: 4px;
                        }
                    }
                }
            }

            .index {
                text-align: right;
                font-size: 0.9em;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                    Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue",
                    sans-serif;
                font-weight: 600;
                color: $dp-dark;
            }
        }

        .corner-tab {
            width: 3em;
            height: 3em;
            position: absolute;
            top: -2em;
            left: -2em;
            z-index: 10;
            border-bottom: 1em solid rgb(17, 132, 147);
            border-bottom: 1em solid pink;
            border-right: 1em solid transparent;
            border-top: 1em solid transparent;
            border-left: 1em solid transparent;
            transform: rotate(-45deg);
            opacity: 0.5;

            &:nth-of-type(2) {
                right: -2em;
                left: unset;
                transform: rotate(45deg);
            }

            &:nth-of-type(3) {
                right: -2em;
                left: unset;
                bottom: -2em;
                top: unset;
                transform: rotate(135deg);
            }

            &:nth-of-type(4) {
                bottom: -2em;
                top: unset;
                transform: rotate(-135deg);
            }
        }
    }
</style>
