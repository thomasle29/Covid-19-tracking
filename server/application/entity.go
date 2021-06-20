package application

type (
	TrackingResult struct {
		PersonID      string    `json:"person-id"`
		PersonName    string    `json:"person-name"`
		PersonPhone   string    `json:"person-phone"`
		PersonAddress string    `json:"person-address"`
		PersonYear    string    `json:"person-year"`
		PersonFNumber int       `json:"person-f-number"`
		PersonBefore  []*string `json:"person-before"`
	}
)
