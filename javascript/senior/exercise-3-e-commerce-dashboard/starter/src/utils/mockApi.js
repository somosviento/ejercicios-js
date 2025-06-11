// Mock API functions to simulate backend calls
// This file contains mock implementations of API calls for development purposes

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock users data
const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    avatar: '/static/images/avatars/avatar_1.jpg',
    createdAt: '2023-01-01T10:00:00.000Z',
    lastLogin: '2023-06-10T08:30:00.000Z',
  },
  {
    id: 2,
    name: 'Manager User',
    email: 'manager@example.com',
    password: 'manager123',
    role: 'manager',
    avatar: '/static/images/avatars/avatar_2.jpg',
    createdAt: '2023-02-15T11:20:00.000Z',
    lastLogin: '2023-06-09T14:45:00.000Z',
  },
];

// Mock products data
const products = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  description: `Description for Product ${i + 1}. This is a sample product description.`,
  price: Math.floor(Math.random() * 10000) / 100,
  category: ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Toys'][Math.floor(Math.random() * 5)],
  inventory: Math.floor(Math.random() * 100),
  rating: (Math.random() * 4 + 1).toFixed(1),
  image: `/static/images/products/product_${(i % 24) + 1}.jpg`,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  updatedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
}));

// Mock orders data
const orderStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const orders = Array.from({ length: 100 }, (_, i) => {
  const orderItems = Array.from(
    { length: Math.floor(Math.random() * 5) + 1 },
    (_, j) => {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 5) + 1;
      return {
        product_id: product.id,
        product_name: product.name,
        price: product.price,
        quantity,
        total: product.price * quantity,
      };
    }
  );

  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.1;
  const shipping = 10;
  const total = subtotal + tax + shipping;

  return {
    id: `ORD-${(1000 + i).toString().padStart(5, '0')}`,
    customer_id: Math.floor(Math.random() * 20) + 1,
    customer_name: `Customer ${Math.floor(Math.random() * 20) + 1}`,
    status: orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
    items: orderItems,
    payment_method: ['credit_card', 'paypal', 'bank_transfer'][Math.floor(Math.random() * 3)],
    shipping_address: {
      street: `${Math.floor(Math.random() * 1000) + 1} Main St`,
      city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)],
      state: ['NY', 'CA', 'IL', 'TX', 'AZ'][Math.floor(Math.random() * 5)],
      zipcode: `${Math.floor(Math.random() * 90000) + 10000}`,
      country: 'USA',
    },
    subtotal,
    tax,
    shipping,
    total,
    created_at: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    updated_at: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
  };
});

