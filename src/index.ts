import axios from "axios";
import colors from "colors";
import commander from "commander";

// tslint:disable-next-line: no-console
const log = console.log;

const URL = "https://restapi.amap.com/v3/weather/weatherInfo";
const KEY = "dae3073c6347772efe77f8dc288ad221";

const command = commander
  .version("0.0.1")
  .option("-c, --city [name]", "add city name")
  .parse(process.argv);

if (process.argv.slice(2).length === 0) {
  command.outputHelp(colors.red);
  process.exit();
}

async function getWeather(city: string) {
  try {
    const url = `${URL}?city=${encodeURI(city)}&key=${KEY}`;
    const response = await axios.get(url);
    const live = response.data.lives[0];
    log(colors.yellow(live.reporttime));
    log(colors.white(`${live.province} ${live.city}`));
    log(colors.green(`${live.weather} ${live.temperature} 度`));
  } catch {
    log(colors.red("天气服务出现异常"));
  }
}

getWeather(command.city);
