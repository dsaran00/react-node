SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema reactnode
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `reactnode` ;

-- -----------------------------------------------------
-- Schema reactnode
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `reactnode` DEFAULT CHARACTER SET utf8 ;
USE `reactnode` ;

-- -----------------------------------------------------
-- Table `reactnode`.`tipo_usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reactnode`.`tipo_usuario` ;

CREATE TABLE IF NOT EXISTS `reactnode`.`tipo_usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `reactnode`.`usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reactnode`.`usuarios` ;

CREATE TABLE IF NOT EXISTS `reactnode`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_tipouser` INT NOT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  `mail` VARCHAR(255) NOT NULL,
  `pass` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) VISIBLE,
  INDEX `fk_id_tipouser_idx` (`id_tipouser` ASC) VISIBLE,
  CONSTRAINT `fk_id_tipouser`
    FOREIGN KEY (`id_tipouser`)
    REFERENCES `reactnode`.`tipo_usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `reactnode`.`ticket`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reactnode`.`ticket` ;

CREATE TABLE IF NOT EXISTS `reactnode`.`ticket` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NULL,
  `ticket_pedido` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_id_user_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `fk_id_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `reactnode`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Insert user kinds
-- -----------------------------------------------------
INSERT INTO `reactnode`.`tipo_usuario` (id, nombre) VALUES (1, 'Administrador'), (2, 'Usuario común');
