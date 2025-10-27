const app = angular.module('salesApp', []);

app.controller('MainController', function($scope, $http) {
  const API_BASE = 'http://localhost:5000/api';
  $scope.page = 'login';
  $scope.login = {};
  $scope.products = [];
  $scope.orders = [];
  $scope.errorMessage = '';

  // LOGIN
  $scope.loginUser = async function() {
    try {
      const res = await $http.post(`${API_BASE}/login`, $scope.login);
      if (res.data.success) {
        $scope.username = $scope.login.username;
        $scope.loadProducts();
        $scope.page = 'catalog';
        $scope.errorMessage = '';
      } else {
        $scope.errorMessage = 'Invalid username or password';
      }
    } catch (err) {
      console.error(err);
      $scope.errorMessage = 'Server error during login';
    }
  };

  // LOAD PRODUCTS
  $scope.loadProducts = async function() {
    try {
      const res = await $http.get(`${API_BASE}/products`);
      // Convert relative image paths to absolute URLs
      $scope.products = res.data.map(product => ({
        ...product,
        image: `http://localhost:5000${product.image}`
      }));
    } catch (err) {
      console.error('Error loading products', err);
    }
  };

  // ORDER PRODUCT
  $scope.orderProduct = async function(product) {
    try {
      await $http.post(`${API_BASE}/orders`, {
        username: $scope.username,
        products: [product]
      });
      alert('ORDERED SUCCESSFULLY!');
    } catch (err) {
      console.error('Error placing order', err);
    }
  };

  // VIEW ORDERS
  $scope.viewOrders = async function() {
    try {
      const res = await $http.get(`${API_BASE}/orders/${$scope.username}`);
      $scope.orders = res.data;
      $scope.page = 'orders';
    } catch (err) {
      console.error('Error loading orders', err);
    }
  };

  $scope.backToCatalog = function() {
    $scope.page = 'catalog';
  };

  $scope.logout = function() {
    $scope.page = 'login';
    $scope.login = {};
    $scope.username = '';
  };
});
