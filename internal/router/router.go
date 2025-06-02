package router

import (
	"github.com/gin-gonic/gin"
	handler "github.com/nathandotexe/Job-Fair/Back-End/internal/handlers"
)

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		api.POST("/signin", handler.SignIn)
		api.POST("/google-signin", handler.GoogleSignIn)
	}

	// You can add a default root route if you want
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "API is running"})
	})
}
