package controllers

import (
	"backend/config" // แก้ชื่อ your_project_name ให้ถูกต้อง
	"backend/entity" // แก้ชื่อ your_project_name ให้ถูกต้อง
	"github.com/gin-gonic/gin"
	"net/http"
)

// CreateAnswer godoc
// @Summary Create a new answer
// @Description Create a new answer for a specific question
// @Tags answers
// @Accept json
// @Produce json
// @Param answer body entity.Answer true "Answer data"
// @Success 201 {object} gin.H
// @Failure 400 {object} gin.H
// @Router /answers [post]
func CreateAnswer(c *gin.Context) {
	var answer entity.Answer
	if err := c.ShouldBindJSON(&answer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// In a real system, get the UserID from the logged-in user
	answer.UserID = "user2"

	if answer.TitleID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "TitleID is required"})
		return
	}

	if err := config.DB().Create(&answer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": answer})
}