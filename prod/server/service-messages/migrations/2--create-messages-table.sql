CREATE TABLE "messages" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
  "created" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated" timestamptz,
  "userId" uuid NOT NULL,
  "text1" text,
  "text2" text,
  "text3" text
);

CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON messages
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp ();

