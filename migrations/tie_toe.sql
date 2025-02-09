-- Create tie_toe_user table
CREATE TABLE tie_toe_user (
  id SERIAL PRIMARY KEY,
  device_id VARCHAR(255) NOT NULL,
  device_token BIGINT NOT NULL,
  device_name TEXT NOT NULL,
  password VARCHAR(255) NOT NULL,
  os_name VARCHAR(255) NOT NULL,
  elo DOUBLE PRECISION NOT NULL,
  os_version VARCHAR(255) NOT NULL,
  version_app VARCHAR(255) NOT NULL,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

-- Create tie_toe_ad_games table
CREATE TABLE tie_toe_ad_games (
  thumb VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  ads VARCHAR(255) NOT NULL,
  link VARCHAR(255) NOT NULL
);
