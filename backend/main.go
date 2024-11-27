package main

import (
	"github.com/kenta-kenta/diary-music/controller"
	"github.com/kenta-kenta/diary-music/db"
	"github.com/kenta-kenta/diary-music/repository"
	"github.com/kenta-kenta/diary-music/router"
	"github.com/kenta-kenta/diary-music/usecase"
)

func main() {
	db := db.NewDB()
	userRepository := repository.NewUserRepository(db)
	diaryRepository := repository.NewDiaryRepository(db)
	userUsecase := usecase.NewUserUsecase(userRepository)
	diaryUsecase := usecase.NewDiaryUsecase(diaryRepository)
	userController := controller.NewUserController(userUsecase)
	diaryController := controller.NewDiaryController(diaryUsecase)
	e := router.NewRouter(userController, diaryController)
	e.Logger.Fatal(e.Start(":8080"))
}
