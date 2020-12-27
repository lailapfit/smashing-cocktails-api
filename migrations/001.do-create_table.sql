CREATE TABLE spirit {
    spirit_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
}

CREATE TABLE recipe {
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    original_creator TEXT,
    add_photo Boolean,
    description TEXT NOT NULL,
    prep_time INT NOT NULL,
    main_spirit_id INT,
    ingredients TEXT[],
    garnish TEXT,
    instructions TEXT NOT NULL,
    glass_type TEXT NOT NULL,
    level_of_difficulty TEXT NOT NULL,
    tags TEXT[],
    photo_link TEXT,
    FOREIGN KEY (main_spirit_id) REFERENCES spirit (spirit_id)
};
