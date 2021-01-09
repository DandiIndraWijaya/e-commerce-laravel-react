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

Route::get('/products/category/{category}', 'App\Http\Controllers\ProductsController@show');
Route::get('/product/{product_name}', 'App\Http\Controllers\ProductsController@product');

Route::post('/shopping_cart', 'App\Http\Controllers\ShoppingCartController@store');
Route::get('/shopping_cart/{user_email}', 'App\Http\Controllers\ShoppingCartController@get');

Route::get('/user_address/{user_id}', 'App\Http\Controllers\UserController@get_address');
Route::post('/check_ongkir', 'App\Http\Controllers\CheckOngkirController@check_ongkir');


Route::post('create-payment', function () {
    $apiContext = new \PayPal\Rest\ApiContext(
        new \PayPal\Auth\OAuthTokenCredential(
            'AdTG5HIyXFQMpOtgR-8DEeU8q87le9OohEE2acrzVujJm2NAZ9N5-Q7Jls9OiQOqDBkoT5KSdljJN4B8',     // ClientID
            'EPT-BonuRKBaOxTVeOKjrNc2gEgLgoc0f9cjWwl22cjNYnb3R_CiFQLgFAlyE4jx4MF9rZDq8b1H0eIt'      // ClientSecret
        )
    );

    $payer = new Payer();
    $payer->setPaymentMethod("paypal");

    $item1 = new Item();
    $item1->setName('Ground Coffee 40 oz')
        ->setCurrency('USD')
        ->setQuantity(1)
        ->setSku("123123") // Similar to `item_number` in Classic API
        ->setPrice(7.5);
    $item2 = new Item();
    $item2->setName('Granola bars')
        ->setCurrency('USD')
        ->setQuantity(5)
        ->setSku("321321") // Similar to `item_number` in Classic API
        ->setPrice(2);

    $itemList = new ItemList();
    $itemList->setItems(array($item1, $item2));

    $details = new Details();
    $details->setShipping(1.2)
        ->setTax(1.3)
        ->setSubtotal(17.50);

    $amount = new Amount();
    $amount->setCurrency("USD")
        ->setTotal(20)
        ->setDetails($details);

    $transaction = new Transaction();
    $transaction->setAmount($amount)
        ->setItemList($itemList)
        ->setDescription("Payment description")
        ->setInvoiceNumber(uniqid());

    $redirectUrls = new RedirectUrls();
    $redirectUrls->setReturnUrl("http://laravel-paypal-example.test")
        ->setCancelUrl("http://laravel-paypal-example.test");

    // Add NO SHIPPING OPTION
    $inputFields = new InputFields();
    $inputFields->setNoShipping(1);

    $webProfile = new WebProfile();
    $webProfile->setName('test' . uniqid())->setInputFields($inputFields);

    $webProfileId = $webProfile->create($apiContext)->getId();

    $payment = new Payment();
    $payment->setExperienceProfileId($webProfileId); // no shipping
    $payment->setIntent("sale")
        ->setPayer($payer)
        ->setRedirectUrls($redirectUrls)
        ->setTransactions(array($transaction));

    try {
        $payment->create($apiContext);
    } catch (Exception $ex) {
        echo $ex;
        exit(1);
    }

    return $payment;
});

Route::post('execute-payment', function (Request $request) {
    $apiContext = new \PayPal\Rest\ApiContext(
        new \PayPal\Auth\OAuthTokenCredential(
            'AdTG5HIyXFQMpOtgR-8DEeU8q87le9OohEE2acrzVujJm2NAZ9N5-Q7Jls9OiQOqDBkoT5KSdljJN4B8',     // ClientID
            'EPT-BonuRKBaOxTVeOKjrNc2gEgLgoc0f9cjWwl22cjNYnb3R_CiFQLgFAlyE4jx4MF9rZDq8b1H0eIt'      // ClientSecret
        )
    );

    $paymentId = $request->paymentID;
    $payment = Payment::get($paymentId, $apiContext);

    $execution = new PaymentExecution();
    $execution->setPayerId($request->payerID);

    // $transaction = new Transaction();
    // $amount = new Amount();
    // $details = new Details();

    // $details->setShipping(2.2)
    //     ->setTax(1.3)
    //     ->setSubtotal(17.50);

    // $amount->setCurrency('USD');
    // $amount->setTotal(21);
    // $amount->setDetails($details);
    // $transaction->setAmount($amount);

    // $execution->addTransaction($transaction);

    try {
        $result = $payment->execute($execution, $apiContext);
    } catch (Exception $ex) {
        echo $ex;
        exit(1);
    }

    return $result;
});