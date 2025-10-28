'use client';

import { useCallback, useEffect, useState } from 'react';

import classes from './page.module.css';
import { createTask, deleteTask, editTask, getTasks, logout } from '@/actions/fetching';
import TaskCard from '@/components/task-card.js';
import { FilterIcon, LogoutIcon, NewTaskIcon } from '@/components/tasks-page-icons.js';
import { useRouter } from 'next/navigation';
import { NewTaskModal } from '@/components/task-page/new-task';
import _ from 'lodash';

function TaskCardSkeleton() {
    return (
        <div className={classes['task-card-skeleton']}>
            <div className={classes['skeleton-header']}></div>
            <div className={classes['skeleton-line']}></div>
            <div className={classes['skeleton-line-short']}></div>
        </div>
    );
}

export default function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchTasks() {
            try {
                const data = await getTasks();

                if (data.error) {
                    setError(`${data.error}`);
                    // router.push('/');
                    return;
                }

                setIsRegistered(true);
                setTasks(data);
            } catch (err) {
                console.log('Fetching tasks error:', err);
                setError('Failed to load tasks');
                // router.push('/');
            } finally {
                setIsLoading(false);
            }
        }

        fetchTasks();
    }, [router]);

    async function handleLogout() {
        try {
            await logout();
            router.push('/');
        } catch (err) {
            console.log('Logout error:', err);
        }
    }

    const handleTaskCreation = useCallback(async (task) => {
        try {
            const res = await createTask(task);
            if (res.error) {
                setError(res.error);
            } else {
                const newTask = res;
                setTasks(prevTasks => [...prevTasks, newTask]); // updating the tasks on screen immediately instead of refetching
            }
        } catch (err) {
            console.log('Task creation error:', err);
            setError('Some error occurred while creating your task...');
        }
    }, [])

    const handleTaskEdit = useCallback(async (updatedTask) => {
        try {
            const res = await editTask(_.pick(updatedTask, ['_id', 'title', 'description', 'priority', 'status', 'dueDate']));
            if (res.error) {
                setError(res.error);
            } else {
                setTasks(prevTasks => prevTasks.map(task =>
                    task._id === updatedTask._id ? { ...updatedTask, createdDate: task.createdDate } : task
                ));
            }
        } catch (err) {
            console.log('Task editing error:', err);
            setError('Some error occurred while updating your task...');
        }
    })

    const handleTaskDelete = useCallback(async (taskId) => {
        try {
            const res = await deleteTask(taskId);
            if (res.error) {
                setError(res.error);
            } else {
                setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
            }
        } catch (err) {
            console.log('Task deletion error:', err);
            setError('Some error occurred while deleting your task...');
        }
    }, [])

    const handleTaskCompletion = useCallback(async (taskId) => {
        const completedTask = tasks.find(task => task._id === taskId);

        if (!completedTask) {
            console.error('Task not found');
            return;
        }

        // Create a new object instead of mutating
        const updatedTask = {
            ..._.pick(completedTask, ['_id', 'title', 'description', 'priority', 'status', 'dueDate']),
            status: 'Finished'
        };

        console.log(updatedTask);
        handleTaskEdit(updatedTask);
    })

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
                    <button className={classes['navbar-btn-highlight']} onClick={() => setIsNewTaskModalOpen(true)}>
                        <NewTaskIcon />
                        New Task
                    </button>
                    <button className={classes['navbar-btn']} onClick={handleLogout}>
                        <LogoutIcon />
                        Logout
                    </button>
                </div>
            </nav>

            {error && (
                <div className={classes.error}>
                    <p>{error}</p>
                    {!isRegistered &&
                        <button
                            className={classes['navbar-btn-highlight']}
                            onClick={() => router.push('/register')}
                        >
                            Register
                        </button>
                    }
                </div>
            )}

            {!error && (
                <div className={classes['task-grid']}>
                    {isLoading ? (
                        // Show skeleton cards while loading
                        <>
                            <TaskCardSkeleton />
                            <TaskCardSkeleton />
                            <TaskCardSkeleton />
                            <TaskCardSkeleton />
                        </>
                    ) : tasks.length === 0 ? (
                        <div className={classes.empty}>
                            <p>No tasks yet. Create your first cosmic task!</p>
                        </div>
                    ) : (
                        tasks.map(task => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onEdit={() => {
                                    setIsEditTaskModalOpen(true)
                                    setCurrentTask(task);
                                }}
                                onDelete={handleTaskDelete}
                                onTaskCompletion={handleTaskCompletion}
                            />
                        ))
                    )}
                </div>
            )}

            <NewTaskModal
                isOpen={isNewTaskModalOpen || isEditTaskModalOpen}
                isEditing={isEditTaskModalOpen}
                onClose={() => {
                    setIsNewTaskModalOpen(false);
                    setIsEditTaskModalOpen(false);
                    setCurrentTask(null);
                }}
                onAddTask={handleTaskCreation}
                onEditTask={handleTaskEdit}
                task={currentTask}
            />
        </>
    )
}