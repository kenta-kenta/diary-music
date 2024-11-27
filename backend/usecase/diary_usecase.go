package usecase

import (
	"github.com/kenta-kenta/diary-music/model"
	"github.com/kenta-kenta/diary-music/repository"
	"github.com/kenta-kenta/diary-music/validator"
)

type IDiaryUsecase interface {
	GetAllDiaries(userId uint) ([]model.DiaryResponse, error)
	GetDiaryById(userId uint, diaryId uint) (model.DiaryResponse, error)
	CreateDiary(diary model.Diary) (model.DiaryResponse, error)
	UpdateDiary(userId uint, diaryId uint, diary model.Diary) (model.DiaryResponse, error)
	DeleteDiary(userId uint, diaryId uint) error
}

type diaryUsecase struct {
	dr repository.IDiaryRepository
	dv validator.IDiaryValidator
}

func NewDiaryUsecase(dr repository.IDiaryRepository, dv validator.IDiaryValidator) IDiaryUsecase {
	return &diaryUsecase{dr, dv}
}

func (dr *diaryUsecase) GetAllDiaries(userId uint) ([]model.DiaryResponse, error) {
	diaries := []model.Diary{}
	if err := dr.dr.GetAllDiaries(&diaries, userId); err != nil {
		return nil, err
	}
	resDiaries := []model.DiaryResponse{}
	for _, diary := range diaries {
		resDiaries = append(resDiaries, model.DiaryResponse{
			ID:        diary.ID,
			Content:   diary.Content,
			CreatedAt: diary.CreatedAt,
			UpdatedAt: diary.UpdatedAt,
		})
	}
	return resDiaries, nil
}

func (dr *diaryUsecase) GetDiaryById(userId uint, diaryId uint) (model.DiaryResponse, error) {
	diary := model.Diary{}
	if err := dr.dr.GetDiaryById(&diary, userId, diaryId); err != nil {
		return model.DiaryResponse{}, err
	}
	resDiary := model.DiaryResponse{
		ID:        diary.ID,
		Content:   diary.Content,
		CreatedAt: diary.CreatedAt,
		UpdatedAt: diary.UpdatedAt,
	}
	return resDiary, nil
}

func (dr *diaryUsecase) CreateDiary(diary model.Diary) (model.DiaryResponse, error) {
	// Validate the diary
	if err := dr.dv.DiaryValidate(diary); err != nil {
		return model.DiaryResponse{}, err
	}
	// Create the diary
	if err := dr.dr.CreateDiary(&diary); err != nil {
		return model.DiaryResponse{}, err
	}
	resDiary := model.DiaryResponse{
		ID:        diary.ID,
		Content:   diary.Content,
		CreatedAt: diary.CreatedAt,
		UpdatedAt: diary.UpdatedAt,
	}
	return resDiary, nil
}

func (dr *diaryUsecase) UpdateDiary(userId uint, diaryId uint, diary model.Diary) (model.DiaryResponse, error) {
	if err := dr.dv.DiaryValidate(diary); err != nil {
		return model.DiaryResponse{}, err
	}

	if err := dr.dr.UpdateDiary(&diary, userId, diaryId); err != nil {
		return model.DiaryResponse{}, err
	}
	resDiary := model.DiaryResponse{
		ID:        diary.ID,
		Content:   diary.Content,
		CreatedAt: diary.CreatedAt,
		UpdatedAt: diary.UpdatedAt,
	}
	return resDiary, nil
}

func (dr *diaryUsecase) DeleteDiary(userId uint, diaryId uint) error {
	if err := dr.dr.DeleteDiary(userId, diaryId); err != nil {
		return err
	}
	return nil
}
