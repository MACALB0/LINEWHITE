import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 5,
    duration: '30s',
};

export default function () {

    const response = http.get('http://127.0.0.1:7055/');

    check(response, {
        'Status HTTP 200': (r) => r.status === 200,
        'Tiempo de respuesta < 1000 ms': (r) => r.timings.duration < 1000,
    });

    sleep(1);

}