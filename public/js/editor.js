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
            Image,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
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

    const file = document.querySelector('#fileInput');

    buttons.image.addEventListener('click', () => {
        file.click();
        fileInput.addEventListener('change', async () => {
            try {
                const formData = new FormData();
                console.dir(fileInput.files);
                formData.append('conferenceFile', fileInput.files[0]);
                const imageUploadRes = await axios({
                    method: 'POST',
                    url: '/upload/review',
                    data: formData,
                    headers: {
                        // 수정: 'header' 대신 'headers'를 사용
                        'Content-Type': 'multipart/form-data', // enctype="multipart/form-data"
                    },
                });

                const imageUploadData = await imageUploadRes.data;
                if (!imageUploadData.result) {
                    alert('이미지 등록이 실패 되었습니다.');
                    return;
                }

                console.log(imageUploadData.file);

                const imagePath = imageUploadData.file.path;
                const url = '/' + imagePath.replace('public/', 'static/'); // public 경로를 static으로 변경
                if (url) {
                    editor.chain().focus().setImage({ src: url }).run();
                }
            } catch (error) {
                console.error('이미지 업로드 오류:', error);
                alert('이미지 업로드 중 오류가 발생했습니다.');
            }
        });
    });

    // file.addEventListener('change', async () => {
    //     const formData = new FormData();
    //     const file = document.querySelector('#fileInput');
    //     formData.append('conferenceFile', file.files[0]);

    //     const imageUploadRes = await axios({
    //         method: 'POST',
    //         url: '/upload/review',
    //         data: formData,
    //         header: {
    //             'Content-Type': 'multipart/form-data', // enctype="multipart/form-data"
    //         },
    //     });

    //     const imageUploadData = await imageUploadRes.data;
    //     if (!imageUploadData.result)
    //         return alert('이미지 등록이 실패 되었습니다.');
    //     const imagePath = imageUploadData.file.path;
    //     const host = window.location.host;
    //     const newImagePath =
    //         host + '/' + imagePath.replace('public/', 'static/'); // public 경로를 static으로 변경
    // });

    const submitBtn = document.querySelector('.submit');

    submitBtn.addEventListener('click', () => {
        const title = document.querySelector('#post-title-inp').value;
        const contents = editor.getHTML();

        axios({
            method: 'POST',
            url: '/review',
            data: {
                subject: title,
                content: contents,
            },
        })
            .then((res) => {
                if (res.statusText === 'OK') {
                    document.querySelector('#post-title-inp').value = '';
                    document.location.href = '/review';
                }
            })
            .catch((err) => console.error(err));
    });
})();
