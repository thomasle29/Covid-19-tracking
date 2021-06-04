
DROP PROCEDURE IF EXISTS covid_19_db.select_meeting_table ;
CREATE PROCEDURE covid_19_db.select_1_information()
BEGIN
	SELECT infor_ID, infor_name, infor_phone, infor_year FROM covid_19_db.infor
    ORDER BY RAND() LIMIT 1;
END;

CALL covid_19_db.select_meeting_table(21);

