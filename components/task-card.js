import classes from '@/app/tasks/page.module.css';

// This function maps dynamic data (priority/status) to the defined CSS classes
const getBadgeClass = (type, value) => {
    if (type === 'priority') {
        switch (value) {
            case 'HIGH': return 'badge-high';
            case 'MED': return 'badge-medium';
            case 'LOW': return 'badge-low';
            default: return 'badge-default';
        }
    } else if (type === 'status') {
        switch (value) {
            case 'To Do': return 'status-todo';
            case 'In Progress': return 'status-in-progress';
            case 'Finished': return 'status-finished';
            default: return 'status-default';
        }
    }
    return '';
};

// SVG Icon for Calendar (Due Date)
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${classes['icon']} ${classes['icon-due-date']}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg >
);

// SVG Icon for Clock (Created Date)
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${classes['icon']} ${classes['icon-created-date']}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg >
);

// SVG Icon for Checkmark (Mark Complete Button)
const CheckmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={classes['icon']} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const EditIcon = (props) => {
    return <svg
        xmlns="http://www.w3.org/2000/svg"
        className={classes['icon']}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props} // Pass through any props like 'className' or 'onClick'
    >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
}

const DeleteIcon = (props) => {
    return <svg
        xmlns="http://www.w3.org/2000/svg"
        className={classes['icon']}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props} // Pass through any props like 'className' or 'onClick'
    >
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
}

export default function TaskCard({ task, onEdit, onDelete, onTaskCompletion }) {
    const priorityClass = getBadgeClass('priority', task.priority);
    const statusClass = getBadgeClass('status', task.status);

    return (
        <div className={classes['task-card']}>
            <header className={classes['task-header']}>
                <h3 className={classes['task-title']}>{task.title}</h3>
                <div className={classes['task-header-icons']}>
                    <div className={classes['edit-icon']} onClick={() => onEdit(task._id)}>
                        <EditIcon />
                    </div>
                    <div className={classes['delete-icon']} onClick={() => onDelete(task._id)}>
                        <DeleteIcon />
                    </div>
                </div>
            </header>

            <div className={classes['task-badges']}>
                <span className={`${classes['badge']} ${classes[priorityClass]}`}>{task.priority}</span>
                <span className={`${classes['badge']} ${classes[statusClass]}`}>{task.status}</span>
            </div>

            <p className={classes['task-description']}>{task.description}</p>

            <div className={classes['task-dates']}>
                <p className={classes['task-date-item']}>
                    <CalendarIcon />
                    Due: {task.dueDate.split('T')[0]}
                </p>
                <p className={classes['task-date-item']}>
                    <ClockIcon />
                    Created: {task.createdDate.split('T')[0]}
                </p>
            </div>

            <button className={classes['task-action-button']} onClick={() => onTaskCompletion(task._id)} disabled={task.status === 'Finished'}>
                <CheckmarkIcon />
                <span>{task.status === 'Finished' ? 'Completed' : 'Mark Complete'}</span>
            </button>
        </div>
    )
}