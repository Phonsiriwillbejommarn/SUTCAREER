package entity

// User represents the unified User entity
type User struct {
	UserID    string `gorm:"primaryKey;column:USER_ID"`
	Email     string `gorm:"column:EMAIL"`
	FirstName string `gorm:"column:First_Name"`
	LastName  string `gorm:"column:Last_Name"`
	Age       int    `gorm:"column:Age"`
}