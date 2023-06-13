module.exports = {
  async up(db) {
    return await db.collection("productmodels").updateMany({}, [
      {
        $set: {
          priceBadges: {
            $cond: {
              if: { $eq: ["$priceBadge.badgeId", ""] },
              then: [],
              else: ["$priceBadge"],
            },
          },
        },
      },
      // { $unset: ["priceBadge"] },
    ]);
  },

  async down(db) {
    return await db.collection("productmodels").updateMany({}, [
      {
        $set: {
          priceBadge: {
            $cond: {
              if: { $not: { $arrayElemAt: ["$priceBadges", 0] } },
              then: {
                badgeId: "",
              },
              else: { $arrayElemAt: ["$priceBadges", 0] },
            },
          },
        },
      },
      // { $unset: ["priceBadges"] },
    ]);
  },
};
