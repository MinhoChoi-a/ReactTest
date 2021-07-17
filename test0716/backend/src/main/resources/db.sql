CREATE SCHEMA IF NOT EXISTS `digileague` DEFAULT CHARACTER SET latin1 ;
USE `digileague` ;

DROP TABLE IF EXISTS clothing;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothing` (
                            `clothing_id` int(11) auto_increment NOT NULL,
                            `clothing_type` varchar(10) NOT NULL,
                            `clothing_colour` varchar(10) NOT NULL,
                            `clothing_price` FLOAT NOT NULL,
                            `clothing_inventory` INT NOT NULL,
                            `clothing_rating` FLOAT NOT NULL,
                            `clothing_image` varchar(255) NOT NULL,
                            PRIMARY KEY (`clothing_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO `clothing`
(`clothing_type`,`clothing_colour`, `clothing_price`, `clothing_inventory`, `clothing_rating`, `clothing_image`)
VALUES ('pant', 'black', 50.00, 10, 4, 'https://bbproject20210623.s3.us-west-2.amazonaws.com/clothing.jpg');

INSERT INTO `clothing`
(`clothing_type`,`clothing_colour`, `clothing_price`, `clothing_inventory`, `clothing_rating`, `clothing_image`)
VALUES ('pant', 'white', 40.00, 8, 3, 'https://bbproject20210623.s3.us-west-2.amazonaws.com/clothing.jpg');

INSERT INTO `clothing`
(`clothing_type`,`clothing_colour`, `clothing_price`, `clothing_inventory`, `clothing_rating`, `clothing_image`)
VALUES ('t-shirt', 'blue', 20.00, 9, 5, 'https://bbproject20210623.s3.us-west-2.amazonaws.com/clothing.jpg');

INSERT INTO `clothing`
(`clothing_type`,`clothing_colour`, `clothing_price`, `clothing_inventory`, `clothing_rating`, `clothing_image`)
VALUES ('t-shirt', 'black', 30.00, 10, 4, 'https://bbproject20210623.s3.us-west-2.amazonaws.com/clothing.jpg');

INSERT INTO `clothing`
(`clothing_type`,`clothing_colour`, `clothing_price`, `clothing_inventory`, `clothing_rating`, `clothing_image`)
VALUES ('t-shirt', 'white', 10.00, 7, 2, 'https://bbproject20210623.s3.us-west-2.amazonaws.com/clothing.jpg');

INSERT INTO `clothing`
(`clothing_type`,`clothing_colour`, `clothing_price`, `clothing_inventory`, `clothing_rating`, `clothing_image`)
VALUES ('hat', 'green', 20.00, 10, 5, 'https://bbproject20210623.s3.us-west-2.amazonaws.com/clothing.jpg');

INSERT INTO `clothing`
(`clothing_type`,`clothing_colour`, `clothing_price`, `clothing_inventory`, `clothing_rating`, `clothing_image`)
VALUES ('hat', 'red', 70.00, 5, 5, 'https://bbproject20210623.s3.us-west-2.amazonaws.com/clothing.jpg');

INSERT INTO `clothing`
(`clothing_type`,`clothing_colour`, `clothing_price`, `clothing_inventory`, `clothing_rating`, `clothing_image`)
VALUES ('hat', 'black', 30.00, 9, 2, 'https://bbproject20210623.s3.us-west-2.amazonaws.com/clothing.jpg');

INSERT INTO `clothing`
(`clothing_type`,`clothing_colour`, `clothing_price`, `clothing_inventory`, `clothing_rating`, `clothing_image`)
VALUES ('shoe', 'green', 70.00, 20, 3, 'https://bbproject20210623.s3.us-west-2.amazonaws.com/clothing.jpg');

INSERT INTO `clothing`
(`clothing_type`,`clothing_colour`, `clothing_price`, `clothing_inventory`, `clothing_rating`, `clothing_image`)
VALUES ('shoe', 'white', 50.00, 10, 4, 'https://bbproject20210623.s3.us-west-2.amazonaws.com/clothing.jpg');

