const Feedback = require('../../models/feedback');

const template = require('../../src/pages/progressive');

module.exports = function(req, res) {
  const feedbacksAvgProvider = async () => {
    const agg = await Feedback.aggregate([{
      $group: {
        _id: '$origin',
        avg: {'$avg':'$ratting' },
        total: { '$sum': 1 },
      },
    }]);
    const total = agg.map(({ total }) => total).reduce((acc, val) => acc + val);
    const totalAvg = agg.map(({ avg }) => avg).reduce((adder, value) => adder + value , 0) / agg.length;

    return agg.reduce((acc, product) => {
      acc[product._id] = { count: product.total, avg: product.avg };
      return acc;
    }, { total: { count: total, avg: totalAvg } });
  };

  const feedbacksProvider = new Promise((resolve, reject) => {
    setTimeout(async () => {
      resolve(await Feedback.find({}).sort([['date', -1]]));
    }, 2500);
  });

  res.marko(template, {
    feedbacksDataProvider: feedbacksProvider,
    feedbacksAvgProvider: feedbacksAvgProvider,
  });
};
