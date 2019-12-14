#!/usr/bin/env node

const program = require('commander')
const packageConfig = require('../package.json')
const chalk = require('chalk')

const getWeather = require('../src/index')

if (!process.argv[2]) {
  console.log()
  console.log(chalk.red(`没有找到 ${process.argv[2]} 命令`))
  console.log()
  program.help()
}

program
  .usage('<command> [options]')
  .version(packageConfig.version)
  .option("-c, --city [name]", "add city name")
  .parse(process.argv)

  getWeather(program.city)