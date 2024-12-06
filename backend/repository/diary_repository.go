package repository

import (
	"fmt"

	"github.com/kenta-kenta/diary-music/model"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type IDiaryRepository interface {
	GetAllDiaries(diaries *[]model.Diary, userId uint) error
	GetDiaryById(diary *model.Diary, userId uint, diaryId uint) error
	CreateDiary(diary *model.Diary) error
	UpdateDiary(diary *model.Diary, userId uint, diaryId uint) error
	DeleteDiary(userId uint, diaryId uint) error
}

type diaryRepository struct {
	db *gorm.DB
}

func NewDiaryRepository(db *gorm.DB) IDiaryRepository {
	return &diaryRepository{db}
}

func (dr *diaryRepository) GetAllDiaries(diaries *[]model.Diary, userId uint) error {
	// Joinメソッドを使ってUserテーブルと結合
	if err := dr.db.Joins("User").Where("user_id = ?", userId).Order("created_at").Find(diaries).Error; err != nil {
		return err
	}
	return nil
}

func (dr *diaryRepository) GetDiaryById(diary *model.Diary, userId uint, diaryId uint) error {
	// Joinメソッドを使ってUserテーブルと結合
	if err := dr.db.Joins("User").Where("user_id = ?", userId).First(diary, diaryId).Error; err != nil {
		return err
	}
	return nil
}

func (dr *diaryRepository) CreateDiary(diary *model.Diary) error {
	// Createメソッドを使ってデータを作成
	if err := dr.db.Create(diary).Error; err != nil {
		return err
	}
	return nil
}

func (dr *diaryRepository) UpdateDiary(diary *model.Diary, userId uint, diaryId uint) error {
	// Returningメソッドを使って更新後のデータを取得
	result := dr.db.Model(diary).Clauses(clause.Returning{}).Where("user_id = ? AND id = ?", userId, diaryId).Update("content", diary.Content)
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected < 1 {
		return fmt.Errorf("object does not exist")
	}
	return nil
}

func (dr *diaryRepository) DeleteDiary(userId uint, diaryId uint) error {
	// Deleteメソッドを使ってデータを削除
	result := dr.db.Where("user_id = ? AND id = ?", userId, diaryId).Delete(&model.Diary{})
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected < 1 {
		return fmt.Errorf("object does not exist")
	}
	return nil
}