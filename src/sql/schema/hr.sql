CREATE TABLE hr.employee (
    identity_no TEXT NOT NULL,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    birth_date DATE NULL,
    pwd TEXT NOT NULL
);

CREATE TABLE hr.transaction (
    identity_no TEXT NOT NULL,
    entry_time TIMESTAMP NOT NULL,
    exit_time TIMESTAMP NOT NULL
);

CREATE TABLE hr.vacation (
    identity_no TEXT NOT NULL,
    begin_date DATE NOT NULL,
    end_date DATE NOT NULL,
    duration INT NOT NULL
);

INSERT INTO hr.vacation (identity_no, begin_date, end_date, duration)
VALUES ('12345', '2024-08-22', '2024-08-27', ( '2024-08-27'::date - '2024-08-22'::date ));
