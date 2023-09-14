// 라디오 버튼의 변경 이벤트를 감지
$('input[type="radio"][name="isOnoff"]').change(function () {
    // 선택한 라디오 버튼의 값을 가져옴
    var selectedValue = $(this).val();

    // 만약 "오프라인"을 선택했을 때
    if (selectedValue === 'true') {
        // 주소 입력 필드를 활성화
        $('#conLocation').prop('disabled', false);
    } else if (selectedValue === 'false') {
        // "온라인"을 선택했을 때
        // 주소 입력 필드를 비활성화하고 값을 지움
        $('#conLocation').prop('disabled', true).val('');
    }
});

// 라디오 버튼의 변경 이벤트를 감지
$('input[type="radio"][name="conIsfree"]').change(function () {
    // 선택한 라디오 버튼의 값을 가져옴
    let selectedValue = $(this).val();

    let isFree = selectedValue === 'true';

    // 만약 "유료"를 선택했을 때
    if (selectedValue === 'false') {
        // 가격 입력 필드를 활성화
        $('#conPrice').prop('disabled', false);
    } else if (selectedValue === 'true') {
        // "무료"를 선택했을 때
        // 가격 입력 필드를 비활성화하고 값을 지움
        $('#conPrice').prop('disabled', true).val('');
    }
    console.log('isFree 값: ', isFree);
});

// 가격 숫자만 추출
$("input:text[name='conPrice']").on('keyup', function () {
    $(this).val(
        $(this)
            .val()
            .replace(/[^0-9]/g, '')
    );
});

async function registerConference() {
    const form = document.forms['register-conference'];

    const formData = new FormData();
    const file = document.querySelector('#dynamic-file');
    formData.append('conferenceFile', file.files[0]);

    // 유효성 검사
    if (form.conTitle.value.trim() === '') {
        alert('행사 이름을 입력해주세요.');
        return form.conTitle.focus();
    }
    if (form.conDetail.value.trim() === '') {
        alert('행사 상세 내용을 입력해주세요.');
        return form.conDetail.focus();
    }

    if (!file.files[0]) return alert('대표 이미지는 필수 입니다.');

    if (form.conCategory.value === '') {
        alert('카테고리를 선택해주세요.');
        return form.conCategory.focus();
    }

    if (
        form.conStartDate.value &&
        form.conEndDate.value &&
        form.subStartDate.value &&
        form.subEndDate.value
    ) {
        // 행사 시작일이 행사 종료일보다 빠른지 검사
        // 모집 시작일이 모집 종료일보다 빠른지 검사
        // 행사일이 모집일보다 빠른지 검사
    } else {
        return alert('행사 시간을 선택해 주세요.');
    }

    if (form.conPeople.value === '') return alert('규모를 입력해 주세요.');

    const imageUploadRes = await axios({
        method: 'POST',
        url: '/upload/event',
        data: formData,
        header: {
            'Content-Type': 'multipart/form-data', // enctype="multipart/form-data"
        },
    });
    const imageUploadData = await imageUploadRes.data;

    if (!imageUploadData.result) return alert('이미지 등록이 실패 되었습니다.');

    const imagePath = imageUploadData.file.path;
    const newImagePath = imagePath.replace('public/', '/static/'); // public 경로를 static으로 변경

    const conferenceRes = await axios({
        method: 'POST',
        url: '/event/write',
        data: {
            conTitle: form.conTitle.value,
            conCompany: form.conCompany.value,
            conStartDate: form.conStartDate.value,
            conEndDate: form.conEndDate.value,
            subStartDate: form.subStartDate.value,
            subEndDate: form.subEndDate.value,
            isOnoff: form.isOnoff.value,
            conLocation: form.conLocation.value,
            conCategory: form.conCategory.value,
            conIsfree: form.conIsfree.value,
            conPrice: form.conPrice.value === '' ? 0 : form.conPrice.value, // 빈값 일 때는 0 보내기 (이렇게 안하면 db 충돌남)
            conPeople: form.conPeople.value,
            conCompanyUrl: form.conCompanyUrl.value,
            conImagePath: newImagePath,
            conDetail: form.conDetail.value,
        },
    });
    const conferenceData = await conferenceRes.data;

    if (conferenceData.result) {
        alert('등록이 완료되었습니다.');
        document.location.href = '/event';
    } else {
        alert('등록에 실패하였습니다.');
    }
}
