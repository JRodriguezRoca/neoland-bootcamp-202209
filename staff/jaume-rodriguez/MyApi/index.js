require('dotenv').config()

const express = require('express')

const {
    handlerRegister,
    searchGet,
    handlerAuth,
    handlerRetrieveUser,
    handlerUpdateUserName,
    handlerUpdateUserEmail,
    handlerUpdateUserPassword,
    handlerCreateTask,
    handlerRetrieveTasks,
    handlerDeleteTask,
    handlerUpdateTaskStatus,
    handlerUpdateTaskText,
    handlerUpdateTaskTitle,
    handlerCreatePost,
    handlerRetrievePosts,
    handlerDeletePost,
    handlerUpdatePostText,
    handlerUpdatePostVisibility,
} = require("./handlers")

const jsonBodyParser = require('./utils/jsonBodyParser')
const cors = require('./utils/cors')

const api = express()
api.use(cors)

api.post('/users/auth', jsonBodyParser, handlerAuth)
api.post('/users', jsonBodyParser, handlerRegister)
// 3. Recibimos la información de Register (React) y la pasamos a su handler en la API

api.get('/users', handlerRetrieveUser)
api.patch('/users/updateUserName', jsonBodyParser, handlerUpdateUserName)
api.patch('/users/updateUserEmail', jsonBodyParser, handlerUpdateUserEmail)
api.patch('/users/updateUserPassword', jsonBodyParser, handlerUpdateUserPassword)

api.post('/tasks', jsonBodyParser, handlerCreateTask)
api.get('/tasks', handlerRetrieveTasks)
api.patch('/tasks', jsonBodyParser, handlerUpdateTaskStatus)
api.patch('/updateTaskText', jsonBodyParser, handlerUpdateTaskText)
api.patch('/updateTaskTitle', jsonBodyParser, handlerUpdateTaskTitle)
api.delete('/tasks', jsonBodyParser, handlerDeleteTask)
api.get('/search', searchGet)

api.post('/posts', jsonBodyParser, handlerCreatePost)
api.get('/posts', handlerRetrievePosts)
api.delete('/posts', jsonBodyParser, handlerDeletePost)
api.patch('/updatePostText', jsonBodyParser, handlerUpdatePostText)
api.patch('/posts', jsonBodyParser, handlerUpdatePostVisibility)

const { PORT } = process.env

api.listen(PORT, () => console.log(`server listening on port ${PORT}`))