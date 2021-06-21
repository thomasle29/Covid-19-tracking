package entity

type (
	TrackingComputeResult struct {
		PersonID      string    `json:"person-id"`
		PersonFNumber int       `json:"person-f-number"`
		PersonBefore  []*string `json:"person-before"`
	}

	ResTrackingCompute struct {
		PersonID       string           `json:"person-id"`
		NumberOfF      int              `json:"number-of-f"`
		PersonRelative *ItemRelativeLog `json:"person-relative"`
	}
)
