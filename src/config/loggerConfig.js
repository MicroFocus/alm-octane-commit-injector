import Logger from 'js-logger';

const log = Logger;
log.useDefaults({
  defaultLevel: Logger.DEBUG,
  formatter: function (messages, context) {
    const date = new Date();
    date.setHours(date.getHours() + date.getTimezoneOffset() / -60);
    messages.unshift(
      `[${date.toISOString().slice(0, -1)}] [${
        Logger.getLevel().name
      }] default -`
    );
  },
});
export default log;
