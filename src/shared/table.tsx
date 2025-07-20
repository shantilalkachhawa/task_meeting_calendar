import { memo } from 'react';
import { TableProps } from '../feature';

function Table({ columns, data }: TableProps) {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th
              key={idx}
              style={{ border: '1px solid #ddd', padding: '8px', background: '#f2f2f2' }}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 && (
            <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center', padding: '10px' }}>
                No data found
                </td>
            </tr>
            )}

        {data.map((row:any, rowIdx) => (
          <tr key={rowIdx}>
            {columns.map((col, colIdx) => (
              <td key={colIdx} style={{ border: '1px solid #ddd', padding: '8px' }}>
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default memo(Table);
