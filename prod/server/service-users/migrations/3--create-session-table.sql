CREATE TABLE "sessions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
  "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated" timestamptz,
  "userId" uuid NOT NULL REFERENCES "users" ("id") ON DELETE RESTRICT,
  "expires" timestamptz NOT NULL
);

CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON sessions
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp ();

