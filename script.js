// ฟังก์ชันโพสต์ข้อความ
function postMessage() {
    const postText = document.getElementById('post-text').value;
    const postImage = document.getElementById('post-image').files[0];
    
    if (postText.trim() === "" && !postImage) {
        alert("กรุณาพิมพ์ข้อความหรืออัพโหลดรูปภาพ!");
        return;
    }

    const postContainer = document.getElementById('posts');
    
    // สร้างโพสต์ใหม่
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    const postContent = document.createElement('p');
    postContent.textContent = postText;
    postDiv.appendChild(postContent);

    if (postImage) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(postImage);
        img.alt = "โพสต์รูปภาพ";
        postDiv.appendChild(img);
    }

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('post-actions');

    const likeButton = document.createElement('button');
    likeButton.classList.add('like-button');
    likeButton.textContent = "ถูกใจ";
    likeButton.onclick = function() {
        toggleLike(postDiv, likeButton);
    };

    actionsDiv.appendChild(likeButton);
    postDiv.appendChild(actionsDiv);

    // ช่องแสดงความคิดเห็น
    const commentBox = document.createElement('div');
    commentBox.classList.add('comment-box');

    const commentInput = document.createElement('textarea');
    commentInput.placeholder = "พิมพ์ความคิดเห็น...";
    commentInput.classList.add('comment-input');
    commentInput.onkeydown = function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            const comment = commentInput.value.trim();
            if (comment) {
                addComment(postDiv, comment);
                commentInput.value = ''; // เคลียร์ข้อความหลังจากโพสต์
            }
        }
    };

    const postCommentButton = document.createElement('button');
    postCommentButton.classList.add('post-comment-button');
    postCommentButton.textContent = "โพสต์";
    postCommentButton.onclick = function() {
        const comment = commentInput.value.trim();
        if (comment) {
            addComment(postDiv, comment);
            commentInput.value = ''; // เคลียร์ข้อความหลังจากโพสต์
        }
    };

    commentBox.appendChild(commentInput);
    commentBox.appendChild(postCommentButton);
    postDiv.appendChild(commentBox);

    postContainer.appendChild(postDiv);

    // เคลียร์ฟอร์ม
    document.getElementById('post-text').value = "";
    document.getElementById('post-image').value = "";
}

// ฟังก์ชันเพิ่มคอมเมนต์
function addComment(postDiv, commentText) {
    const commentsSection = postDiv.querySelector('.comments-section') || document.createElement('div');
    commentsSection.classList.add('comments-section');
    
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    
    const commentContent = document.createElement('p');
    commentContent.textContent = commentText;
    commentDiv.appendChild(commentContent);

    // ตอบกลับคอมเมนต์
    const replyBox = document.createElement('div');
    replyBox.classList.add('reply-box');
    
    const replyInput = document.createElement('textarea');
    replyInput.placeholder = "พิมพ์ตอบกลับ...";
    replyInput.classList.add('reply-input');
    replyInput.onkeydown = function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            const reply = replyInput.value.trim();
            if (reply) {
                addReply(commentDiv, reply);
                replyInput.value = ''; // เคลียร์ข้อความหลังจากโพสต์
            }
        }
    };
    
    replyBox.appendChild(replyInput);
    commentDiv.appendChild(replyBox);

    commentsSection.appendChild(commentDiv);
    postDiv.appendChild(commentsSection);
}

// ฟังก์ชันเพิ่มการตอบกลับ
function addReply(commentDiv, replyText) {
    const replyDiv = document.createElement('div');
    replyDiv.classList.add('reply');

    const replyContent = document.createElement('p');
    replyContent.textContent = replyText;
    replyDiv.appendChild(replyContent);

    commentDiv.appendChild(replyDiv);
}

// ฟังก์ชันในการจัดการปุ่ม "ถูกใจ"
function toggleLike(postDiv, likeButton) {
    const likeCountDiv = postDiv.querySelector('.like-count') || document.createElement('div');
    if (!likeCountDiv.classList.contains('like-count')) {
        likeCountDiv.classList.add('like-count');
        postDiv.appendChild(likeCountDiv);
    }

    if (likeButton.style.backgroundColor === 'rgb(13, 110, 253)') { // สีสีน้ำเงิน
        likeButton.style.backgroundColor = '';
        likeButton.style.color = '';
        likeCountDiv.textContent = parseInt(likeCountDiv.textContent || '0') - 1;
    } else {
        likeButton.style.backgroundColor = '#0d6efd';
        likeButton.style.color = '#fff';
        likeCountDiv.textContent = (parseInt(likeCountDiv.textContent || '0') + 1);
    }

    likeCountDiv.textContent = likeCountDiv.textContent + ' ถูกใจ';
}