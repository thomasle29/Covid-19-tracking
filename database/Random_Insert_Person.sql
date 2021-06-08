-- Inserter Table
CREATE TABLE IF NOT EXISTS covid_19_db.full_name(
	full_name VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS covid_19_db.first_name(
	first_name_text VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS covid_19_db.middle_name(
	middle_name_text VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS covid_19_db.last_name(
	last_name_text VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS covid_19_db.address(
	address_text VARCHAR(20) NOT NULL
);

-- Insert name
INSERT INTO covid_19_db.first_name(first_name_text)
VALUES ('An'),('Binh'),('Cuong'),('Dung'),('Lan'),('Khang'),('Linh'),('Nam'),('Hieu'),('Vy'),('Phong'),('Tam'),('Phuc');

INSERT INTO covid_19_db.middle_name(middle_name_text)
VALUES ('Thi'),('Van'),('Hong'),('Kim'),('Ngoc'),('Anh'),('Trong'),('Phuong'),('Gia'),('Quang'),('Duc'),('Viet');

INSERT INTO covid_19_db.last_name(last_name_text)
VALUES ('Nguyen'),('Le'),('Nguyen'),('Pham'),('Ly'),('Lam'),('Tran'),('Luong'),('Hoai'),('Hoang'),('Vo'),('Dang');

INSERT INTO covid_19_db.address(address_text)
VALUES 
('Ho Chi Minh'), 
('Da Nang'), 
('Hue'), 
('Ben Tre'),
('Can Tho'),
('Ca Mau'),
('Ha Noi'),
('Hai Phong'),
('Ninh Binh'),
('Da Lat'),
('Pleiku'),
('Buon Ma Thuot');

INSERT INTO covid_19_db.full_name
	SELECT 
		CONCAT(last_name_text,' ',middle_name_text,' ',first_name_text) 
	FROM covid_19_db.last_name, covid_19_db.middle_name, covid_19_db.first_name;   
    
-- Insert into information table 
INSERT INTO covid_19_db.infor (infor_id, infor_name, infor_phone, infor_address, infor_year)
SELECT 
	UUID(),
	fn.full_name, 
	CONCAT('0',
		CONVERT(LPAD(FLOOR(RAND() * 10000000000), 9, '0'),CHAR)	
	),
    (
		SELECT a.address_text
        FROM covid_19_db.address a
        ORDER BY RAND()
		LIMIT 1
    ),
    FLOOR(RAND()*(2010-1950+1))+1950
FROM covid_19_db.full_name fn; 
