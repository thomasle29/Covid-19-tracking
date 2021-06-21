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

func GetTrackingGraph(id string, numberOfF, numberOfDate int) ([]*TrackingResultLog, error) {
	listRelativeByTimeLog, err := factory.GetECovid19sysRepository().GetListRelativeByTime(numberOfDate)

	if err != nil {
		return nil, err
	}

	trackingComputeResultLog, err := factory.GetPortalServiceRepository().ComputeGraph(id, numberOfF, *listRelativeByTimeLog)

	if err != nil {
		return nil, err
	}

	var resultTrackings []*TrackingResultLog

	for _, log := range trackingComputeResultLog {

		personInfo, err := factory.GetECovid19sysRepository().GetInfoPersonByID(log.PersonID)

		if err != nil {
			return nil, err
		}

		var resultTracking TrackingResultLog
		resultTracking.PersonID = log.PersonID
		resultTracking.PersonName = personInfo.PersonName
		resultTracking.PersonPhone = personInfo.PersonPhone
		resultTracking.PersonAddress = personInfo.PersonAddress
		resultTracking.PersonYear = personInfo.PersonYear
		resultTracking.PersonFNumber = log.PersonFNumber
		resultTracking.PersonBefore = log.PersonBefore

		resultTrackings = append(resultTrackings, &resultTracking)
	}

	return resultTrackings, err
}
