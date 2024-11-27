package router

import (
	"os"

	"github.com/kenta-kenta/diary-music/controller"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
)

func NewRouter(uc controller.IUserController, dc controller.IDiaryController) *echo.Echo {
	e := echo.New()
	e.POST("/signup", uc.SignUp)
	e.POST("/login", uc.Login)
	e.POST("/logout", uc.Logout)
	t := e.Group("/tasks")
	t.Use(echojwt.WithConfig(echojwt.Config{
		SigningKey:  []byte(os.Getenv("SECRET")), // Secret key
		TokenLookup: "cookie:token",              // Where to look for the token
	}))
	t.GET("", dc.GetAllDiaries)
	t.GET("/:diaryId", dc.GetDiaryById)
	t.POST("", dc.CreateDiary)
	t.PUT("/:diaryId", dc.UpdateDiary)
	t.DELETE("/:diaryId", dc.DeleteDiary)
	return e
}
