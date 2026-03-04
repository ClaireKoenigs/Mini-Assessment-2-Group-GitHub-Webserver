
function displayReply() {
    const displayArea = document.getElementById('displayArea');
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');

    if (reviews.length === 0) {
        displayArea.innerHTML = '<p>No reviews yet.</p>';
        return;
    }

    const byMovie = {};
    reviews.forEach(r => {
        if (!byMovie[r.movie]) byMovie[r.movie] = [];
        byMovie[r.movie].push(r.reply);
    });

    let html = '';
    for (const movie in byMovie) {
        html += `<h3>${movie}</h3><ul>`;
        byMovie[movie].forEach(r => {
            html += `<li>${r}</li>`;
        });
        html += '</ul>';
    }

    displayArea.innerHTML = html;
}

function saveReply(e) {
    e && e.preventDefault();
    const movieSelect = document.getElementById('movies');
    const movieChoice = movieSelect.options[movieSelect.selectedIndex].text;

    const replyValue = document.getElementById('review').value.trim();

    if (!replyValue) {
        alert('Please enter a review before submitting.');
        return;
    }

    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviews.push({ movie: movieChoice, reply: replyValue, time: Date.now() });
    localStorage.setItem('reviews', JSON.stringify(reviews));

    alert('Review saved!');
    document.getElementById('review').value = '';
    displayReply();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit').addEventListener('click', saveReply);
    displayReply();
});