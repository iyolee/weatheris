import colors from "colors";
import commander from "commander";

const command = commander
  .version("0.0.1")
  .option("-c, --city [name]", "add city name")
  .parse(process.argv);

if (process.argv.slice(2).length === 0) {
  command.outputHelp(colors.red);
  process.exit();
}
