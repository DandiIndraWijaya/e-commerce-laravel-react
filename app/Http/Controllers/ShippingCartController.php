<?php

namespace App\Http\Controllers;

use App\Models\ProductImage;
use App\Models\Products;
use App\Models\ShoppingCart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ShippingCartController extends Controller
{
    public function index(){
        return view('shopping_cart');
    }

    public function store(Request $request){
        $shopping_cart = new ShoppingCart;
        $shopping_cart->email = $request->input('email');
        $shopping_cart->product_id = $request->input('product_id');
        $shopping_cart->quantity = $request->input('quantity');
        $shopping_cart->active = 1;
        $save = $shopping_cart->save();

        DB::table('products')
              ->where('id', $request->input('product_id'))
              ->update(['quantity' => $request->input('stock')]);
        
        return response()->json($save, 201);
    }

    public function get($user_email){
        $shopping_cart = ShoppingCart::select('shopping_cart.id as cart_id', 'products.id as product_id', 'name', 'email', 'shopping_cart.quantity as quantity', 'price')->join('products', 'products.id', '=', 'shopping_cart.product_id')->where('email', $user_email)->where('active', 1)->get();


        foreach($shopping_cart as $cart){
            $images = ProductImage::select('image')->where('product_id', $cart->product_id)->get();
            $i = 0;
            foreach($images as $img){
                $im[$i] = $img->image; 
                $i++;
            }
            $cart->image = $im;
        }
        return response()->json($shopping_cart, 201);
        
    }

    public function delete($id){
        $cart = ShoppingCart::where('id', $id)->first();
        $product = Products::find($cart->product_id);
        $product->quantity += $cart->quantity;
        $product->save();

        ShoppingCart::where('id', $id)->delete();
        return redirect()->back();
    }
}
