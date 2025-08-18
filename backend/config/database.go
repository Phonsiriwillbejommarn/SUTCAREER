package config

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("sut_career.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database!")
	}
	db = database
}

func DB() *gorm.DB {
	return db
}