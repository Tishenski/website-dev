const API_BASE = '/api'

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`
  
  const config = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body)
  }

  const response = await fetch(url, config)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Request failed')
  }

  return data
}

export const api = {
  products: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString()
      return request(`/products.php${query ? `?${query}` : ''}`)
    },
    getById: (id) => request(`/products.php?id=${id}`),
  },

  categories: {
    getAll: () => request('/categories.php'),
  },

  auth: {
    check: () => request('/auth.php?action=check'),
    login: (username, password) => 
      request('/auth.php?action=login', {
        method: 'POST',
        body: { username, password },
      }),
    register: (username, email, password, confirmPassword) =>
      request('/auth.php?action=register', {
        method: 'POST',
        body: { username, email, password, confirmPassword },
      }),
    logout: () =>
      request('/auth.php?action=logout', {
        method: 'POST',
      }),
  },

  cart: {
    get: () => request('/cart.php'),
    add: (product_id, quantity = 1) =>
      request('/cart.php', {
        method: 'POST',
        body: { product_id, quantity },
      }),
    update: (product_id, quantity) =>
      request('/cart.php', {
        method: 'PUT',
        body: { product_id, quantity },
      }),
    remove: (product_id) =>
      request('/cart.php', {
        method: 'DELETE',
        body: { product_id },
      }),
    clear: () =>
      request('/cart.php', {
        method: 'DELETE',
        body: {},
      }),
  },

  orders: {
    getAll: () => request('/orders.php'),
    getById: (id) => request(`/orders.php?id=${id}`),
    create: () =>
      request('/orders.php', {
        method: 'POST',
      }),
  },
}

export default api
