import editor from './editor.js';

const reviewSubmitBtn = document.querySelector('#reviewWrite');

reviewSubmitBtn.addEventListener('click', reviewSubmit);

// 리뷰 쓰기
function reviewSubmit() {
    const title = document.querySelector('#post-title-inp').value;
    const contents = editor.getHTML();
    const textContents = editor.getText();
    const eventName = document.querySelector('#eventSelect').value;
    const conId = $('#eventSelect').find(':selected').attr('data-conId');

    if (title.trim() === '') return alert('제목을 작성해주세요.');
    if (contents.trim() === '' || contents.trim() === '<p></p>')
        return alert('내용을 작성해주세요.');
    if (!conId) return alert('행사를 선택해 주세요.');
    axios({
        method: 'POST',
        url: '/review',
        data: {
            subject: title,
            content: contents,
            content_Text: textContents,
            eventName: eventName,
            con_Id: conId,
        },
    })
        .then((res) => {
            if (res.statusText === 'OK') {
                document.querySelector('#post-title-inp').value = '';
                alert('게시글 등록이 완료되었습니다.');
                document.location.href = '/review?page=1';
            }
        })
        .catch((err) => console.error(err));
}
