
-- SELECT RANDOM ON RELATIVE TABLE
DELIMITER //
DROP PROCEDURE IF EXISTS covid_19_db.select_relative_table ; //
CREATE PROCEDURE covid_19_db.select_1_information()
BEGIN
	SELECT infor_ID, infor_name, infor_phone, infor_year FROM covid_19_db.infor
    ORDER BY RAND() LIMIT 1;
END;

-- SELECT INFROMATION IN A NUMBER OF DAYS
DELIMITER //
DROP PROCEDURE IF EXISTS covid_19_db.select_relative_in_day ; //
CREATE PROCEDURE covid_19_db.select_relative_in_day (
    IN param_number_of_day INT
)
BEGIN
			SELECT DISTINCT covid_19_db.relative.relative_from, covid_19_db.infor.infor_name, covid_19_db.infor.infor_phone, covid_19_db.infor.infor_year
			FROM covid_19_db.relative
			INNER JOIN covid_19_db.infor ON covid_19_db.relative.relative_from =  covid_19_db.infor.infor_ID
            WHERE UNIX_TIMESTAMP(CURRENT_TIMESTAMP) - `timestamp` < param_number_of_day *24 *60 *60
			UNION
			SELECT DISTINCT covid_19_db.relative.relative_to, covid_19_db.infor.infor_name, covid_19_db.infor.infor_phone, covid_19_db.infor.infor_year
			FROM covid_19_db.relative
			INNER JOIN covid_19_db.infor ON covid_19_db.relative.relative_to =  covid_19_db.infor.infor_ID
            WHERE UNIX_TIMESTAMP(CURRENT_TIMESTAMP) - `timestamp` < param_number_of_day *24 *60 *60
            ORDER BY infor_name;
END;





