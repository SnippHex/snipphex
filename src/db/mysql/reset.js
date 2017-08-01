module.exports = async function reset(db) {
  return Promise.all([
    db.queryAsync('DROP TABLE IF EXISTS paste'),
    db.queryAsync('DROP TABLE IF EXISTS syntax'),
  ])
}
