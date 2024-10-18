import React from 'react';

const TaskCount = React.memo(({ completedCount, undoneCount }) => {
  return (
    <div className='task-count'>
      <p>Completed Tasks: {completedCount}</p>
      <p>Undone Tasks: {undoneCount}</p>
    </div>
  );
});

export default TaskCount;
