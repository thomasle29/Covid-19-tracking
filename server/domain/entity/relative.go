package entity

type (
	ItemRelativeLog struct {
		RelativeFrom []*string `json:"relative-from"`
		RelativeTo   []*string `json:"relative-to"`
	}
)
