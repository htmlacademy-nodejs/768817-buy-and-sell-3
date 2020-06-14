DROP TABLE IF EXISTS adverts;
DROP TABLE IF EXISTS advert_types;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS categories_adverts;

CREATE TABLE categories
(
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(50) NOT NULL
);

CREATE TABLE advert_types
(
  id SERIAL PRIMARY KEY NOT NULL,
  type_name VARCHAR(20)
);

CREATE TABLE adverts 
(
  id SERIAL PRIMARY KEY NOT NULL,
  picture VARCHAR(50),
  title VARCHAR(50),
  advert_description VARCHAR(255),
  sum NUMERIC(50),
  type_id INTEGER,
  FOREIGN KEY (type_id) REFERENCES advert_types (id)
    ON DELETE SET NULL
		ON UPDATE SET NULL
);

CREATE TABLE categories_adverts
(
  caregory_id INTEGER,
  advert_id INTEGER,
  CONSTRAINT categories_adverts_pk PRIMARY KEY (caregory_id, advert_id),
  FOREIGN KEY (caregory_id) REFERENCES categories (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (advert_id) REFERENCES adverts (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE users
(
  id SERIAL PRIMARY KEY NOT NULL,
  firstname VARCHAR(50),
  surname VARCHAR(50),
  email VARCHAR(50),
  user_password VARCHAR(50),
  avatar_image VARCHAR(50)
);

CREATE TABLE comments 
(
  id SERIAL PRIMARY KEY NOT NULL,
  comment_text VARCHAR(100),
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);