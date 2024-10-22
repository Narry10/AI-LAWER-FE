import { IFeedback, IProduct } from "../types";
import Image1 from 'assets/images/Feature1.svg';
import Image2 from 'assets/images/feature2.svg';


export const productMock: IProduct[] = [
    {
        title: 'Legal Document Analyzer',
        description: 'Our Legal Document Analyzer uses advanced AI to review and analyze legal documents. It highlights key clauses, identifies potential risks, and provides a summary of the document’s contents, saving you time and ensuring accuracy.',
        buttonText: 'Analyzer Now',
        link: '/features/legal-document-analyzer',
        imgSrc: Image1,
        type: 'default'
    },
    {
        title: 'Case Law Research Assistant',
        description: 'The Case Law Research Assistant helps you find relevant case law quickly and efficiently. With its powerful search capabilities and comprehensive database, you can easily locate precedents and legal references to support your cases.',
        buttonText: 'Research Assistant',
        link: '/features/case-law-research-assistant',
        imgSrc: Image2,
        type: 'reverse'
    },
];

export const feedbackMock: IFeedback[] = [
    {
        title: 'Legal Document Translator',
        description: 'This app was incredibly useful for translating legal documents. I had to review a contract written in a foreign language, and this app translated it accurately and quickly. The translation was clear and easy to understand, which saved me a lot of time and effort. Highly recommended for anyone dealing with international legal documents.',
    },
    {
        title: 'Case Law Finder',
        description: 'Finding relevant case law has never been easier. This app allows me to quickly search for and find case law that is pertinent to my current cases. The search functionality is robust and the results are comprehensive. It’s a must-have tool for any legal professional.',
    },
    {
        title: 'Client Management',
        description: 'Managing client information and case details is a breeze with this app. It keeps everything organized and easily accessible. I can track case progress, manage appointments, and communicate with clients all in one place. It’s an invaluable tool for any law firm.',
    },
    {
        title: 'AI Legal Advisor',
        description: 'I am absolutely impressed with this app. It provides intelligent legal advice on a wide range of topics. Whether I need help drafting a legal document or understanding a complex legal issue, this app has the answers. It’s like having a personal legal advisor available 24/7.',
    },
];

