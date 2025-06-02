package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type SignInRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func SignIn(c *gin.Context) {
	var req SignInRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// Demo user data (replace with real DB query)
	demoEmail := "user@example.com"
	demoPasswordHash, _ := bcrypt.GenerateFromPassword([]byte("password123"), bcrypt.DefaultCost)

	if req.Email != demoEmail {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email not found"})
		return
	}

	if err := bcrypt.CompareHashAndPassword(demoPasswordHash, []byte(req.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid password"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Signed in successfully"})
}

type GoogleTokenPayload struct {
	IDToken string `json:"idToken"` // this is the credential your frontend sends
}

type GoogleUserInfo struct {
	Iss           string `json:"iss"`
	Azp           string `json:"azp"`
	Aud           string `json:"aud"`
	Sub           string `json:"sub"`
	Email         string `json:"email"`
	EmailVerified string `json:"email_verified"`
	Name          string `json:"name"`
	Picture       string `json:"picture"`
	GivenName     string `json:"given_name"`
	FamilyName    string `json:"family_name"`
	Iat           int64  `json:"iat"`
	Exp           int64  `json:"exp"`
	Jti           string `json:"jti"`
}

func GoogleSignIn(c *gin.Context) {
	var payload GoogleTokenPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing or invalid idToken"})
		return
	}

	if payload.IDToken == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "idToken is required"})
		return
	}

	// Verify the token with Google
	userInfo, err := verifyGoogleToken(payload.IDToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid Google token: " + err.Error()})
		return
	}

	// TODO: Use userInfo.Email to create/find user in your DB and create session/JWT

	c.JSON(http.StatusOK, gin.H{
		"message": "Google sign-in successful",
		"user":    userInfo,
	})
}

// verifyGoogleToken sends the token to Google's tokeninfo endpoint and decodes the user info
func verifyGoogleToken(idToken string) (*GoogleUserInfo, error) {
	// Google endpoint for token validation
	url := fmt.Sprintf("https://oauth2.googleapis.com/tokeninfo?id_token=%s", idToken)

	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to call Google token info endpoint: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("token info endpoint returned status %d", resp.StatusCode)
	}

	var userInfo GoogleUserInfo
	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		return nil, fmt.Errorf("failed to decode token info response: %w", err)
	}

	return &userInfo, nil
}
