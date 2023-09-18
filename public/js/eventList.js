// 서버에서 모든 행사 리스트를 가져옴
async function getEventList() {
    const response = await axios({
        method: 'get',
        url: '/event/list',
    });
    return response.data.eventList;
}

async function listDraw() {
    const eventList = await getEventList();

    const ul = document.querySelector('.event-list');

    eventList.reverse().forEach((con) => {
        const li = document.createElement('li');
        li.className = 'event-item';

        function dateFormat(date) {
            date = date.split(' ');
            const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
            const originalDate = new Date(date[0]);

            const dayOfWeek = daysOfWeek[originalDate.getDay()];
            return `${date[0]} (${dayOfWeek})`;
        }

        li.innerHTML = `
                <a href="/event/${con.con_id}">
                    <div class="event-item-wrap">
                        <div class="event-img">
                            <img
                                src="${con.con_image}"
                                class="card-img-top"
                                alt="행사 이미지"
                            />
                        </div>
                        <div class="event-content">
                            <span class="title">${con.con_title}</span>
                            <div class="desc">
                                <span class="company">
                                    주최 : ${con.con_company}
                                </span>
                                <span class="date">
                                    <span class="text">
                                        일시 : 
                                    </span>
                                    <span>
                                        ${dateFormat(
                                            con.con_start_date
                                        )} ~ ${dateFormat(con.con_end_date)}
                                    </span>
                                </span>
                                <ul>
                                    <li>
                                        <span>#
                                        ${con.is_onoff ? '온라인' : '오프라인'}
                                        </span>
                                    </li>
                                    <li>
                                        <span>#
                                            ${con.con_isfree ? '무료' : '유료'}
                                        </span>
                                    </li>
                                    <li>
                                        <span>#
                                            ${con.con_category}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </a>
                `;
        ul.appendChild(li);
    });
}

listDraw();
