Vue.component('image-grid', {
    props: ['images'],
    template: `
        <div class="row">
            <div class="column" v-for="(image, index) in images" :key="index">
                <div class="image-container" @click="goToProject(image.src)" style="cursor: pointer;">
                    <img :src="image.src" :alt="image.alt">
                </div>
            </div>
        </div>
    `,
    methods: {
        goToProject(src) {
            // 이미지 경로에 'detail1'이 포함되어 있으면 이동
            if (src.toLowerCase().includes('detail1')) {
                window.location.href = '/project1';
            }
            // 만약 모든 이미지가 이동하게 하고 싶다면 아래 주석을 해제하세요
            // window.location.href = '/project1';
        }
    }
});

new Vue({
    el: '#app',
    data: {
        config: {},
        images: [],
        currentText: '',
        currentYear: new Date().getFullYear()
    },
    mounted() {
        this.fetchConfig();
        this.fetchImages();
    },
    methods: {
        fetchConfig() {
            fetch('/api/config')
                .then(response => response.json())
                .then(config => {
                    this.config = config;
                    this.startTextAnimation();
                    document.title = config.siteTitle || 'Portfolio';
                    if (config.siteDescription) {
                        const metaDesc = document.querySelector('meta[name="description"]');
                        if (metaDesc) metaDesc.setAttribute('content', config.siteDescription);
                    }
                    if (config.authorName) {
                        const metaAuthor = document.querySelector('meta[name="author"]');
                        if (metaAuthor) metaAuthor.setAttribute('content', config.authorName);
                    }
                })
                .catch(error => {
                    console.error('Error fetching config:', error);
                });
        },
        fetchImages() {
            fetch('/api/images')
                .then(response => response.json())
                .then(images => {
                    this.images = images;
                })
                .catch(error => {
                    console.error('Error fetching images:', error);
                });
        },
        startTextAnimation() {
            if (this.config.heroTexts && this.config.heroTexts.length > 0) {
                let index = 0;
                this.currentText = this.config.heroTexts[0];

                setInterval(() => {
                    index = (index + 1) % this.config.heroTexts.length;
                    this.currentText = this.config.heroTexts[index];
                }, 3000);
            }
        }
    }
});
