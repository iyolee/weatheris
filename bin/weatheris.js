#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const packageConfig = require('../package.json')

const func = require('../src/index')

program
  .usage('<command> [options]')
  .version(packageConfig.version)
  .option("-c, --city [name]", "add city name")
  .parse(process.argv)

  func.checkParams(process.argv[2])
  func.getLiveWeather(program.city)