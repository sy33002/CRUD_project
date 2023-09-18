document.addEventListener('DOMContentLoaded', function () {
    const radioButtons = document.querySelectorAll('.btn-check');
    const sections = document.querySelectorAll('.section');

    radioButtons.forEach((radioButton, index) => {
        radioButton.addEventListener('change', () => {
            // 해당 버튼과 연결된 섹션으로 스크롤 이동
            sections[index].scrollIntoView({ behavior: 'smooth' });
        });
    });
});
// window.addEventListener('scroll', function () {
//     const categoryBar = document.getElementById('categorybar');
//     const headerHeight = document.querySelector('header').offsetHeight;
//     const scrollTop = window.scrollY;

//     if (scrollTop >= headerHeight) {
//         categoryBar.classList.add('fixed');
//     } else {
//         categoryBar.classList.remove('fixed');
//     }
// });
