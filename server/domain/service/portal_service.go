package service

import "github.com/thomle295/Covid-19-tracking/server/domain/entity"

// PortalService ...
type PortalServiceReporsitory interface {
	ComputeGraph(personID string, numberOfF int, log entity.ItemRelativeLog) ([]*entity.TrackingComputeResult, error)
}
