// Event Listener for DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded');

    // Assuming 'locations' and 'map' are defined elsewhere
    locations.forEach(function(location) {
        var marker = L.marker(location.position).addTo(map);
        
        marker.on('click', function() {
            // Update the information panel with the location's details
            updateInfoPanel(location.title, location.description, location.imageUrl, location.position[0], location.position[1]);
        });
    });

    // Other event listeners or functionality can be added here
});

// Submit comment function
function submitComment(title) {
    var commentText = document.getElementById(`comment-text-${title.replace(/ /g, '-').toLowerCase()}`).value;
    var commentImage = document.getElementById(`comment-image-${title.replace(/ /g, '-').toLowerCase()}`).files[0];
    var rating = document.getElementById(`comment-rating-${title.replace(/ /g, '-').toLowerCase()}`).value;

    var commentsSection = document.getElementById(`comments-section-${title.replace(/ /g, '-').toLowerCase()}`);

    // Create a comment display
    var commentDisplay = document.createElement('div');
    commentDisplay.className = 'comment-display'; // Add a class for styling
    commentDisplay.innerHTML = `
        <p><strong>Rating: ${renderStarRating(rating)}</strong></p>
        <p class="comment-text">${commentText}</p>
    `;

    // Display the comment image if uploaded
    if (commentImage) {
        var imageURL = URL.createObjectURL(commentImage);
        commentDisplay.innerHTML += `<img src="${imageURL}" alt="Comment Image" style="max-width: 100px;">`;
    }

    // Add Edit button
    var editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.className = 'edit-btn';
    editButton.onclick = function() {
        editCommentForm(commentDisplay, commentText, rating, title); // Call edit comment form
    };

    // Add Delete button
    var deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = function() {
        commentsSection.removeChild(commentDisplay);
    };

    commentDisplay.appendChild(editButton);
    commentDisplay.appendChild(deleteButton);
    commentsSection.appendChild(commentDisplay);

    // Clear the form
    clearCommentForm(title);
}

// Function to render star rating as stars
function renderStarRating(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

// Clear the comment form
function clearCommentForm(title) {
    document.getElementById(`comment-text-${title.replace(/ /g, '-').toLowerCase()}`).value = '';
    document.getElementById(`comment-image-${title.replace(/ /g, '-').toLowerCase()}`).value = '';
    document.getElementById(`comment-rating-${title.replace(/ /g, '-').toLowerCase()}`).value = '1'; // Reset to 1 star
}

// Function to show the edit form
function editCommentForm(commentDisplay, oldText, oldRating, title) {
    var commentsSection = document.getElementById(`comments-section-${title.replace(/ /g, '-').toLowerCase()}`);

    // Replace the comment text with an editable form
    commentDisplay.innerHTML = `
        <textarea class="edit-comment-text">${oldText}</textarea>
        <div class="rating">
            <span>Rating: </span>
            <select class="edit-comment-rating">
                <option value="1" ${oldRating == 1 ? 'selected' : ''}>1 Star</option>
                <option value="2" ${oldRating == 2 ? 'selected' : ''}>2 Stars</option>
                <option value="3" ${oldRating == 3 ? 'selected' : ''}>3 Stars</option>
                <option value="4" ${oldRating == 4 ? 'selected' : ''}>4 Stars</option>
                <option value="5" ${oldRating == 5 ? 'selected' : ''}>5 Stars</option>
            </select>
        </div>
        <button class="save-btn">Save</button>
    `;

    // Add save functionality
    commentDisplay.querySelector('.save-btn').onclick = function() {
        var newText = commentDisplay.querySelector('.edit-comment-text').value;
        var newRating = commentDisplay.querySelector('.edit-comment-rating').value;

        // Update the display with new text and rating
        commentDisplay.innerHTML = `
            <p><strong>Rating: ${renderStarRating(newRating)}</strong></p>
            <p class="comment-text">${newText}</p>
        `;

        // Re-add the Edit and Delete buttons
        var editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.className = 'edit-btn';
        editButton.onclick = function() {
            editCommentForm(commentDisplay, newText, newRating, title);
        };

        var deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = function() {
            commentsSection.removeChild(commentDisplay);
        };

        commentDisplay.appendChild(editButton);
        commentDisplay.appendChild(deleteButton);
    };
}
