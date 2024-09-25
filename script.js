const API_URL = '/blogs';

async function fetchPosts() {
    const response = await fetch(API_URL);
    const posts = await response.json();

    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = posts.map(post => `
        <div class="post">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        </div>
    `).join('');
}

document.getElementById('blog-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
        fetchPosts();  
    }
});

fetchPosts();
