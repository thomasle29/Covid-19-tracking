package repository

import "github.com/thomle295/Covid-19-tracking/server/domain/entity"

type ECovid19sysReporsitory interface {
	// Covid19 db request
	GetListRelativeByTime(numberOfDate int) (*entity.ItemRelativeLog, error)
	GetInfoPersonByDate(numberOfDate int) ([]*entity.ItemPersonLog, error)
}
