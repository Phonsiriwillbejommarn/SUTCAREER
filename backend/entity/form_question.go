package entity

import "time"

// FormQuestion represents the From Question entity
type FormQuestion struct {
	FormQuestionID string    `gorm:"primaryKey;column:Form_Question_ID"`
	UserID         string    `gorm:"column:User_ID"`
	User           User      `gorm:"foreignKey:UserID"`
	Phone          string    `gorm:"column:Phon"`
	Email          string    `gorm:"column:Email"`
	Role           int       `gorm:"column:Role"`
	Title          string    `gorm:"column:Title"`
	Description    string    `gorm:"column:Description"`
	DateTime       time.Time `gorm:"column:Date_Time"`
}