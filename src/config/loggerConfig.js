import Logger from 'js-logger';

const log = Logger;
log.useDefaults({
  defaultLevel: Logger.DEBUG,
  formatter: function (messages, context) {
    messages.unshift(`[${new Date().toISOString()}]`);
  },
});
export default log;
