'use client';

import { useEffect, useState } from 'react';

import classes from './page.module.css';
import { getTasks } from '@/actions/fetching';
import TaskCard from '@/components/task-card.js';
import { FilterIcon, LogoutIcon, NewTaskIcon } from '@/components/tasks-page-icons.js';

export default function TasksPage() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        async function fetchTasks() {
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (err) {
                console.log('Fetching tasks error:', err);
            }
        }

        fetchTasks();
    });

    return (
        <>
            <nav className={classes.navbar}>
                <div>
                    <h3 className={classes.heading}>Tasks Dashboard</h3>
                    <p className={classes.description}>Manage your cosmic tasks with precision</p>
                </div>
                <div>
                    <button className={classes['navbar-btn']}>
                        <FilterIcon />
                        Filter
                    </button>
                    <button className={classes['navbar-btn-highlight']}>
                        <NewTaskIcon />
                        New Task
                    </button>
                    <button className={classes['navbar-btn']}>
                        <LogoutIcon />
                        Logout
                    </button>
                </div>
            </nav>

            <div className={classes['task-grid']}>
                {tasks.map(task => {
                    return <TaskCard key={task.id} task={task} />
                })}
            </div>
        </>
    )
}