package main

import (
	"github.com/rs/zerolog/log"
	"github.com/thomle295/Covid-19-tracking/server/config"
	"github.com/thomle295/Covid-19-tracking/server/delivery/api"
	"github.com/thomle295/Covid-19-tracking/server/domain/factory"
)

func main() {
	// Open connection to database
	err := factory.Setup()
	if err != nil {
		log.Error().Msg(err.Error())
		return
	}

	// Start server
	err = api.Begin(config.Get().Server.Port)
	if err != nil {
		log.Error().Msg(err.Error())
	}
}
