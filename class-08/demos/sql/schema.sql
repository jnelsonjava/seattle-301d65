-- This line is not production safe code !DONT DO IT ON THE JOB
DROP TABLE IF EXISTS icecream2;

CREATE TABLE icecream2 (
  id SERIAL PRIMARY KEY,
  flav VARCHAR(255),
  price INTEGER
);

INSERT INTO icecream2 (flav, price) VALUES ('rainbow sherbert', 20);
INSERT INTO icecream2 (flav, price) VALUES ('vanilla', 4);