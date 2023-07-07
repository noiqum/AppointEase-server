import logger from "pino";
import dayJs from "dayjs";

const log = logger({
  prettifier: true,
  base: { pid: false },
  timestamp: () => `time: ${dayJs().format()}`,
});

export default log;
