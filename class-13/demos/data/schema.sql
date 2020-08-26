CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  task VARCHAR(255) NOT NULL,
  deadline DATE DEFAULT NOW(),
  criteria TEXT,
  repeats BOOLEAN DEFAULT false,
  frequency BIGINT DEFAULT NULL,
  category VARCHAR(255)
)