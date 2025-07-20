import React, { memo, useCallback, useState } from 'react';

interface SelectedDatesSectionProps {
  selectedDates: string[];
  onDateClick: (date: string) => void;
  onScheduleMeetings: () => void;
  isMeetingsScheduled: boolean;
  onClearMeetings: () => void; // Add this prop to clear meeting data
}

const SelectedDatesSection: React.FC<SelectedDatesSectionProps> = ({
  selectedDates,
  onDateClick,
  onScheduleMeetings,
  isMeetingsScheduled,
  onClearMeetings,
}) => {
  const [unSelect, setUnSelect] = useState(false);

  const handleUnselect = useCallback(
    (date: string) => {
      const remaining = selectedDates.length - 1;

      if (remaining === 0) {
        setUnSelect(false);
        onClearMeetings(); // Reset meeting list and UI
      } else {
        setUnSelect(true);
      }

      onDateClick(date);
    },
    [onDateClick, selectedDates, onClearMeetings]
  );

  return (
    <div className="m-1">
      <button
        className={`btn btn-success ${selectedDates.length === 0 ? 'disabled-btn' : ''}`}
        disabled={selectedDates.length === 0}
        onClick={() => {
          onScheduleMeetings();
          setUnSelect(false);
        }}
      >
        {unSelect ? 'Update Meetings' : 'Schedule Meetings'}
      </button>

      {!isMeetingsScheduled && (
        <p style={{ color: 'gray' }}>
          No meetings scheduled yet. Select dates and click “Schedule Meetings”.
        </p>
      )}

      <ul>
        {selectedDates.map((date) => (
          <li key={date} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <span style={{ marginRight: '10px' }}>{date}</span>
            <button className="btn-danger" onClick={() => handleUnselect(date)}>
              Unselect
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(SelectedDatesSection);
