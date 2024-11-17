package main

import "github.com/kenta-kenta/diary-music/router"

func main() {
	e := router.NewRouter()
	e.Logger.Fatal(e.Start(":8080"))
}
