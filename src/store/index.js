import {createStore} from "vuex";
import utils from "../scripts/utils";

const store = createStore({
    state() {
        return {
            localStorageKey: "dessertperson_",
            hasSeenNote:
                typeof window !== "undefined" &&
                localStorage.getItem("dessertperson_")
                    ? JSON.parse(localStorage.getItem("dessertperson_"))
                    : {hasSeenNote: false, expire: ""},
            mode: "dev",
            lockedData: {
                data: {},
                index: "",
            },
            data: [],
            sessions: {},
            selection: {
                session: "",
                chapter: "",
                other: [],
            },
            mainChartProps: {},
            doShowChapterColors: false,
            doShowVoronoi: false,

            chapterColors: {},
        };
    },

    mutations: {
        setMode(state, mode) {
            state.mode = mode;
        },
        toggleChapterColors(state) {
            state.doShowChapterColors = !state.doShowChapterColors;
        },
        toggleVoronoi(state) {
            state.doShowVoronoi = !state.doShowVoronoi;
        },
        setDimensions(state, dimnsions) {
            state.mainChartProps = dimnsions;
        },
        setLockedData(state, data) {
            state.lockedData = data;
        },
        setData(state, data) {
            let processed = [...data];
            processed.forEach(row => {
                let slug = row.session
                    .toLowerCase()
                    .replaceAll(" ", "-")
                    .replaceAll("'", "");
                slug = slug.replace(/(?:[^\w-.]+|_+)/g, " ");
                row["slug"] = slug;
            });
            state.data = processed;

            let sessions = {};
            data.forEach(row => {
                sessions[row.slug] = row;
            });

            let chapters = [
                ...new Set(data.map(row => utils.slugify(row.section))),
            ];
            let colors = [
                "#56CCF2",
                "#F2C94C",
                "#6FCF97",
                "#827AE8",
                "#BB6BD9",
                "#EB5757",
                "#BDEFFF",
            ];
            let chapterColors = {};
            chapters.forEach((chapter, i) => {
                chapterColors[chapter] = colors[i];
            })

            state.sessions = sessions;
            state.chapterColors = chapterColors;
        },
        setHasSeenNote(state, hasSeenNote) {
            if (!hasSeenNote) {
                localStorage.removeItem(state.localStorageKey);
                state.hasSeenNote = {hasSeenNote: false, expire: ""};
                return;
            }

            let expire = new Date();
            expire.setDate(expire.getDate() + 15);

            let agreedObj = {
                hasSeenNote: true,
                expire,
            };

            state.hasSeenNote = agreedObj;

            localStorage.setItem(
                state.localStorageKey,
                JSON.stringify(agreedObj)
            );
        },
        setSelection(state, newSelection) {
            state.selection = newSelection;
        },
    },

    actions: {
        setMode({commit}, mode) {
            commit("setMode", mode);
        },
        setLockedData({commit}, data) {
            commit("setLockedData", data);
        },
        setData({commit}, data) {
            commit("setData", data);
        },
        setHasSeenNote({commit}, hasSeenNote) {
            commit("setHasSeenNote", hasSeenNote);
        },
    },
});

export default store;
