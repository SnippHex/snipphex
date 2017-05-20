const repo = require('./repository')

module.exports = {
  repository: repo,

  all: repo.all,
  getById: repo.getById,
  create: repo.create,
}
