/* eslint-disable linebreak-style */
module.exports.playerJoin = (emitter, data, clan) => {
  emitter.emit('playerJoin', {
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
