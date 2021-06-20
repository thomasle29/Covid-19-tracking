package entity

type (
	ItemRelativeLog struct {
		RelativeFrom []*string `json:"relative-from"`
		RelativeTo   []*string `json:"relative-to"`
	}

	TrackingComputeResult struct {
		PersonID      string    `json:"person-id"`
		PersonFNumber int       `json:"person-f-number"`
		PersonBefore  []*string `json:"person-before"`
	}
)
