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
