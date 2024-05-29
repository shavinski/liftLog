INSERT INTO users (
        email,
        username,
        password,
        first_name,
        last_name,
        goal,
        body_type,
        height_feet,
        height_inches,
        weight,
        is_admin
    )
VALUES (
        'user1@example.com',
        'user1',
        'password1',
        'John',
        'Doe',
        'lose weight',
        'mesomorph',
        6,
        2,
        180,
        FALSE
    ),
    (
        'user2@example.com',
        'user2',
        'password2',
        'Jane',
        'Smith',
        'build muscle',
        'ectomorph',
        5,
        9,
        150,
        FALSE
    );