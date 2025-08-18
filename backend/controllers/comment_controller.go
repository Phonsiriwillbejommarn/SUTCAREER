package controllers

import (
	"backend/config" // แก้ชื่อ your_project_name ให้ถูกต้อง
	"backend/entity" // แก้ชื่อ your_project_name ให้ถูกต้อง
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

// CreateComment godoc
// @Summary Create a new comment
// @Description Create a new comment for a specific job posting
// @Tags comments
// @Accept json
// @Produce json
// @Param comment body entity.Comment true "Comment data"
// @Success 201 {object} gin.H
// @Failure 400 {object} gin.H
// @Router /comments [post]
func CreateComment(c *gin.Context) {
	var comment entity.Comment
	if err := c.ShouldBindJSON(&comment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// In a real system, get the UserID from the logged-in user
	comment.UserID = "user2"
	comment.CommentDate = time.Now()

	if err := config.DB().Create(&comment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": comment})
}