module.exports = async function init(db) {
  return Promise.all([
    db.runAsync('CREATE TABLE IF NOT EXISTS `paste`' +
      '(`id` INTEGER PRIMARY KEY AUTOINCREMENT,' +
      '`title` TEXT NOT NULL DEFAULT \'cp\',' +
      '`visibility` INTEGER NOT NULL DEFAULT 0,' +
      '`created_at` INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP )'),

    db.runAsync('CREATE TABLE IF NOT EXISTS `syntax`' +
      '(`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,' +
      '`name` TEXT NOT NULL DEFAULT \'Just a cp\',' +
      '`extension` TEXT NOT NULL,' +
      '`lexer` TEXT NOT NULL )'),
  ])
}
