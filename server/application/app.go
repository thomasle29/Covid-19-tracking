package application

import (
	"github.com/thomle295/Covid-19-tracking/server/domain/entity"
	"github.com/thomle295/Covid-19-tracking/server/domain/factory"
)

func GetListRelativeByTime(numberOfDate int) (*entity.ItemRelativeLog, error) {
	res, err := factory.GetECovid19sysRepository().GetListRelativeByTime(numberOfDate)

	if err != nil {
		return nil, err
	}

	return res, err
}

func GetInfoPersonByDate(numberOfDate int) ([]*entity.ItemPersonLog, error) {
	res, err := factory.GetECovid19sysRepository().GetInfoPersonByDate(numberOfDate)

	if err != nil {
		return nil, err
	}

	return res, err
}

func GetTrackingGraph(id string, numberOfF, numberOfDate int) ([]*TrackingResult, error) {
	//res, err := factory.GetECovid19sysRepository().GetListRelativeByTime(numberOfDate)

	//if err != nil {
	//	return nil, err
	//}

	return nil, nil
}
