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
	userUsecase := usecase.NewUserUsecase(userRepository)
	userController := controller.NewUserController(userUsecase)
	e := router.NewRouter(userController)
	e.Logger.Fatal(e.Start(":8080"))
}
