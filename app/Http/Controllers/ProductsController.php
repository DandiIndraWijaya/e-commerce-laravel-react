<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use App\Models\ProductImage;
use App\Models\Products;
use App\Models\Category;
use Illuminate\Http\Request;
// use Illuminate\Support\Facades\DB;

class ProductsController extends Controller
{
    public function index(){
        $products = Products::select('id', 'name', 'description', 'price')->get();

        return response()->json($products, 201);
    }

    public function add_product(Request $request){
        $price = (int)$request->price;

        $product = Products::create([
            'name' => $request->product_name,
            'price' => $price,
            'description' => $request->description
        ]);

        $get_product = Products::where('name', $request->product_name)->first();
        $product_id = $get_product->id;

        foreach($request->images as $image){
            $explode = explode(',', $image);
            $decode = base64_decode($explode[1]);

            if(str_contains($explode[0], 'jpeg')){
                $extentsion = 'jpg';
            }else{
                $extentsion = 'png';
            }

            $str_random = Str::random(10);
            $fileName = $str_random.'.'.$extentsion;

            $path = public_path().'/image/products/'.$fileName;

            $put_image = file_put_contents($path, $decode);
            if($put_image){
                $product_image = new ProductImage;
                $product_image->product_id = $product_id;
                $product_image->image = '/image/products/'.$fileName;
                $product_image->save();
            }
        }



        return response()->json($request->descrition, 201);
    }

    public function show($category){
        $category_result = Category::where('category_name', $category)->first();
        $products = Products::where('category', $category_result->id)->get();
        foreach($products as $product){
            $images = ProductImage::select('image')->where('product_id', $product->id)->get();
            $i = 0;
            foreach($images as $img){
                $im[$i] = $img->image; 
                $i++;
            }
            $product->image = $im;
        }
        return response()->json($products, 201);
    }

    public function product($product_name){
        $product = Products::where('name', $product_name)->first();
        $images = ProductImage::where('product_id', $product->id)->get();

        $i = 0;
        foreach($images as $image){
            $im[$i] = $image->image;
            $i++;
        }
        $product->image = $im;
        return response()->json($product, 201);

    }

    public function search_product($product_name){
        $products = Products::select('id', 'name', 'description', 'price')->where('name', 'like', '%' . $product_name . '%')->get();
        return response()->json($products, 201);
    }
}
