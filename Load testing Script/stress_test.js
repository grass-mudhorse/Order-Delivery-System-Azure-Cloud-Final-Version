import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 50 }, // below normal load
    { duration: '5m', target: 50 },
    { duration: '2m', target: 100 }, // normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 150 }, // around the breaking point
    { duration: '5m', target: 150 },
    { duration: '2m', target: 200 }, // beyond the breaking point
    { duration: '5m', target: 200 },
    { duration: '1m', target: 0 }, // scale down. Recovery stage.
    { duration: '20s', target: 5 },
  ],
};

export default function () {
  const BASE_URL = 'https://delivery-gateway.azuremicroservices.io/CLIENTFEIGN/'; // make sure this is not production

  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/account/login/test801/123123`,
      null,
      { tags: { name: 'login' } },
    ],
    [
      'GET',
      `${BASE_URL}/client/home/getRecommendation/34`,
      null,
      { tags: { name: 'get recommendation' } },
    ],
    [
      'GET',
      `${BASE_URL}/client/home/findmenubyrname/Bacchanal%20Buffet`,
      null,
      { tags: { name: 'get menu' } },
    ],
    [
      'GET',
      `${BASE_URL}/client/order/findallbyuid/34`,
      null,
      { tags: { name: 'check order history' } },
    ],
    [
        'GET',
        `${BASE_URL}/client/order/orderdetail/62`,
        null,
        { tags: { name: 'check order details' } },
      ],
  ]);

  check(responses[0], { 'logged in successfully': (resp) => resp.json('token') === "1" });
  check(responses[1], { "got recommendation successfully": (resp) => resp.json().length > 0 });
  check(responses[2], { "got menu successfully": (resp) => resp.json().length > 0 });
  check(responses[3], { "got order history successfully": (resp) => resp.json().length > 0 });
  check(responses[4], { "got menu details successfully": (resp) => resp.json('userid') === 34 });

  sleep(3);
}