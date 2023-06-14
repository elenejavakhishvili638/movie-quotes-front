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

export async function fetchGenres() {
  try {
    let response = await axios.get('/api/genres')
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function fetchQuotes(searchTerm) {
  try {
    let response
    if (searchTerm) {
      let encodedSearchTerm = encodeURIComponent(searchTerm)
      response = await axios.get(`/api/quotes?search=${encodedSearchTerm}`)
    } else {
      response = await axios.get('/api/quotes')
    }
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
