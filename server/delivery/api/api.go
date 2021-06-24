package api

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/thomle295/Covid-19-tracking/server/application"
)

func ping(c *gin.Context) {
	c.JSON(http.StatusOK, buildMessage("pong"))
}

func getListRelativeByTime(c *gin.Context) {
	numberOfDateString := c.Param("numberofdate")
	if len(numberOfDateString) == 0 {
		c.JSON(buildErrorMessage(http.StatusBadRequest, errors.New("invalid numberOfDate")))
		return
	}

	numberOfDateInt, err := strconv.Atoi(numberOfDateString)
	if err != nil {
		c.JSON(buildErrorMessage(http.StatusInternalServerError, err))
		return
	}

	res, err := application.GetListRelativeByTime(numberOfDateInt)
	if err != nil {
		c.JSON(buildErrorMessage(http.StatusInternalServerError, err))
		return
	}

	c.JSON(http.StatusOK, buildMessage(res))
}

func getInfoPersonByDate(c *gin.Context) {
	numberOfDateString := c.Param("numberofdate")
	if len(numberOfDateString) == 0 {
		c.JSON(buildErrorMessage(http.StatusBadRequest, errors.New("invalid numberOfDate")))
		return
	}

	numberOfDateInt, err := strconv.Atoi(numberOfDateString)
	if err != nil {
		c.JSON(buildErrorMessage(http.StatusInternalServerError, err))
		return
	}

	res, err := application.GetInfoPersonByDate(numberOfDateInt)
	if err != nil {
		c.JSON(buildErrorMessage(http.StatusInternalServerError, err))
		return
	}

	c.JSON(http.StatusOK, buildMessage(res))
}

func getTrackingGraph(c *gin.Context) {
	var req TrackingRequest

	err := c.BindJSON(&req)

	if err != nil {
		c.JSON(buildErrorMessage(http.StatusBadRequest, errors.New("invalid request")))
		return
	}

	if len(req.ID) == 0 {
		c.JSON(buildErrorMessage(http.StatusBadRequest, errors.New("invalid person ID")))
		return
	}

	res, err := application.GetTrackingGraph(req.ID, req.NumberOfF, req.NumberOfDate)

	if err != nil {
		c.JSON(buildErrorMessage(http.StatusBadRequest, errors.New("invalid request")))
		return
	}

	c.JSON(http.StatusOK, buildMessage(res))
}
