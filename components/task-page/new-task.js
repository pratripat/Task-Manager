import { useEffect, useState } from "react"
import classes from '@/app/tasks/page.module.css';

export const NewTaskModal = ({ isOpen, isEditing, onClose, onAddTask, onEditTask, task }) => {
    const defaultFormData = {
        title: '',
        description: '',
        priority: 'MED',
        status: 'To Do',
        dueDate: new Date().toISOString().slice(0, 10)
    };

    const [formData, setFormData] = useState(defaultFormData);

    useEffect(() => {
        if (isOpen && isEditing && task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                priority: task.priority || 'MED',
                status: task.status || 'To Do',
                dueDate: task.dueDate ? task.dueDate.slice(0, 10) : defaultFormData.dueDate
            });
        } else if (isOpen && !isEditing) {
            setFormData(defaultFormData);
        }
    }, [isOpen, isEditing, task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        function capitalizeWords(string) {
            return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }

        e.preventDefault();

        // Simple task validation
        if (!formData.title || !formData.description) {
            console.error("Title and Description are required.");
            return;
        }

        if (isEditing) {
            const newTask = {
                _id: task._id,
                ...formData,
                title: capitalizeWords(formData.title)
            }
            onEditTask(newTask);
        } else {
            // creation of new task
            const newTask = {
                ...formData,
                title: capitalizeWords(formData.title)
            };
            onAddTask(newTask);
        }

        onClose();
    };

    if (!isOpen) return null;

    // Determine modal title and button text based on editing state
    const modalTitle = isEditing ? 'Edit Task' : 'Create New Task';
    const buttonText = isEditing ? 'Save Changes' : 'Add Task';

    const handleOverlayClick = (e) => {
        // Only close if the click occurred directly on the overlay element itself,
        // preventing clicks inside the modal content from closing it.
        if (e.target.classList.contains(classes['modal-overlay'])) {
            onClose();
        }
    }

    return (
        <div className={classes['modal-overlay']} onClick={handleOverlayClick}>
            <div className={classes['modal-content']}>
                <div className={classes["modal-header"]}>
                    <h2 className={classes["modal-title"]}>{modalTitle}</h2>
                    <button className={classes["modal-close-button"]} onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={classes["modal-form"]}>

                    <div className={classes["form-group"]}>
                        <label htmlFor="title">Task Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={classes["form-group"]}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={classes["form-row"]}>
                        <div className={classes["form-group"]}>
                            <label htmlFor="priority">Priority</label>
                            <select
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                            >
                                <option value="HIGH">HIGH</option>
                                <option value="MED">MED</option>
                                <option value="LOW">LOW</option>
                            </select>
                        </div>

                        <div className={classes["form-group"]}>
                            <label htmlFor="status">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Finished">Finished</option>
                            </select>
                        </div>
                    </div>

                    <div className={classes["form-group"]}>
                        <label htmlFor="dueDate">Due Date</label>
                        <input
                            id="dueDate"
                            name="dueDate"
                            type="date"
                            value={formData.dueDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className={classes["navbar-btn"]} onClick={onClose}>Cancel</button>
                        <button type="submit" className={classes["navbar-btn-highlight"]}>{buttonText}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}