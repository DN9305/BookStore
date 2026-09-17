import { dbBooks } from "./js/db.js"
import { getTemplateBooks, getTemplateComments } from "./js/templates.js"


// //////////////////
// VARIABLES
// //////////////////

export let books = []


// //////////////////
// INIT-FUNCTION
// //////////////////


function init() {
    let booksUpdated = localStorage.getItem("booksLatest")
    if (booksUpdated) {
        books = JSON.parse(booksUpdated)
        console.log(books)
    } else {
        books = dbBooks
    }
    renderContent()
}


// //////////////////
// MAIN-FUNCTIONS 
// //////////////////


function renderContent() {
    const CONTENT = document.getElementById("content")
    CONTENT.innerHTML = ""

    for (let i = 0; i < books.length; i++) {
        CONTENT.innerHTML += getTemplateBooks(books, i)

        for (let l = 0; l < books[i].comments.length | l == 0; l++) {
            getTemplateComments(i, l)
        }
    }
}


// //////////////////
// HELP-FUNCTIONS 
// //////////////////

//addEventListener lernen
window.likeOnClick = likeOnClick
window.pushComment = pushComment


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
}

function pushComment(i) {
    let idCount = i + 1
    let commentByUser = document.getElementById(`input-${idCount}`).value

    if (commentByUser != "") {
        books[i].comments.push({ name: "Guest", comment: commentByUser })
        let booksUpdateComments = JSON.stringify(books)
        localStorage.setItem("booksLatest", booksUpdateComments)
        renderContent()
    } else {
        return
    }
}


// //////////////////
// FUNCTION-CALLS
// //////////////////

init()
