package service

import (
	"github.com/thomle295/Covid-19-tracking/server/domain/entity"
	"github.com/thomle295/Covid-19-tracking/server/domain/service"
)

// NewPortalService inits a new instance of PortalService
func NewPortalService() service.PortalService {
	return new(portalService)
}

type portalService struct {
}

func (repo *portalService) computeGraph(log entity.ItemRelativeLog) ([]*entity.TrackingComputeResult, error) {
	return nil, nil
}
