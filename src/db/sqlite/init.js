module.exports = async function init(db) {
  return Promise.all([
    db.runAsync('CREATE TABLE IF NOT EXISTS `paste`' +
      '(`id` INTEGER PRIMARY KEY AUTOINCREMENT,' +
      '`title` TEXT NOT NULL,' +
      '`visibility` INTEGER NOT NULL DEFAULT 0,' +
      '`syntax_id` INTEGER NOT NULL,' +
      '`size` INTEGER NOT NULL,' +
      '`created_at` INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP )'),

    db.runAsync('CREATE TABLE IF NOT EXISTS `syntax`' +
      '(`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,' +
      '`name` TEXT UNIQUE NOT NULL,' +
      '`extension` TEXT NOT NULL,' +
      '`lexer` TEXT NOT NULL )'),
  ])
}
