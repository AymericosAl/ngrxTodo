
USE mnhn_db1;


DROP TABLE IF EXISTS user_mnhn;

CREATE TABLE user_mnhn (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  email varchar(62) NOT NULL UNIQUE,
  birthdate Date NULL,
  PRIMARY KEY (id)
) DEFAULT CHARSET=utf8;


INSERT INTO user_mnhn (username, email) VALUES ('Jean Ventura', 'jean.ventura@gmail.com');
INSERT INTO user_mnhn (username, email) VALUES ('Leon Blum', 'l.blum@gmail.com');

/*INSERT INTO user_mnhn (username, email) VALUES ('LeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeon', 'Blum&blum');*/
/*INSERT INTO user_mnhn (username, email) VALUES ('LeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeon', 'blum@blu');*/
/*INSERT INTO user_mnhn (username,  email) VALUES ('LeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeonLeon', 'l.bl');*/
/* INSERT INTO user_mnhn (username, email) VALUES ('FelixViallet','l.blum@gmail.com');
*/

SELECT * FROM user_mnhn;
