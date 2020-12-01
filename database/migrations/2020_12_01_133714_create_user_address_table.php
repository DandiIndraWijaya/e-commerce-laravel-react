<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserAddressTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_address', function (Blueprint $table) {
            $table->id();
            $table->string('address');
            $table->string('RT/RW', 30);
            $table->string('kelurahan/desa', 50);
            $table->string('kecamatan', 50);
            $table->integer('city_id');
            $table->integer('province_id');
            $table->string('phone_number', 20);
            $table->string('postal_code', 25);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_address');
    }
}
