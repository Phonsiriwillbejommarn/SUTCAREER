package main

import (
	
		"backend/config"
		"backend/controllers"
		"backend/entity"
	  
	  // แก้ชื่อ your_project_name ให้ถูกต้อง
	"fmt"
	"github.com/gin-gonic/gin"
)

func main() {
	// 1. เชื่อมต่อฐานข้อมูล
	config.ConnectionDB()
	fmt.Println("Database connection successful!")

	// 2. สั่ง GORM ให้สร้างตารางจาก Struct ที่เราสร้างไว้
	err := config.DB().AutoMigrate(
		&entity.User{},
		&entity.JobPosting{},
		&entity.Comment{},
		&entity.Question{},
		&entity.Answer{},
		&entity.FormQuestion{},
	)
	if err != nil {
		panic("Failed to migrate database: " + err.Error())
	}
	fmt.Println("Database migration successful!")

	// 3. ตั้งค่าเซิร์ฟเวอร์ด้วย Gin
	router := gin.Default()

	// --- API Routes ---
	api := router.Group("/api")
	{
		// Routes for Job Postings
		api.POST("/job_postings", controllers.CreateJobPosting)
		
		// Routes for Comments
		api.POST("/comments", controllers.CreateComment)

		// Routes for Questions
		api.GET("/questions", controllers.ListQuestions)
		api.POST("/questions", controllers.CreateQuestion)

		// Routes for Answers
		api.POST("/answers", controllers.CreateAnswer)
	}
	// --------------------

	// 4. เริ่มการทำงานของเซิร์ฟเวอร์
	fmt.Println("Starting server on localhost:8080")
	router.Run("localhost:8080")
}