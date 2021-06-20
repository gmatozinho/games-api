CREATE EXTENSION pgcrypto;
CREATE TABLE "game" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "name" text NOT NULL,
    "released" text NOT NULL,
    "website" text NOT NULL,
    "description" text NULL,
    "created_at" timestamp without time zone NOT NULL DEFAULT (current_timestamp AT TIME ZONE 'UTC'),
    "updated_at" timestamp NOT NULL
);
CREATE TABLE "platform" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "name" text NOT NULL,
    "year_start" int NOT NULL,
    "year_end" int NULL
);
CREATE TABLE "store" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "name" text NOT NULL,
    "website" text NOT NULL
);
CREATE TABLE "tag" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "name" text NOT NULL
);
CREATE TABLE "game_platform" (
    "game_id" UUID NOT NULL,
    "platform_id" UUID NOT NULL,
    PRIMARY KEY ("game_id", "platform_id"), 
    FOREIGN KEY (game_id) REFERENCES game(id) ON UPDATE CASCADE,
    FOREIGN KEY (platform_id) REFERENCES platform(id) ON UPDATE CASCADE
);
CREATE TABLE "game_store" (
    "game_id" UUID NOT NULL,
    "store_id" UUID NOT NULL,
    PRIMARY KEY ("game_id", "store_id"), 
    FOREIGN KEY (game_id) REFERENCES game(id) ON UPDATE CASCADE,
    FOREIGN KEY (store_id) REFERENCES store(id) ON UPDATE CASCADE
);
CREATE TABLE "game_tag" (
    "game_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,
    PRIMARY KEY ("game_id", "tag_id"),
    FOREIGN KEY (game_id) REFERENCES game(id) ON UPDATE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tag(id) ON UPDATE CASCADE
);
INSERT INTO platform (name, year_start)
VALUES ('PlayStation 5', 2020);
INSERT INTO store (name, website)
VALUES ('PlayStation Store', 'store.playstation.com');
INSERT INTO tag (name)
VALUES ('Singleplayer');