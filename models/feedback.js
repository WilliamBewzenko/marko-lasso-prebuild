const mongoose = require('mongoose')

const consumerSchema = require('./consumer')

const Schema = mongoose.Schema

const feedbackSchema = new Schema({
  ratting: {
    type: Number,
    index: true,
  },
  comment: String,
  origin: String,
  date: {
    type: Date,
    default: Date.now,
  },
  consumer: consumerSchema,
})

const Feedback = mongoose.model('Feedback', feedbackSchema, 'feedbacks')


// const newFeedbackRandom = () => {
//   Feedback.create({
//     ratting: faker.random.number({ min: 1, max: 10 }),
//     comment: faker.lorem.paragraphs(Math.random() * 2),
//     origin: faker.random.arrayElement(['eCred', 'ensina', 'score']),
//     consumer: {
//       id: parseInt(Math.random() * 10000, 10),
//       name: faker.name.findName(),
//       score: faker.random.number({ min: 0, max: 1000 })
//     }
//   }).then((algo) => {});
// }

// setInterval(() => {
//   newFeedbackRandom();
// }, 60000);

module.exports = Feedback
