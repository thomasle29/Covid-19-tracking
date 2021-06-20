package factory

import (
	"github.com/thomle295/Covid-19-tracking/server/domain/repository"
	"github.com/thomle295/Covid-19-tracking/server/infrastructure/persistence"
)

var ecovid19sysRepository = persistence.NewECovid19sysPersistence()

// Setup connects to databases
func Setup() error {
	return persistence.ConnectDatabase()
}

// GetECovid19sysRepository returns a shared instance of EGateReporsitory
func GetECovid19sysRepository() repository.ECovid19sysReporsitory {
	return ecovid19sysRepository
}
