CREATE TABLE demands (
  id SERIAL PRIMARY KEY,
  description VARCHAR(255),
  serviceType VARCHAR(255),
  isClosed BOOLEAN DEFAULT false,
  isResolved BOOLEAN DEFAULT false,
  user_id INTEGER REFERENCES users(id),
  resolved_by_user_id INTEGER REFERENCES users(id)
);
