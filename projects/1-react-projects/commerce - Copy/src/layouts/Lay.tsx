<Routes>
  {/* User Routes */}
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<SignUp />} />

  {/* Admin Routes */}
  <Route path="/admin" element={<AdminDashboard />} />
  <Route path="/admin/products" element={<AdminProducts />} />
  <Route path="/admin/products/add" element={<AddProduct />} />
  <Route path="/admin/products/:id" element={<AdminProductDetails />} />
  <Route path="/admin/products/:id/edit" element={<EditProduct />} />
  <Route path="/admin/users" element={<UserManagement />} />
  <Route path="/admin/users/add" element={<AddUser />} />
  <Route path="/admin/users/:id/edit" element={<EditUser />} />

  {/* Fallback */}
  <Route path="*" element={<NotFound />} />
</Routes>
