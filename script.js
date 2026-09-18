import { dbBooks } from "./js/db.js"
import { getTemplateBooks, getTemplateComments, getTemplateCommentsPlaceholder, getTemplateLike } from "./js/templates.js"


// //////////////////
// VARIABLES
// //////////////////


export let books = []


// //////////////////
// LOCALSTORAGE
// //////////////////


function updateBooks() {
    const booksUpdated = localStorage.getItem("booksLatest")
    if (booksUpdated) {
        books = JSON.parse(booksUpdated)
    } else {
        books = dbBooks
    }
}

function saveToLocalStorage() {
    let booksUpdateLikes = JSON.stringify(books)
    localStorage.setItem("booksLatest", booksUpdateLikes)
    updateBooks()
}


// //////////////////
// INIT-FUNCTIONS 
// //////////////////


window.init = init

function init() {
    updateBooks()
    renderContent()
}

// //////////////////
// MAIN-FUNCTIONS 
// //////////////////


function renderContent() {
    const CONTENT = document.getElementById("content")
    CONTENT.innerHTML = ""
    for (let i = 0; i < books.length; i++) {
        let lengthComments = books[i].comments.length
        let idCount = i + 1
        CONTENT.innerHTML += getTemplateBooks(books, i, idCount)
        renderToEuro(idCount)
        fillLike(i)
        for (let l = 0; l < lengthComments | l == 0; l++) {
            if (lengthComments === 0) {
                getTemplateCommentsPlaceholder(idCount)
            } else {
                getTemplateComments(i, l, lengthComments, idCount)
            }
        }
    }
}

function renderCommentSection(i) {
    let idCount = i + 1
    console.log(document.getElementById(`table-${idCount}`))
    document.getElementById(`input-${idCount}`).value = ""
    document.getElementById(`table-${idCount}`).innerHTML = /*html*/`
        <th>Comments:</th>
    `
    console.log(books[i].comments.length)
    let lengthComments = books[i].comments.length
    for (let l = 0; l < lengthComments; l++) {
        getTemplateComments(i, l, lengthComments, idCount)
    }
}


// //////////////////
// HELP-FUNCTIONS 
// //////////////////

//addEventListener lernen
window.likeOnClick = likeOnClick
window.pushComment = pushComment
window.fillLike = fillLike

function likeOnClick(i) {
    let idCount = i+1
    let currentLikes = books[i].likes
    if (!books[i].liked) {

        books[i].liked = true
        books[i].likes = currentLikes +1

        getTemplateLike(idCount, books[i].likes)
        document.getElementById(`liked-${idCount}`).style.fill = "red"
    } else {
        books[i].liked = false
        books[i].likes = currentLikes -1

        getTemplateLike(idCount, books[i].likes)
        document.getElementById(`liked-${idCount}`).style.fill = "grey"
    }
    saveToLocalStorage()
}

function pushComment(i) {
    let idCount = i + 1
    let commentByUser = document.getElementById(`input-${idCount}`).value

    if (commentByUser != "") {
        books[i].comments.push({ name: "Guest", comment: commentByUser })
        saveToLocalStorage()
        renderCommentSection(i)
    } else {
        return
    }
}

function fillLike(i) {
    let idCount = i + 1
    if (!books[i].liked) {
        document.getElementById(`liked-${idCount}`).style.fill = "grey"
    } else {
        document.getElementById(`liked-${idCount}`).style.fill = "red"
    }
}

function renderToEuro(idCount) {
    let element = document.getElementById(`price-${idCount}`)
    let zahl = parseFloat(element.dataset.price)
    let euro = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
    }).format(zahl);
    element.innerHTML = /*html*/`
        ${euro}
    `
}

