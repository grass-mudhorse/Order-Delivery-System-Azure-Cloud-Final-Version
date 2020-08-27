import http from "k6/http";
import {check, group, sleep, fail} from 'k6';

export let options = {
 stages: [
   { target: 70, duration: '30s' },
 ],
  thresholds: {
    'http_req_duration': ['p(95)<500', 'p(99)<1500'],
    'http_req_duration{name:PublicCrocs}': ['avg<400'],
    'http_req_duration{name:Create}': ['avg<600', 'max<1000'],
  },
};

export default function() {
    let response = http.get("https://deliverytest-gateway.azuremicroservices.io/RESTFEIGN/restaurant/review/findReviewByRestaurantId/1/1/5");
}