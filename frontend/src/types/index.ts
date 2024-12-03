export type Diary = {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
}

export type CsrfToken = {
    csrf_token: string;
}

export type Credential = {
    email: string;
    user_name: string;
    password: string;
}