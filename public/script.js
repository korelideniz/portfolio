document.addEventListener('DOMContentLoaded', async () => {
    // 1. 설정 데이터 가져오기 (상단 타이틀 및 프로젝트 카드 렌더링)
    try {
        const configResponse = await fetch('/api/config');
        const config = await configResponse.json();
        
        document.getElementById('site-title').textContent = config.title;
        document.getElementById('site-description').textContent = config.description;
        
        const projectGrid = document.getElementById('project-grid');
        projectGrid.innerHTML = ''; // 기존 내용 초기화

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

    // 2. 하단 디자인 갤러리 이미지 로드 및 클릭 이벤트 추가
    try {
        const imagesResponse = await fetch('/api/images');
        const images = await imagesResponse.json();
        const gallery = document.getElementById('image-gallery');
        gallery.innerHTML = ''; // 기존 내용 초기화

        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.alt = image.alt;
            
            // 클릭 가능함을 알리는 마우스 커서 변경
            imgElement.style.cursor = 'pointer';

            // ✨ 이미지 클릭 시 페이지 이동 로직
            imgElement.onclick = () => {
                // 이미지 파일명에 'detail1'이 포함되어 있는지 확인
                if (image.src.toLowerCase().includes('detail1')) {
                    window.location.href = '/project1'; // 상세 페이지로 이동
                } else {
                    // 다른 이미지를 클릭했을 때의 동작을 추가하고 싶다면 여기에 작성하세요.
                    console.log('이 이미지는 상세 페이지 주소가 연결되지 않았습니다.');
                }
            };

            gallery.appendChild(imgElement);
        });
    } catch (error) {
        console.error('Error loading images:', error);
    }
});
