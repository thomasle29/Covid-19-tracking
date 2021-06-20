package api

import (
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func authen() gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}

		c.Next()
	}
}

// Begin is used to start the HTTP server
func Begin(port int32) error {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"HEAD", "GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Access-Token"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}), authen())
	setup(router.Group("/covid19/api"))
	return router.Run(fmt.Sprintf(":%d", port))
}

func setup(router *gin.RouterGroup) {
	router.GET("/ping", ping)

	// Relative log
	router.GET("relative/logs/:numberofdate", getListRelativeByTime)

	// Person log
	router.GET("person/logs/:numberofdate", getInfoPersonByDate)

	// Tracking
	router.GET("tracking", getTrackingGraph)
}
