import { books } from "./js/db.js"


const CONTENT = document.getElementById("content")


function renderContent(i) {

    for (let i = 0; i < books.length; i++) {
        const element = books[i]

        CONTENT.innerHTML += /*html*/`
        <div class="book" id="book-${i + 1}">
            <h1>${books[i].name}</h1>
            <div class="book-cover">
                <img src="./assets/img/book_cover.png" alt="book cover, pink.">
            </div>
            <div class="book-info">
                <div class="info-top">
                    <span class="price">${books[i].price}</span>
                    <div class="like_part">
                        <span class="like-counter" id="likes-${i+1}">${books[i].likes}</span>
                        <img src="" alt="" onclick="like(${i})">
                    </div>
                </div>
                <div class="info-bottom">
                    <table>
                        <tr>
                            <td>Author</td>
                            <td>: ${books[i].author}</td>
                        </tr> 
                        <tr>
                            <td>Erscheinungsjahr</td>
                            <td>: ${books[i].publishedYear}</td>
                        </tr> 
                        <tr>
                            <td>Genre</td>
                            <td>: ${books[i].genre}</td>
                        </tr> 
                    </table>
                </div>
            </div>
            <div class="comment-section">
                <div class="comments">
                    <table id="table-${i+1}">
                    </table>
                </div>
            </div>
            <div class="action_comment"></div>
            <input type="text" id="input--${i+1}" placeholder="Schreibe dein Kommentar...">
            <button> Send </button>
        </div>
    `
        let indexBook = i

        for (let l = 0; l < element.comments.length; l++) {

            const index = element.comments.length
            if (l == 0) {
                document.getElementById(`table-${indexBook +1}`).innerHTML += /*html*/`
                <tr>
                    <td>${books[indexBook].comments[index - 1].name}</td>
                    <td>: ${books[indexBook].comments[index - 1].comment}</td>
                </tr>
            `
            } else {
                document.getElementById(`table-${indexBook +1}`).innerHTML += /*html*/`
                <tr>
                    <td>${books[indexBook].comments[index - (1+l)].name}</td>
                    <td>: ${books[indexBook].comments[index - (1+l)].comment}</td>
                </tr>
            `
            }
        }
    }

}

function like (i){
    
    let switchCount = document.getElementById(`likes-${i+1}`)
    let liked = books[i].liked
    let countLikes = books[i].likes
    
    if (liked == false) {
        liked = true
        switchCount.innerHTML= /*html*/`
            ${countLikes+1}
        `

    } else {
        liked = false
        countLikes-1
        switchCount.innerHTML= /*html*/`
            ${countLikes-1}
        `
    }
}

function addComment(){}



renderContent()