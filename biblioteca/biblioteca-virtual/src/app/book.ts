export interface Book {
    id: number;
    title: string;
    subjects: string[];
    authors: { name: string }[];
    translators: { name: string }[];
    bookshelves: string[];
    languages: string[];
    copyright: boolean | null;
    media_type: string;
    formats: { [key: string]: string };
    download_count: number;
}