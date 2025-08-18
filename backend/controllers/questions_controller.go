package controllers

import (
	"backend/config" // แก้ชื่อ your_project_name ให้ถูกต้อง
	"backend/entity" // แก้ชื่อ your_project_name ให้ถูกต้อง
	"github.com/gin-gonic/gin"
	"net/http"
)

// ListQuestions godoc
// @Summary List all questions
// @Description Get a list of all questions
// @Tags questions
// @Accept json
// @Produce json
// @Success 200 {object} gin.H
// @Router /questions [get]
func ListQuestions(c *gin.Context) {
	var questions []entity.Question
	if err := config.DB().Preload("User").Find(&questions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": questions})
}

// CreateQuestion godoc
// @Summary Create a new question
// @Description Create a new question with the provided details
// @Tags questions
// @Accept json
// @Produce json
// @Param question body entity.Question true "Question data"
// @Success 201 {object} gin.H
// @Failure 400 {object} gin.H
// @Router /questions [post]
func CreateQuestion(c *gin.Context) {
	var question entity.Question
	if err := c.ShouldBindJSON(&question); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// In a real system, get the UserID from the logged-in user
	question.UserID = "user1" 

	if err := config.DB().Create(&question).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": question})
}