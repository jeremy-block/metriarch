<script>
    export default {
        name: "DessertPersonTitle",
        components: {},
        props: {},
        data() {
            return {
                isHovered: false,
                shadowFill: "#00e101",
                gradientTransformDeg: 90,
            };
        },
        computed: {},
        methods: {},
    };
</script>

<template>
    <div class="DessertPersonTitle">
        
        <h1>
        <svg width="10%" viewBox="0 0 88 66" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
            <g transform="matrix(1,0,0,1,-6.2,-16.5)">
                <path d="M86.3,30.6C82.2,30.6 78.9,33.9 78.9,38C78.9,40.2 79.9,42.1 81.4,43.5L65.7,51.9L52.4,32C55.4,30.8 57.5,27.9 57.5,24.5C57.5,20.1 53.9,16.5 49.5,16.5C45.1,16.5 41.5,20.1 41.5,24.5C41.5,27.9 43.6,30.8 46.6,31.9L32.5,51.8L18.2,43.7C19.9,42.4 21,40.3 21,37.9C21,33.8 17.7,30.5 13.6,30.5C9.5,30.5 6.2,33.8 6.2,37.9C6.2,41.5 8.8,44.5 12.2,45.1L16.6,77.8C17,80.4 19.2,82.3 21.8,82.3L77.2,82.3C79.8,82.3 82.1,80.4 82.4,77.7L86.8,45.1C90.6,44.8 93.6,41.6 93.6,37.8C93.7,33.9 90.4,30.6 86.3,30.6ZM49.6,20.6C51.8,20.6 53.6,22.4 53.6,24.6C53.6,26.8 51.8,28.6 49.6,28.6C47.4,28.6 45.6,26.8 45.6,24.6C45.6,22.4 47.4,20.6 49.6,20.6ZM10.3,37.9C10.3,36 11.8,34.5 13.7,34.5C15.6,34.5 17.1,36 17.1,37.9C17.1,39.8 15.6,41.3 13.7,41.3C11.8,41.3 10.3,39.8 10.3,37.9ZM16.6,47.4L32.1,56.2C33,56.7 34.1,56.5 34.7,55.6L49.5,34.9L63.3,55.6C63.9,56.5 65,56.7 65.9,56.3L82.5,47.4L79.9,67.2L19.2,67.2L16.6,47.4ZM77.3,78.4L21.9,78.4C21.3,78.4 20.7,77.9 20.6,77.3L19.8,71L79.4,71L78.6,77.2C78.5,78 77.9,78.4 77.3,78.4ZM86.3,41.3C84.4,41.3 82.9,39.8 82.9,37.9C82.9,36 84.4,34.5 86.3,34.5C88.2,34.5 89.7,36 89.7,37.9C89.7,39.8 88.2,41.3 86.3,41.3Z" style="fill-rule:nonzero; fill: var(--background-color);"/>
            </g>
        </svg>
            M<span>etriarch</span>
        </h1>
    </div>
</template>

<style lang="scss">
    .DessertPersonTitle {
        h1 {
            font-family: var(--molitor);
            letter-spacing: 0.05em;
            font-weight: 600;
            font-size: 3.5em;
            color: var(--background-color);
            margin: 0.25em 0;
            font-variation-settings: "opsz" 100, "wght" 230;

            span {
                font-variation-settings: "opsz" 900, "wght" 235;
                font-size: 0.95em;
                padding-left: 3px;
                letter-spacing: 0.035em;
            }
        }
    }
</style>
