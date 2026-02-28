document.addEventListener('DOMContentLoaded', async () => {
    // 1. 기본 설정 및 프로젝트 카드 로드
    try {
        const configResponse = await fetch('/api/config');
        const config = await configResponse.json();
        
        document.getElementById('site-title').textContent = config.title;
        document.getElementById('site-description').textContent = config.description;
        
        const projectGrid = document.getElementById('project-grid');
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
    } catch (error) {
        console.error('Error loading config:', error);
    }

    // 2. 하단 갤러리 이미지 로드 (이 부분이 핵심!)
    try {
        const imagesResponse = await fetch('/api/images');
        const images = await imagesResponse.json();
        const gallery = document.getElementById('image-gallery');

        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.alt = image.alt;
            
            // 이미지 클릭 시 이동 기능 추가
            imgElement.style.cursor = 'pointer';
            imgElement.onclick = () => {
                // 파일명에 detail1이 포함되어 있으면 project1 페이지로 이동
                if (image.src.toLowerCase().includes('detail1')) {
                    window.location.href = '/project1';
                }
            };

            gallery.appendChild(imgElement);
        });
    } catch (error) {
        console.error('Error loading images:', error);
    }
});
