// 서버에서 모든 행사 리스트를 가져옴
async function fetchEventList() {
    try {
        const response = await axios.get('/event/list');
        return response.data.eventList;
    } catch (error) {
        console.error('Error fetching event list:', error);
        return [];
    }
}

function formatDate(date) {
    date = date.split(' ');
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const originalDate = new Date(date[0]);

    const dayOfWeek = daysOfWeek[originalDate.getDay()];
    return `${date[0]} (${dayOfWeek})`;
}

// 행사 시작 시간이 얼마나 남았는지 알려주는 함수
function getDaysUntilEvent(eventStartDate) {
    const currentDate = new Date();
    const startDate = new Date(eventStartDate);

    // 일수 계산 (시작일까지의 날짜 수)
    const timeDifference = startDate - currentDate;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference >= 0 ? 'D' + -daysDifference : 0;
}

// 행사의 현재 상태를 구하는 함수
function getEventStatus(eventStartDate, eventEndDate) {
    const currentDate = new Date();
    const startDate = new Date(eventStartDate);
    const endDate = new Date(eventEndDate);

    if (currentDate < startDate) {
        return getDaysUntilEvent(eventStartDate); // 아직 시작 안 함
    } else if (currentDate > endDate) {
        return '종료'; // 이미 종료됨
    } else {
        return '진행 중'; // 진행 중
    }
}

function getEventColorByStatus(eventStatus) {
    let color = '';

    switch (eventStatus) {
        case '진행 중':
            color = '#28a745'; // 진행 중인 경우의 색상 (예: 녹색)
            break;
        case '종료':
            color = '#dc3545'; // 종료된 경우의 색상 (예: 빨강)
            break;
        default:
            color = '#007bff'; // 기본 색상 (예: 검정)
            break;
    }

    return color;
}

// 행사 리스트들을 그려주는 함수
function renderEventItem(event) {
    const li = document.createElement('li');
    li.className = 'event-item';

    const eventStatus = getEventStatus(
        event.con_start_date,
        event.con_end_date
    );

    const colorByStatus = getEventColorByStatus(eventStatus);

    li.innerHTML = `
            <a href="/event/${event.con_id}">
                <div class="event-item-wrap">
                    <div class="event-img">
                        <img
                            src="${event.con_image}"
                            class="card-img-top"
                            alt="행사 이미지"
                        />
                    </div>
                    <div class="event-content">
                        <span class="title">${event.con_title}</span>
                        <div class="desc">
                            <span class="company">
                                주최 : ${event.con_company}
                            </span>
                            <span class="date">
                                <span class="text">
                                    일시 : 
                                </span>
                                <span>
                                    ${formatDate(
                                        event.con_start_date
                                    )} ~ ${formatDate(event.con_end_date)}
                                </span>
                                <span class="status" style="color: ${colorByStatus}">${eventStatus}</span>
                            </span>
                            <ul>
                                <li>
                                    <span>#
                                    ${event.is_onoff ? '온라인' : '오프라인'}
                                    </span>
                                </li>
                                <li>
                                    <span>#
                                        ${event.con_isfree ? '무료' : '유료'}
                                    </span>
                                </li>
                                <li>
                                    <span>#
                                        ${event.con_category}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </a>
            `;
    return li;
}

function getMonth(con_date) {
    return con_date.split('.')[1];
}

function getCurrentMonth() {
    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0');
    return currentMonth;
}

async function displayMonthEvents(month) {
    const currentMonth = getCurrentMonth();
    try {
        let eventList = await fetchEventList();
        eventList = eventList
            .filter((event) => {
                return (
                    getMonth(event.con_start_date) ===
                        (month || currentMonth) ||
                    getMonth(event.con_end_date) === (month || currentMonth)
                );
            })
            .sort(
                (a, b) =>
                    new Date(a.con_start_date) - new Date(b.con_start_date)
            );

        const ul = document.querySelector('.event-list');

        eventList.forEach((event) => {
            const eventItem = renderEventItem(event);
            ul.appendChild(eventItem);
        });
    } catch (error) {
        console.error('Error displaying month events:', error);
    }
}
displayMonthEvents();
