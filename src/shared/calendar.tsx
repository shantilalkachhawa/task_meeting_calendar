import { useEffect, useState } from 'react';
import Table from './table';
import { StudentData, TableHeaderColumn } from '../feature';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { fetchDummyUserAction, selectUserList } from '../feature/userSlice';
import SelectedDatesSection from './selected-dates-section';
import { exportToExcel } from '../utils/http';
 const columns: TableHeaderColumn[] = [
    { header: 'Date', key: 'date' },
    { header: 'Student Name', key: 'student_name' },
    { header: 'Class Name', key: 'class_name' },
    { header: 'Age', key: 'age' },
    { header: 'Meeting', key: 'meeting_link' },
  ];

function Calendar() {
  const dispatch = useAppDispatch();
  const getDummyUser = useAppSelector(selectUserList);
   const [isMeetingsScheduled,setIsMeetingsScheduled]=useState(false)
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [allocatedMeetings, setAllocatedMeetings] = useState<{ [date: string]: StudentData[] }>({});

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const today = new Date();

  // Allocate meetings across selected dates with age priority
const allocateMeetings = (students: StudentData[], dates: string[]) => {
  if (dates.length === 0) return {};

  const sortedStudents = [...students].sort((a, b) => b.age - a.age);
  const allocationMap: { [key: string]: (StudentData & { meeting_link: string })[] } = {};
  dates.forEach(date => (allocationMap[date] = []));

  let dateIndex = 0;

  for (const student of sortedStudents) {
    let remaining = student.meetings;

    while (remaining > 0) {
      const currentDate = dates[dateIndex % dates.length];

      // Generate meeting link
      const formattedName = student.student_name.toLowerCase().replace(/\s+/g, '');
      const meetingLink = `https://meet.example.com/${formattedName}`;

      // Push one entry per meeting
      allocationMap[currentDate].push({
        ...student,
        meeting_link: meetingLink,
      });

      remaining--;
      dateIndex++;
    }
  }

  return allocationMap;
};


  // Prepare flat data for summary table
  const flatMeetingData  = Object.entries(allocatedMeetings).flatMap(([date, students]) =>
    students.map(student => ({
      date,
      student_name: student.student_name,
      class_name: student.class_name,
      age: student.age,
      meeting_link: student.meeting_link,
      meetings: student.meetings,
      assigned: student.assigned,
    }))
  );


  const handleDateClick = (date: string) => {
    const updatedDates = [...selectedDates];
    const index = updatedDates.indexOf(date);
    if (index !== -1) {
      updatedDates.splice(index, 1);
    } else {
      updatedDates.push(date);
    }
    setSelectedDates(updatedDates);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };
  const handleMeetingSchedule =()=>{
      const allocations = allocateMeetings(getDummyUser, selectedDates);
        setAllocatedMeetings(allocations);
  }
  const onClearMeetings = () => {
  setAllocatedMeetings({});
  setIsMeetingsScheduled(false);
};

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };
    useEffect(() => {
    dispatch(fetchDummyUserAction());
  }, [dispatch]);

  return (
    <>
      <div className="calendar-container">
        <div className="calendar">
          <div className="buttion-section">
            <button className="btn" onClick={handlePrevMonth}> &lt; </button>
            <h3>
              {new Date(currentYear, currentMonth).toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </h3>
            <button className="btn" onClick={handleNextMonth} style={{ marginLeft: '10px' }}>
              &gt;
            </button>
          </div>

          {/* Calendar Days */}
          <div className="calendar-grid">
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const date = new Date(currentYear, currentMonth, day);
              // TIme zone mange

              const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
              const isFutureOrToday = dateStr >= todayStr;
              const isSelected = selectedDates.includes(dateStr);

              return (
                <div
                  key={dateStr}
                  onClick={() => isFutureOrToday && handleDateClick(dateStr)}
                  className={`calendar-date ${isSelected ? 'selected' : ''} ${!isFutureOrToday ? 'disabled' : ''}`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Dates and Scheduling */}
        <SelectedDatesSection
            selectedDates={selectedDates}
            onDateClick={handleDateClick}
            onScheduleMeetings={handleMeetingSchedule}
              isMeetingsScheduled={isMeetingsScheduled}
             onClearMeetings={onClearMeetings}
          />

      </div>
      {flatMeetingData.length > 0 &&
      <div className='p-1'>
      <button  className={`btn btn-success`} onClick={() => exportToExcel(flatMeetingData)}>
         Download Excel 
      </button>
      </div>
      }

      <Table columns={columns} data={flatMeetingData} />
    </>
  );
}

export default Calendar;
