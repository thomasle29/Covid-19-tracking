package server

type Config struct {
	Group string `json:"group"`
	Name  string `json:"name"`
	Port  int32  `json:"port"`
}
