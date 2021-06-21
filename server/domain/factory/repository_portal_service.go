package factory

import (
	service_repository "github.com/thomle295/Covid-19-tracking/server/domain/service"
	"github.com/thomle295/Covid-19-tracking/server/infrastructure/service"
)

var portalServiceRepository = service.NewPortalServicePersistence()

// GetECovid19sysRepository returns a shared instance of EGateReporsitory
func GetPortalServiceRepository() service_repository.PortalServiceReporsitory {
	return portalServiceRepository
}
