CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email TEXT NOT NULL CHECK (position('@' IN email) > 1) UNIQUE,
    username VARCHAR(25) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    goal TEXT NOT NULL,
    body_type TEXT NOT NULL,
    height_feet INT NOT NULL CHECK (height_feet >= 2 AND height_feet <= 8),
    height_inches INT NOT NULL CHECK (height_inches >= 0 AND height_inches <= 11),
    weight INT NOT NULL CHECK (weight >= 30 AND weight <= 1000),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE exercises (
    exercise_id SERIAL PRIMARY KEY,
    exercise_name TEXT NOT NULL,
    muscle_group TEXT NOT NULL
);

CREATE TABLE programs (
    program_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE program_exercises (
    program_exercises_id SERIAL PRIMARY KEY,
    exercise_name TEXT NOT NULL,
    program_id INT NOT NULL,
    exercise_id INT NOT NULL,
    CONSTRAINT fk_program FOREIGN KEY (program_id) REFERENCES programs(program_id) ON DELETE CASCADE,
    CONSTRAINT fk_exercise FOREIGN KEY (exercise_id) REFERENCES exercises(exercise_id) ON DELETE CASCADE
);

