package api

import "time"

type message struct {
	ReturnCode int         `json:"returncode"`
	Data       interface{} `json:"data"`
	Timestamp  int64       `json:"timestamp"`
}

func buildMessage(data interface{}) interface{} {
	if data == nil {
		data = make(map[string]int)
	}
	return message{
		ReturnCode: 1,
		Data:       data,
		Timestamp:  time.Now().Unix(),
	}
}

func buildErrorMessage(statusCode int, err error) (int, interface{}) {
	returnCode := -1
	data := err.Error()
	// sqlErr, ok := err.(*mysql.MySQLError)
	// if ok {
	// 	statusCode = http.StatusOK
	// 	returnCode = (int)(sqlErr.Number)
	// 	data = sqlErr.Message
	// }
	return statusCode, message{
		ReturnCode: returnCode,
		Data:       data,
		Timestamp:  time.Now().Unix(),
	}
}
