<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Province;
use Illuminate\Http\Request;
use Kavist\RajaOngkir\Facades\RajaOngkir;
use Auth;

class CheckOngkirController extends Controller
{
    public function index()
    {
        $provinces = Province::pluck('name', 'province_id');
        $user_name = Auth::user();
        return view('ongkir', compact('provinces', 'user_name'));
    }

    public function getCities($id)
    {
        $city = City::where('province_id', $id)->pluck('name', 'city_id');
        return response()->json($city);
    }

    public function check_ongkir(Request $request)
    {
        $cost[0]= RajaOngkir::ongkosKirim([
            'origin'        => 105, // ID kota/kabupaten asal
            'destination'   => $request->city_destination, // ID kota/kabupaten tujuan
            'weight'        => $request->weight, // berat barang dalam gram
            'courier'       => 'jne'// kode kurir pengiriman: ['jne', 'tiki', 'pos'] untuk starter
        ])->get();
        
        $cost[1]= RajaOngkir::ongkosKirim([
            'origin'        => 105, // ID kota/kabupaten asal
            'destination'   => $request->city_destination, // ID kota/kabupaten tujuan
            'weight'        => $request->weight, // berat barang dalam gram
            'courier'       => 'tiki'// kode kurir pengiriman: ['jne', 'tiki', 'pos'] untuk starter
        ])->get();

        $cost[1]= RajaOngkir::ongkosKirim([
            'origin'        => 105, // ID kota/kabupaten asal
            'destination'   => $request->city_destination, // ID kota/kabupaten tujuan
            'weight'        => $request->weight, // berat barang dalam gram
            'courier'       => 'pos'// kode kurir pengiriman: ['jne', 'tiki', 'pos'] untuk starter
        ])->get();

        return response()->json($cost);
    }
}
