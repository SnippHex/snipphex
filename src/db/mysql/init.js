module.exports = async function init(db) {
  return Promise.all([
    db.queryAsync('CREATE TABLE IF NOT EXISTS `syntax` (' +
      '`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,' +
      '`name` VARCHAR(64) NOT NULL,' +
      '`extension` VARCHAR(16) NOT NULL,' +
      '`lexer` VARCHAR(64) NOT NULL,' +
      'PRIMARY KEY (`id`),' +
      'UNIQUE INDEX `name_UNIQUE` (`name` ASC))' +
      'ENGINE = InnoDB'),

    db.queryAsync('CREATE TABLE IF NOT EXISTS `paste` (' +
      '`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,' +
      '`title` VARCHAR(128) NOT NULL,' +
      '`visibility` TINYINT(1) UNSIGNED NOT NULL,' +
      '`syntax_id` INT UNSIGNED NOT NULL,' +
      '`size` INT UNSIGNED NOT NULL,' +
      '`lines` INT UNSIGNED NOT NULL,' +
      '`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,' +
      'PRIMARY KEY (`id`),' +
      'INDEX `fk_paste_syntax_idx` (`syntax_id` ASC),' +
      'CONSTRAINT `fk_paste_syntax`' +
      '  FOREIGN KEY (`syntax_id`)' +
      '  REFERENCES `syntax` (`id`)' +
      '  ON DELETE NO ACTION' +
      '  ON UPDATE NO ACTION)' +
      'ENGINE = InnoDB'),
  ])
}
