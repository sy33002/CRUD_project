let eventList = [];

// 서버에서 모든 행사 리스트를 가져옴
async function getEventList() {
    const response = await axios({
        method: 'get',
        url: '/event/list',
    });
    return response.data.eventList;
}

async function filterCon() {
    const form = document.forms['searchCon'];

    const formData = new FormData();

    const conferenceRes = await axios({
        method: 'POST',
        url: '/event',
        data: {
            isOnoff: form.isOnoff.value,
            conLocation: form.conLocation.value,
            conCategory: form.conCategory.value,
            conIsfree: form.conIsfree.value,
        },
    });
}

async function calendarDraw() {
    eventList = await getEventList();
    eventList = eventList.map((event) => ({
        title: event.con_title,
        start: new Date(event.con_start_date).toISOString().split('T')[0],
        end: new Date(event.con_end_date).toISOString().split('T')[0],
        url: `/event/${event.con_id}`,
    }));
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
calendarDraw();
