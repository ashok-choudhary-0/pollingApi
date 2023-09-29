const pollModel = require("../models/pollModel")
const optionsModel = require("../models/optionsModel")
const addNewPoll = async (req, res) => {
  const { pollTitle, options } = req.body;
  if (!pollTitle) {
    res.status(404).send({ message: "Poll title can not be empty" })
  } else if (options.length < 2) {
    res.status(404).send({ message: "Poll options should be atleast 2" })
  }
  try {
    const newPoll = await pollModel.create({ pollTitle })
    const optionsWithPollId = options.map(option => ({ ...option, poll_id: newPoll.id }));
    const pollOptions = await optionsModel.bulkCreate(optionsWithPollId)
    res.status(200).send({ message: "Poll created successfully", newPoll, pollOptions })
  } catch (err) {
    res.status(500).send(err)
  }
}
const getPolls = async (req, res) => {
  const pollsLimit = Number(req.query.pollLimit)
  const pageNumber = Number(req.params.page)
  try {
    const data = await pollModel.findAll({ include: [{ model: optionsModel }], limit: pollsLimit, offset: (pageNumber - 1) * pollsLimit })
    if (data.length === 0) {
      res.status(404).send({ message: "poll ends here, please visit previous pages to see the polls" })
    }
    res.status(200).send({ data })
  } catch (err) {
    res.status(500).send(err)
  }
}
const getSinglePoll = async (req, res) => {
  const id = req.params.id
  try {
    const data = await pollModel.findOne({ where: { id }, include: [{ model: optionsModel, where: { poll_id: id } }] })
    if (data) {
      res.status(200).send({ data })
    } else {
      res.status(404).send({ message: "No poll found on this id, please check the poll id you provided" })
    }
  } catch (err) {
    res.status(500).send(err)
  }
}
const updateSinglePoll = async (req, res) => {
  const id = req.params.id
  const { pollTitle, options } = req.body;
  try {
    const isIdValid = await pollModel.findOne({ where: { id } })
    if (isIdValid) {
      await pollModel.update({ pollTitle }, { where: { id } })
      const allOptions = await optionsModel.findAll({ where: { poll_id: id } })
      const all_ids = allOptions.map((singleIdObj) => singleIdObj.id)
      for (let i = 0; i < options.length; i++) {
        await optionsModel.update({ optionTitle: options[i].optionTitle }, { where: { id: all_ids[i] } })
      }
      res.status(200).send({ message: "Pole updated successfully" })
    } else {
      res.status(404).send({ message: "No poll found on this id, please check the poll id you provided" })
    }
  } catch (err) {
    res.status(500).send(err)
  }
}
module.exports = { addNewPoll, getPolls, getSinglePoll, updateSinglePoll }