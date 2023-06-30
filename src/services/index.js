import axios from '../config/axios'

export async function registerUser(data) {
  try {
    await axios.post('/api/register', data, { withCredentials: true })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function loginUser(data) {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post('/api/login', data, { withCredentials: true })
    await axios.get('/api/user')
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function registerWithGoogle() {
  try {
    const response = await axios.get('api/auth/redirect', { withCredentials: true })
    if (response.data.url) {
      window.location.href = response.data.url
    }
  } catch (error) {
    console.log(error)
  }
}

export async function loginWithGoogle() {
  try {
    const response = await axios.get('api/auth/redirect', { withCredentials: true })
    if (response.data.url) {
      window.location.href = response.data.url
    }
  } catch (error) {
    console.log(error)
  }
}

export async function logout() {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post('/api/logout', { withCredentials: true })
  } catch (error) {
    console.log(error)
  }
}

export async function sendEmail(data) {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post('/api/forgot-password', data, { withCredentials: true })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function updatePassword(data) {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post('/api/reset-password', data, { withCredentials: true })
  } catch (error) {
    console.log(error)
  }
}

export async function fetchMovies(searchTerm) {
  try {
    let response
    if (searchTerm) {
      response = await axios.get(`/api/movies?search=${searchTerm}`)
    } else {
      response = await axios.get('/api/movies')
    }
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function fetchMovie(id) {
  try {
    let response = await axios.get(`/api/movie/${id}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function fetchAllMovies() {
  try {
    let response = await axios.get('/api/all-movies')
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function fetchGenres() {
  try {
    let response = await axios.get('/api/genres')
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function fetchQuotes(page, searchTerm) {
  try {
    let response
    if (searchTerm) {
      let encodedSearchTerm = encodeURIComponent(searchTerm)
      response = await axios.get(`/api/quotes?search=${encodedSearchTerm}&page=${page}`)
    } else {
      response = await axios.get(`/api/quotes?page=${page}`)
    }
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function fetchQuote(id) {
  try {
    let response = await axios.get(`/api/quote/${id}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function addMovie(data) {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post('/api/movie', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteMovie(id) {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.delete(`/api/movie/${id}`, {
      withCredentials: true
    })
  } catch (error) {
    console.log(error)
  }
}

export async function editMovie(data, id) {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post(`/api/movie/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function addQuote(data) {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post('/api/quote', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    })
  } catch (error) {
    console.log(error)
  }
}

export async function addComment(data, id) {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post(`/api/quotes/${id}/comments`, data, {
      withCredentials: true
    })
  } catch (error) {
    console.log(error)
  }
}

export async function deleteQuote(id) {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.delete(`/api/quote/${id}`, {
      withCredentials: true
    })
  } catch (error) {
    console.log(error)
  }
}

export async function editQuote(data, id) {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post(`/api/quote/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    })
  } catch (error) {
    console.log(error)
  }
}

export async function updateUser(data, id) {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post(`/api/user/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function like(id, data) {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post(`/api/quotes/${id}/likes`, data, {
      withCredentials: true
    })
  } catch (error) {
    console.log(error)
  }
}

export async function unlike(id) {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.delete(`/api/quotes/${id}/likes`, {
      withCredentials: true
    })
  } catch (error) {
    console.log(error)
  }
}

export async function sendNotification(data, id) {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post(`/api/notification/${id}`, data, {
      withCredentials: true
    })
  } catch (error) {
    console.log(error)
  }
}

export async function fetchNotifications() {
  try {
    const response = await axios.get('/api/notifications')
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function markAsRead(id) {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post(`/api/notification/${id}/read`, {
      withCredentials: true
    })
  } catch (error) {
    console.log(error)
  }
}

export async function markAllAsRead() {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post('/api/notifications/read-all', {
      withCredentials: true
    })
  } catch (error) {
    console.log(error)
  }
}

export async function resendEmail() {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post('/api/email/resend', {
      withCredentials: true
    })
  } catch (error) {
    console.log(error)
  }
}
