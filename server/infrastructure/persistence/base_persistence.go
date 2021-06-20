package persistence

import (
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/thomle295/Covid-19-tracking/server/config"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var database *gorm.DB

// ConnectDatabase inits connection to database
func ConnectDatabase() error {
	db, err := gorm.Open(
		config.Get().Database.Type,
		fmt.Sprintf(
			"%s:%s@tcp(%s)/%s",
			config.Get().Database.Username,
			config.Get().Database.Password,
			config.Get().Database.Address,
			config.Get().Database.Name,
		),
	)
	if err != nil {
		return err
	}
	db.DB().SetMaxIdleConns(int(config.Get().Database.MaxNumberConn))
	db.DB().SetMaxOpenConns(int(config.Get().Database.MaxNumberConn))
	db.DB().SetConnMaxLifetime(0)
	go ping(db)
	database = db
	return nil
}

func getDB() (*gorm.DB, error) {
	if database == nil {
		return nil, errors.New("Cannot connect to database")
	}
	return database, nil
}

func ping(db *gorm.DB) {
	duration := 3 * time.Second
	timer := time.NewTimer(duration)
	for range timer.C {
		db.DB().Ping()
		timer.Reset(duration)
	}
}

func prepareQuery(query string, params ...interface{}) string {
	var args = make([]string, len(params))
	for idx, param := range params {
		switch param.(type) {
		case string:
			str := param.(string)
			if strings.Contains(str, `"`) {
				args[idx] = fmt.Sprintf(`'%s'`, str)
			} else {
				args[idx] = fmt.Sprintf(`"%s"`, str)
			}
		default:
			args[idx] = fmt.Sprintf(`%v`, param)
		}
	}
	return fmt.Sprintf("%v(%v)", query, strings.Join(args[:], ","))
}
