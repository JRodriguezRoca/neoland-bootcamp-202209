import { useState, useEffect } from 'react'
import Task from '../components/Task'
import retrieveTasks from '../logic/retrieveTasks'
import createTask from '../logic/createTask'

function Tasks() {

    const [tasks, setTasks] = useState([])

    // TASKS REFRESH
    useEffect(() => {
        handleRefreshTasks()
    }, [])

    const handleRefreshTasks = () => {
        try {
            retrieveTasks(window.userId, (error, tasks) => {
                if (error) {
                    alert(error.message)
                    return
                }
                setTasks(tasks)
            })
        } catch (error) {
        }
    }

    // TASKS CREATION
    const handleCreateTask = (status) => {
        try {
            createTask(window.userId, status, (error) => {
                if (error) {
                    alert(error.message)
                    return
                }
                handleRefreshTasks()
            })

        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <>
            {/* TASKS PANEL*/}
            <section className="flex z-1 w-full justify-center flex-wrap">
                <div className="flex flex-row justify-center content-center z-0 p-8 bg-sky-500 border-black border-b border-solid w-full h-16">
                    <span className="self-center font-semibold text-4xl text-sky-100">
                        My Tasks
                    </span>
                </div>
                {/*TASKS*/}
                <div className="flex flex-row flex-wrap justify-center m-4 gap-x-4">
                    {/* TO DO TASKS*/}
                    <section className="flex flex-col items-center bg-white p-4 w-80 font-semibold bg-inherit text-white">
                        <div className="flex flex-row w-full">
                            <span className="align-self-start text-lg text-black text-base font-normal">Pendiente</span>
                            <h1 className="ml-auto text-black self-end material-symbols-outlined font-normal">
                                more_horiz
                            </h1>
                        </div>
                        <hr className="w-full mx-auto my-2 border-black" />
                        {tasks.map(task => task.status === 'todo' ?
                            // COMPONENTE TASK
                            <Task
                                key={task.id}
                                task={task}
                                onUpdateTaskStatus={handleRefreshTasks}
                                onDeleteTask={handleRefreshTasks} /> : null)}
                        <div
                            className="w-full p-2 px-4 flex flex-row items-end rounded border-solid border-sky-600 border-t border-b-4 border-x bg-sky-100 hover:bg-sky-200 cursor-pointer text-sm"
                            onClick={() => { handleCreateTask('todo') }}>
                            <span
                                className="material-symbols-outlined text-black">
                                add
                            </span>
                            <span className="align-self-start text-medium text-black font-normal">Add new task</span>
                        </div>
                    </section>
                    {/* DOING TASKS*/}
                    <section className="flex flex-col items-center bg-white p-4 w-80 font-semibold bg-inherit text-white">
                        <div className="flex flex-row w-full">
                            <span className="align-self-start text-lg text-black text-base font-normal">En proceso</span>
                            <h1 className="ml-auto text-black self-end material-symbols-outlined font-normal">
                                more_horiz
                            </h1>
                        </div>
                        <hr className="w-full mx-auto my-2 border-black" />
                        {tasks.map(task => task.status === 'doing' ?
                            // COMPONENTE TASK
                            <Task
                                key={task.id}
                                task={task}
                                onUpdateTaskStatus={handleRefreshTasks}
                                onDeleteTask={handleRefreshTasks} /> : null)}
                        <div
                            className="w-full p-2 px-4 flex flex-row items-end rounded border-solid border-sky-600 border-t border-b-4 border-x bg-sky-100 hover:bg-sky-200 cursor-pointer text-sm"
                            onClick={() => { handleCreateTask('doing') }}>
                            <span
                                className="material-symbols-outlined text-black">
                                add
                            </span>
                            <span className="align-self-start text-medium text-black font-normal">Add new task</span>
                        </div>
                    </section>
                    {/* DONE TASKS*/}
                    <section className="flex flex-col items-center bg-white p-4 w-80 font-semibold bg-inherit text-white">
                        <div className="flex flex-row w-full">
                            <span className="align-self-start text-lg text-black text-base font-normal">Hecho</span>
                            <h1 className="ml-auto text-black self-end material-symbols-outlined font-normal">
                                more_horiz
                            </h1>
                        </div>
                        <hr className="w-full mx-auto my-2 border-black" />
                        {tasks.map(task => task.status === 'done' ?
                            // COMPONENTE TASK
                            <Task
                                key={task.id}
                                task={task}
                                onUpdateTaskStatus={handleRefreshTasks}
                                onDeleteTask={handleRefreshTasks} /> : null)}
                        <div
                            className="w-full p-2 px-4 flex flex-row items-end rounded border-solid border-sky-600 border-t border-b-4 border-x bg-sky-100 hover:bg-sky-200 cursor-pointer text-sm"
                            onClick={() => { handleCreateTask('done') }}>
                            <span
                                className="material-symbols-outlined text-black">
                                add
                            </span>
                            <span className="align-self-start text-medium text-black font-normal">Add new task</span>
                        </div>
                    </section>
                </div>
            </section >
        </>
    );

}

export default Tasks