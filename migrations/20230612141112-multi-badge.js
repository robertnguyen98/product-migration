module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    return await db.collection("productmodels").updateMany({}, [
      {
        $set: {
          priceBadges: ["$priceBadge"],
        },
      },
      { $unset: ["priceBadge"] },
    ]);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    return await db.collection("productmodels").updateMany({}, [
      {
        $set: {
          priceBadge: { $arrayElemAt: ["$priceBadges", 0] },
        },
      },
      { $unset: ["priceBadges"] },
    ]);
  },
};
