/* eslint-disable linebreak-style */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
// eslint-disable-next-line consistent-return
module.exports.donationEvent = (emitter, oldData, newData, callback) => {
  let joinMismatch = 0;
  let leftMismatch = 0;
  const message = {
    name: newData.name,
    tag: newData.tag,
    badgeUrls: newData.badgeUrls,
    members: newData.members,
    type: newData.type,
    donated: [],
    received: [],
    mismatch: [],
  };

  for (let i = 0; i < newData.members; i++) {
    const player = newData.memberList[i];
    if (oldData.memberList.find((f) => f.tag === player.tag)) {
      const diffDonations = player.donations - oldData.memberList.filter((f) => f.tag === player.tag)[0].donations;
      if (diffDonations && diffDonations > 0) {
        message.donated.push({
          name: player.name,
          tag: player.tag,
          troops: diffDonations,
          league: player.league,
        });
        joinMismatch += diffDonations;
      }

      const diffReceived = player.donationsReceived - oldData.memberList.filter((f) => f.tag === player.tag)[0].donationsReceived;
      if (diffReceived && diffReceived > 0) {
        message.received.push({
          name: player.name,
          tag: player.tag,
          troops: diffReceived,
          league: player.league,
        });
        leftMismatch += diffReceived;
      }
    }
  }

  if (joinMismatch > leftMismatch && joinMismatch != leftMismatch) {
    message.mismatch.push({
      troops: joinMismatch - leftMismatch,
    });
  }
  if (joinMismatch < leftMismatch && joinMismatch != leftMismatch) {
    message.mismatch.push({
      troops: leftMismatch - joinMismatch,
    });
  }

  if (message.donated.length > 0 || message.received.length > 0) {
    emitter.emit('donationEvent', message);
    return callback(true);
  }
};
