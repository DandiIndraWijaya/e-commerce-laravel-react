<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subcategory;

class SubcategoryController extends Controller
{
    public function index($id){
        $subcategory = Subcategory::where('category_id', $id)->get();

        return response()->json($subcategory, 201);
    }
}
