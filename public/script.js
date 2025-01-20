const API_URL = 'http://localhost:3000/blogs'; 

// Create a new blog
document.getElementById('create-blog-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const author = document.getElementById('author').value || 'Anonymous';

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, author }),
    });

    if (response.ok) {
        alert('Blog created successfully!');
    } else {
        const error = await response.json();
        alert(`Error creating blog: ${error.message}`);
    }
});

// Fetch all blogs
document.getElementById('fetch-blogs').addEventListener('click', async () => {
    const response = await fetch(API_URL);

    if (response.ok) {
        const blogs = await response.json();
        const blogsContainer = document.getElementById('blogs-container');
        blogsContainer.innerHTML = '';

        blogs.forEach(blog => {
            const blogElement = document.createElement('div');
            blogElement.classList.add('blog');
            blogElement.innerHTML = `
                <h3>${blog.title}</h3>
                <p>${blog.body}</p>
                <small>Author: ${blog.author || 'Anonymous'}</small>
            `;
            blogsContainer.appendChild(blogElement);
        });
    } else {
        const error = await response.json();
        alert(`Error fetching blogs: ${error.message}`);
    }
});

// Fetch a blog by ID
document.getElementById('fetch-blog-by-id-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const blogId = document.getElementById('blog-id').value.trim();

    if (!blogId) {
        alert('Please enter a valid Blog ID');
        return;
    }

    const response = await fetch(`${API_URL}/${blogId}`);

    if (response.ok) {
        const blog = await response.json();

        // Отображение данных блога
        const blogContainer = document.getElementById('blogs-container');
        blogContainer.innerHTML = `
            <div class="blog">
                <h3>${blog.title}</h3>
                <p>${blog.body}</p>
                <small>Author: ${blog.author || 'Anonymous'}</small>
            </div>
        `;
    } else {
        const error = await response.json();
        alert(`Error fetching blog: ${error.message}`);
    }
});

// Update a blog
document.getElementById('update-blog-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const blogId = document.getElementById('update-blog-id').value.trim();
    const title = document.getElementById('update-title').value;
    const body = document.getElementById('update-body').value;
    const author = document.getElementById('update-author').value;

    if (!blogId) {
        alert('Please enter a valid Blog ID');
        return;
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (body) updateData.body = body;
    if (author) updateData.author = author;

    const response = await fetch(`${API_URL}/${blogId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
    });

    if (response.ok) {
        alert('Blog updated successfully!');
    } else {
        const error = await response.json();
        alert(`Error updating blog: ${error.message}`);
    }
});


// Delete a blog
document.getElementById('delete-blog-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const blogId = document.getElementById('delete-blog-id').value.trim();

    if (!blogId) {
        alert('Please enter a valid Blog ID');
        return;
    }

    const response = await fetch(`${API_URL}/${blogId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        alert('Blog deleted successfully!');
    } else {
        const error = await response.json();
        alert(`Error deleting blog: ${error.message}`);
    }
});
