/* eslint-disable linebreak-style */
module.exports.error = (emitter, err) => {
  emitter.emit('error', err);
};
