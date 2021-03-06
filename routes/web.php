<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

// Route::view('/', 'app');
// Route::view('/{path}', 'app'); 
Route::view('/{path?}', 'index');

Route::view('/products/{path?}', 'index');
Route::view('/product/{path?}', 'index');
Route::view('/admin/{path?}', 'index');


Route::get('/shopping_cart/ongkir', 'App\Http\Controllers\CheckOngkirController@index');
Route::post('/shopping_cart/ongkir', 'App\Http\Controllers\CheckOngkirController@check_ongkir');
Route::get('/shopping_cart/cities/{province_id}', 'App\Http\Controllers\CheckOngkirController@getCities');

Route::view('/paypal/me/', 'paypal');