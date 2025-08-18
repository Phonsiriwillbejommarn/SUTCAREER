package entity

// Answer represents the Answer entity
type Answer struct {
	AnswerID string `gorm:"primaryKey;column:Answer_ID"`
	UserID   string `gorm:"column:User_ID"`
	User     User   `gorm:"foreignKey:UserID"`
	TitleID  string `gorm:"column:Title_ID"`
	Question Question `gorm:"foreignKey:TitleID"`
	Answer   string `gorm:"column:Answer"`
}