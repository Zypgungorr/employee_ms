CREATE TABLE records (
    id SERIAL PRIMARY KEY,
    employee VARCHAR(45),
    entry_time TIME,
    exit_time TIME
);

INSERT INTO records 
VALUES (1,'Zeynep','09:00','17:00')

INSERT INTO records 
VALUES (2,'Elif','09:15','17:15')

INSERT INTO records 
VALUES (3,'Bade','09:20','17:20')