export interface Card {
    cardID: string;
    title: string;
    img: string;
    subtitle: string;
    content: string;
    links1: string;
    links2: string;
    links3: string;
}

export interface FormData {
    [key: string]: string;
}