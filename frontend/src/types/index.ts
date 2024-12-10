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