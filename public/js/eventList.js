// 서버에서 모든 행사 리스트를 가져옴
async function getEventList() {
    const response = await axios({
        method: 'get',
        url: '/event/list',
    });
    return response.data.eventList;
}

async function init() {
    let eventList = await getEventList();
    eventList = transformEventList(eventList);
    calendarDraw(eventList);
}

init();

// 필터링 값을 가져오는 함수
async function getFilterCon() {
    const form = document.forms['searchCon'];

    // 체크된 값을 가져옵니다.
    const checkedValues = $('input[name="conCategory"]:checked')
        .map(function () {
            return $(this).val();
        })
        .get();

    const response = await axios({
        method: 'POST',
        url: '/event',
        data: {
            isOnoff: form.isOnoff.value,
            conLocation: form.conLocation.value,
            conCategory: checkedValues.length ? checkedValues : 'all', // 빈 값이면 모두 보여주기
            conIsfree: form.conIsfree.value,
        },
    });
    return response.data.eventList;
}

// 이벤트 객체 변환 작업 수행
function transformEventList(eventList) {
    return eventList.map((event) => ({
        title: event.con_title,
        start: new Date(event.con_start_date).toISOString().split('T')[0],
        end: new Date(event.con_end_date).toISOString().split('T')[0],
        url: `/event/${event.con_id}`,
    }));
}

// eventList 배열을 받아와 달력에 행사 정보를 그려줌
function calendarDraw(eventList) {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay',
        },
        defaultDate: '2023-09-16',
        navLinks: true, // can click day/week names to navigate views
        editable: false,
        eventLimit: true, // allow "more" link when too many events
        events: eventList,
    });
}

// 필터된 값을 그려주는 함수
async function filterDraw() {
    $('#calendar').fullCalendar('destroy');
    let eventList = await getFilterCon();
    eventList = transformEventList(eventList);
    console.log(eventList);
    calendarDraw(eventList);
}
