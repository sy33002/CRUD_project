const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');

exports.getCrawling = async (req, res) => {
    const url = 'https://dev-event.vercel.app/events';

    const getHtml = async () => {
        try {
            const html = await axios.get('https://dev-event.vercel.app/events');
            const $ = cheerio.load(html.data);

            // 클래스 이름에 해당하는 span 태그를 선택합니다.
            const titles = $('span[class*="Item_item__content__title___"]');
            const company = $('div[class*="Item_host__"]');
            const date = $('div[class*="Item_date__"]');
            const hashTag = $('div[class*="Item_tags___"]');
            // const img = $(
            //     '#__next > div > main > section > div:nth-child(2) > div.list_list__OCUxz > div:nth-child(1) > div > a > div > div.Item_item__content__img__hwo5y > span > img'
            // ).attr('srcset');

            const img = $('div.Item_item__content__img__hwo5y > span > img');

            const imgList = [];
            const imgSrc = img.each(function (idx, element) {
                const src = $(element).attr('currentSrc');
                // const absoluteSrc = new URL(src, url).toString(); // 상대 경로를 절대 경로로 변환
                // console.log('이미지: ', imgSrc);
                imgList.push(src);
            });
            console.log('imgList:', img);
            // Title과 Company 정보를 담을 배열을 선언합니다.
            const eventList = [];

            // titles와 company 배열을 순환하면서 각각의 값을 객체로 만들어 배열에 추가합니다.
            for (let i = 0; i < titles.length; i++) {
                const titleText = $(titles[i]).text();
                const companyText = $(company[i]).text();
                const dateText = $(date[i]).text();
                const hashTagText = $(hashTag[i]).text();
                const imgText = imgList[i];
                // console.log('IMGText', imgText);

                // 날짜 문자열에서 시작일과 종료일을 추출합니다.
                const [startDateStr, endDateStr] = dateText.split(' ~ ');

                // ISO 형식의 날짜로 변환
                const startDate = moment(startDateStr, 'YYYYMMDD');
                const endDate = moment(endDateStr, 'YYYYMMDD');

                const hashTagSplit = hashTagText.split(/[\s#]+/);
                if (hashTagSplit[0] === '') {
                    hashTagSplit.shift();
                }
                const event = {
                    title: titleText,
                    company: companyText,
                    con_start_date: startDate.format('YYYY-MM-DD'), // YYYY-MM-DD 형식
                    con_end_date: endDate.format('YYYY-MM-DD'), // YYYY-MM-DD 형식
                    hashTag: hashTagSplit,
                    imgSrc: imgText,
                };

                eventList.push(event);
            }

            // 배열에 저장된 객체를 출력합니다.
            // console.log(eventList);
            // res.send(eventList);
            res.render('crawling/crawling', { data: eventList });
        } catch (error) {
            console.error(error);
        }
    };

    getHtml();

    // res.render('crawling/crawling', { data: eventList });
};
