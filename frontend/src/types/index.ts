export type Diary = {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

export type CsrfToken = {
    csrf_token: string;
}

export type Credential = {
    email: string;
    password: string;
}