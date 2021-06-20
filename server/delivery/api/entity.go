package api

type (
	TrackingRequest struct {
		ID           string `json:"id"`
		NumberOfF    int    `json:"number-of-f"`
		NumberOfDate int    `json:"number-of-date"`
	}
)
