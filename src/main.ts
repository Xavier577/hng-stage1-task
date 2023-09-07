import * as http from 'http';
import * as querystring from 'querystring';

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
] as const;

function today(): string {
  const date = new Date();
  return DAYS[date.getDay()];
}

function utcTimeWithoutMs(): string {
  return new Date().toISOString().split('.')[0].concat('Z');
}

server.on('request', (req, res) => {
  const pathname = req.url;

  const method = req.method;

  const query = querystring.parse(String(pathname).split('?')[1]);

  console.log({ pathname, method });

  switch (pathname) {
    case `/api?slack_name=${query?.slack_name}&track=${query?.track}`:
      console.log({ query: Object.assign({}, query) });

      const body = JSON.stringify({
        slack_name: query.slack_name,
        current_day: today(),
        utc_time: utcTimeWithoutMs(),
        track: query.track,
        github_file_url:
          'https://github.com/Xavier577/hng-stage1-task/tree/main/dist/main.js',
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
