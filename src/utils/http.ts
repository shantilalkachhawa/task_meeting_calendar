import * as XLSX from 'xlsx';

export const exportToExcel = (flatMeetingData: any[]) => {
    // Overview sheet (count by date and class)
    const overviewMap = new Map();

    flatMeetingData.forEach(({ date, class_name }) => {
        const key = `${date}_${class_name}`;
        overviewMap.set(key, (overviewMap.get(key) || 0) + 1);
    });

    const overviewSheet = Array.from(overviewMap.entries()).map(([key, count]) => {
        const [date, className] = key.split('_');
        return { Date: date, Class: className, Count: count };
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(overviewSheet), 'Overview');

    // Date-wise detailed sheets
    const dateWiseData: { [key: string]: any[] } = {};

    flatMeetingData.forEach(entry => {
        if (!dateWiseData[entry.date]) {
            dateWiseData[entry.date] = [];
        }

        dateWiseData[entry.date].push({
            StudentName: entry.student_name,
            Class: entry.class_name,
            Age: entry.age,
            MeetingLink: entry.meeting_link || '-',
        });
    });

    Object.entries(dateWiseData).forEach(([date, rows]) => {
        const sheet = XLSX.utils.json_to_sheet(rows);
        XLSX.utils.book_append_sheet(workbook, sheet, date);
    });

    XLSX.writeFile(workbook, 'Social_Media_Content.xlsx');
};
