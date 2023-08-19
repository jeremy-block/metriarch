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
            columnNames: [],
            numericColumnNames: [],
            lockedDimension: {
                x: "",
                y: "",
            },
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
            mainChartProps: {}, //todo: modify to accept the new tuple: lockedDimension
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
        setMetrics(state, metricSet) {
            state.lockedDimension.x = metricSet[0];
            state.lockedDimension.y = metricSet[1];
        },
        setDimensions(state, dimnsions) {
            // console.log("Dimnsions are:", dimnsions);
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
            });

            // Defines the set of columns in the dataset.
            state.columnNames = Object.keys(state.data[0]);
            // Filter and return only the numeric variables from your data object
            const numericVars = state.columnNames.filter(key => {
                // console.log(
                // parseFloat(state.data[0][key]),
                // isNaN(parseFloat(state.data[0][key]))
                // );
                return !isNaN(parseFloat(state.data[0][key])); //If the float parser identifies NaN - then remove from numeric list.
            });
            // console.log(numericVars);

            state.sessions = sessions;
            state.chapterColors = chapterColors;
            state.numericColumnNames = numericVars; // The set of dimentions that are numeric
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
        setMetrics({commit}, data) {
            commit("setMetrics", data);
        },
        setDimensions({commit}, data) {
            commit("setDimensions", data);
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
