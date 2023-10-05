// 찜하기 기능
var currentPageURL = window.location.href;
// URL에서 숫자 추출
var match = currentPageURL.match(/\/(\d+)(?:#.*)?$/);
var number1 = match[1];
async function saveConference(con_id) {
    try {
        if (match) {
            // axios를 사용하여 POST 요청 보내기
            const response = await axios.post(`/event/${number1}`, {
                con_id: number1,
            });

            if (response.data.result === 1) {
                if (
                    confirm(
                        '로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?'
                    )
                ) {
                    // 로그인 페이지로 이동하기 전에 현재 페이지 URL을 쿠키에 저장
                    document.cookie = `redirectURL=${encodeURIComponent(
                        currentPageURL
                    )}; path=/`;
                    const res = await axios.get('/login', document.cookie);
                    // 로그인 페이지로 이동
                    window.location.href = '/login';
                } else {
                    window.location.reload();
                }
            } else if (response.data.result === 2) {
                if (
                    confirm(
                        '이미 찜한 행사입니다! 찜한 행사는 마이페이지에서 확인할 수 있습니다.'
                    )
                ) {
                    //confirm에서 확인 누르면
                    window.location.href = `/myPage/myFavoriteConListRender?userId=${response.data.id.id}`;
                } else {
                    //confirm에서 취소 누르면
                    window.location.reload();
                }
            } else {
                if (
                    confirm(
                        '찜성공! 찜한 행사는 마이페이지에서 확인할 수 있습니다.'
                    )
                ) {
                    //confirm에서 확인 누르면
                    window.location.href = `/myPage/myFavoriteConListRender?userId=${response.data.id.id}`;
                } else {
                    //confirm에서 취소 누르면
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

// 리뷰 쓰기
function reviewWrite() {
    const conId = $('#conId').attr('data-id');
    window.location.href = `/review/write?id=${conId}`;
}

// 쿠키 기능
function getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length == 2) return parts.pop().split(';').shift();
}

// copy 기능
const copy = () => {
    const url = window.location.href;

    // 클립보드에 복사
    window.navigator.clipboard.writeText(url).then(() => {
        alert('복사 완료 !');
    });
};
// 문의하기

document.addEventListener('DOMContentLoaded', function () {
    const emailForm = document.getElementById('emailForm');

    emailForm.addEventListener('submit', async function (e) {
        e.preventDefault(); // 폼 기본 동작 방지

        const name = document.getElementById('name').value;
        const emailAddr = document.getElementById('email').value;
        const emailContent =
            document.getElementsByName('emailContent')[0].value;

        // 이제 name, emailAddr, emailContent를 사용할 수 있습니다.
        console.log('이름:', name);
        console.log('이메일 주소:', emailAddr);
        console.log('이메일 내용:', emailContent);

        try {
            // axios를 사용하여 서버로 데이터를 전송하면 됩니다.
            const response = await axios.post(`/event/${number1}/mail`, {
                name,
                emailAddr,
                emailContent,
            });
            console.log(response.data);
            if (response.data.result === true) {
                alert('관리자에게 문의 내용이 이메일로 전달되었습니다.');
                window.location.reload();
            } else {
                alert('이메일 전송에 실패하였습니다.');
            }
        } catch (error) {
            console.error(error);
            alert('오류가 발생하여 이메일을 전송할 수 없습니다.');
        }
    });
});

// 해시 태그
const is_onoff = document.querySelector('#is_onoff').textContent.trim();
const con_isfree = document.querySelector('#con_isfree').textContent.trim();
const con_category = document.querySelector('#con_category').textContent.trim();

// 이미지
const con_img_src = document.querySelector('#con_img').src;

// 관심 수
const confavorite = document.querySelector('#confavorite').textContent;

const reviewsLength = document.querySelectorAll('.reviews').length;

const con_title = document.querySelector('#con_title').textContent.trim();

// 공유 버튼
Kakao.Share.createDefaultButton({
    container: '#kakaotalk-sharing-btn',
    objectType: 'feed',
    content: {
        title: con_title,
        description: `#개발 컨퍼런스 ${is_onoff} ${con_isfree} ${con_category}`,
        imageUrl: con_img_src,
        link: {
            // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
            mobileWebUrl: window.location.host,
            webUrl: window.location.host,
        },
    },
    social: {
        likeCount: Number(confavorite),
        commentCount: Number(reviewsLength),
    },
    buttons: [
        {
            title: '웹으로 보기',
            link: {
                mobileWebUrl: window.location.href,
                webUrl: window.location.href,
            },
        },
    ],
});
