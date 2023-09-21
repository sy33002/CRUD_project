const form = document.forms['register-conference'];
const formData = new FormData();
let isConOnoff = false;
let isFree = false;

const conTitle = document.querySelector('#conTitle');
const conCompany = document.querySelector('#conCompany');
const isOnoff = document.querySelector('#isOnoff');
const conLocation = document.querySelector('#conLocation');
const conCategory = document.querySelector('#conCategory');
const conIsfree = document.querySelector('#conIsfree');
const conPrice = document.querySelector('#conPrice');
const conPeople = document.querySelector('#conPeople');
const conCompanyUrl = document.querySelector('#conCompanyUrl');
const conDetail = document.querySelector('#conDetail');
const postcode = document.querySelector('#postcode');
const address = document.querySelector('#address');
const detailAddress = document.querySelector('#detailAddress');
const extraAddress = document.querySelector('#extraAddress');
const subDate = document.querySelector('#subDate');
const conDate = document.querySelector('#conDate');

function resetInputValue() {
    conTitle.value = '';
    conCompany.value = '';
    isOnoff.value = '';
    conLocation.value = '';
    conCategory.value = '';
    conIsfree.value = '';
    conPrice.value = '';
    conPeople.value = '';
    conCompanyUrl.value = '';
    conDetail.value = '';
    formData.delete('conferenceFile');
    postcode.value = '';
    address.value = '';
    detailAddress.value = '';
    extraAddress.value = '';
    subDate.value = '';
    conDate.value = '';
}

// 라디오 버튼의 변경 이벤트를 감지
$('input[type="radio"][name="isOnoff"]').change(function () {
    // 선택한 라디오 버튼의 값을 가져옴

    const selectedValue = $(this).val();

    // 만약 "오프라인"을 선택했을 때
    if (selectedValue === '1') {
        // 주소 입력 필드를 활성화
        $('.offline-option').css('display', 'block');
        isConOnoff = true;
    } else {
        $('.offline-option').css('display', 'none');
        isConOnoff = false;
    }
});

// 라디오 버튼의 변경 이벤트를 감지
$('input[type="radio"][name="conIsfree"]').change(function () {
    // 선택한 라디오 버튼의 값을 가져옴
    const selectedValue = $(this).val();

    // 만약 "유료"를 선택했을 때
    if (selectedValue === '0') {
        // 가격 입력 필드를 활성화
        $('.paid-option').css('display', 'block');
    } else {
        // "무료"를 선택했을 때
        // 가격 입력 필드를 비활성화하고 값을 지움
        $('.paid-option').css('display', 'none');
    }
});

// 가격 숫자만 추출
$("input:text[name='conPrice']").on('keyup', function () {
    $(this).val(
        $(this)
            .val()
            .replace(/[^0-9]/g, '')
    );
});

// 규모 숫자만 추출
$("input:text[name='conPeople']").on('keyup', function () {
    $(this).val(
        $(this)
            .val()
            .replace(/[^0-9]/g, '')
    );
});

// 달력 API 세팅
$('input.daterange').daterangepicker({
    autoUpdateInput: false,
    timePicker: true,
    opens: 'center',
    showDropdowns: true,
    // startDate: moment().startOf('day'),
    // endDate: moment().startOf('day').add(32, 'hour'),
    locale: {
        cancelLabel: '취소', // Cancel 버튼 텍스트 변경
        applyLabel: '적용', // Apply 버튼 텍스트 변경
        format: 'YYYY-MM-DD HH:mm',
        daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
        monthNames: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
        ],
    },
});

$('input.daterange').on('apply.daterangepicker', function (ev, picker) {
    $(this).val(
        picker.startDate.format('YYYY-MM-DD HH:mm') +
            ' ~ ' +
            picker.endDate.format('YYYY-MM-DD HH:mm')
    );
});

