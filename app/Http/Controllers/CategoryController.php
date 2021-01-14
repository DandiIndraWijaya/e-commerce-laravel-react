<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Subcategory;

class CategoryController extends Controller
{
    public function index(){
        $categories = Category::all();

        $subcategory_array = array();
        foreach($categories as $category){
            foreach($category->subcategories as $subcategory){
                array_push($subcategory_array, $subcategory);
            }
            $category->subcategories = $subcategory_array;
        }

        return response()->json($categories, 201);
    }
}
