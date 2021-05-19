package database

type Config struct {
	Type          string `json:"type"`
	Address       string `json:"host"`
	Name          string `json:"name"`
	Username      string `json:"username"`
	Password      string `json:"password"`
	MaxNumberConn int    `json:"max-conn"`
}
