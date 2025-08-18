package entity

// Question represents the Question entity
type Question struct {
	TitleID        string `gorm:"primaryKey;column:Title_ID"`
	UserID         string `gorm:"column:User_ID"`
	User           User   `gorm:"foreignKey:UserID"`
	Title          string `gorm:"column:Title"`
	DescriptionQ   string `gorm:"column:Description_Q"`
	CommentUser    string `gorm:"column:Comment_User"`
	StatusQuestion int    `gorm:"column:Status_Question"`
	Answers        []Answer `gorm:"foreignKey:TitleID"`
}