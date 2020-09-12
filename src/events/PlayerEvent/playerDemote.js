/* eslint-disable linebreak-style */
module.exports.playerDemote = (emitter, oldData, newData, previousPlayer, currentPlayer) => {
  const message = {
    clan: {
      name: newData.name,
      tag: newData.tag,
      badgeUrls: newData.badgeUrls,
      members: newData.members,
      type: newData.type,
    },
    ...currentPlayer,
    previous: previousPlayer.role,
    current: currentPlayer.role,
  };

  emitter.emit('playerDemote', message);
};
