const axios = require('axios')
const chalk = require('chalk')
const ora = require('ora')
const program = require('commander')

const API_URL = "https://restapi.amap.com/v3/weather/weatherInfo"
const KEY = "dae3073c6347772efe77f8dc288ad221"

const log = console.log

function checkParams(params) {
  if (params) return

  log()
  log(chalk.red(`没有找到 ${params} 命令`))
  log()
  program.help()
}

async function getLiveWeather(city) {
  if (!city) return;
  const spinner = ora('loading...')
  spinner.start()
  try {
    const url = `${API_URL}?city=${encodeURI(city)}&key=${KEY}`
    const response = await axios.get(url)
    const live = response.data.lives[0]
    log()
    log()
    log(chalk.yellow(`实况天气发布时间：${live.reporttime}`))
    log(chalk.white(`${live.province} ${live.city}`))
    log(`${chalk.cyan('天气：')}${chalk.green(live.weather)}`)
    log(`${chalk.cyan('温度：')}${chalk.green(`${live.temperature}℃`)}`)
    log(`${chalk.cyan('湿度：')}${chalk.green(live.humidity)}`)
    log(`${chalk.cyan('风向：')}${chalk.green(live.winddirection)}`)
    log(`${chalk.cyan('风力：')}${chalk.green(`${live.windpower}级`)}`)
  } catch {
    log()
    log(chalk.red('Error: service is not available or city name is incorrect.'))
  } finally {
    spinner.stop()
  }
}

module.exports = {
  getLiveWeather,
  checkParams
};
