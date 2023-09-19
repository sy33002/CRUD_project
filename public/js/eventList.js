const select = document.querySelector('select');

select.addEventListener('change', (e) => {
    const date = e.target.value;

    displayMonthEvents(date);
});

// 달력 select를 그려주는 함수
function populateMonthSelect() {
    const currentDate = new Date();

    for (let i = -3; i <= 3; i++) {
        // 현재 기준으로 3달 이전 ~ 3달 이후 를 나타냄
        const date = new Date(currentDate);
        date.setMonth(currentDate.getMonth() + i);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}`;
        const option = document.createElement('option');
        option.value = formattedDate;
        option.textContent = `${date.getFullYear()}년 ${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}월`;

        // Check if this option corresponds to the current month
        if (i === 0) {
            option.selected = true;
        }
        select.appendChild(option);
    }
}
populateMonthSelect();

// 서버에서 모든 행사 리스트를 가져옴
async function fetchEventList(date) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더하고, 두 자리로 표현
    const formattedDate = date || `${year}-${month}`;
    try {
        const response = await axios.get('/event/list', {
            params: {
                date: formattedDate,
            },
        });

        console.log(response.data.eventList);
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

// 행사 상태에 따라 컬러 지정
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
                        <div class="img-wrapper">
                            <img
                                src="${event.con_image}"
                                class="card-img-top"
                                alt="행사 이미지"
                            />
                        </div>
                        ${
                            eventStatus === '종료'
                                ? `<div class="img-blur">
                                    <span>종료된 행사입니다</span>
                                </div>`
                                : ''
                        }

                    </div>
                    <div class="event-content">
                        <span class="title">${event.con_title}</span>
                        <div class="desc">
                            <span class="company">
                                주최 : ${event.con_company}
                            </span>
                            <span class="period">
                                <span class="text">
                                    일시 : 
                                </span>
                                <span class="date">
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

async function displayMonthEvents(date) {
    const ul = document.querySelector('.event-list');

    ul.innerHTML = '';
    const currentDate = new Date();
    try {
        const eventList = await fetchEventList(date);

        if (!eventList.length) {
            ul.innerHTML = `
                <li style="text-align: center;">행사가 없습니다.</li>
            `;
        }

        eventList.sort((a, b) => {
            const timeDifferenceA = new Date(a.con_end_date) - currentDate;
            const timeDifferenceB = new Date(b.con_end_date) - currentDate;

            if (timeDifferenceA >= 0 && timeDifferenceB < 0) {
                return -1; // a는 아직 진행되지 않은 행사, b는 이미 지난 행사 - a를 먼저 정렬
            } else if (timeDifferenceA < 0 && timeDifferenceB >= 0) {
                return 1; // b는 아직 진행되지 않은 행사, a는 이미 지난 행사 - b를 먼저 정렬
            } else {
                return a.con_end_date - b.con_end_date; // 둘 다 진행되지 않은 행사일 경우, 얼마 안 남은 순으로 정렬
            }
        });

        eventList.forEach((event) => {
            const eventItem = renderEventItem(event);
            ul.appendChild(eventItem);
        });
    } catch (error) {
        console.error('Error displaying month events:', error);
    }
}
displayMonthEvents();
