<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function get_address($user_id){
        $address_list = DB::select('SELECT user_address.id as id, user_address.city_id as user_city_id , `address`, `RT/RW` as RT_RW, `kelurahan/desa` as kelurahan_desa, kecamatan, cities.name as kabupaten, provinces.name as provinsi, phone_number, postal_code FROM user_address JOIN cities ON user_address.city_id = cities.id JOIN provinces ON user_address.province_id = provinces.id');

        return response()->json($address_list, 201);
    }
}
