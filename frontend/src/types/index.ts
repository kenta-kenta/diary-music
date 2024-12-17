export type Diary = {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
}

export type EditedDiary = {
    id: number;
    content: string;
}

export type User = {
    id: number;
    email: string;
    user_name: string;
}

export type CsrfToken = {
    csrf_token: string;
}

export type Credential = {
    email: string;
    password: string;
}

export type PaginatedResponse = {
  data: Diary[];
  total_items: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export type DiaryDate = {
    date: string;
    count: number;
}

export type DiaryDatesResponse = {
    dates: DiaryDate[];
}