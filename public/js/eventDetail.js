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

// 찜하기 기능
async function saveConference(con_id) {
    try {
        var currentPageURL = window.location.href;

        // URL에서 숫자 추출
        var match = currentPageURL.match(/\/(\d+)$/);
        if (match) {
            var number1 = match[1];

            console.log(number1);

            // axios를 사용하여 POST 요청 보내기
            const response = await axios.post(`/event/${number1}`, {
                con_id: number1,
            });

            console.log(response.data.result);
            if (response.data.result === 1) {
                if (
                    confirm(
                        '로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?'
                    )
                ) {
                    // 로그인 페이지로 이동하기 전에 현재 페이지 URL을 쿠키에 저장
                    document.cookie = 'returnTo=' + currentPageURL;

                    // 로그인 페이지로 이동
                    window.location.href = '/login';
                }
            } else if (response.data.result === 2) {
                if (
                    confirm(
                        '이미 찜한 행사입니다! 찜한 행사는 마이페이지에서 확인할 수 있습니다.'
                    )
                ) {
                    window.location.href = `/myPage/myFavoriteConListRender?userId=${response.data.id.user_id}`;
                }
            } else {
                if (
                    confirm(
                        '찜성공! 찜한 행사는 마이페이지에서 확인할 수 있습니다.'
                    )
                ) {
                    window.location.href = `/myPage/myFavoriteConListRender?userId=${response.data.id.user_id}`;
                }
                // 쿠키에서 이전 페이지 URL을 가져옴
                var previousPage = getCookie('previousPage');

                if (previousPage) {
                    // 이전 페이지 URL이 존재하면 해당 페이지로 이동
                    window.location.href = previousPage;
                } else {
                    // 이전 페이지 URL이 없으면 페이지 새로고침
                    window.location.reload();
                }
            }
        } else {
            console.error('URL에서 숫자를 찾을 수 없습니다.');
        }
    } catch (error) {
        // 예외 처리 코드
        console.error('에러 발생:', error);
    }
}

// 쿠키 기능
function getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length == 2) return parts.pop().split(';').shift();
}

// 카카오 지도 API

window.onload = function () {
    // Kakao 지도 API 초기화
    kakao.maps.load(function () {
        var container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
        var postCode = '<%- conference.con_detail_location.addr %>'; // 페이지에서 받아온 우편번호 사용

        // Geocoder 초기화
        var geocoder = new kakao.maps.services.Geocoder();

        // 주소 검색
        geocoder.addressSearch(postCode, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 지도 생성 및 마커 추가
                var map = new kakao.maps.Map(container, {
                    center: coords,
                    level: 3,
                });

                var marker = new kakao.maps.Marker({
                    position: coords,
                    map: map,
                });
            }
        });
    });
};
