<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Subcategory;

class CategoryController extends Controller
{
    public function index(){
        $categories = Category::all();

        $subcategory_string = '';
        foreach($categories as $category){
            foreach($category->subcategories as $s){
                $subcategory_string = $subcategory_string . ' | ' . $s->subcategory;
            }
            $category->name = $category->category;
            $category->subcategory = $subcategory_string;
            $subcategory_string = '';
        }

        return response()->json($categories, 201);
    }

    public function add_category(Request $request){
        $category = Category::create([
            'category' => $request->category_name,
            'description' => $request->description
        ]);

        $get_category = Category::where('category', $request->category_name)->first();
        
        foreach($request->tags as $tag){
            Subcategory::create([
                'subcategory' => $tag,
                'category_id' => $get_category->id
            ]);
        }

        return response()->json($request->description, 201);
    }

    public function delete_category($selected){
        $selected_array = explode(',', $selected);
        foreach($selected_array as $category){
            $get_category = Category::where('category', $category)->first();
            Subcategory::where('category_id', $get_category->id)->delete();
            Category::where('category', $category)->delete();
        }

        return response()->json($selected_array, 201);
    }
}
