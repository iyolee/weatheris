const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');

const URL = "https://restapi.amap.com/v3/weather/weatherInfo";
const KEY = "dae3073c6347772efe77f8dc288ad221";

const log = console.log

async function getWeather(city) {
  if (!city) return;
  const spinner = ora('正努力获取...')
  spinner.start()
  try {
    const url = `${URL}?city=${encodeURI(city)}&key=${KEY}`;
    const response = await axios.get(url);
    const live = response.data.lives[0];
    log(chalk.yellow(live.reporttime));
    log(chalk.white(`${live.province} ${live.city}`));
    log(chalk.green(`${live.weather} ${live.temperature} 度`));
  } catch {
    log(chalk.red('天气服务出现异常'));
  } finally {
    spinner.stop()
  }
}

module.exports = getWeather;
