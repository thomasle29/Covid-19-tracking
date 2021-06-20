package persistence

import (
	"github.com/jinzhu/gorm"
	"github.com/thomle295/Covid-19-tracking/server/domain/entity"
	"github.com/thomle295/Covid-19-tracking/server/domain/repository"
)

// NewEGatePersistence inits a new instance of ECovid19sysReporsitory
func NewECovid19sysPersistence() repository.ECovid19sysReporsitory {
	return new(ecovid19sysPersistence)
}

type ecovid19sysPersistence struct {
}

// Get Relative person
func (repo *ecovid19sysPersistence) GetListRelativeByTime(numberOfDate int) (*entity.ItemRelativeLog, error) {
	var log entity.ItemRelativeLog

	db, err := getDB()
	if err != nil {
		return &log, err
	}

	err = db.Transaction(func(tx *gorm.DB) error {
		rows, err := tx.Raw(
			prepareQuery(
				"CALL get_relative_by_time",
				numberOfDate,
			),
		).Rows()

		if err != nil {
			return err
		}

		defer rows.Close()

		for rows.Next() {
			var relativeFrom string
			var relativeTo string
			err = rows.Scan(
				&relativeFrom,
				&relativeTo,
			)

			if err != nil {
				return err
			}

			log.RelativeFrom = append(log.RelativeFrom, &relativeFrom)
			log.RelativeTo = append(log.RelativeTo, &relativeTo)
		}

		return nil
	})

	return &log, err
}

func (repo *ecovid19sysPersistence) GetInfoPersonByDate(numberOfDate int) ([]*entity.ItemPersonLog, error) {
	var logs []*entity.ItemPersonLog

	db, err := getDB()
	if err != nil {
		return logs, err
	}

	err = db.Transaction(func(tx *gorm.DB) error {
		rows, err := tx.Raw(
			prepareQuery(
				"CALL get_info_person_by_date",
				numberOfDate,
			),
		).Rows()

		if err != nil {
			return err
		}

		defer rows.Close()

		for rows.Next() {
			var log = new(entity.ItemPersonLog)
			err = rows.Scan(
				&log.PersonID,
				&log.PersonName,
				&log.PersonPhone,
				&log.PersonAddress,
				&log.PersonYear,
			)

			if err != nil {
				return err
			}

			logs = append(logs, log)
		}

		return nil
	})

	return logs, err
}
