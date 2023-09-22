import { Editor } from 'https://esm.sh/@tiptap/core';
import StarterKit from 'https://esm.sh/@tiptap/starter-kit';
import Image from 'https://esm.sh/@tiptap/extension-image';
import TextAlign from 'https://esm.sh/@tiptap/extension-text-align';

const buttons = {
    bold: document.querySelector('[data-tiptap-button="bold"]'),
    italic: document.querySelector('[data-tiptap-button="italic"]'),
    image: document.querySelector('[data-tiptap-button="image"]'),
    heading2: document.querySelector('[data-tiptap-button="heading2"]'),
    heading3: document.querySelector('[data-tiptap-button="heading3"]'),
    paragraph: document.querySelector('[data-tiptap-button="paragraph"]'),
    strike: document.querySelector('[data-tiptap-button="strike"]'),
    left: document.querySelector('[data-tiptap-button="left"]'),
    center: document.querySelector('[data-tiptap-button="center"]'),
    right: document.querySelector('[data-tiptap-button="right"]'),
};

// 초기 icon active
buttons.paragraph.classList.add('active');
buttons.left.classList.add('active');

// editor 세팅
const editor = new Editor({
    element: document.querySelector('[data-tiptap-editor]'),
    extensions: [
        StarterKit,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        // Image,
        Image.configure({
            inline: true,
        }),
    ],
    content: '',
    onUpdate({ editor }) {
        buttons.heading2.classList.toggle(
            'active',
            editor.isActive('heading', { level: 2 })
        );
        buttons.heading3.classList.toggle(
            'active',
            editor.isActive('heading', { level: 3 })
        );
        buttons.paragraph.classList.toggle(
            'active',
            editor.isActive('paragraph')
        );
        buttons.bold.classList.toggle('active', editor.isActive('bold'));
        buttons.italic.classList.toggle('active', editor.isActive('italic'));
        buttons.strike.classList.toggle('active', editor.isActive('strike'));
        buttons.left.classList.toggle(
            'active',
            editor.isActive({ textAlign: 'left' })
        );
        buttons.center.classList.toggle(
            'active',
            editor.isActive({ textAlign: 'center' })
        );
        buttons.right.classList.toggle(
            'active',
            editor.isActive({ textAlign: 'right' })
        );
    },
    onSelectionUpdate({ editor }) {
        // console.log('selection update');
        buttons.heading2.classList.toggle(
            'active',
            editor.isActive('heading', { level: 2 })
        );
        buttons.heading3.classList.toggle(
            'active',
            editor.isActive('heading', { level: 3 })
        );
        buttons.paragraph.classList.toggle(
            'active',
            editor.isActive('paragraph')
        );
        buttons.bold.classList.toggle('active', editor.isActive('bold'));
        buttons.italic.classList.toggle('active', editor.isActive('italic'));
        buttons.strike.classList.toggle('active', editor.isActive('strike'));
        buttons.left.classList.toggle(
            'active',
            editor.isActive({ textAlign: 'left' })
        );
        buttons.center.classList.toggle(
            'active',
            editor.isActive({ textAlign: 'center' })
        );
        buttons.right.classList.toggle(
            'active',
            editor.isActive({ textAlign: 'right' })
        );
    },
    // onCreate({ editor }) {
    //     console.log(editor.getHTML());
    // content.innerHTML = JSON.stringify(editor.getJSON());
    // },
}); // add your configuration, extensions, content, etc.

buttons.heading2.addEventListener('click', () => {
    editor.chain().focus().toggleHeading({ level: 2 }).run();
});

buttons.heading3.addEventListener('click', () => {
    editor.chain().focus().toggleHeading({ level: 3 }).run();
});

buttons.paragraph.addEventListener('click', () => {
    editor.chain().focus().setParagraph().run();
});

buttons.bold.addEventListener('click', () => {
    buttons.bold.classList.toggle('active');
    editor.chain().focus().toggleBold().run();
});

buttons.italic.addEventListener('click', () => {
    buttons.italic.classList.toggle('active');
    editor.chain().focus().toggleItalic().run();
});

buttons.strike.addEventListener('click', () => {
    buttons.strike.classList.toggle('active');
    editor.chain().focus().toggleStrike().run();
});

buttons.left.addEventListener('click', () => {
    editor.chain().focus().setTextAlign('left').run();
});

buttons.center.addEventListener('click', () => {
    editor.chain().focus().setTextAlign('center').run();
});

buttons.right.addEventListener('click', () => {
    editor.chain().focus().setTextAlign('right').run();
});

const file = document.querySelector('#fileUploadForm');

