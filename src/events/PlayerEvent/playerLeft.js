/* eslint-disable linebreak-style */
module.exports.playerLeft = (emitter, data, clan) => {
  emitter.emit('playerLeft', {
    clan: {
      name: clan.name,
      tag: clan.tag,
      badgeUrls: clan.badgeUrls,
      members: clan.members,
      type: clan.type,
    },
    ...data,
  });
};
