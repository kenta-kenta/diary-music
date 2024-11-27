package controller

import (
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt/v4"
	"github.com/kenta-kenta/diary-music/model"
	"github.com/kenta-kenta/diary-music/usecase"
	"github.com/labstack/echo/v4"
)

type IDiaryController interface {
	GetAllDiaries(c echo.Context) error
	GetDiaryById(c echo.Context) error
	CreateDiary(c echo.Context) error
	UpdateDiary(c echo.Context) error
	DeleteDiary(c echo.Context) error
}

type diaryController struct {
	du usecase.IDiaryUsecase
}

func NewDiaryController(du usecase.IDiaryUsecase) IDiaryController {
	return &diaryController{du}
}

func (du *diaryController) GetAllDiaries(c echo.Context) error {
	// Get user ID from JWT
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]

	taskRes, err := du.du.GetAllDiaries(uint(userId.(float64)))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, taskRes)
}

func (du *diaryController) GetDiaryById(c echo.Context) error {
	// Get user ID from JWT
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]

	id := c.Param("diaryId")
	taskId, _ := strconv.Atoi(id)
	taskRes, err := du.du.GetDiaryById(uint(userId.(float64)), uint(taskId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, taskRes)
}

func (du *diaryController) CreateDiary(c echo.Context) error {
	// Get user ID from JWT
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]

	diary := model.Diary{}
	if err := c.Bind(&diary); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	diary.UserId = uint(userId.(float64))
	diaryRes, err := du.du.CreateDiary(diary)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, diaryRes)
}

func (du *diaryController) UpdateDiary(c echo.Context) error {
	// Get user ID from JWT
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]

	id := c.Param("diaryId")
	taskId, _ := strconv.Atoi(id)
	diary := model.Diary{}
	if err := c.Bind(&diary); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	diaryRes, err := du.du.UpdateDiary(uint(userId.(float64)), uint(taskId), diary)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, diaryRes)
}

func (du *diaryController) DeleteDiary(c echo.Context) error {
	// Get user ID from JWT
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]

	id := c.Param("diaryId")
	taskId, _ := strconv.Atoi(id)
	err := du.du.DeleteDiary(uint(userId.(float64)), uint(taskId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.NoContent(http.StatusNoContent)
}
