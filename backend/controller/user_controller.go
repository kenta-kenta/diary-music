package controller

import (
	"net/http"
	"os"
	"time"

	"github.com/kenta-kenta/diary-music/model"
	"github.com/kenta-kenta/diary-music/usecase"
	"github.com/labstack/echo/v4"
)

type IUserController interface {
	SignUp(c echo.Context) error
	Login(c echo.Context) error
	Logout(c echo.Context) error
}

type UserController struct {
	uu usecase.IUserUsecase
}

func NewUserController(uu usecase.IUserUsecase) IUserController {
	return &UserController{uu}
}

func (uc *UserController) SignUp(c echo.Context) error {
	user := model.User{}
	// リクエストボディのバインド
	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	// ユーザー登録
	resUser, err := uc.uu.SignUp(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, resUser)
}

func (uc *UserController) Login(c echo.Context) error {
	user := model.User{}
	// リクエストボディのバインド
	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	// ログイン
	token, err := uc.uu.Login(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	cookie := new(http.Cookie)                      // Cookieの生成
	cookie.Name = "token"                           // Cookie名
	cookie.Value = token                            // Cookie値
	cookie.Expires = time.Now().Add(24 * time.Hour) // 有効期限
	cookie.Path = "/"                               // パス
	cookie.Domain = os.Getenv("API_DOMAIN")         // ドメイン
	// cookie.Secure = true
	cookie.HttpOnly = true                  // JavaScriptからのアクセスを禁止
	cookie.SameSite = http.SameSiteNoneMode // SameSite属性
	c.SetCookie(cookie)                     // Cookieの設定
	return c.NoContent(http.StatusOK)
}

func (uc *UserController) Logout(c echo.Context) error {
	cookie := new(http.Cookie)              // Cookieの生成
	cookie.Name = "token"                   // Cookie名
	cookie.Value = ""                       // Cookie値
	cookie.Expires = time.Now()             // 有効期限
	cookie.Path = "/"                       // パス
	cookie.Domain = os.Getenv("API_DOMAIN") // ドメイン
	// cookie.Secure = true
	cookie.HttpOnly = true                  // JavaScriptからのアクセスを禁止
	cookie.SameSite = http.SameSiteNoneMode // SameSite属性
	c.SetCookie(cookie)                     // Cookieの設定
	return c.NoContent(http.StatusOK)
}
