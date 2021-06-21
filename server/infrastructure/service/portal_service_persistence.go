package service

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/thomle295/Covid-19-tracking/server/domain/entity"
	"github.com/thomle295/Covid-19-tracking/server/domain/service"
)

// NewPortalService inits a new instance of PortalService
func NewPortalServicePersistence() service.PortalServiceReporsitory {
	return new(portalServiceRepository)
}

type portalServiceRepository struct {
}

func (repo *portalServiceRepository) ComputeGraph(personID string, numberOfF int, log entity.ItemRelativeLog) ([]*entity.TrackingComputeResult, error) {

	var res_log entity.ResTrackingCompute
	res_log.PersonID = personID
	res_log.NumberOfF = numberOfF
	res_log.PersonRelative = &log

	res_json_log, err := json.Marshal(res_log)

	if err != nil {
		return nil, err
	}

	resp, err := http.Post(
		"http://34.101.101.43:8002/compute/tracking/graph",
		"application/json",
		bytes.NewBuffer(res_json_log),
	)
	var res map[string]interface{}

	json.NewDecoder(resp.Body).Decode(&res)

	resData := fmt.Sprintf("%s", res["data"])

	var resultRelative []*entity.TrackingComputeResult

	json.Unmarshal([]byte(resData), &resultRelative)

	if err != nil {
		return nil, err
	}

	return resultRelative, err
}
