package main

import (
	"github.com/rs/zerolog/log"
	"github.com/thomle295/Covid-19-tracking/server/config"
	"github.com/thomle295/Covid-19-tracking/server/delivery/api"
)

func main() {
	// Start server
	err := api.Begin(config.Get().Server.Port)
	if err != nil {
		log.Error().Msg(err.Error())
	}
}
