CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
  "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated" timestamptz,
  "email" text NOT NULL UNIQUE,
  "password" text NOT NULL
);

CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp ();

