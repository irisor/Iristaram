
import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const STORAGE_KEY = 'boardDB'

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    addGroup,
    removeGroup,
    updateGroup,
    updateTask,
    addTask,
    removeTask,
    getTaskEditCmps
}
window.boardSer = boardService

_createBoards()


async function query(filterBy = { title: '' }) {
    let boards = await storageService.query(STORAGE_KEY)
    if (filterBy.title) {
        const regex = new RegExp(filterBy.title, 'i')
        boards = boards.filter(board => regex.test(board.title))
    }
    // Return just preview info about the boards
    boards = boards.map(({ _id, title, isStarred, backgroundImg }) => ({ _id, title, isStarred, backgroundImg }))
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    let savedBoard
    if (board._id) {
        const boardToUpdate = {
            _id: board._id,
            title: board.title
        }
        savedBoard = await storageService.put(STORAGE_KEY, boardToUpdate)
    } else {
        // Later, owner is set by the backend
        // board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
}

async function addGroup(boardId, group) {

    // Later, this is all done by the backend
    const board = await getById(boardId)
    if (!board.groups) board.groups = []
    if (!group.id) group.id = utilService.makeId()

    board.groups.push(group)
    await storageService.put(STORAGE_KEY, board)

    return group
}

async function removeGroup(boardId, groupId) {
    // Later, this is all done by the backend
    const board = await getById(boardId)
    const groupIdx = board.groups.findIndex(g => g.id === groupId)
    board.groups.splice(groupIdx, 1)
    await storageService.put(STORAGE_KEY, board)
}

async function updateGroup(boardId, group) {
    // Later, this is all done by the backend
    const board = await getById(boardId)
    const groupIdx = board.groups.findIndex(g => g.id === group.id)
    board.groups[groupIdx] = group
    await storageService.put(STORAGE_KEY, board)
    return group
}

async function updateTask(boardId, groupId, task) {
    // Later, this is all done by the backend
    const board = await getById(boardId)
    const group = board.groups.find(g => g.id === groupId)
    const idx = group.tasks.findIndex(t => t.id === task.id)
    group.tasks[idx] = task


    // const activity = _createActivity(activityTitle, _toMiniTask(task), _toMiniGroup(group))
    // board.activities.push(activity)
    await storageService.put(STORAGE_KEY, board)

    return task
}

async function addTask(boardId, groupId, newTask) {
    const board = await getById(boardId)
    const groupIndex = board.groups.findIndex(g => g.id === groupId)


    if (!newTask.id) newTask.id = utilService.makeId()
    if (!board.groups[groupIndex].tasks)
        board.groups[groupIndex].tasks = []
    board.groups[groupIndex].tasks.push(newTask)

    // const activity = _createActivity(activityTitle, _toMiniTask(task), _toMiniGroup(group))
    // board.activities.push(activity)

    await storageService.put(STORAGE_KEY, board)

    return newTask
}

async function removeTask(boardId, groupId, taskId) {
    console.log(boardId, groupId, taskId)
    const board = await getById(boardId)
    console.log(board)
    const groupIndex = board.groups.findIndex(g => g.id === groupId)
    const taskIndex = board.groups[groupIndex].tasks.findIndex(t => t.id === taskId)
    board.groups[groupIndex].tasks.splice(taskIndex, 1)

    // const activity = _createActivity(activityTitle, _toMiniTask(task), _toMiniGroup(group))    
    // if(board.activites){
    //     board.activities.push(activity)
    // }
    await storageService.put(STORAGE_KEY, board)
}

function getTaskEditCmps(task, board) {
    const cmps = [
        {
            type: 'StatusPicker',
            info: {
                label: 'Status:',
                propName: 'status',
                selectedStatus: task.status,
                statuses: _getStatuses()
            }
        },
        {
            type: 'DatePicker',
            info: {
                label: 'Due date:',
                propName: 'dueDate',
                selectedDate: task.dueDate,
            }
        },
        {
            type: 'MemberPicker',
            info: {
                label: 'Members: ',
                propName: 'memberIds',
                selectedMemberIds: task.memberIds || [],
                members: board.members
            }
        }
    ]
    return cmps
}

function getEmptyBoard() {
    return {
        title: '',
        activities: []
    }
}

// function getDemoBoard() {
//     return structuredClone(board)
// }

function _createActivity(title, task, group = null) {
    return {
        id: utilService.makeId(),
        createdAt: Date.now(),
        // byMember: userService.getLoggedinUser(),
        title,
        task,
        group
    }
}

function _getStatuses() {
    return ['open', 'inProgress', 'done']
}

function _toMiniGroup(group) {
    return { id: group.id, title: group.title }
}

function _toMiniTask(task) {
    return { id: task.id, title: task.title }
}

function getTask(title = "") {
    return {
        id: utilService.makeId(),
        title,
        description: "",
        memberIds: [],
        labelIds: [],
        checklist: {},
        dates: { startDate: "", dueDate: "", setReminder: "" },
        attachment: "",
        cover: ""

    }
}

function _createBoards() {
    let boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards || !boards.length) {

        const boardString = `
        [{
        "_id": "b101",
        "title": "Website Redesign Project",
        "backgroundImg": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2560x1440/481563ddbf5af01d25d4b103d8f3e81b/photo-1674673353738-dc8039354dd0.webp",
        "isStarred": true,
        "archivedAt": null,
        "createdBy": {
            "_id": "u101",
            "fullname": "John Doe",
            "imgUrl": "http://example.com/john-doe.jpg"
        },
        "style": {
            "backgroundImage": "https://example.com/background-image.jpg"
        },
        "labels": [
            {
            "id": "l101",
            "title": "High Priority",
            "color": "#ff0000"
            },
            {
            "id": "l102",
            "title": "Medium Priority",
            "color": "#ffff00"
            },
            {
            "id": "l103",
            "title": "Low Priority",
            "color": "#00ff00"
            },
            {
            "id": "l104",
            "title": "Bug",
            "color": "#ff00ff"
            },
            {
            "id": "l105",
            "title": "Feature",
            "color": "#00ffff"
            }
        ],
        "members": [
            {
            "_id": "u101",
            "fullname": "John Doe",
            "imgUrl": "http://example.com/john-doe.jpg"
            },
            {
            "_id": "u102",
            "fullname": "Jane Smith",
            "imgUrl": "http://example.com/jane-smith.jpg"
            },
            {
            "_id": "u103",
            "fullname": "Bob Johnson",
            "imgUrl": "http://example.com/bob-johnson.jpg"
            },
            {
            "_id": "u104",
            "fullname": "Alice Brown",
            "imgUrl": "http://example.com/alice-brown.jpg"
            }
        ],
        "groups": [
            {
            "id": "g101",
            "title": "Backlog",
            "tasks": [
                {
                "id": "t101",
                "title": "Conduct user research",
                "status": "todo",
                "priority": "high",
                "description": "Gather insights from current users to inform redesign",
                "memberIds": ["u101", "u102"],
                "labelIds": ["l101", "l105"],
                "attachments": [
                    {
                    "_id": "a101",
                    "url": "https://i.ibb.co/r2CgwKV/626735ba-84de-4190-b3fe-12bc33d47e62.jpg",
                    "createdAt": 1674673353738
                    }
                ],
                "cover": 
                {
                "url": "https://i.ibb.co/r2CgwKV/626735ba-84de-4190-b3fe-12bc33d47e62.jpg",
                "attachmentId": "a101"
                }
                },
                {
                "id": "t102",
                "title": "Create wireframes",
                "status": "todo",
                "priority": "medium",
                "description": "Design initial wireframes for key pages",
                "memberIds": ["u102"],
                "labelIds": ["l102", "l105"],
                "attachments": [
                    {
                        "_id": "a102",
                        "url": "https://i.ibb.co/dkCHFRL/Trello-screen.png",
                        "createdAt": 1674673353738
                    }
                ],
                "cover": 
                {
                    "url": "https://i.ibb.co/dkCHFRL/Trello-screen.png",
                    "attachmentId": "a102"
                }
                },
                {
                "id": "t103",
                "title": "Define color palette",
                "status": "todo",
                "priority": "low",
                "description": "Choose colors that align with brand guidelines",
                "memberIds": ["u102"],
                "labelIds": ["l103"],
                "attachments": [
                    {
                        "_id": "a103",
                        "url": "https://i.ibb.co/dkCHFRL/Trello-screen.png",
                        "createdAt": 1674673353738
                    }
                ]
                }
            ]
            },
            {
            "id": "g102",
            "title": "To Do",
            "tasks": [
                {
                "id": "t104",
                "title": "Update homepage layout",
                "status": "todo",
                "priority": "high",
                "description": "Redesign homepage based on new wireframes",
                "memberIds": ["u102"],
                "labelIds": ["l101", "l105"]
                },
                {
                "id": "t105",
                "title": "Optimize images",
                "status": "todo",
                "priority": "medium",
                "description": "Compress and optimize all images for web",
                "memberIds": ["u103"],
                "labelIds": ["l102"]
                },
                {
                "id": "t106",
                "title": "Implement responsive design",
                "status": "todo",
                "priority": "high",
                "description": "Ensure website is mobile-friendly",
                "memberIds": ["u101", "u103"],
                "labelIds": ["l101", "l105"]
                }
            ]
            },
            {
            "id": "g103",
            "title": "In Progress",
            "tasks": [
                {
                "id": "t107",
                "title": "Develop new navigation menu",
                "status": "inProgress",
                "priority": "high",
                "description": "Create responsive navigation menu",
                "memberIds": ["u103"],
                "labelIds": ["l101", "l105"]
                },
                {
                "id": "t108",
                "title": "Implement search functionality",
                "status": "inProgress",
                "priority": "medium",
                "description": "Add search feature to website",
                "memberIds": ["u101"],
                "labelIds": ["l102", "l105"]
                },
                {
                "id": "t109",
                "title": "Create custom icons",
                "status": "inProgress",
                "priority": "low",
                "description": "Design and create custom icons for website",
                "memberIds": ["u102"],
                "labelIds": ["l103"]
                }
            ]
            },
            {
            "id": "g104",
            "title": "Review",
            "tasks": [
                {
                "id": "t110",
                "title": "Review homepage design",
                "status": "review",
                "priority": "high",
                "description": "Team to review and provide feedback on new homepage design",
                "memberIds": ["u101", "u102", "u103", "u104"],
                "labelIds": ["l101"]
                },
                {
                "id": "t111",
                "title": "Test cross-browser compatibility",
                "status": "review",
                "priority": "medium",
                "description": "Ensure website works on all major browsers",
                "memberIds": ["u103", "u104"],
                "labelIds": ["l102"]
                }
            ]
            },
            {
            "id": "g105",
            "title": "QA",
            "tasks": [
                {
                "id": "t112",
                "title": "Perform usability testing",
                "status": "qa",
                "priority": "high",
                "description": "Conduct usability tests with sample users",
                "memberIds": ["u104"],
                "labelIds": ["l101", "l105"]
                },
                {
                "id": "t113",
                "title": "Check for broken links",
                "status": "qa",
                "priority": "medium",
                "description": "Ensure all links are working correctly",
                "memberIds": ["u103"],
                "labelIds": ["l102"]
                },
                {
                "id": "t114",
                "title": "Validate HTML and CSS",
                "status": "qa",
                "priority": "low",
                "description": "Ensure code meets W3C standards",
                "memberIds": ["u101"],
                "labelIds": ["l103"]
                }
            ]
            },
            {
            "id": "g106",
            "title": "Done",
            "tasks": [
                {
                "id": "t115",
                "title": "Finalize project scope",
                "status": "done",
                "priority": "high",
                "description": "Define and document project requirements",
                "memberIds": ["u101", "u104"],
                "labelIds": ["l101"]
                },
                {
                "id": "t116",
                "title": "Set up development environment",
                "status": "done",
                "priority": "medium",
                "description": "Prepare local and staging environments",
                "memberIds": ["u103"],
                "labelIds": ["l102"]
                }
            ]
            },
            {
            "id": "g107",
            "title": "Archived",
            "tasks": [
                {
                "id": "t117",
                "title": "Old homepage design",
                "status": "archived",
                "priority": "low",
                "description": "Previous version of homepage design",
                "memberIds": ["u102"],
                "labelIds": ["l103"]
                }
            ]
            }
        ],
        "activities": [
            {
            "id": "a101",
            "title": "Added new task",
            "createdAt": 1623456789,
            "byMember": {
                "_id": "u101",
                "fullname": "John Doe",
                "imgUrl": "http://example.com/john-doe.jpg"
            },
            "task": {
                "id": "t104",
                "title": "Update homepage layout"
            }
            },
            {
            "id": "a102",
            "title": "Moved task to In Progress",
            "createdAt": 1623456790,
            "byMember": {
                "_id": "u103",
                "fullname": "Bob Johnson",
                "imgUrl": "http://example.com/bob-johnson.jpg"
            },
            "task": {
                "id": "t107",
                "title": "Develop new navigation menu"
            }
            }
        ],
        "cmpsOrder": ["StatusPicker", "MemberPicker", "DatePicker"]
        }]
        `
        boards = JSON.parse(boardString)
        utilService.saveToStorage(STORAGE_KEY, boards)
    }
    return boards
}


// TEST DATA
// storageService.post(STORAGE_KEY, board).then(savedBoard => console.log('Added board', savedBoard))