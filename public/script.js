document.addEventListener('DOMContentLoaded', async () => {
    // 1. 상단 프로젝트 카드 및 설정 로드
    try {
        const configResponse = await fetch('/api/config');
        const config = await configResponse.json();
        
        document.getElementById('site-title').textContent = config.title;
        document.getElementById('site-description').textContent = config.description;
        
        const projectGrid = document.getElementById('project-grid');
        if (projectGrid) {
            config.projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <a href="${project.link}" class="btn">View Project</a>
                    </div>
                `;
                projectGrid.appendChild(projectCard);
            });
        }
    } catch (error) {
        console.error('Config Error:', error);
    }

    // 2. 하단 디자인 갤러리 로드 (이동 기능 포함)
    try {
        const imagesResponse = await fetch('/api/images');
        const images = await imagesResponse.json();
        const gallery = document.getElementById('image-gallery');

        if (gallery) {
            images.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.src;
                imgElement.alt = image.alt;
                
                // 클릭 가능하게 설정
                imgElement.style.cursor = 'pointer';

                // ✨ 어떤 이미지든 클릭하면 무조건 이동!
                imgElement.onclick = () => {
                    window.location.href = '/project1';
                };

                gallery.appendChild(imgElement);
            });
        }
    } catch (error) {
        console.error('Gallery Error:', error);
    }
});
