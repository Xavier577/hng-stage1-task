"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const querystring = __importStar(require("querystring"));
const server = http.createServer();
server.listen(8080);
server.on('listening', () => {
    console.log('App is running on PORT 8080');
});
const DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
function today() {
    const date = new Date();
    return DAYS[date.getDay()];
}
function utcTimeWithoutMs() {
    return new Date().toISOString().split('.')[0].concat('Z');
}
server.on('request', (req, res) => {
    const pathname = req.url;
    const method = req.method;
    const query = querystring.parse(String(pathname).split('?')[1]);
    console.log({ pathname, method });
    switch (pathname) {
        case `/api?slack_name=${query === null || query === void 0 ? void 0 : query.slack_name}&track=${query === null || query === void 0 ? void 0 : query.track}`:
            console.log({ query: Object.assign({}, query) });
            const body = JSON.stringify({
                slack_name: query.slack_name,
                current_day: today(),
                utc_time: utcTimeWithoutMs(),
                track: query.track,
                github_file_url: 'https://github.com/Xavier577/hng-stage1-task/tree/main/dist/main.js',
                github_repo_url: 'https://github.com/Xavier577/hng-stage1-task',
                status_code: 200,
            });
            console.log({ resBody: JSON.parse(body) });
            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(body),
                'Content-Type': 'application/json',
            });
            res.end(body);
            break;
        default:
            res.end();
    }
});
//# sourceMappingURL=main.js.map