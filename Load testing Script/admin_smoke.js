import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1,  // 1 user looping for 1 minute
    duration: '5s',

    thresholds: {
        'http_req_duration': ['p(99)<3000'], // 99% of requests must complete below 1.5s
    }
};

const LOGIN_URL = 'https://delivery-gateway.azuremicroservices.io/ADMINFEIGN/admin/account/login/admin1/123123';
// const EDIT_USER = 
// const DELETE_USER = 
// const 



let add_data = {
    storename:"qwq",
    price:30,
    menuname:"pork",
    stocks:100,
    description:"vvery good",
    photo:"http..",
    materials:"fish",
    menutype : "main"
};

let edit_data = {
    "menuid": 5530,
    "storename": "qwq",
    "price": 30,
    "menuname": "pork",
    "stocks": 100,
    "description": "vvery good",
    "photo": "http..",
    "materials": "fish",
    "menutype": "main"

};

let delete_data = {
    "menuid": 5530,
    "price": 30,
    "menuname": "pork",
    "stocks": 100,
    "description": "vvery good",
    "photo": "http..",
    "materials": "fish",
    "menutype": "main"

}

let headers = { 'Content-Type': 'application/json' }

export default () => {
    let loginRes = http.get(`${LOGIN_URL}`);

    check(loginRes, { 'admin logged in successfully': (resp) => resp.json('token') === "1" });

    check(loginRes, { 'admin search users account successfully': (resp) => resp.json('token') === "1" });

    check(loginRes, { 'admin search restaurant account successfully': (resp) => resp.json('token') === "1" });

    check(loginRes, { 'admin check users inform successfully': (resp) => resp.json('token') === "1" });

    check(loginRes, { 'admin search restaurant inform successfully': (resp) => resp.json('token') === "1" });

    check(loginRes, { 'admin edits users successfully': (resp) => resp.json('token') === "1" });

    check(loginRes, { 'admin edits restaurant account successfully': (resp) => resp.json('token') === "1" });

    check(loginRes, { 'admin delete inappropriate comments successfully': (resp) => resp.json('token') === "1" });

    // let addmenu = http.post(EDIT, JSON.stringify(add_data), { headers: headers });

    // check(addmenu, { "add menu successfully": (resp) => resp !== null });

    // let editmenu = http.put(EDIT_MENU, JSON.stringify(edit_data), { headers: headers });

    // check(editmenu, { "edit menu successfully": (resp) => resp !== null });

    // let deletemenu = http.put(DELETE_MENU, JSON.stringify(delete_data), { headers: headers });

    // check(deletemenu, { "edit menu successfully": (resp) => resp !== null });

}