package entity

type (
	DataMessage struct {
		ReturnCode int    `json:"returncode"`
		Data       string `json:"data"`
		Timestamp  int64  `json:"timestamp"`
	}
)
