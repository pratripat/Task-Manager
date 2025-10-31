import { useEffect, useState } from "react"
import classes from '@/app/tasks/page.module.css';

const PRIORITY_LEVELS = {
    'HIGH': 3,
    'MED': 2,
    'LOW': 1,
};

const ALL_PRIORITIES = Object.keys(PRIORITY_LEVELS);
const ALL_STATUSES = ['To Do', 'In Progress', 'Finished'];
const DUE_DATE_OPTIONS = [
    { value: 'all', label: 'All Tasks' },
    { value: 'today', label: 'Due Today' },
    { value: 'week', label: 'Due This Week' },
    { value: 'past', label: 'Past Due' },
];

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

export const FilterModal = ({ isOpen, onClose, currentFilters, onApplyFilters, onClearFilters }) => {
    const [draftFilters, setDraftFilters] = useState(currentFilters);

    useEffect(() => {
        setDraftFilters(currentFilters);
    }, [currentFilters, isOpen]);

    const handleSortChange = (e) => {
        setDraftFilters(prev => ({ ...prev, sortByPriority: e.target.value }));
    };

    const handleCheckboxChange = (type, value) => {
        setDraftFilters(prev => {
            const currentArray = prev[type];
            if (currentArray.includes(value)) {
                return { ...prev, [type]: currentArray.filter(v => v !== value) };
            } else {
                return { ...prev, [type]: [...currentArray, value] };
            }
        });
    };

    const handleDateRangeChange = (e) => {
        setDraftFilters(prev => ({ ...prev, dueDateRange: e.target.value }));
    };

    const handleApply = () => {
        onApplyFilters(draftFilters);
        onClose();
    };

    const handleClear = () => {
        onClearFilters();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={classes["modal-overlay"]} onClick={onClose}>
            <div className={classes["modal-content"]} onClick={(e) => e.stopPropagation()}>
                <div className={classes["modal-header"]}>
                    <h2 className={classes["modal-title"]}>Filter Tasks</h2>
                    <button className={classes["modal-close-button"]} onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className={classes["modal-form"]}>

                    {/* Sort by Priority */}
                    {/* <div className="form-group filter-section"> */}
                    <div className={`${classes["form-group"]} ${classes["filter-section"]}`}>
                        <label>Sort by Priority</label>
                        <select
                            value={draftFilters.sortByPriority}
                            onChange={handleSortChange}
                        >
                            <option value="none">None</option>
                            <option value="asc">Ascending (Low → High)</option>
                            <option value="desc">Descending (High → Low)</option>
                        </select>
                    </div>

                    {/* Filter by Priority */}
                    <div className={`${classes["form-group"]} ${classes["filter-section"]}`}>
                        <label>Filter by Priority</label>
                        <div className={classes["checkbox-group"]}>
                            {ALL_PRIORITIES.map(priority => (
                                <div key={priority} className={classes["checkbox-item-wrapper"]}>
                                    <label className={classes["checkbox-label"]}>
                                        <input
                                            type="checkbox"
                                            checked={draftFilters.priorityFilter.includes(priority)}
                                            onChange={() => handleCheckboxChange('priorityFilter', priority)}
                                        />
                                    </label>
                                    <span className={`${classes["badge"]} ${classes[getBadgeClass('priority', priority)]} ${classes["filter-badge"]}`}>{priority}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Filter by Status */}
                    <div className={`${classes["form-group"]} ${classes["filter-section"]}`}>
                        <label>Filter by Status</label>
                        <div className={classes["checkbox-group"]}>
                            {ALL_STATUSES.map(status => (
                                <div key={status} className={classes["checkbox-item-wrapper"]}>
                                    <label className={classes["checkbox-label"]}>
                                        <input
                                            type="checkbox"
                                            checked={draftFilters.statusFilter.includes(status)}
                                            onChange={() => handleCheckboxChange('statusFilter', status)}
                                        />
                                    </label>
                                    <span className={`${classes["badge"]} ${classes[getBadgeClass('status', status)]} ${classes["filter-badge"]}`}>{status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Filter by Due Date Range */}
                    <div className={`${classes["form-group"]} ${classes["filter-section"]}`}>
                        <label>Filter by Due Date</label>
                        <select
                            value={draftFilters.dueDateRange}
                            onChange={handleDateRangeChange}
                        >
                            {DUE_DATE_OPTIONS.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* <div className="form-actions filter-actions"> */}
                    <div className={`${classes["form-actions"]} ${classes["filter-actions"]}`}>
                        <button type="button" className={classes['navbar-btn']} onClick={handleClear}>Clear Filters</button>
                        <button type="button" className={classes['navbar-btn-highlight']} onClick={handleApply}>Apply Filters</button>
                    </div>
                </div>
            </div>
        </div>
    )
}