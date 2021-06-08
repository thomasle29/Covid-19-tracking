SELECT * FROM covid_19_db.infor;
SELECT * FROM covid_19_db.relative r
WHERE r.relative_from = 'ddc44d43-c371-11eb-9a1e-42010ab80002' OR r.relative_to = 'ddc44d43-c371-11eb-9a1e-42010ab80002';
SELECT COUNT(*) FROM covid_19_db.relative;

CALL covid_19_db.random_insert_relative_table(4000, 100);

CALL covid_19_db.select_meeting_table(21);

SELECT unix_timestamp(current_time()) - (10 * 24 * 60 * 60);

SELECT * FROM covid_19_db.relative r
WHERE r.`timestamp` > (UNIX_TIMESTAMP(CURRENT_TIME()) - (5 * 24 * 60 * 60));

SELECT FLOOR( RAND() * (15-10+1) + 10 );
FLOOR( RAND() * (max-min+1) + min )

SELECT (FLOOR(1 + RAND() *10)); 

CALL covid_19_db.get_relative_by_time(10);
CALL covid_19_db.select_relative_in_day(1, 2);
DROP TABLE covid_19_db.temp_table
