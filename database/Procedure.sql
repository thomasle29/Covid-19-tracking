-- Procudue select from infor table
DELIMITER //

DROP PROCEDURE IF EXISTS covid_19_db.random_insert_relative_table //
CREATE PROCEDURE covid_19_db.random_insert_relative_table (
	IN param_number_of_loop_time INT,
    IN param_number_of_day INT
)
BEGIN
	DECLARE counter INT DEFAULT 1;
    
    while_loop: WHILE counter <= param_number_of_loop_time DO
    
		SELECT i.infor_id
		INTO @infor_from
		FROM covid_19_db.infor i 
		ORDER BY RAND() 
		LIMIT 1;
    
		SELECT i.infor_id
		INTO @infor_to
		FROM covid_19_db.infor i 
		ORDER BY RAND() 
		LIMIT 1;
        
        IF (STRCMP(@infor_from, @infor_to) = 0) THEN
			ITERATE while_loop;
		END IF;
        
        SET @timestamp_from =  UNIX_TIMESTAMP(CURRENT_TIMESTAMP) - (param_number_of_day * 24 * 60 * 60);
        SET @timestamp_to = UNIX_TIMESTAMP(CURRENT_TIMESTAMP);
    
		INSERT INTO covid_19_db.relative (relative_ID, relative_from, relative_to, `timestamp`) 
		VALUES (
				UUID(),
				@infor_from,
				@infor_to,
				(FLOOR(RAND() *(@timestamp_to-@timestamp_from+1)+@timestamp_from))
		);
            
		SET counter = counter + 1;
    END WHILE;
END //

DROP PROCEDURE IF EXISTS covid_19_db.select_infor_table //
CREATE PROCEDURE covid_19_db.select_infor_table()
BEGIN
	SELECT infor_ID, infor_name, infor_phone, infor_year FROM CSD.infor;
END //

DROP PROCEDURE IF EXISTS covid_19_db.select_meeting_table //
CREATE PROCEDURE covid_19_db.select_meeting_table()
BEGIN
	SELECT relative_ID, relative_A, relative_B, timestamp FROM CSD.relative;
END //

DROP PROCEDURE IF EXISTS covid_19_db.get_relative_by_time //
CREATE PROCEDURE covid_19_db.get_relative_by_time(
	IN param_number_of_date INT
)
BEGIN
	SELECT r.relative_from, r.relative_to 
    FROM covid_19_db.relative r
	WHERE r.`timestamp` > (UNIX_TIMESTAMP(CURRENT_TIME()) - (param_number_of_date * 24 * 60 * 60));
END //

-- SELECT INFROMATION IN A NUMBER OF DAYS
DROP PROCEDURE IF EXISTS covid_19_db.get_info_person_by_date //
CREATE PROCEDURE covid_19_db.get_info_person_by_date (
    IN param_number_of_day INT
)
BEGIN
	SELECT DISTINCT r.relative_from, i.infor_name, i.infor_phone, i.infor_address, i.infor_year
	FROM covid_19_db.relative r
	INNER JOIN covid_19_db.infor i
		ON r.relative_from = i.infor_ID
	WHERE UNIX_TIMESTAMP(CURRENT_TIMESTAMP) - r.`timestamp` < param_number_of_day * 24 * 60 * 60
	UNION
	SELECT DISTINCT r.relative_to, i.infor_name, i.infor_phone, i.infor_address, i.infor_year
	FROM covid_19_db.relative r
	INNER JOIN covid_19_db.infor i
		ON r.relative_to =  i.infor_ID
	WHERE UNIX_TIMESTAMP(CURRENT_TIMESTAMP) - r.`timestamp` < param_number_of_day * 24 * 60 * 60
	ORDER BY infor_name;
END //