// Mock customers data
const customers = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Customer ${i + 1}`,
  email: `customer${i + 1}@example.com`,
  phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
  address: {
    street: `${Math.floor(Math.random() * 1000) + 1} Main St`,
    city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)],
    state: ['NY', 'CA', 'IL', 'TX', 'AZ'][Math.floor(Math.random() * 5)],
    zipcode: `${Math.floor(Math.random() * 90000) + 10000}`,
    country: 'USA',
  },
  totalOrders: Math.floor(Math.random() * 20),
  totalSpent: Math.floor(Math.random() * 10000),
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  lastPurchase: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
}));

// Authentication functions
export const mockLogin = async (email, password) => {
  await delay(800); // Simulate network delay
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  const token = `mock-jwt-token-${Math.random().toString(36).substring(2, 15)}`;
  
  // Return user data and token
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
    token,
  };
};

export const mockLogout = async () => {
  await delay(300);
  return { success: true };
};

export const mockCheckAuth = async (token) => {
  await delay(500);
  
  // In a real app, we would validate the token
  // Here we just check if it starts with our prefix
  if (!token || !token.startsWith('mock-jwt-token-')) {
    throw new Error('Invalid token');
  }
  
  // Return a random user for demo purposes
  const user = users[Math.floor(Math.random() * users.length)];
  
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  };
};

// Products API
export const fetchProducts = async (params = {}) => {
  await delay(600);
  
  let result = [...products];
  
  // Apply filters
  if (params.category) {
    result = result.filter(p => p.category === params.category);
  }
  
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    result = result.filter(p => 
      p.name.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower)
    );
  }
  
  if (params.minPrice !== undefined) {
    result = result.filter(p => p.price >= params.minPrice);
  }
  
  if (params.maxPrice !== undefined) {
    result = result.filter(p => p.price <= params.maxPrice);
  }
  
  // Apply sorting
  if (params.sort) {
    const [field, order] = params.sort.split(':');
    result.sort((a, b) => {
      if (order === 'desc') {
        return b[field] > a[field] ? 1 : -1;
      }
      return a[field] > b[field] ? 1 : -1;
    });
  }
  
  // Apply pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedResult = result.slice(startIndex, endIndex);
  
  return {
    products: paginatedResult,
    total: result.length,
    page,
    limit,
    totalPages: Math.ceil(result.length / limit),
  };
};

export const fetchProductById = async (id) => {
  await delay(400);
  
  const product = products.find(p => p.id === parseInt(id));
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  return product;
};

export const createProduct = async (productData) => {
  await delay(800);
  
  const newProduct = {
    id: products.length + 1,
    ...productData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  products.push(newProduct);
  
  return newProduct;
};

export const updateProduct = async (id, productData) => {
  await delay(600);
  
  const index = products.findIndex(p => p.id === parseInt(id));
  
  if (index === -1) {
    throw new Error('Product not found');
  }
  
  const updatedProduct = {
    ...products[index],
    ...productData,
    updatedAt: new Date().toISOString(),
  };
  
  products[index] = updatedProduct;
  
  return updatedProduct;
};

export const deleteProduct = async (id) => {
  await delay(500);
  
  const index = products.findIndex(p => p.id === parseInt(id));
  
  if (index === -1) {
    throw new Error('Product not found');
  }
  
  products.splice(index, 1);
  
  return { success: true };
};

// Orders API
export const fetchOrders = async (params = {}) => {
  await delay(700);
  
  let result = [...orders];
  
  // Apply filters
  if (params.status) {
    result = result.filter(o => o.status === params.status);
  }
  
  if (params.customer_id) {
    result = result.filter(o => o.customer_id === parseInt(params.customer_id));
  }
  
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    result = result.filter(o => 
      o.id.toLowerCase().includes(searchLower) || 
      o.customer_name.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply sorting
  if (params.sort) {
    const [field, order] = params.sort.split(':');
    result.sort((a, b) => {
      if (order === 'desc') {
        return b[field] > a[field] ? 1 : -1;
      }
      return a[field] > b[field] ? 1 : -1;
    });
  }
  
  // Apply pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedResult = result.slice(startIndex, endIndex);
  
  return {
    orders: paginatedResult,
    total: result.length,
    page,
    limit,
    totalPages: Math.ceil(result.length / limit),
  };
};

export const fetchOrderById = async (id) => {
  await delay(400);
  
  const order = orders.find(o => o.id === id);
  
  if (!order) {
    throw new Error('Order not found');
  }
  
  return order;
};

export const updateOrderStatus = async (id, status) => {
  await delay(500);
  
  const index = orders.findIndex(o => o.id === id);
  
  if (index === -1) {
    throw new Error('Order not found');
  }
  
  orders[index] = {
    ...orders[index],
    status,
    updated_at: new Date().toISOString(),
  };
  
  return orders[index];
};

// Customers API
export const fetchCustomers = async (params = {}) => {
  await delay(600);
  
  let result = [...customers];
  
  // Apply filters
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    result = result.filter(c => 
      c.name.toLowerCase().includes(searchLower) || 
      c.email.toLowerCase().includes(searchLower) ||
      c.phone.includes(params.search)
    );
  }
  
  // Apply sorting
  if (params.sort) {
    const [field, order] = params.sort.split(':');
    result.sort((a, b) => {
      if (order === 'desc') {
        return b[field] > a[field] ? 1 : -1;
      }
      return a[field] > b[field] ? 1 : -1;
    });
  }
  
  // Apply pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedResult = result.slice(startIndex, endIndex);
  
  return {
    customers: paginatedResult,
    total: result.length,
    page,
    limit,
    totalPages: Math.ceil(result.length / limit),
  };
};

export const fetchCustomerById = async (id) => {
  await delay(400);
  
  const customer = customers.find(c => c.id === parseInt(id));
  
  if (!customer) {
    throw new Error('Customer not found');
  }
  
  return customer;
};

export const fetchCustomerOrders = async (customerId) => {
  await delay(500);
  
  const customerOrders = orders.filter(o => o.customer_id === parseInt(customerId));
  
  return customerOrders;
};

// Dashboard API
export const fetchDashboardStats = async () => {
  await delay(800);
  
  // Calculate revenue for the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();
  
  const revenueData = last7Days.map(date => ({
    date,
    revenue: Math.floor(Math.random() * 10000),
  }));
  
  // Calculate order status distribution
  const orderStatusCounts = orderStatuses.reduce((acc, status) => {
    acc[status] = orders.filter(o => o.status === status).length;
    return acc;
  }, {});
  
  // Top selling products
  const topProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)
    .map(p => ({
      id: p.id,
      name: p.name,
      sales: Math.floor(Math.random() * 1000),
      revenue: Math.floor(Math.random() * 10000),
    }));
  
  return {
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    totalOrders: orders.length,
    totalProducts: products.length,
    totalCustomers: customers.length,
    revenueByDay: revenueData,
    orderStatusDistribution: orderStatusCounts,
    topSellingProducts: topProducts,
    recentOrders: orders.slice(0, 5),
  };
};
