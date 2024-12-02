const taskList = document.querySelectorAll('.task-list')
const backlogTask = document.querySelector('#backlog .task-list')
const titleInput = document.querySelector('#title')
const descriptionInput = document.querySelector('#description')
const submitButton = document.querySelector('#submit-button')
const errorContainer = document.querySelector('.error-container')

// =============================BOXES - CODE====================================
let tasks = [
    {
        id: 0,
        title: "Fix submit button",
        description: "The submit button has stoped working since last release"
    },

    {
        id: 1,
        title: "Chnage text on T and C's",
        description: "The terms and conditions need updating as per the bussiness metting."
    },

    {   id: 2,
        title: "Change banner picture",
        description: "Marketing has requested a new banner to added to the website"
    }
]

// ============================DRAG - CODE========================================


taskList.forEach(list =>{
    list.addEventListener('dragover', dragOver)
    list.addEventListener('drop', dragDrop)
})

// ===========================ADDING - ELEMENTS=====================================
// We created Divs and Paragaph through Javascrip
function createTask (taskId, title, discription) {
    const taskCard = document.createElement('div')
    const taskHeader = document.createElement('div')
    const taskTitle = document.createElement('p')
    const taskDiscriptioncontainer = document.createElement('div')
    const taskDiscription = document.createElement('p')
    const deletIcon =  document.createElement('p')


// We have given classes to this elemts through Javascrip
    taskCard.classList.add('task-container')
    taskHeader.classList.add('task-header')
    taskDiscriptioncontainer.classList.add('task-discription-container')


    taskTitle.textContent = title
    taskDiscription.textContent = discription
    deletIcon.textContent = '☒'

    taskCard.setAttribute('draggable', true)
    taskCard.setAttribute('task-id', taskId)

    taskCard.addEventListener('dragstart', dragStart)
    deletIcon.addEventListener('click', deletTask)

    taskHeader.append(taskTitle, deletIcon)
    taskDiscriptioncontainer.append(taskDiscription)
    taskCard.append(taskHeader, taskDiscriptioncontainer)
    backlogTask.append(taskCard)
    
}

// =====================CHANGE COLOR OF THE BOXES WHEN DRAGGED=================================
function addColor (colummn) {
    let color
    switch (colummn) {
        case 'backlog':
            color = 'rgb(96, 96, 192)'
            break
        case 'doing':
            color = 'rgb(83, 156, 174)'
            break
        case 'done':
            color = 'rgb(224, 165, 116)'
            break
        case 'discard':
            color = 'rgb(255, 0, 0)'
            break
        default:
            color = 'rgb(232, 232, 232)'
    }
    return color
}

// ===============================DRAGING - CODE====================================
function addTasks () {
    tasks.forEach(task => createTask(task.id, task.title, task.description))
}

addTasks()

let elementBeingDragged 

function dragStart() {
    elementBeingDragged = this  
    // The (  this  ) keyword refers to different objects depending on how it is used
}


function dragOver (e) {
    e.preventDefault()
}


// 

function dragDrop() {
    const columnId = this.parentNode.id
    elementBeingDragged.firstChild.style.backgroundColor = addColor(columnId)
    this.append(elementBeingDragged)
}

// ===============================ERROR - CODE======================================

function showError(message) {
    const errorMessage = document.createElement('p')
    errorMessage.textContent = message
    errorMessage.classList.add('error-message')
    errorContainer.append(errorMessage)

    setTimeout(() => {
        errorContainer.textContent = ''
    }, 2000)
}



// ==============================FILTER - CODE=======================================
function addsingletask(e) {

    e.preventDefault()

// filtering the task --> if the task title has same value as previous tasks
// this will check and the make and array with that value name filteredTitle

    const filteredTitle = tasks.filter(task => {
        return task.title === titleInput.value
    })


// if filteredTitle length is nothing, than It  going to create a new id 
// push a new task, 
    if (!filteredTitle.length) {
        const newId = tasks.length
        tasks.push({
            id: newId,
            title: titleInput.value,
            description: descriptionInput.value
        })
        createTask(newId, titleInput.value, descriptionInput.value)
        titleInput.value = ''
        descriptionInput.value = ''
    }

// Else if  the filteredTitle length is more than one than it will show an error
    else {
        console.log('error')
        showError('Title must be unique!')
    }
}

submitButton.addEventListener('click', addsingletask)


// ===========================DELETE THE BOX============================================

function deletTask () {
    const headerTitle = this.parentNode.firstChild.textContent 

    const filteredTasks = tasks.filter(task => {
        return task.title === headerTitle
    })

  

    tasks = tasks.filter(task => {
        return task !== filteredTasks[0]
    })

    this.parentNode.parentNode.remove()
}