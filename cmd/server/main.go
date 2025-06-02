// cmd/server/main.go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nathandotexe/Job-Fair/Back-End/internal/router"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*") // Or restrict to your frontend origin
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent) // 204 response for preflight
			return
		}

		c.Next()
	}
}

func main() {
	r := gin.Default()
	router.SetupRoutes(r)
	r.Run(":8080") // starts server at localhost:8080
}
