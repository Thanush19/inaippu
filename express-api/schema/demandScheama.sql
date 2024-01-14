CREATE TABLE demands (
  id SERIAL PRIMARY KEY,
  description VARCHAR(255),
  serviceType VARCHAR(255),
  isClosed BOOLEAN DEFAULT false,
  isResolved BOOLEAN DEFAULT false,
  user_id INTEGER REFERENCES users(id),
  resolved_by_user_id INTEGER REFERENCES users(id)
);

-- Add created_at column with default value
ALTER TABLE demands
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Add updated_at column with default value and automatic update
ALTER TABLE demands
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
