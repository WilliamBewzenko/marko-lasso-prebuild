const Feedback = require('../../models/feedback');
const template = require('../../src/pages/index');

module.exports = async (req, res) => {
  const feedbacksAvgProvider = async () => {
    const agg = await Feedback.aggregate([{
      $group: {
        _id: '$origin',
        avg: {'$avg': '$ratting' },
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

  const [feedbacks, averageFeedbacks] = await Promise.all([
    Feedback.find({}).sort([['date', -1]]),
    feedbacksAvgProvider()],
  );

  res.marko(template, {
    averageFeedbacks,
    feedbacks,
  });
};
