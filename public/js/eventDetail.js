$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
// 원하는 섹션을 식별합니다.
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 400; // 추가 스크롤 간격 설정 (100px)
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth', // 부드럽게 스크롤
        });
    }
}

// 각 카테고리 버튼에 대한 이벤트 리스너 추가
document.getElementById('btnradio1').addEventListener('click', function () {
    scrollToSection('con_intruduce');
});

document.getElementById('btnradio2').addEventListener('click', function () {
    scrollToSection('con_location');
});

document.getElementById('btnradio3').addEventListener('click', function () {
    scrollToSection('con_content');
});

document.getElementById('btnradio4').addEventListener('click', function () {
    scrollToSection('con_review');
});

document.addEventListener('DOMContentLoaded', function () {
    const inquiryForm = document.getElementById('inquiry-form');
    const responseMessage = document.getElementById('response-message');

    // 저장된 폼 데이터가 있는지 확인하고 화면에 표시
    const savedFormData = localStorage.getItem('inquiryFormData');
    if (savedFormData) {
        const formData = JSON.parse(savedFormData);
        document.getElementById('name').value = formData.name;
        document.getElementById('email').value = formData.email;
        document.getElementById('message').value = formData.message;
    }

    // 문의하기 폼 제출 이벤트 처리
    inquiryForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // 폼 데이터 수집
        const formData = new FormData(inquiryForm);

        // 폼 데이터를 로컬 스토리지에 저장
        localStorage.setItem(
            'inquiryFormData',
            JSON.stringify(Object.fromEntries(formData))
        );

        // 여기에서 서버로 폼 데이터를 전송하고 관리자 답변을 받아옵니다.
        // 예를 들어, fetch API를 사용할 수 있습니다.
        // 이 부분은 백엔드와의 통합에 따라 다를 수 있습니다.

        // 폼 데이터 초기화
        inquiryForm.reset();

        // 관리자 답변을 화면에 표시 (가정)
        const adminResponse =
            '관리자: 문의해 주셔서 감사합니다. 빠른 시일 내에 답변 드리겠습니다.';
        responseMessage.innerHTML = adminResponse;

        // 저장된 폼 데이터 삭제
        localStorage.removeItem('inquiryFormData');
    });
});
