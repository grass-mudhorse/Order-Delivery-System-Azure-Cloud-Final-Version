import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {

    // stages: [
    //     { duration: '2m', target: 50 }, // below normal load
    //     { duration: '5m', target: 50 },
    //     { duration: '2m', target: 100 }, // normal load
    //     { duration: '5m', target: 100 },
    //     { duration: '2m', target: 150 }, // around the breaking point
    //     { duration: '5m', target: 150 },
    //     { duration: '2m', target: 200 }, // beyond the breaking point
    //     { duration: '5m', target: 200 },
    //     { duration: '1m', target: 0 }, // scale down. Recovery stage.
    //     { duration: '20s', target: 5 },
    //   ],
    // stages: [
    //     { duration: "5m", target: 20 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    //     { duration: "10m", target: 20 }, // stay at 100 users for 10 minutes
    //     { duration: "5m", target: 0 }, // ramp-down to 0 users
    // ],
    // thresholds: {
    //     'http_req_duration': ['p(99)<3000'], // 99% of requests must complete below 1.5s
    //     'logged in successfully': ['p(99)<3000'], // 99% of requests must complete below 1.5s
    // }
};

const LOGIN_URL = 'https://delivery-gateway.azuremicroservices.io/CLIENTFEIGN/account/login/test801/123123';
const RECOM_URL = "https://delivery-gateway.azuremicroservices.io/CLIENTFEIGN/client/home/getRecommendation/34";
const MENU_URL = "https://delivery-gateway.azuremicroservices.io/CLIENTFEIGN/client/home/findmenubyrname/Bacchanal%20Buffet";
const ORDER_HIS = "https://delivery-gateway.azuremicroservices.io/CLIENTFEIGN/client/order/findallbyuid/34";
const ORDER_DETAIL = "https://delivery-gateway.azuremicroservices.io/CLIENTFEIGN/client/order/orderdetail/62"
// const MAKE_ORDER = "https://delivery-gateway.azuremicroservices.io/ORDER/order/save";

let data = {
    restaurantid: 1,
    storename: "Bacchanal Buffet",
    userid: 34,
    state: 1,
    note: "tnote",
    address: "hello wall",
}

let headers = { 'Content-Type': 'application/json' }

export default () => {
    let loginRes = http.get(`${LOGIN_URL}`);

    check(loginRes, { 'logged in successfully': (resp) => resp.json('token') === "1" });

    let recom = http.get(`${RECOM_URL}`).json();

    check(recom, { "got recommendation successfully": (resp) => resp.length > 0 });

    let checkmenu = http.get(`${MENU_URL}`).json();

    check(checkmenu, { "got menu successfully": (resp) => resp.length > 0 });

    let checkhistory = http.get(`${ORDER_HIS}`).json();

    check(checkhistory, { "got order history successfully": (resp) => resp.length > 0 });

    let checkdetail = http.get(`${ORDER_DETAIL}`);

    check(checkdetail, { "got menu details successfully": (resp) => resp.json('userid') === 34 });

    // let makeorder = http.post(MAKE_ORDER, JSON.stringify(data), { headers: headers });

    // check(makeorder, { "make an order successfully": (resp) => JSON.parse(resp.body) !== 0 });

    sleep(3);

}
