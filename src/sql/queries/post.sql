INSERT INTO records (employee, entry_time, exit_time) VALUES ($1, $2, $3) RETURNING * ;
