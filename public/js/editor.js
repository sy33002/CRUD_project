import { Editor } from 'https://esm.sh/@tiptap/core';
import StarterKit from 'https://esm.sh/@tiptap/starter-kit';
import Image from 'https://esm.sh/@tiptap/extension-image';
import TextAlign from 'https://esm.sh/@tiptap/extension-text-align';

(function () {
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
            // content.innerHTML = JSON.stringify(editor.getJSON());
            // console.log(editor.getHTML());

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
            buttons.italic.classList.toggle(
                'active',
                editor.isActive('italic')
            );
            buttons.strike.classList.toggle(
                'active',
                editor.isActive('strike')
            );
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
            buttons.italic.classList.toggle(
                'active',
                editor.isActive('italic')
            );
            buttons.strike.classList.toggle(
                'active',
                editor.isActive('strike')
            );
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
            // console.log(file);
            // console.log(response);
            const imagePath = response.file.path;
            const url = '/' + imagePath.replace('public/', 'static/'); // public 경로를 static으로 변경
            if (url) {
                editor.chain().focus().setImage({ src: url }).run();
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

    const submitBtn = document.querySelector('.submit');

    submitBtn.addEventListener('click', () => {
        const title = document.querySelector('#post-title-inp').value;
        const contents = editor.getHTML();
        const textContents = editor.getText();
        const eventName = document.querySelector('#eventSelect').value;
        const conId = $('#eventSelect').find(':selected').attr('data-conId');

        if (title.trim() === '') return alert('제목을 작성해주세요.');
        if (contents.trim() === '' || contents.trim() === '<p></p>')
            return alert('내용을 작성해주세요.');
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
    });
})();
