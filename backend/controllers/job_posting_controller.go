package controllers

import (
	"backend/config" // แก้ชื่อ your_project_name ให้ถูกต้อง
	"backend/entity" // แก้ชื่อ your_project_name ให้ถูกต้อง
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

// CreateJobPosting godoc
// @Summary Create a new job posting
// @Description Create a new job posting with the provided details
// @Tags job_postings
// @Accept json
// @Produce json
// @Param job_posting body entity.JobPosting true "Job posting data"
// @Success 201 {object} gin.H
// @Failure 400 {object} gin.H
// @Router /job_postings [post]
func CreateJobPosting(c *gin.Context) {
	var jobPosting entity.JobPosting
	if err := c.ShouldBindJSON(&jobPosting); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// In a real system, get the UserID from the logged-in user
	jobPosting.UserID = "user1"
	jobPosting.PostDate = time.Now()

	if err := config.DB().Create(&jobPosting).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": jobPosting})
}