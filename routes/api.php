<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'App\Http\Controllers\AuthController@login');
    Route::post('signup', 'App\Http\Controllers\AuthController@signup');
  
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'App\Http\Controllers\AuthController@logout');
        Route::get('user', 'App\Http\Controllers\AuthController@user');
    });
});

Route::post('/shopping_cart', 'App\Http\Controllers\ShoppingCartController@store')->middleware('auth:api');
Route::get('/shopping_cart/{user_id}', 'App\Http\Controllers\ShoppingCartController@get')->middleware('auth:api');
Route::delete('/shopping_cart/{cart_id}', 'App\Http\Controllers\ShoppingCartController@delete')->middleware('auth:api');

Route::get('/products', 'App\Http\Controllers\ProductsController@index');
Route::get('/products/category/{category}', 'App\Http\Controllers\ProductsController@show');
Route::get('/product/{product_name}', 'App\Http\Controllers\ProductsController@product');
Route::get('/product/search/{product_name}', 'App\Http\Controllers\ProductsController@search_product');

Route::post('/shopping_cart', 'App\Http\Controllers\ShoppingCartController@store');
Route::get('/shopping_cart/{user_email}', 'App\Http\Controllers\ShoppingCartController@get');

Route::get('/user_address/{user_id}', 'App\Http\Controllers\UserController@get_address');
Route::post('/check_ongkir', 'App\Http\Controllers\CheckOngkirController@check_ongkir');