Dropzone.autoDiscover = false; // deprecated 된 옵션. false로 해놓는걸 공식문서에서 명시

// 이미지 등록
const myDropzone = new Dropzone('#fileUploadForm', {
    paramName: 'conferenceFile', // 서버에서 사용할 파일 필드 이름
    maxFilesize: 5, // 최대 파일 크기 (MB)
    acceptedFiles: '.jpg, .jpeg, .png, .gif', // 허용하는 파일 확장자
    addRemoveLinks: true, // 업로드된 파일 삭제 링크 표시
    maxFiles: 1, // 최대 파일 수를 1로 설정
    success: function (file, response) {
        const imagePath = response.file;

        if (imagePath) {
            editor.chain().focus().setImage({ src: imagePath }).run();
        }
    },
    error: function (file, errorMessage) {
        alert('파일 업로드 실패: ' + errorMessage);
    },
});
// 파일 업로드 제한 해제 (추가 파일 업로드 가능하도록)
myDropzone.on('complete', function (file) {
    this.removeFile(file);
});
buttons.image.addEventListener('click', () => {
    file.click();
    // editor.commands.insertContent('<h1>Example Text</h1>');
});

// 행사 쓰기
const formData = new FormData();
let isConOnoff = false;
let isFree = false;

const conTitle = document.querySelector('#conTitle');
const conCompany = document.querySelector('#conCompany');
const conLocation = document.querySelector('#conLocation');
const conCategory = document.querySelector('#conCategory');
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
    conLocation.value = '';
    conCategory.value = '';
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

const postCodeBtn = document.querySelector('#postCodeBtn');
if (postCodeBtn) {
    postCodeBtn.addEventListener('click', getPostcode);
}

function getInputValue() {
    const subDateFormat = subDate.value.split(' ~ ');
    const conDateFormat = conDate.value.split(' ~ ');
    const contents = editor.getHTML();
    const textContents = editor.getText();

    const subStartDate = subDateFormat[0];
    const subEndDate = subDateFormat[1];
    const conStartDate = conDateFormat[0];
    const conEndDate = conDateFormat[1];

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
        conLocation: conLocation.value,
        conCategory: conCategory.value,
        conPrice: conPrice.value === '' ? 0 : conPrice.value, // 빈값 일 때는 0 보내기 (이렇게 안하면 db 충돌남)
        conPeople: conPeople.value,
        conCompanyUrl: conCompanyUrl.value,
        conDetail: contents,
        detailText: textContents,
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
        return document.querySelector('#conTitle').focus();
    }

    if (conDetail.trim() === '') {
        alert('행사 상세 내용을 입력해주세요.');
        return document.querySelector('#conDetail').focus();
    }

    if (conCategory === '') {
        alert('카테고리를 선택해주세요.');
        return document.querySelector('#conCategory').focus();
    }

    if (conPeople === '') {
        alert('규모를 입력해 주세요.');
        return document.querySelector('#conPeople').focus();
    }

    if (subEndDate >= conStartDate)
        return alert('행사 기간과 모집 기간을 확인해 주세요.');

    if (isConOnoff) {
        if (conDetailAddr.postCode === '') {
            alert('우편번호를 입력해 주세요.');
            return document.querySelector('#postcode').focus();
        }
        if (conDetailAddr.addr === '') {
            alert('주소를 입력해 주세요.');
            return document.querySelector('#address').focus();
        }
        if (conDetailAddr.detailAddr === '') {
            alert('상세 주소를 입력해 주세요.');
            return document.querySelector('#detailAddress').focus();
        }
    }

    if (isFree) {
        if (conPrice === '') {
            alert('가격을 입력해 주세요.');
            return document.querySelector('#conPrice').focus();
        }
    }

    return true;
}

// 전송 폼

const eventWriteBtn = document.querySelector('#event-write');

if (eventWriteBtn) {
    eventWriteBtn.addEventListener('click', registerConference);
}

async function registerConference() {
    const isFormValid = validateInput();
    const isOnoff = document.querySelector(
        'input[name="isOnoff"]:checked'
    ).value;
    const conIsfree = document.querySelector(
        'input[name="conIsfree"]:checked'
    ).value;

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
            isOnoff,
            conIsfree,
            conImagePath: imagePath,
        },
    });

    const conferenceData = await conferenceRes.data;

    if (conferenceData.result) {
        alert(
            '관리자에게 등록요청이 완료되었습니다. 등록 요청한 행사의 승인여부는 마이페이지에서 보실 수 있습니다.'
        );
        return (document.location.href = '/event');
    } else {
        alert('등록에 실패하였습니다.');
        return false;
    }
}
