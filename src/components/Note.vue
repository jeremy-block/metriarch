<script>
    import {extent, min, max} from "d3";
    import utils from "@/scripts/utils.js";

    export default {
        name: "Note",
        components: {},
        props: {},
        data() {
            return {};
        },
        computed: {},
        methods: {
            setHasSeenNote() {
                this.$store.dispatch("setHasSeenNote", true);
            },
        },
        watch: {},
    };
</script>

<template>
    <div class="Note__container">
        <div class="Note">
            <h1>Hello! Quick note. <span>😊</span></h1>
            <h2>
                The interface you will see is a reserch project artifact created at the <i>University of Florida</i>.        
            </h2>
            <h4>
                The original code base is based on the work created by <em>Marguerite</em> from 
                <Link to="https://marguerite.io" do-open-in-new-tab>
                    marguerite.io
                </Link>. 
                Their work was based on, <em>Dessert Person</em>, a cookbook by Claire Saffitz and the graph was designed by Mia Johnson.
                I have no affiliations with <em>Dessert Person</em> nor Marguerite.
                <br />
                <br />
                This interface is an extention of the functionality created by Marguerite to explore of behavior metrics.
            </h4>
            <h4 class="Note__links">
                <Link to="https://www.dessertperson.com/" do-open-in-new-tab>
                    <i>Dessert Person</i> Site &#8594;
                </Link>
                <Link to="https://www.miaajohnson.com/" do-open-in-new-tab>
                    Mia Johnson Site &#8594;
                </Link>
            </h4>
            <div class="toggle-neon-separator">&nbsp; &nbsp; &nbsp; &nbsp;</div>
            <div class="flex-sections">
                <div class="section">
                    <h5>Typeface</h5>
                    <p>
                        <span>Molitor Variable Italic by</span> <Link to="https://www.205.tf/molitor" do-open-in-new-tab
                            >205TF</Link
                        >
                    </p>
                </div>
                <div class="section">
                    <h5>Publisher</h5>
                    <p>
                        Clarkson Potter
                    </p>
                </div>
                <div class="section">
                    <h5>Icon</h5>
                    <p> 
                        <Link to="https://thenounproject.com/icon/crown-1076245/" do-open-in-new-tab>by Jivan on the Noun Project</Link>
                    </p>
                </div>
                <div class="section">
                    <h5>Marguerite's original Project code</h5>
                    <p>
                        <Link
                            to="https://github.com/margueriteroth/dessert-person"
                            do-open-in-new-tab
                        >
                            Github
                        </Link>
                    </p>
                </div>
            </div>
            <div class="actions">
                <Button class="Note__button" @click="setHasSeenNote">
                    Got it!
                </Button>
                <div class="signoff">
                        <div>— Jeremy Block</div>
                    
                </div>
            </div>

            <div class="Note__mute">And mute note for 15 days</div>
        </div>
    </div>
</template>

<style lang="scss">
    .Note {
        &__container {
            background: rgba(blue, 0.95);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 4em 4em 6em;

            @media (max-width: 600px) {
                padding: 1em;
            }
        }

        max-width: 800px;
        min-height: 500px;
        width: 100%;
        border: 1px solid;
        color: white;
        padding: 2em 3em 3em;
        position: relative;
        display: flex;
        flex-direction: column;

        &:after {
            width: 5em;
            height: 5em;
            border-left: 1px solid;
            position: absolute;
            content: "";
            bottom: 0;
            right: 0;
            transform: translate(50%, 50%) rotate(45deg);
        }

        h1 span {
            font-size: 0.75em;
        }

        h2 {
            //margin-bottom: 2.5em;
            line-height: 1.2;
        }

        @media (max-width: 600px) {
            h1 {
                font-size: 1.7em;
            }
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
            //font-family: "Space Mono", monospace;
        }

        h4 {
            line-height: 1.6;

            i {
                text-decoration: underline;
            }
        }

        &__links {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 2em;
        }

        &__button {
            margin-top: auto;
            //align-self: flex-end;
            width: 10em;
            font-size: 1em;
            position: relative;
            margin-top: 2em;
        }

        .flex-sections {
            display: flex;
            gap: 2.7rem;
        }

        .actions {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
        }

        .signoff {
            h5 {
                margin: 0;
            }

            .Link {
                font-size: 0.85em;
                margin-left: 1.4em;
            }

            p {
                font-size: 0.875em;
            }
        }

        .section {
            padding-top: 1em;

            h5 {
                margin: 0;
            }

            p {
                font-size: 0.875em;
            }
        }

        .button {
            width: 100%;
            padding: 1em 0;
            align-self: start;
            max-width: 10em;

            &:hover {
                background: var(--neon-green-600);
            }
        }

        &__mute {
            padding-top: 0.4em;
            //text-align: right;
            font-size: 0.7em;
            opacity: 0.7;
        }

        .toggle-neon-separator {
            text-decoration-line: underline;
            text-decoration-style: wavy;
            text-underline-offset: 2px;
            text-decoration-thickness: 2px;
            text-decoration-color: var(--neon-green-300);
        }
    }
</style>
