export const dummyStudentsData = [
    { student_name: 'Ananya Sharma', meetings: 4, age: 17, class_name: 'Mathematics', instructor_name: 'Mr. Verma' },
    { student_name: 'Rohan Mehta', meetings: 3, age: 18, class_name: 'Science', instructor_name: 'Dr. Bhatia' },
    { student_name: 'Simran Kaur', meetings: 2, age: 16, class_name: 'English', instructor_name: "Ms. D'Souza" },
    { student_name: 'Aditya Jain', meetings: 5, age: 19, class_name: 'Mathematics', instructor_name: 'Mr. Verma' },
    { student_name: 'Neha Patel', meetings: 3, age: 15, class_name: 'Science', instructor_name: 'Dr. Bhatia' },
    { student_name: 'Kunal Singh', meetings: 1, age: 20, class_name: 'English', instructor_name: "Ms. D'Souza" },
    { student_name: 'Isha Kapoor', meetings: 2, age: 17, class_name: 'Biology', instructor_name: 'Dr. Nair' },
    { student_name: 'Aryan Thakur', meetings: 4, age: 18, class_name: 'Chemistry', instructor_name: 'Mr. Joshi' },
    { student_name: 'Priya Desai', meetings: 3, age: 16, class_name: 'English', instructor_name: "Ms. D'Souza" },
    { student_name: 'Rahul Nair', meetings: 2, age: 21, class_name: 'Mathematics', instructor_name: 'Mr. Verma' }
];

export interface StudentData {
    date?: string
    student_name: string;
    meeting_link: string;
    meetings: number;
    age: number;
    class_name: string;
    instructor_name?: string;
    assigned?: number

}

export interface TableHeaderColumn {
    header: string;
    key: string;
}
export interface User {
    name: string;
    age: number;
    city: string;
}

export interface TableProps {
    columns: TableHeaderColumn[];
    data: StudentData[];
}