// 우편 찾기
function getPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            let addr = ''; // 주소 변수
            let extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') {
                // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else {
                // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if (data.userSelectedType === 'R') {
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr +=
                        extraAddr !== ''
                            ? ', ' + data.buildingName
                            : data.buildingName;
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraAddr !== '') {
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                extraAddress.value = extraAddr;
            } else {
                extraAddress.value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            postcode.value = data.zonecode;
            address.value = addr;
            // 커서를 상세주소 필드로 이동한다.
            detailAddress.focus();
        },
    }).open();
}

function getInputValue() {
    console.log(subDate.value);
    const subDate = subDate.value.split(' ~ ');
    const conDate = conDate.value.split(' ~ ');

    const subStartDate = subDate[0];
    const subEndDate = subDate[1];
    const conStartDate = conDate[0];
    const conEndDate = conDate[1];

    const conDetailAddr = {
        postCode: postcode.value,
        addr: address.value,
        detailAddr: detailAddress.value,
        extraAddr: extraAddress.value,
    };

    return {
        conTitle: conTitle.value,
        conCompany: conCompany.value,
        subStartDate,
        subEndDate,
        conStartDate,
        conEndDate,
        isOnoff: isOnoff.value,
        conLocation: conLocation.value,
        conCategory: conCategory.value,
        conIsfree: conIsfree.value,
        conPrice: conPrice.value === '' ? 0 : conPrice.value, // 빈값 일 때는 0 보내기 (이렇게 안하면 db 충돌남)
        conPeople: conPeople.value,
        conCompanyUrl: conCompanyUrl.value,
        conDetail: conDetail.value,
        conDetailAddr,
    };
}

// 유효성 검사
function validateInput() {
    const {
        conTitle,
        conDetail,
        conPeople,
        conPrice,
        conCategory,
        conStartDate,
        subEndDate,
        conDetailAddr,
    } = getInputValue();

    if (conTitle.trim() === '') {
        alert('행사 이름을 입력해주세요.');
        return conTitle.focus();
    }

    if (conDetail.trim() === '') {
        alert('행사 상세 내용을 입력해주세요.');
        return conDetail.focus();
    }

    if (conCategory === '') {
        alert('카테고리를 선택해주세요.');
        return conCategory.focus();
    }

    if (conPeople === '') {
        alert('규모를 입력해 주세요.');
        return conCategory.focus();
    }

    if (subEndDate >= conStartDate)
        return alert('행사 기간과 모집 기간을 확인해 주세요.');

    if (isConOnoff) {
        if (conDetailAddr.postCode === '') {
            alert('우편번호를 입력해 주세요.');
            return postcode.focus();
        }
        if (conDetailAddr.addr === '') {
            alert('주소를 입력해 주세요.');
            return address.focus();
        }
        if (conDetailAddr.detailAddr === '') {
            alert('상세 주소를 입력해 주세요.');
            return detailAddress.focus();
        }
    }

    if (isFree) {
        if (conPrice === '') {
            alert('가격을 입력해 주세요.');
            return conPrice.focus();
        }
    }

    return true;
}

// 전송 폼
async function registerConference() {
    const isFormValid = validateInput();

    const file = document.querySelector('#dynamic-file');
    formData.append('conferenceFile', file.files[0]);

    if (isFormValid !== true) return;

    if (!file.files[0]) return alert('대표 이미지는 필수 입니다.');

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

    const inputValue = getInputValue();

    const imagePath = imageUploadData.file;

    const conferenceRes = await axios({
        method: 'POST',
        url: '/event/write',
        data: {
            ...inputValue,
            conImagePath: imagePath,
        },
    });

    console.log(conferenceRes);
    const conferenceData = await conferenceRes.data;

    if (conferenceData.result) {
        alert(
            '관리자에게 등록요청이 완료되었습니다. 등록 요청한 행사의 승인여부는 마이페이지에서 보실 수 있습니다.'
        );
        return (document.location.href = '/event');
    } else {
        alert('등록에 실패하였습니다.');
        return (document.location.href = '/event/write');
    }
}
