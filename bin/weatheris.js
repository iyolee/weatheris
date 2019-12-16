#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const packageConfig = require('../package.json')

const Service = require('../src/index')
const log = console.log

program
  .usage('<command> [options]')
  .option('-c, --city [city name]', 'live weather')
  .option('-a, --all [city name]', 'live weather and weather forecast')
  .version(packageConfig.version)
  .parse(process.argv)

if (program.city && process.argv[3]) {
  Service.getLiveWeather(program.city)
} else if (program.all && process.argv[3]) {
  Service.getAllWeather(program.all)
} else {
  log(chalk.red('Please enter the city name.'))
  process.exit(1);
}
