import { dbBooks } from "./js/db.js"
import { getTemplateBooks, getTemplateComments } from "./js/templates.js"


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


// //////////////////
// MAIN-FUNCTIONS 
// //////////////////


function renderContent() {
    const CONTENT = document.getElementById("content")
    CONTENT.innerHTML = ""
    for (let i = 0; i < books.length; i++) {
        CONTENT.innerHTML += getTemplateBooks(books, i)
        fillLike(i)
        for (let l = 0; l < books[i].comments.length | l == 0; l++) {
            getTemplateComments(i, l)
        }
    }
}

function renderCommentSection(i) {
    let idCount = i + 1
    console.log(document.getElementById(`table-${ idCount }`))
    document.getElementById(`input-${idCount}`).value = ""
    document.getElementById(`table-${idCount}`).innerHTML = /*html*/`
        <th>Comments:</th>
    `
    console.log(books[i].comments.length)
    for (let l = 0; l < books[i].comments.length; l++) {
        getTemplateComments(i, l)
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
    let currentLikesNum = books[i].likes
    let idCount = i + 1

    if (!books[i].liked) {
        let likesUpdatedPos = currentLikesNum + 1

        books[i].liked = true
        books[i].likes = likesUpdatedPos

        document.getElementById(`likes-${idCount}`).innerHTML = /*html*/`
            ${likesUpdatedPos}
        `
        document.getElementById(`liked-${idCount}`).style.fill = "red"
    } else {
        let likesUpdatedNeg = currentLikesNum - 1

        books[i].liked = false
        books[i].likes = likesUpdatedNeg

        document.getElementById(`likes-${idCount}`).innerHTML = /*html*/`
            ${likesUpdatedNeg}
        `
        document.getElementById(`liked-${idCount}`).style.fill = "grey"

    }
    let booksUpdateLikes = JSON.stringify(books)
    localStorage.setItem("booksLatest", booksUpdateLikes)
    updateBooks()
}

function pushComment(i) {
    let idCount = i + 1
    let commentByUser = document.getElementById(`input-${idCount}`).value

    if (commentByUser != "") {
        books[i].comments.push({ name: "Guest", comment: commentByUser })
        let booksUpdateComments = JSON.stringify(books)
        localStorage.setItem("booksLatest", booksUpdateComments)
        updateBooks()
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


// //////////////////
// FUNCTION-CALLS
// //////////////////

updateBooks()
renderContent()
