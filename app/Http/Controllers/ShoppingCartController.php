<?php

namespace App\Http\Controllers;

use App\Models\ProductImage;
use App\Models\Products;
use App\Models\ShoppingCart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ShoppingCartController extends Controller
{
    public function index(){
        return view('shopping_cart');
    }

    public function store(Request $request){

        $check_cart = ShoppingCart::where('user_id', $request->input('user_id'))->where('product_id', $request->input('product_id'))->first();

        if(empty($check_cart)){
            $shopping_cart = new ShoppingCart;
            $shopping_cart->user_id = $request->input('user_id');
            $shopping_cart->product_id = $request->input('product_id');
            $shopping_cart->quantity = $request->input('quantity');
            $save = $shopping_cart->save();
        }else{
            $shopping_cart = $check_cart;
            $shopping_cart->quantity += $request->input('quantity');
            $shopping_cart->save();
            // DB::table('shopping_cart')
            //   ->where('user_id', $request->input('user_id'))
            //   ->where('product_id', $request->input('product_id'))
            //   ->update(['quantity' => 'quantity' + $request->input('quantity')]);
        }

        DB::table('products')
              ->where('id', $request->input('product_id'))
              ->update(['quantity' => $request->input('stock')]);
        
        return response()->json($shopping_cart, 201);
    }

    public function get($user_id){
        $shopping_cart = ShoppingCart::select('shopping_cart.id as cart_id','products.name as name' ,'products.id as product_id', 'shopping_cart.quantity as quantity', 'price', 'weight')->join('products', 'products.id', '=', 'shopping_cart.product_id')->where('user_id', $user_id)->get();

        foreach($shopping_cart as $product){
            $product_weight = $product->quantity * $product->weight;
            $product->weight = $product_weight;
        }

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

    public function delete($cart_id){
        $cart = ShoppingCart::where('id', $cart_id)->first();
        $product = Products::find($cart->product_id);
        $product->quantity += $cart->quantity;
        $product->save();

        ShoppingCart::where('id', $cart_id)->delete();
        return response()->json(204);
    }
}
