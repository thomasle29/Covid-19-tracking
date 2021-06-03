SELECT * FROM covid_19_db.infor;
SELECT * FROM covid_19_db.relative r
WHERE r.relative_from = 'ddc44d43-c371-11eb-9a1e-42010ab80002' OR r.relative_to = 'ddc44d43-c371-11eb-9a1e-42010ab80002';
SELECT COUNT(*) FROM covid_19_db.relative;

CALL covid_19_db.random_insert_relative_table(2000, 100);

CALL covid_19_db.select_meeting_table(21);