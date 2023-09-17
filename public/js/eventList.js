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

    const ul = document.querySelector('.eventList');

    eventList.reverse().forEach((con) => {
        const originalDate = new Date(con.createdAt);
        const year = originalDate.getFullYear().toString().slice(-2);
        const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
        const day = originalDate.getDate().toString().padStart(2, '0');
        const hours = originalDate.getHours().toString().padStart(2, '0');
        const minutes = originalDate.getMinutes().toString().padStart(2, '0');

        const time = `${year}.${month}.${day} ${hours}:${minutes}`;

        const li = document.createElement('li');
        li.className = 'col';

        li.innerHTML = `
              <a href="/event/${con.con_id}">
                  <div class="card h-100">
                                    <img
                                        src="${con.con_image}"
                                        class="card-img-top"
                                        alt="행사 이미지"
                                    />
                                    <div class="card-body">
                                        <p class="card-text">
                                            ${con.con_detail}
                                        </p>
                                    </div>
                                    <div class="card-footer">
                                        <small class="text-body-secondary"
                                            >${time}</small
                                        >
                                    </div>
                                </div>
                                </a>
                `;
        ul.appendChild(li);
    });
}

listDraw();
