package config

import (
	"os"
	"strconv"
	"sync"

	"github.com/rs/zerolog/log"

	"github.com/thomle295/Covid-19-tracking/server/config/database"
	"github.com/thomle295/Covid-19-tracking/server/config/server"
)

const serverName = "server.1.0.0"

var once sync.Once
var instance *Config

// Config is content of config.json
type Config struct {
	Server   server.Config   `json:"server"`
	Database database.Config `json:"database"`
}

// Get returns object Config (Singleton)
func Get() *Config {
	if instance != nil {
		return instance
	}
	// Setup server config
	instance = new(Config)
	instance.Server.Name = serverName
	instance.Server.Port = int32(parseNumberConfig("COVID19_API_SERVICE_PORT", 8001))

	// Setup database config
	instance.Database.Type = parseStringConfig(os.Getenv("DATABASE_TYPE"), "mysql")
	if len(instance.Database.Type) == 0 {
		instance.Database.Type = "mysql"
	}
	instance.Database.Username = parseStringConfig("DATABASE_USERNAME", "root")
	instance.Database.Password = parseStringConfig("DATABASE_PASSWORD", "!@#$%^&*()")
	instance.Database.Name = parseStringConfig("DATABASE_NAME", "covid_19_db")
	instance.Database.Address = parseStringConfig("DATABASE_ADDRESS", "127.0.0.1:3306")
	instance.Database.MaxNumberConn = int(parseNumberConfig("DATABASE_MAX_CONNS", 20))
	return instance
}

func parseStringConfig(key string, val string) string {
	value := os.Getenv(key)
	if len(value) == 0 {
		return val
	}
	return value
}

func parseNumberConfig(key string, val int) int64 {
	value, err := strconv.ParseInt(os.Getenv(key), 10, 64)
	if err != nil {
		log.Info().Msgf("Key %s will be set default value %d", key, val)
		return int64(val)
	}
	return value
}
