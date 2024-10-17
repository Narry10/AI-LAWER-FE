export type ProductType = 'default' |'reverse';

export interface IProduct {
    title: string;
    description: string;
    buttonText: string;
    link: string;
    imgSrc: string;
    type?: ProductType;
}

export interface IFeedback {
    title: string;
    description: string;
}
