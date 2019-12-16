const axios = require('axios')
const chalk = require('chalk')
const ora = require('ora')

const API_URL = 'https://restapi.amap.com/v3/weather/weatherInfo'
const KEY = 'dae3073c6347772efe77f8dc288ad221'

const log = console.log

async function getLiveWeather(city) {
  const spinner = ora('loading...')
  spinner.start()
  try {
    const url = `${API_URL}?city=${encodeURI(city)}&key=${KEY}`
    const response = await axios.get(url)
    const live = response.data.lives[0]
    log()
    log()
    log(chalk.yellow('[实况天气]'))
    log(chalk.white(`${live.province} ${live.city}`))
    log(chalk.white(`发布时间：${live.reporttime}`))
    log(chalk.blue('---------------'))
    log(`${chalk.cyan('天气：')}${chalk.green(live.weather)}`)
    log(`${chalk.cyan('温度：')}${chalk.green(`${live.temperature}℃`)}`)
    log(`${chalk.cyan('湿度：')}${chalk.green(live.humidity)}`)
    log(`${chalk.cyan('风向：')}${chalk.green(live.winddirection)}`)
    log(`${chalk.cyan('风力：')}${chalk.green(`${live.windpower}级`)}`)
    log(chalk.blue('---------------'))
  } catch {
    log(chalk.red('Error: service is not available or city name is incorrect.'))
  } finally {
    spinner.stop()
  }
}

async function getAllWeather(city) {
  const spinner = ora('loading...')
  spinner.start()
  try {
    const url = `${API_URL}?city=${encodeURI(city)}&key=${KEY}&extensions=all`
    const response = await axios.get(url)
    const forecasts = response.data.forecasts[0]
    log()
    log()
    log(chalk.yellow('[天气预报]'))
    log(chalk.white(`${forecasts.province} ${forecasts.city}`))
    log(chalk.white(`发布时间：${forecasts.reporttime}`))
    log(chalk.blue('---------------'))
    forecasts.casts.forEach(item => {
    log(`${chalk.cyan('日期：')}${chalk.green(item.date)}`)
    log(`${chalk.cyan('星期：')}${chalk.green(item.week)}`)
    log(`${chalk.cyan('白天天气：')}${chalk.green(item.dayweather)}`)
    log(`${chalk.cyan('晚上天气：')}${chalk.green(item.nightweather)}`)
    log(`${chalk.cyan('白天温度：')}${chalk.green(`${item.daytemp}℃`)}`)
    log(`${chalk.cyan('晚上温度：')}${chalk.green(`${item.nighttemp}℃`)}`)
    log(`${chalk.cyan('白天风向：')}${chalk.green(item.daywind)}`)
    log(`${chalk.cyan('晚上风向：')}${chalk.green(item.nightwind)}`)
    log(`${chalk.cyan('白天风力：')}${chalk.green(`${item.daypower}级`)}`)
    log(`${chalk.cyan('晚上风力：')}${chalk.green(`${item.nightpower}级`)}`)
    log(chalk.blue('---------------'))
    })
  } catch {
    log(chalk.red('Error: service is not available or city name is incorrect.'))
  } finally {
    spinner.stop()
  }
}

module.exports = {
  getLiveWeather,
  getAllWeather
};
