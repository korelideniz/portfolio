document.addEventListener('DOMContentLoaded', async () => {
    // 1. 설정 데이터(제목, 설명) 가져오기
    try {
        const configResponse = await fetch('/api/config');
        const config = await configResponse.json();
        
        // 메인 타이틀과 설명 넣기 (해당 ID가 HTML에 있어야 합니다)
        if(document.getElementById('site-title')) {
            document.getElementById('site-title').textContent = config.title;
        }
        if(document.getElementById('site-description')) {
            document.getElementById('site-description').textContent = config.description;
        }
        
        // 프로젝트 카드 그리기
        const projectGrid = document.getElementById('project-grid');
        if (projectGrid) {
            projectGrid.innerHTML = ''; 
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
        console.error('설정 로딩 중 에러:', error);
    }

    // 2. 하단 갤러리 이미지 가져오기 및 클릭 이벤트
    try {
        const imagesResponse = await fetch('/api/images');
        const images = await imagesResponse.json();
        const gallery = document.getElementById('image-gallery');
        
        if (gallery) {
            gallery.innerHTML = '';
            images.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.src;
                imgElement.alt = image.alt;
                imgElement.style.cursor = 'pointer'; // 클릭 가능 표시

                // ✨ 클릭 시 detail1이 포함된 파일이면 /project1로 이동
                imgElement.onclick = () => {
                    if (image.src.toLowerCase().includes('detail1')) {
                        window.location.href = '/project1';
                    }
                };
                gallery.appendChild(imgElement);
            });
        }
    } catch (error) {
        console.error('이미지 로딩 중 에러:', error);
    }
});
