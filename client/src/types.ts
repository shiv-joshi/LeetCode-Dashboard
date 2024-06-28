export interface ReviewDate {
    id: string;
    problemId: string;
    reviewDate: Date;
}

export interface Problem {
    map(arg0: (problem: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    id: string;
    problemName: string;
    url: string;
    date: Date;
    reviewDates: ReviewDate[];
}

export interface User {
    id: string;
    username: string;
    problemList: Problem[];
}
