import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: "5m", target: 20 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
        { duration: "10m", target: 20 }, // stay at 100 users for 10 minutes
        { duration: "5m", target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        'http_req_duration': ['p(99)<3000'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<3000'], // 99% of requests must complete below 1.5s
    }
};

// const LOGIN_URL = 'https://deliverytest-gateway.azuremicroservices.io/CLIENTFEIGN/account/login/test801/123123';
// const RECOM_URL = "https://deliverytest-gateway.azuremicroservices.io/CLIENTFEIGN/client/home/getRecommendation/34";
// const MENU_URL = "https://deliverytest-gateway.azuremicroservices.io/CLIENTFEIGN/client/home/findmenubyrname/Bacchanal%20Buffet";
const ORDER_HIS = "https://delivery-gateway.azuremicroservices.io/ORDER/order/findAllByUid/34";
const ORDER_DETAIL = "https://delivery-gateway.azuremicroservices.io/ORDER/orderdetail/findAllDetail"
// const MAKE_ORDER = "https://deliverytest-gateway.azuremicroservices.io/ORDER/order/save";
const findAll =  "https://delivery-gateway.azuremicroservices.io/ORDER/order/findAll";

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
    // let loginRes = http.get(`${LOGIN_URL}`);

    // check(loginRes, { 'logged in successfully': (resp) => resp.json('token') === "1" });

    // let recom = http.get(`${RECOM_URL}`).json();

    // check(recom, { "got recommendation successfully": (resp) => resp.length > 0 });

    // let checkmenu = http.get(`${MENU_URL}`).json();

    // check(checkmenu, { "got menu successfully": (resp) => resp.length > 0 });

    let checkhistory = http.get(`${ORDER_HIS}`).json();

    check(checkhistory, { "got order history successfully": (resp) => resp.length > 0 });

    let checkdetail = http.get(`${ORDER_DETAIL}`).json();

    check(checkdetail, { "got menu details successfully": (resp) => resp.length > 0 });

    let fff = http.get(`${findAll}`).json();

    check(fff, { "find all successful": (resp) => resp.length > 0 });


    // let makeorder = http.post(MAKE_ORDER, JSON.stringify(data), { headers: headers });

    // check(makeorder, { "make an order successfully": (resp) => JSON.parse(resp.body) !== 0 });

    sleep(1);

}
